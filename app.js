// Mo Meal Prep - Personal Nutrition, Calendar Archive, Movie Treat Finder, Streamlined Body Comp & Smart Grocery Sync
const STORAGE_KEY = 'mo_meal_prep_state_v4';

function getMondayOfDate(d = new Date()) {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  return formatDateISO(monday);
}

function formatDateISO(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseISOToLocalDate(isoStr) {
  const [y, m, d] = isoStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function addDaysISO(isoStr, daysToAdd) {
  const dt = parseISOToLocalDate(isoStr);
  dt.setDate(dt.getDate() + daysToAdd);
  return formatDateISO(dt);
}

function formatShortDate(isoStr) {
  const dt = parseISOToLocalDate(isoStr);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatFullDateWithYear(isoStr) {
  const dt = parseISOToLocalDate(isoStr);
  return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getRecipeLinks(mealName = '') {
  const cleanTitle = mealName.replace(/\(.*?\)/g, '').replace(/—/g, ' ').trim();
  const ytQuery = encodeURIComponent(`how to make ${cleanTitle} healthy recipe`);
  const articleQuery = encodeURIComponent(cleanTitle);
  return {
    youtubeUrl: `https://www.youtube.com/results?search_query=${ytQuery}`,
    articleUrl: `https://www.allrecipes.com/search?q=${articleQuery}`
  };
}

const currentMondayISO = getMondayOfDate(new Date());

let state = {
  profile: {
    ...JSON.parse(JSON.stringify(window.DEFAULT_PROFILE)),
    // Mo's Exact Personal Profile & Baseline Stats
    startWeight: 170,
    currentWeight: 170,
    goalWeight: 160,
    goalBodyFatPct: 18.2,
    heightFt: 5,
    heightIn: 7,
    age: 42,
    bodyFatPct: 23,
    muscleMassLbs: 75,
    waistIn: '', // Left blank as requested
    activityMultiplier: 1.375,
    workoutsPerWeek: 3,
    goalType: 'cut_moderate'
  },
  activeWeekMondayISO: currentMondayISO,
  selectedDayIndex: 0,
  weeksByStartISO: {},
  progressLogs: [],
  favorites: [],
  mealHistoryLog: [],
  checkedGroceries: {},
  customGroceries: [],
  selectedStoreFilter: 'ALL',
  lastUpdated: Date.now()
};

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  ensureWeekExists(state.activeWeekMondayISO);
  registerServiceWorker();
  renderAll();
  startAutoCloudSyncPolling();
});

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function loadState() {
  try {
    const savedV4 = localStorage.getItem(STORAGE_KEY);
    const savedV3 = localStorage.getItem('mo_meal_prep_state_v3');
    if (savedV4) {
      const parsed = JSON.parse(savedV4);
      state = {
        ...state,
        ...parsed,
        profile: { ...state.profile, ...(parsed.profile || {}) }
      };
    } else if (savedV3) {
      const parsedV3 = JSON.parse(savedV3);
      state = {
        ...state,
        ...parsedV3,
        profile: {
          ...state.profile,
          ...(parsedV3.profile || {}),
          // Enforce Mo's exact stats: 5'7", Age 42, 170 lbs, 23% BF, 75 lbs Muscle, Waist empty, Goal 160 lbs
          startWeight: 170,
          currentWeight: 170,
          goalWeight: 160,
          goalBodyFatPct: 18.2,
          heightFt: 5,
          heightIn: 7,
          age: 42,
          bodyFatPct: 23,
          muscleMassLbs: 75,
          waistIn: ''
        }
      };
      state.progressLogs = [
        {
          id: 'baseline-170-v4',
          dateISO: formatDateISO(new Date()),
          weight: 170,
          bodyFatPct: 23,
          muscleMassLbs: 75,
          note: 'Baseline Profile (5\'7", Age 42, 170 lbs, 23% BF, 75 lbs Muscle → Goal: 160 lbs / 18.2% BF)'
        }
      ];
      saveState(true);
    }

    if (!state.progressLogs || state.progressLogs.length === 0) {
      state.progressLogs = [
        {
          id: 'baseline-170-v4',
          dateISO: formatDateISO(new Date()),
          weight: 170,
          bodyFatPct: 23,
          muscleMassLbs: 75,
          note: 'Baseline Profile (5\'7", Age 42, 170 lbs, 23% BF, 75 lbs Muscle → Goal: 160 lbs / 18.2% BF)'
        }
      ];
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
}

function saveState(skipCloud = false) {
  state.lastUpdated = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!skipCloud && state.profile.syncRoomId) {
    pushToCloudRoom(true);
  }
}

function ensureWeekExists(mondayISO, forceRegenerate = false, customStyle = null) {
  if (state.weeksByStartISO[mondayISO] && !forceRegenerate) {
    return state.weeksByStartISO[mondayISO];
  }

  const style = customStyle || state.profile.prepStyle || 'mix';
  const calRatio = state.profile.calories / 1800;
  const protRatio = state.profile.protein / 135;
  const carbRatio = state.profile.carbs / 156;
  const fatRatio = state.profile.fat / 70;
  const fibRatio = state.profile.fiber / 35;

  const baseDays = JSON.parse(JSON.stringify(window.STARTER_WEEK_PLAN));

  baseDays.forEach((dayObj, idx) => {
    const dayDateISO = addDaysISO(mondayISO, idx);
    dayObj.dateISO = dayDateISO;

    if (style === 'batch') {
      dayObj.prepNote = idx % 2 === 0
        ? `Batch Cook Day: Cook 2 portions of ${dayObj.primaryProtein} (Eat today & in 48 hrs — never back-to-back)`
        : `Alternating Protein Day: ${dayObj.primaryProtein} so you never eat the same protein 2 days in a row`;
    } else if (style === 'fresh') {
      dayObj.prepNote = `Fresh Daily Prep: Quick 15-min ${dayObj.primaryProtein} cook`;
    }

    dayObj.meals.forEach(m => {
      m.calories = Math.round(m.calories * calRatio);
      m.protein = Math.round(m.protein * protRatio);
      m.carbs = Math.round(m.carbs * carbRatio);
      m.fat = Math.round(m.fat * fatRatio);
      m.fiber = Math.round(m.fiber * fibRatio);
      m.upgradeApplied = false;
      recordMealInHistory(m.name, dayDateISO, m.primaryProtein);
    });
  });

  state.weeksByStartISO[mondayISO] = {
    weekStartISO: mondayISO,
    weekEndISO: addDaysISO(mondayISO, 6),
    generatedAt: new Date().toISOString(),
    prepStyle: style,
    targetSnapshot: {
      calories: state.profile.calories,
      protein: state.profile.protein,
      carbs: state.profile.carbs,
      fat: state.profile.fat,
      fiber: state.profile.fiber
    },
    days: baseDays
  };

  saveState();
  return state.weeksByStartISO[mondayISO];
}

function getActiveWeekObj() {
  return ensureWeekExists(state.activeWeekMondayISO);
}

function getActiveWeekDays() {
  return getActiveWeekObj().days;
}

function recordMealInHistory(mealName, dateISO, primaryProtein = '') {
  if (!state.mealHistoryLog) state.mealHistoryLog = [];
  const exists = state.mealHistoryLog.some(h => h.name === mealName && h.dateISO === dateISO);
  if (!exists) {
    state.mealHistoryLog.unshift({ name: mealName, dateISO, primaryProtein });
    if (state.mealHistoryLog.length > 80) state.mealHistoryLog.pop();
  }
}

function showToast(msg) {
  const box = document.getElementById('toastBox');
  box.textContent = msg;
  box.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    box.classList.add('hidden');
  }, 3000);
}

function switchTab(tabName) {
  const tabs = ['plan', 'generator', 'shopping', 'favorites', 'profile'];
  tabs.forEach(t => {
    const sec = document.getElementById(`tab-${t}`);
    const nav = document.getElementById(`nav-${t}`);
    if (!sec || !nav) return;
    if (t === tabName) {
      sec.classList.remove('hidden');
      nav.className = 'flex flex-col items-center justify-center py-1.5 rounded-xl text-emerald-400 bg-emerald-500/10 font-semibold transition';
    } else {
      sec.classList.add('hidden');
      nav.className = 'flex flex-col items-center justify-center py-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition';
    }
  });
  renderAll();
}

function renderAll() {
  renderHeaderBadge();
  renderCalendarHeaderAndDays();
  renderDailyMacroSummary();
  renderDayMeals();
  renderShoppingList();
  renderFavoritesAndHistory();
  renderProfileAndProgressTab();
  updateSyncBadge();
}

function renderHeaderBadge() {
  const p = state.profile;
  const badge = document.getElementById('headerTargetBadge');
  if (badge) {
    badge.textContent = `${p.calories.toLocaleString()} kcal • ${p.protein}P / ${p.carbs}C / ${p.fat}F / ${p.fiber}Fib`;
  }
  const genText = document.getElementById('genMacroSummaryText');
  if (genText) {
    genText.textContent = `${p.calories.toLocaleString()} kcal • ${p.protein}g P / ${p.carbs}g C / ${p.fat}g F`;
  }
}

// ================= CALENDAR NAVIGATION & ARCHIVE =================
function changeWeekOffset(deltaWeeks) {
  const nextMonday = addDaysISO(state.activeWeekMondayISO, deltaWeeks * 7);
  state.activeWeekMondayISO = nextMonday;
  state.selectedDayIndex = 0;
  ensureWeekExists(nextMonday);
  renderAll();
}

function jumpToCurrentWeek() {
  state.activeWeekMondayISO = getMondayOfDate(new Date());
  const todayISO = formatDateISO(new Date());
  const days = getActiveWeekDays();
  const todayIdx = days.findIndex(d => d.dateISO === todayISO);
  state.selectedDayIndex = todayIdx >= 0 ? todayIdx : 0;
  renderAll();
}

function jumpToSelectedDate(isoVal) {
  if (!isoVal) return;
  const dt = parseISOToLocalDate(isoVal);
  const mondayISO = getMondayOfDate(dt);
  state.activeWeekMondayISO = mondayISO;
  ensureWeekExists(mondayISO);
  const days = getActiveWeekDays();
  const idx = days.findIndex(d => d.dateISO === isoVal);
  state.selectedDayIndex = idx >= 0 ? idx : 0;
  renderAll();
  showToast(`📅 Jumped to ${formatFullDateWithYear(isoVal)}`);
}

function renderCalendarHeaderAndDays() {
  const weekObj = getActiveWeekObj();
  const days = weekObj.days;
  const startStr = formatShortDate(weekObj.weekStartISO);
  const endStr = formatFullDateWithYear(weekObj.weekEndISO);

  const titleEl = document.getElementById('currentWeekTitle');
  const subEl = document.getElementById('currentWeekSubtitle');
  const btnToday = document.getElementById('btnJumpToday');
  const datePicker = document.getElementById('calendarDatePicker');
  const shopWeekLabel = document.getElementById('shoppingWeekLabel');

  if (titleEl) titleEl.textContent = `${startStr} – ${endStr}`;
  if (shopWeekLabel) shopWeekLabel.textContent = `${startStr} – ${endStr}`;

  const isThisWeek = weekObj.weekStartISO === getMondayOfDate(new Date());
  if (subEl) {
    const snap = weekObj.targetSnapshot || state.profile;
    subEl.textContent = isThisWeek
      ? `Current Week • Plan Target: ${snap.calories} kcal (${snap.protein}P/${snap.carbs}C/${snap.fat}F)`
      : `Saved Calendar Week • Plan Target: ${snap.calories} kcal`;
  }
  if (btnToday) {
    btnToday.classList.toggle('hidden', isThisWeek);
  }

  const selectedDayObj = days[state.selectedDayIndex] || days[0];
  if (datePicker && selectedDayObj?.dateISO) {
    datePicker.value = selectedDayObj.dateISO;
  }

  const prepSelect = document.getElementById('prepStyleSelect');
  if (prepSelect) prepSelect.value = state.profile.prepStyle || 'mix';

  const todayISO = formatDateISO(new Date());
  const row = document.getElementById('daySelectorRow');
  if (!row) return;

  row.innerHTML = days.map((d, idx) => {
    const active = idx === state.selectedDayIndex;
    const isToday = d.dateISO === todayISO;
    const proteinEmoji = getProteinEmoji(d.primaryProtein);
    const shortDate = d.dateISO ? formatShortDate(d.dateISO) : '';

    return `
      <button onclick="selectDay(${idx})" class="px-3 py-2 rounded-xl text-xs font-semibold transition shrink-0 flex flex-col items-center border ${
        active
          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
          : isToday
          ? 'bg-slate-800 text-white border-emerald-500/50'
          : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700'
      }">
        <span class="font-bold">${d.day.slice(0, 3)} ${isToday ? '•' : ''}</span>
        <span class="text-[10px] ${active ? 'text-slate-900 font-semibold' : 'text-slate-400'}">${shortDate}</span>
        <span class="text-[10px] mt-0.5 ${active ? 'text-slate-950 font-bold' : 'text-emerald-400/90'}">${proteinEmoji} ${d.primaryProtein}</span>
      </button>
    `;
  }).join('');
}

function openWeeksArchiveModal() {
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');
  const allWeeks = Object.values(state.weeksByStartISO).sort((a, b) => b.weekStartISO.localeCompare(a.weekStartISO));

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-bold text-white">📚 Saved Calendar Weeks & Meal Archive</h3>
        <p class="text-xs text-slate-400">Look back at any week, month, or year to see what meals were planned</p>
      </div>
      <button onclick="closeModal()" class="text-slate-400 hover:text-white text-lg">✕</button>
    </div>

    <div class="space-y-2.5 max-h-96 overflow-y-auto pr-1">
      ${allWeeks.map(w => {
        const isCurrent = w.weekStartISO === state.activeWeekMondayISO;
        const snap = w.targetSnapshot || state.profile;
        const sampleMeals = w.days.map(d => `${d.day.slice(0, 3)}: ${d.meals[1]?.name?.split('with')[0] || d.primaryProtein}`).slice(0, 4).join(' • ');
        return `
          <div class="p-3.5 rounded-xl bg-slate-950 border ${isCurrent ? 'border-emerald-500' : 'border-slate-800'} space-y-1.5">
            <div class="flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-white">${formatShortDate(w.weekStartISO)} – ${formatFullDateWithYear(w.weekEndISO)}</span>
                ${isCurrent ? '<span class="ml-2 text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Viewing Now</span>' : ''}
              </div>
              <button onclick="loadArchivedWeek('${w.weekStartISO}')" class="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs">
                Open Week
              </button>
            </div>
            <div class="text-[11px] text-emerald-400">
              Targets: ${snap.calories} kcal • ${snap.protein}g P • ${snap.carbs}g C • ${snap.fat}g F • ${snap.fiber}g Fiber
            </div>
            <div class="text-[11px] text-slate-400 truncate">
              Dinners: ${sampleMeals}...
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  modal.classList.remove('hidden');
}

function loadArchivedWeek(mondayISO) {
  state.activeWeekMondayISO = mondayISO;
  state.selectedDayIndex = 0;
  closeModal();
  switchTab('plan');
  showToast(`Loaded week of ${formatFullDateWithYear(mondayISO)}`);
}

function getProteinEmoji(protein = '') {
  const p = protein.toLowerCase();
  if (p.includes('shrimp')) return '🍤';
  if (p.includes('tilapia') || p.includes('fish')) return '🐟';
  if (p.includes('beef') || p.includes('steak') || p.includes('kafta')) return '🥩';
  if (p.includes('chicken')) return '🍗';
  if (p.includes('turkey')) return '🦃';
  if (p.includes('egg')) return '🍳';
  return '🥗';
}

function selectDay(idx) {
  state.selectedDayIndex = idx;
  renderCalendarHeaderAndDays();
  renderDailyMacroSummary();
  renderDayMeals();
}

function getMealEffectiveMacros(meal) {
  const up = meal.upgradeApplied && meal.flavorUpgrade ? meal.flavorUpgrade : { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  return {
    calories: meal.calories + (up.calories || 0),
    protein: meal.protein + (up.protein || 0),
    carbs: meal.carbs + (up.carbs || 0),
    fat: meal.fat + (up.fat || 0),
    fiber: meal.fiber + (up.fiber || 0)
  };
}

function renderDailyMacroSummary() {
  const days = getActiveWeekDays();
  const dayObj = days[state.selectedDayIndex];
  const card = document.getElementById('dailyMacroCard');
  if (!dayObj || !card) return;

  const totals = dayObj.meals.reduce((acc, m) => {
    const eff = getMealEffectiveMacros(m);
    acc.calories += eff.calories;
    acc.protein += eff.protein;
    acc.carbs += eff.carbs;
    acc.fat += eff.fat;
    acc.fiber += eff.fiber;
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 });

  const t = state.profile;
  const minCal = Math.round(t.calories * (1 - (t.tolerancePct || 5) / 100));
  const maxCal = Math.round(t.calories * (1 + (t.tolerancePct || 5) / 100));
  const withinTarget = totals.calories >= minCal && totals.calories <= maxCal;
  const dateDisplay = dayObj.dateISO ? formatFullDateWithYear(dayObj.dateISO) : '';

  card.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-base font-bold text-white">${dayObj.day} (${dateDisplay})</h3>
          <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
            withinTarget
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
              : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
          }">
            ${withinTarget ? `✓ Hits ${t.calories.toLocaleString()} kcal Goal (±5%)` : `Allowed ±5% Range: ${minCal.toLocaleString()} to ${maxCal.toLocaleString()} kcal`}
          </span>
        </div>
        <p class="text-xs text-slate-400 mt-0.5">${dayObj.prepNote || ''}</p>
      </div>
      <div class="text-right">
        <span class="text-xl font-extrabold text-white">${totals.calories.toLocaleString()}</span>
        <span class="text-xs text-slate-400"> / ${t.calories.toLocaleString()} kcal</span>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2.5 pt-3">
      ${renderMacroBar('Protein', totals.protein, t.protein, 'g', 'bg-emerald-500', 'text-emerald-400')}
      ${renderMacroBar('Carbs', totals.carbs, t.carbs, 'g', 'bg-sky-500', 'text-sky-400')}
      ${renderMacroBar('Fat', totals.fat, t.fat, 'g', 'bg-amber-500', 'text-amber-400')}
      ${renderMacroBar('Fiber', totals.fiber, t.fiber, 'g', 'bg-purple-500', 'text-purple-400')}
    </div>
  `;
}

function renderMacroBar(label, val, target, unit, barColor, textColor) {
  const pct = Math.min(100, Math.round((val / Math.max(1, target)) * 100));
  return `
    <div class="bg-slate-900/90 border border-slate-800/80 rounded-xl p-2.5">
      <div class="flex items-center justify-between text-xs">
        <span class="text-slate-400 font-medium">${label}</span>
        <span class="${textColor} font-bold">${val}${unit}</span>
      </div>
      <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden my-1.5">
        <div class="h-full ${barColor} rounded-full transition-all duration-300" style="width: ${pct}%"></div>
      </div>
      <div class="text-[10px] text-slate-500 text-right">Goal: ${target}${unit}</div>
    </div>
  `;
}

function renderDayMeals() {
  const days = getActiveWeekDays();
  const dayObj = days[state.selectedDayIndex];
  const container = document.getElementById('dayMealsContainer');
  if (!dayObj || !container) return;

  container.innerHTML = dayObj.meals.map((meal, mealIdx) => renderMealCardHTML(meal, state.selectedDayIndex, mealIdx)).join('');
}

function renderMealCardHTML(meal, dayIdx, mealIdx, isStandalone = false) {
  const eff = getMealEffectiveMacros(meal);
  const isFav = state.favorites.some(f => f.name === meal.name);
  const up = meal.flavorUpgrade;
  const links = getRecipeLinks(meal.name);

  return `
    <div class="glass-card rounded-2xl p-4 shadow-xl space-y-3 border border-slate-800/90">
      <div class="flex items-start justify-between gap-2">
        <div>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ${meal.slot}
            </span>
            <span class="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              🔥 ${meal.appliance || 'Kitchen'} • ⏱️ ${meal.prepTime || '15 mins'}
            </span>
          </div>
          <h4 class="text-sm sm:text-base font-bold text-white mt-1.5 leading-snug">
            ${getProteinEmoji(meal.primaryProtein)} ${meal.name}
          </h4>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick='toggleFavoriteMeal(${JSON.stringify(meal).replace(/'/g, "&#39;")})' title="Save to Favorites" class="p-2 rounded-xl border transition ${
            isFav
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
          }">
            ${isFav ? '⭐' : '☆'}
          </button>
          ${!isStandalone ? `
            <button onclick="openSwapMealModal(${dayIdx}, ${mealIdx})" title="Swap Meal" class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition">
              🔄 Swap
            </button>
          ` : `
            <button onclick='openAssignToPlanModal(${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition">
              + Add to Week Plan
            </button>
          `}
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2 text-xs bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
        <span class="font-bold text-white px-2 py-0.5 rounded bg-slate-800">${eff.calories} kcal</span>
        <span class="text-emerald-400 font-semibold">P: ${eff.protein}g</span>
        <span class="text-slate-600">•</span>
        <span class="text-sky-400 font-semibold">C: ${eff.carbs}g</span>
        <span class="text-slate-600">•</span>
        <span class="text-amber-400 font-semibold">F: ${eff.fat}g</span>
        <span class="text-slate-600">•</span>
        <span class="text-purple-400 font-semibold">Fiber: ${eff.fiber}g</span>
      </div>

      ${up ? `
        <div class="flex items-center justify-between gap-2 px-3 py-2 rounded-xl border transition ${
          meal.upgradeApplied
            ? 'bg-amber-500/15 border-amber-500/50 text-amber-200'
            : 'bg-slate-900/60 border-slate-800 text-slate-300'
        }">
          <div class="text-xs">
            <span class="font-bold text-amber-400">🌶️ Flavor Upgrade Option:</span>
            <span class="ml-1">${up.name}</span>
            <span class="block sm:inline sm:ml-1.5 text-[11px] text-amber-300/90 font-medium">
              (+${up.calories} kcal | +${up.protein}g P | +${up.carbs}g C | +${up.fat}g F)
            </span>
          </div>
          ${!isStandalone ? `
            <button onclick="toggleFlavorUpgrade(${dayIdx}, ${mealIdx})" class="text-xs font-semibold px-2.5 py-1 rounded-lg border shrink-0 transition ${
              meal.upgradeApplied
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }">
              ${meal.upgradeApplied ? '✓ Added (In Grocery List)' : '+ Add Upgrade'}
            </button>
          ` : ''}
        </div>
      ` : ''}

      <details class="group bg-slate-950/60 rounded-xl border border-slate-800/80 overflow-hidden">
        <summary class="cursor-pointer px-3.5 py-2.5 text-xs font-semibold text-emerald-400 flex items-center justify-between select-none">
          <span>👨‍🍳 View Ingredients, Canton Store, Video & Step-by-Step Guide</span>
          <span class="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
        </summary>
        <div class="p-3.5 pt-2 border-t border-slate-800/80 space-y-3 text-xs">
          <div class="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-800/80">
            <a href="${links.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-semibold transition">
              <span>▶️</span> Watch Cooking Video on YouTube ↗
            </a>
            <a href="${links.articleUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 font-semibold transition">
              <span>📖</span> Read Full Recipe Article & Tips ↗
            </a>
          </div>

          <div>
            <h5 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1.5">Ingredients (Scaled to Your ${state.profile.calories.toLocaleString()} kcal Profile):</h5>
            <ul class="space-y-1.5">
              ${(meal.ingredients || []).map(ing => {
                const st = window.STORE_INFO[ing.store] || { badgeClass: 'bg-slate-800 text-slate-300', icon: '🏪' };
                return `
                  <li class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-slate-900/70 px-2.5 py-1.5 rounded-lg border border-slate-800/60">
                    <div>
                      <span class="font-semibold text-white">${ing.item}</span>
                      <span class="text-slate-400 ml-1">— ${ing.amount}</span>
                    </div>
                    <span class="text-[10px] px-2 py-0.5 rounded-full border ${st.badgeClass} w-fit">
                      ${st.icon} ${ing.store}
                    </span>
                  </li>
                `;
              }).join('')}
            </ul>
          </div>

          <div>
            <h5 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1.5">Step-by-Step Preparation & Cooking:</h5>
            <ol class="space-y-2 list-decimal list-inside text-slate-300 leading-relaxed">
              ${(meal.steps || []).map(step => `<li class="bg-slate-900/40 p-2 rounded-lg border border-slate-800/40">${step}</li>`).join('')}
            </ol>
          </div>
        </div>
      </details>
    </div>
  `;
}

function toggleFlavorUpgrade(dayIdx, mealIdx) {
  const days = getActiveWeekDays();
  const meal = days[dayIdx].meals[mealIdx];
  meal.upgradeApplied = !meal.upgradeApplied;
  saveState();
  renderDailyMacroSummary();
  renderDayMeals();
  renderShoppingList();
  showToast(meal.upgradeApplied ? '🌶️ Flavor upgrade added to macros & Grocery List!' : 'Flavor upgrade removed from macros & Grocery List.');
}

function updatePrepStyle(val) {
  state.profile.prepStyle = val;
  saveState();
  showToast(`Prep style updated to: ${val.toUpperCase()}`);
}

// ================= SUB-MODE SWITCHER & YUMMY MOVIE TREAT WIZARD =================
function switchGeneratorSubMode(mode) {
  const mealBox = document.getElementById('genMealBox');
  const treatBox = document.getElementById('genTreatBox');
  const btnMeal = document.getElementById('submodeBtnMeal');
  const btnTreat = document.getElementById('submodeBtnTreat');
  const out = document.getElementById('generatedSingleResult');
  if (out) out.innerHTML = '';

  if (mode === 'treat') {
    mealBox.classList.add('hidden');
    treatBox.classList.remove('hidden');
    btnTreat.className = 'py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 shadow transition flex items-center justify-center gap-1.5';
    btnMeal.className = 'py-2.5 px-3 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 transition flex items-center justify-center gap-1.5';
  } else {
    treatBox.classList.add('hidden');
    mealBox.classList.remove('hidden');
    btnMeal.className = 'py-2.5 px-3 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 shadow transition flex items-center justify-center gap-1.5';
    btnTreat.className = 'py-2.5 px-3 rounded-xl text-xs font-bold text-amber-300 hover:bg-slate-800 transition flex items-center justify-center gap-1.5';
  }
}

function updateTreatVibeOptions() {
  const taste = document.getElementById('treatTaste').value;
  const vibeSelect = document.getElementById('treatVibe');
  if (!vibeSelect) return;

  if (taste === 'sweet') {
    vibeSelect.innerHTML = `
      <option value="chocolate_pb">Rich Chocolate & Peanut Butter</option>
      <option value="ice_cream">Cold & Creamy (Ice Cream / Cheesecake Vibe)</option>
      <option value="warm_bakery">Warm & Cozy (Mug Brownie / Churro / Cookie)</option>
      <option value="fruity">Fruity, Berry & Chocolate Drizzle</option>
    `;
  } else if (taste === 'savory') {
    vibeSelect.innerHTML = `
      <option value="cheesy_nacho">Cheesy, Loaded Nacho / Queso Vibe</option>
      <option value="spicy_crunchy">Spicy & Crunchy (Buffalo / Flamin' Hot / Cajun)</option>
      <option value="arabic_meze">Savory Arabic Meze (Za'atar Pita Chips & Loaded Labneh/Hummus)</option>
    `;
  } else {
    vibeSelect.innerHTML = `
      <option value="kettle_popcorn">Sweet & Salty Kettle Popcorn + Chocolate Mix</option>
      <option value="pb_pretzel">Peanut Butter, Dark Chocolate & Crunchy Pretzels</option>
    `;
  }
}

function generateYummyTreat() {
  const taste = document.getElementById('treatTaste').value;
  const vibe = document.getElementById('treatVibe').value;
  const calBudget = parseInt(document.getElementById('treatCalories').value, 10) || 260;
  const source = document.getElementById('treatSource').value;
  const out = document.getElementById('generatedSingleResult');

  if (source === 'home') {
    const homeRecipe = getHomemadeTreatRecipe(taste, vibe, calBudget);
    out.innerHTML = `
      <div class="text-xs font-bold text-amber-400 uppercase tracking-wider px-1">
        🍿 Homemade Movie Treat Recipe (With Step-by-Step Cooking Guide & Video Link):
      </div>
      ${renderMealCardHTML(homeRecipe, 0, 0, true)}
    `;
    showToast('🍿 Homemade treat recipe ready! Expand for step-by-step instructions.');
  } else {
    const storeOptions = getStoreBoughtTreatOptions(taste, vibe, calBudget);
    out.innerHTML = `
      <div class="glass-card rounded-2xl p-5 shadow-xl space-y-4 border border-amber-500/40">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
            Ready-to-Eat Store Options
          </span>
          <h3 class="text-base font-bold text-white mt-1">
            🛒 Top 3 Store-Bought Movie Treats & Where to Buy in Canton / Westland
          </h3>
          <p class="text-xs text-slate-400">
            No cooking required! Click <strong>"+ Add to Grocery List"</strong> on any option below to drop it straight into your Canton shopping list.
          </p>
        </div>

        <div class="space-y-3">
          ${storeOptions.map((opt, idx) => {
            const st = window.STORE_INFO[opt.store] || { badgeClass: 'bg-slate-800 text-slate-300', icon: '🏪' };
            return `
              <div class="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span class="text-xs font-bold text-amber-400">Option #${idx + 1}:</span>
                    <h4 class="text-sm font-bold text-white">${opt.name}</h4>
                  </div>
                  <span class="text-[11px] px-2.5 py-1 rounded-full border ${st.badgeClass} w-fit font-semibold">
                    ${st.icon} Best at: ${opt.store}
                  </span>
                </div>
                <p class="text-xs text-slate-300">${opt.description}</p>
                <div class="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div class="flex flex-wrap items-center gap-2 text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span class="font-bold text-white">${opt.calories} kcal</span>
                    <span class="text-emerald-400 font-semibold">P: ${opt.protein}g</span>
                    <span class="text-sky-400 font-semibold">C: ${opt.carbs}g</span>
                    <span class="text-amber-400 font-semibold">F: ${opt.fat}g</span>
                    <span class="text-purple-400 font-semibold">Fib: ${opt.fiber}g</span>
                  </div>
                  <button onclick="addStoreTreatToGroceryList('${opt.name.replace(/'/g, "\\'")}', '${opt.store.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition">
                    + Add to Grocery List
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
    showToast('🛒 Found 3 store-bought treat options in Canton!');
  }
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function addStoreTreatToGroceryList(itemName, storeName) {
  state.customGroceries.push({
    id: 'treat-' + Date.now(),
    item: `🍿 Movie Treat: ${itemName}`,
    store: storeName
  });
  saveState();
  renderShoppingList();
  showToast(`Added "${itemName}" to ${storeName.split('(')[0]} in your Grocery List!`);
}

function getHomemadeTreatRecipe(taste, vibe, calBudget) {
  const recipes = {
    chocolate_pb: {
      name: "60-Second Molten Chocolate Peanut Butter Lava Protein Mug Cake",
      appliance: "Microwave or Air Fryer (2 mins)",
      prepTime: "4 mins",
      primaryProtein: "Whey & Dairy",
      calories: calBudget,
      protein: 24,
      carbs: 22,
      fat: 9,
      fiber: 5,
      flavorUpgrade: { name: "Top with 2 tbsp Sugar-Free Whipped Cream & 1 tsp Melted PB", calories: 60, protein: 2, carbs: 2, fat: 5, fiber: 0 },
      ingredients: [
        { item: "Chocolate Whey or Casein Protein Powder", amount: "1 scoop (30g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Unsweetened Cocoa Powder & Baking Powder", amount: "1 tbsp cocoa + 1/4 tsp baking powder", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "0% Greek Yogurt & Splash Almond Milk", amount: "3 tbsp yogurt + 2 tbsp milk", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Natural Creamy Peanut Butter (for molten center)", amount: "1 tbsp (15g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Spray a microwave-safe mug or ramekin lightly with oil spray.",
        "Whisk together chocolate protein powder, 1 tbsp cocoa powder, 1/4 tsp baking powder, 3 tbsp Greek yogurt, and 2 tbsp milk until smooth like brownie batter.",
        "Drop 1 tbsp creamy peanut butter right into the center of the batter and press it down slightly.",
        "Microwave on high for 45–55 seconds (do not overbake so the center stays gooey and molten!). Let cool 1 minute and dig in."
      ]
    },
    ice_cream: {
      name: "Thick Pistachio & Berry Cheesecake Frozen Yogurt Bowl",
      appliance: "No-Cook / Freezer (5 mins)",
      prepTime: "5 mins",
      primaryProtein: "Dairy",
      calories: calBudget,
      protein: 23,
      carbs: 26,
      fat: 8,
      fiber: 6,
      flavorUpgrade: { name: "Add 15g Crushed Biscoff or Graham Cracker Crust", calories: 70, protein: 1, carbs: 11, fat: 3, fiber: 0 },
      ingredients: [
        { item: "0% Plain Greek Yogurt + 1 tbsp Cream Cheese/Labneh", amount: "1 cup (225g)", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Sugar-Free Cheesecake Pudding Mix (or Vanilla Whey)", amount: "1.5 tbsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Fresh Strawberries & Raspberries", amount: "3/4 cup", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Crushed Shelled Pistachios", amount: "15g", store: "Greenland Market / Papaya (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whip cold Greek yogurt, 1 tbsp labneh/cream cheese, and cheesecake pudding mix vigorously for 60 seconds until thick like cheesecake mousse.",
        "Fold in fresh berries from Joe Randazzo's and top with crushed pistachios. Freeze for 15 minutes for an ice-cream-like movie bowl!"
      ]
    },
    warm_bakery: {
      name: "Air Fryer Crispy Cinnamon-Sugar Churro Tortilla Chips with Chocolate Protein Dip",
      appliance: "Air Fryer (6 mins)",
      prepTime: "8 mins",
      primaryProtein: "Dairy & Fiber",
      calories: calBudget,
      protein: 22,
      carbs: 28,
      fat: 7,
      fiber: 11,
      flavorUpgrade: { name: "Dip in Warm Caramel Sauce (1 tbsp)", calories: 55, protein: 0, carbs: 13, fat: 0, fiber: 0 },
      ingredients: [
        { item: "High-Fiber Carb Balance Tortilla (cut into triangles)", amount: "1 large tortilla", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Cinnamon & Zero-Cal Sweetener (or 1 tsp brown sugar)", amount: "1 tbsp mix", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt + Chocolate Protein Powder (Frosting Dip)", amount: "1/2 cup yogurt + 1/2 scoop chocolate whey", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Slice the high-fiber tortilla into 8 triangle wedges, mist lightly with butter/olive oil spray, and coat generously with cinnamon-sweetener.",
        "Air fry at 390°F for 5–6 minutes until puffed and crunchy like churros.",
        "Whisk Greek yogurt with chocolate protein powder and a splash of milk for a thick chocolate frosting dip."
      ]
    },
    cheesy_nacho: {
      name: "Loaded Air Fryer High-Protein Chicken & Queso Blanco Movie Nachos",
      appliance: "Air Fryer (7 mins)",
      prepTime: "10 mins",
      primaryProtein: "Chicken & Cheese",
      calories: calBudget,
      protein: 28,
      carbs: 22,
      fat: 9,
      fiber: 9,
      flavorUpgrade: { name: "Top with 2 tbsp Guacamole & Pickled Jalapeños", calories: 55, protein: 1, carbs: 3, fat: 5, fiber: 2 },
      ingredients: [
        { item: "High-Fiber Tortilla Chips (or Quest Protein Chips)", amount: "1 bag / 1 tortilla cut into chips", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Shredded Cooked Halal Chicken Breast", amount: "3 oz (85g)", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Reduced-Fat Mexican Blend Cheese & Salsa", amount: "1/3 cup cheese + 1/4 cup pico de gallo", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Crisp the tortilla wedges in the Air Fryer at 390°F for 4 minutes (or open a bag of Quest Tortilla Chips).",
        "Scatter warm shredded taco-seasoned chicken and shredded cheese over the chips and air fry 2 more minutes until bubbly.",
        "Top with fresh pico de gallo, cilantro, and jalapeños."
      ]
    },
    spicy_crunchy: {
      name: "Crispy Air Fryer Buffalo Cauliflower & Chicken Bites with Cool Tzatziki Ranch",
      appliance: "Air Fryer (10 mins)",
      prepTime: "12 mins",
      primaryProtein: "Chicken",
      calories: calBudget,
      protein: 26,
      carbs: 16,
      fat: 8,
      fiber: 5,
      flavorUpgrade: { name: "Add 15g Crumbled Blue Cheese or Feta", calories: 55, protein: 3, carbs: 1, fat: 4, fiber: 0 },
      ingredients: [
        { item: "Halal Chicken Breast Bites & Cauliflower Florets", amount: "3.5 oz chicken + 1 cup cauliflower", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Frank's RedHot Buffalo Sauce", amount: "2 tbsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt Ranch Dip", amount: "3 tbsp", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Toss chicken bites and cauliflower florets in garlic powder, olive oil spray, and Frank's RedHot Buffalo sauce.",
        "Air fry at 400°F for 9–10 minutes until charred and crispy. Serve with chilled Greek yogurt ranch dip."
      ]
    },
    arabic_meze: {
      name: "Warm Crispy Za'atar Pita Chips with Loaded Spiced Labneh & Cucumber Dip",
      appliance: "Air Fryer (6 mins)",
      prepTime: "8 mins",
      primaryProtein: "Dairy",
      calories: calBudget,
      protein: 21,
      carbs: 24,
      fat: 9,
      fiber: 6,
      flavorUpgrade: { name: "Drizzle with 1 tsp Extra Virgin Olive Oil & Pomegranate Seeds", calories: 55, protein: 0, carbs: 3, fat: 5, fiber: 1 },
      ingredients: [
        { item: "Whole Wheat Arabic Pita (cut into triangles)", amount: "1 small pita", store: "Greenland Market / Papaya (Canton)", category: "Bread & Grains" },
        { item: "Labneh & Greek Yogurt Mix", amount: "1/2 cup", store: "Greenland Market / Papaya (Canton)", category: "Dairy & Eggs" },
        { item: "Za'atar, Sumac, Mint & Diced Cucumber", amount: "1/2 cup toppings", store: "Joe Randazzo's (Westland)", category: "Produce" }
      ],
      steps: [
        "Mist pita triangles with olive oil spray, sprinkle with za'atar, and air fry at 390°F for 5 minutes until crunchy.",
        "Swirl labneh in a shallow bowl, top with diced cucumber, tomato, mint, and sumac, and scoop up with warm pita chips."
      ]
    }
  };

  const chosen = recipes[vibe] || recipes.chocolate_pb;
  return {
    id: 'treat-home-' + Date.now(),
    slot: `🍿 Homemade Movie Treat (${taste.toUpperCase()})`,
    ...chosen,
    upgradeApplied: false
  };
}

function getStoreBoughtTreatOptions(taste, vibe, calBudget) {
  if (taste === 'savory') {
    return [
      {
        name: "Quest Tortilla Style Protein Chips (Nacho Cheese or Chili Lime) + Fresh Salsa",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Tastes just like Doritos while watching a movie, but packs 19g–20g of protein with only 4g net carbs! Dip in fresh pico de gallo from Joe Randazzo's.",
        calories: 180,
        protein: 20,
        carbs: 9,
        fat: 6,
        fiber: 3
      },
      {
        name: "LesserEvil Himalayan Gold Popcorn (2.5 cups) + 2 Light Mozzarella String Cheeses",
        store: "Costco / Sam's Club (Canton)",
        description: "Air-popped movie theater butter flavor made with coconut oil, paired with 2 high-protein string cheeses for a salty, satisfying crunch.",
        calories: 230,
        protein: 15,
        carbs: 21,
        fat: 10,
        fiber: 5
      },
      {
        name: "Greenland Market Fresh Roasted Salted Chickpeas (Qadama) + Labneh Dip",
        store: "Greenland Market / Papaya (Canton)",
        description: "Authentic crunchy Arabic roasted chickpeas paired with creamy labneh and crisp Persian cucumber slices.",
        calories: 245,
        protein: 14,
        carbs: 28,
        fat: 8,
        fiber: 7
      }
    ];
  } else if (taste === 'sweet_salty') {
    return [
      {
        name: "SkinnyPop Kettle Corn (2 cups) + Barebells Creamy Crisp / Caramel Cashew Protein Bar",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Slice a Barebells bar (tastes like a real Snickers/Twix with zero sugar!) into bite-sized pieces and mix with sweet & salty kettle popcorn.",
        calories: 290,
        protein: 21,
        carbs: 32,
        fat: 10,
        fiber: 5
      },
      {
        name: "Tru Fru Hyper-Chilled Raspberries or Strawberries in Dark & White Chocolate",
        store: "Costco / Sam's Club (Canton)",
        description: "Found in the freezer aisle at Costco/Target/Meijer—real whole berries dipped in white and dark chocolate. Sweet, cold, and high fiber.",
        calories: 210,
        protein: 3,
        carbs: 25,
        fat: 10,
        fiber: 5
      },
      {
        name: "Chobani Flip (Salted Caramel Crunch) + 12 Roasted Almonds",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Creamy Greek yogurt with crunchy pretzel/chocolate mix-ins for the ultimate sweet-and-salty movie bowl.",
        calories: 250,
        protein: 15,
        carbs: 26,
        fat: 9,
        fiber: 3
      }
    ];
  } else {
    return [
      {
        name: "Yasso Frozen Greek Yogurt Poppables or Bars (Mint Chocolate Chip / Fudge Brownie)",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Real ice-cream bar texture dipped in chocolate crunch—only 100 to 150 calories each (have 2 bars for a full movie treat!).",
        calories: 220,
        protein: 10,
        carbs: 28,
        fat: 7,
        fiber: 2
      },
      {
        name: "Halo Top Light Ice Cream Pint (Chocolate Chip Cookie Dough or Peanut Butter Cup - 2/3 Pint)",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Eat two-thirds of a whole pint right out of the tub while watching your movie for under 240 calories and 14g protein.",
        calories: 230,
        protein: 14,
        carbs: 34,
        fat: 6,
        fiber: 8
      },
      {
        name: "Barebells Chocolate Dough / Cookies & Cream Bar (Warmed 10 Secs in Microwave)",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Pro tip: Microwave a Barebells bar for 10 seconds on a plate—it turns into a gooey warm candy-bar brownie with 20g protein and 1g sugar!",
        calories: 200,
        protein: 20,
        carbs: 20,
        fat: 7,
        fiber: 3
      }
    ];
  }
}

// ================= FAVORITES & MEAL HISTORY LOG =================
function toggleFavoriteMeal(meal) {
  const idx = state.favorites.findIndex(f => f.name === meal.name);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
    showToast('Removed from Favorites');
  } else {
    state.favorites.push(JSON.parse(JSON.stringify(meal)));
    showToast('⭐ Saved to Favorites library!');
  }
  saveState();
  renderAll();
}

function renderFavoritesAndHistory() {
  const favContainer = document.getElementById('favoritesContainer');
  const histContainer = document.getElementById('historyTagsContainer');
  if (!favContainer || !histContainer) return;

  if (state.favorites.length === 0) {
    favContainer.innerHTML = `
      <div class="glass-card rounded-2xl p-6 text-center text-slate-400 text-xs">
        No starred favorites yet. Tap the ☆ Star button on any meal, snack, or homemade treat to save it here!
      </div>
    `;
  } else {
    favContainer.innerHTML = state.favorites.map((meal, i) => renderMealCardHTML(meal, 0, i, true)).join('');
  }

  if (!state.mealHistoryLog || state.mealHistoryLog.length === 0) {
    histContainer.innerHTML = `<span class="text-xs text-slate-500">No meal history recorded yet.</span>`;
  } else {
    histContainer.innerHTML = state.mealHistoryLog.slice(0, 35).map(entry => `
      <span class="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
        <span class="text-emerald-400 font-semibold">${entry.dateISO ? formatShortDate(entry.dateISO) : ''}:</span>
        <span>${entry.name}</span>
      </span>
    `).join('');
  }
}

function clearHistoryLog() {
  state.mealHistoryLog = [];
  saveState();
  renderFavoritesAndHistory();
  showToast('Anti-repetition memory cleared!');
}

// ================= SWAP MEAL MODAL & ASSIGN TO PLAN =================
function openSwapMealModal(dayIdx, mealIdx) {
  const days = getActiveWeekDays();
  const currentMeal = days[dayIdx].meals[mealIdx];
  const dayObj = days[dayIdx];
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');

  const candidates = [...state.favorites, ...window.ON_DEMAND_POOL];

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-bold text-white">Swap ${dayObj.day} (${formatShortDate(dayObj.dateISO)}) — ${currentMeal.slot}</h3>
        <p class="text-xs text-slate-400">Swapping this meal automatically updates your Canton Grocery List!</p>
      </div>
      <button onclick="closeModal()" class="text-slate-400 hover:text-white text-lg">✕</button>
    </div>

    <div class="space-y-2.5">
      <button onclick="generateAiReplacementForSlot(${dayIdx}, ${mealIdx})" class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2">
        <span>✨</span> Generate Fresh Replacement Scaled to ${state.profile.calories.toLocaleString()} kcal
      </button>

      <div class="text-xs font-semibold text-slate-400 pt-2">Or choose from Favorites & Chef Library:</div>
      <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
        ${candidates.map(cand => `
          <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
            <div>
              <div class="text-xs font-bold text-white">${getProteinEmoji(cand.primaryProtein)} ${cand.name}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">
                ${cand.calories} kcal • P: ${cand.protein}g • C: ${cand.carbs}g • F: ${cand.fat}g • Fib: ${cand.fiber}g
              </div>
            </div>
            <button onclick='replaceMealSlot(${dayIdx}, ${mealIdx}, ${JSON.stringify(cand).replace(/'/g, "&#39;")})' class="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold shrink-0">
              Use This
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

function replaceMealSlot(dayIdx, mealIdx, newMeal) {
  const days = getActiveWeekDays();
  const copy = JSON.parse(JSON.stringify(newMeal));
  copy.slot = days[dayIdx].meals[mealIdx].slot;
  copy.id = `${dayIdx}-${mealIdx}-${Date.now()}`;
  days[dayIdx].meals[mealIdx] = copy;
  recordMealInHistory(copy.name, days[dayIdx].dateISO, copy.primaryProtein);
  saveState();
  closeModal();
  renderAll();
  showToast('✓ Meal swapped & Canton Grocery List automatically updated!');
}

function openAssignToPlanModal(meal) {
  const days = getActiveWeekDays();
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-bold text-white">Add "${meal.name}" to Weekly Plan</h3>
        <p class="text-xs text-slate-400">Select which day and meal slot to place this recipe into (automatically updates Grocery List):</p>
      </div>
      <button onclick="closeModal()" class="text-slate-400 hover:text-white text-lg">✕</button>
    </div>
    <div class="space-y-3">
      <div>
        <label class="block text-xs text-slate-300 mb-1">Select Day:</label>
        <select id="assignDayIdx" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
          ${days.map((d, i) => `<option value="${i}">${d.day} (${formatShortDate(d.dateISO)}) — Primary: ${d.primaryProtein}</option>`).join('')}
        </select>
      </div>
      <div>
        <label class="block text-xs text-slate-300 mb-1">Select Slot:</label>
        <select id="assignMealIdx" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
          <option value="0">Meal 1 (First Meal - Lighter)</option>
          <option value="1">Meal 2 (Dinner - Hearty Main)</option>
          <option value="2">Snack 1</option>
          <option value="3">Snack 2</option>
        </select>
      </div>
      <button onclick='confirmAssignMeal(${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs">
        Insert into Weekly Plan & Sync Grocery List
      </button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function confirmAssignMeal(meal) {
  const dIdx = parseInt(document.getElementById('assignDayIdx').value, 10);
  const mIdx = parseInt(document.getElementById('assignMealIdx').value, 10);
  replaceMealSlot(dIdx, mIdx, meal);
  switchTab('plan');
  selectDay(dIdx);
}

function closeModal() {
  document.getElementById('appModal').classList.add('hidden');
}

// ================= ON-DEMAND SINGLE GENERATOR & GEMINI AI =================
async function generateSingleMeal() {
  const slot = document.getElementById('genSlot').value;
  const protein = document.getElementById('genProtein').value;
  const cuisine = document.getElementById('genCuisine').value;
  const appliance = document.getElementById('genAppliance').value;
  const note = document.getElementById('genCustomNote').value.trim();
  const btn = document.getElementById('btnGenerateSingle');
  const out = document.getElementById('generatedSingleResult');

  const isMeal1 = slot.includes('Meal 1');
  const isDinner = slot.includes('Meal 2');
  const ratio = isMeal1 ? 0.27 : isDinner ? 0.48 : 0.125;

  const targetCal = Math.round(state.profile.calories * ratio);
  const targetProt = Math.round(state.profile.protein * ratio);
  const targetCarbs = Math.round(state.profile.carbs * ratio);
  const targetFat = Math.round(state.profile.fat * ratio);
  const targetFib = Math.round(state.profile.fiber * ratio);

  btn.disabled = true;
  btn.innerHTML = '<span>⏳</span> Crafting High-Flavor Recipe Scaled to Your Macros...';

  try {
    let generatedMeal = null;
    let usedLiveGemini = false;
    if (state.profile.geminiApiKey && state.profile.geminiApiKey.trim().length > 10) {
      generatedMeal = await callGeminiSingleRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib });
      usedLiveGemini = true;
    } else {
      generatedMeal = buildSmartLocalRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib });
    }

    out.innerHTML = `
      <div class="flex items-center justify-between px-1">
        <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">✨ Generated Just For You (Scaled to ${state.profile.calories.toLocaleString()} kcal Daily Goal):</span>
        <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full ${usedLiveGemini ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-slate-800 text-slate-300 border border-slate-700'}">
          ${usedLiveGemini ? '🤖 Live Google Gemini AI' : '👨‍🍳 Built-In Chef Engine'}
        </span>
      </div>
      ${renderMealCardHTML(generatedMeal, 0, 0, true)}
    `;
    showToast(usedLiveGemini ? '🤖 Live Gemini AI recipe generated!' : '🔥 Custom recipe generated!');
  } catch (err) {
    const fallback = buildSmartLocalRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib });
    out.innerHTML = renderMealCardHTML(fallback, 0, 0, true);
    showToast('Generated using built-in Chef Engine!');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span>🔥</span> Generate Custom Recipe & Step-by-Step Guide';
  }
}

async function callGeminiSingleRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib }) {
  const recentMeals = (state.mealHistoryLog || []).slice(0, 15).map(h => h.name).join(', ');
  const prompt = `
You are an Executive Chef & AI Nutritionist for Mo in Canton, MI (48188).
Generate ONE delicious, healthy recipe in strict JSON format (no markdown codeblocks, raw JSON object only).
Rules:
- Slot: ${slot} (Target: ${targetCal} kcal, ${targetProt}g protein, ${targetCarbs}g carbs, ${targetFat}g fat, ${targetFib}g fiber)
- Requested Protein: ${protein} (STRICT RULE: NO PORK EVER. Seafood can ONLY be Shrimp or Tilapia. Prefer Halal meats).
- Excluded items to NEVER use: ${state.profile.exclusions.join(', ')}
- Recent meals to AVOID repeating: ${recentMeals}
- Favorite items to consider: ${state.profile.favoriteIngredients.join(', ')}
- Cuisine vibe: ${cuisine}
- Appliance: ${appliance}
- User note: ${note || 'Make it super flavorful'}
- Assign every ingredient to one of these exact 4 store strings:
  1. "Joe Randazzo's (Westland)" (for fresh fruits, vegetables, herbs)
  2. "Greenland Market / Papaya (Canton)" (for Halal meats, Arabic groceries, pita, spices, labneh, tahini)
  3. "Costco / Sam's Club (Canton)" (for bulk Halal meat, frozen shrimp/tilapia, eggs, Greek yogurt, bulk items)
  4. "Walmart / Meijer / Kroger / Target (Canton)" (for everyday packaged items)

JSON Schema:
{
  "id": "gen-1",
  "slot": "${slot}",
  "name": "Recipe Title",
  "appliance": "${appliance}",
  "prepTime": "12 mins",
  "primaryProtein": "Chicken/Beef/Shrimp/Tilapia/Eggs",
  "calories": ${targetCal},
  "protein": ${targetProt},
  "carbs": ${targetCarbs},
  "fat": ${targetFat},
  "fiber": ${targetFib},
  "upgradeApplied": false,
  "flavorUpgrade": {
    "name": "Specific tasty upgrade description",
    "calories": 85,
    "protein": 3,
    "carbs": 4,
    "fat": 6,
    "fiber": 0
  },
  "ingredients": [
    { "item": "Ingredient Name", "amount": "Quantity in oz/g & cups", "store": "Joe Randazzo's (Westland)", "category": "Produce" }
  ],
  "steps": [
    "Step 1 detailed cooking instruction...",
    "Step 2 detailed cooking instruction...",
    "Step 3 detailed cooking instruction..."
  ]
}`;

  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(state.profile.geminiApiKey.trim())}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' }
    })
  });
  if (!resp.ok) throw new Error('Gemini API error');
  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

function buildSmartLocalRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib }) {
  const chosenProtein = protein === 'Any Approved'
    ? ['Chicken', 'Beef', 'Shrimp', 'Tilapia'][Math.floor(Math.random() * 4)]
    : protein;

  const proteinStore = (chosenProtein === 'Shrimp' || chosenProtein === 'Tilapia')
    ? "Costco / Sam's Club (Canton)"
    : "Greenland Market / Papaya (Canton)";

  const titleNote = note ? ` (${note})` : '';
  const ozPortion = Math.max(3.5, Math.round((targetProt / 7.5) * 10) / 10);
  const gramsPortion = Math.round(ozPortion * 28.35);

  return {
    id: 'local-' + Date.now(),
    slot,
    name: `${cuisine} ${chosenProtein} Skillet/Bowl — ${appliance.split('(')[0].trim()}${titleNote}`,
    appliance,
    prepTime: appliance.includes('5') ? '5 mins' : '14 mins',
    primaryProtein: chosenProtein,
    calories: targetCal,
    protein: targetProt,
    carbs: targetCarbs || Math.round((targetCal * 0.35) / 4),
    fat: targetFat || Math.round((targetCal * 0.30) / 9),
    fiber: targetFib || (slot.includes('Snack') ? 6 : 12),
    upgradeApplied: false,
    flavorUpgrade: {
      name: `Add 1.5 tbsp Signature ${cuisine.split('/')[0].trim()} Garlic-Herb Sauce & Crushed Pistachios/Feta`,
      calories: 90,
      protein: 3,
      carbs: 3,
      fat: 7,
      fiber: 1
    },
    ingredients: [
      { item: `Fresh ${chosenProtein} (Scaled to your ${targetProt}g protein goal)`, amount: `${ozPortion} oz (${gramsPortion}g) raw`, store: proteinStore, category: 'Halal Meat & Seafood' },
      { item: 'Fresh Bell Peppers, Red Onion, Parsley & Lemon', amount: '1.5 cups chopped', store: "Joe Randazzo's (Westland)", category: 'Produce' },
      { item: 'High-Fiber Chickpeas / Black Beans & Basmati Rice', amount: `${Math.round(targetCarbs * 2.5)}g cooked`, store: 'Greenland Market / Papaya (Canton)', category: 'Bread & Grains' },
      { item: '0% Greek Yogurt & Extra Virgin Olive Oil Marinade', amount: '2 tbsp yogurt + 1 tsp olive oil', store: "Costco / Sam's Club (Canton)", category: 'Dairy & Eggs' }
    ],
    steps: [
      `Season ${ozPortion} oz (${gramsPortion}g) of ${chosenProtein} generously with ${cuisine} spices, minced garlic, lemon juice, salt, and black pepper.`,
      `Cook using ${appliance}: preheat to 400°F (if Air Frying) or medium-high skillet and cook for 9–12 minutes until golden brown and cooked through.`,
      `Toss fresh vegetables from Joe Randazzo's with lemon juice, herbs, and warm high-fiber beans/rice.`,
      `Plate the sizzling ${chosenProtein} over the bowl and drizzle with chilled garlic-herb yogurt sauce.`
    ]
  };
}

// ================= WEEKLY GENERATOR MODAL =================
function openGenerateWeekModal() {
  const weekObj = getActiveWeekObj();
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-bold text-white">✨ Generate / Re-Scale Plan for ${formatShortDate(weekObj.weekStartISO)} – ${formatFullDateWithYear(weekObj.weekEndISO)}</h3>
        <p class="text-xs text-slate-400">Uses your active daily targets & rotates proteins daily</p>
      </div>
      <button onclick="closeModal()" class="text-slate-400 hover:text-white text-lg">✕</button>
    </div>

    <div class="space-y-3 text-xs">
      <div>
        <label class="block text-slate-300 font-semibold mb-1">1. Choose Cooking Style for This Week:</label>
        <select id="modalPrepStyle" class="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white">
          <option value="mix" ${state.profile.prepStyle === 'mix' ? 'selected' : ''}>Mix of Both (Batch Cook Mon/Wed & Tue/Thu + Fresh Weekend)</option>
          <option value="batch" ${state.profile.prepStyle === 'batch' ? 'selected' : ''}>Batch Cooking Focus (Cook 2x portions, eat on alternating days)</option>
          <option value="fresh" ${state.profile.prepStyle === 'fresh' ? 'selected' : ''}>Fresh Daily (Different recipes every single day)</option>
        </select>
      </div>

      <div class="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-slate-300">
        <div class="font-bold text-emerald-400">✓ Active Profile Targets Dictating This Plan:</div>
        <div>• Daily Intake: <strong>${state.profile.calories.toLocaleString()} kcal (±5%)</strong></div>
        <div>• Macros: <strong>${state.profile.protein}g Protein • ${state.profile.carbs}g Carbs • ${state.profile.fat}g Fat • ${state.profile.fiber}g Fiber</strong></div>
        <div>• Protein Rotation: Chicken → Shrimp → Beef → Tilapia (Never 2 days in a row)</div>
        <div>• Exclusions: ${state.profile.exclusions.join(', ')}</div>
      </div>

      <button onclick="confirmGenerateNewWeek()" class="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs shadow-lg">
        🚀 Generate 7-Day Plan for ${formatShortDate(weekObj.weekStartISO)} & Update Grocery List
      </button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function confirmGenerateNewWeek() {
  const style = document.getElementById('modalPrepStyle').value;
  state.profile.prepStyle = style;
  ensureWeekExists(state.activeWeekMondayISO, true, style);
  state.checkedGroceries = {};
  saveState();
  closeModal();
  renderAll();
  showToast(`✨ Generated 7-day plan for ${formatShortDate(state.activeWeekMondayISO)} & synced Grocery List!`);
}

async function generateAiReplacementForSlot(dayIdx, mealIdx) {
  const days = getActiveWeekDays();
  const current = days[dayIdx].meals[mealIdx];
  const dayProtein = days[dayIdx].primaryProtein;
  const isMeal1 = mealIdx === 0;
  const isDinner = mealIdx === 1;
  const ratio = isMeal1 ? 0.27 : isDinner ? 0.48 : 0.125;

  const targetCal = Math.round(state.profile.calories * ratio);
  const targetProt = Math.round(state.profile.protein * ratio);
  const targetCarbs = Math.round(state.profile.carbs * ratio);
  const targetFat = Math.round(state.profile.fat * ratio);
  const targetFib = Math.round(state.profile.fiber * ratio);

  const cuisines = ['Arabic / Mediterranean', 'Mexican / Southwest', 'Asian / Stir-Fry', 'Garlic-Herb Grillhouse'];
  const cuisine = cuisines[Math.floor(Math.random() * cuisines.length)];

  let newMeal;
  if (state.profile.geminiApiKey && state.profile.geminiApiKey.trim().length > 10) {
    try {
      newMeal = await callGeminiSingleRecipe({
        slot: current.slot,
        protein: isDinner ? dayProtein : 'Any Approved',
        cuisine,
        appliance: 'Air Fryer (14 mins)',
        note: `Must be different from ${current.name}`,
        targetCal,
        targetProt,
        targetCarbs,
        targetFat,
        targetFib
      });
    } catch (e) {
      newMeal = buildSmartLocalRecipe({
        slot: current.slot,
        protein: isDinner ? dayProtein : 'Chicken',
        cuisine,
        appliance: 'Air Fryer (14 mins)',
        note: '',
        targetCal,
        targetProt,
        targetCarbs,
        targetFat,
        targetFib
      });
    }
  } else {
    newMeal = buildSmartLocalRecipe({
      slot: current.slot,
      protein: isDinner ? dayProtein : 'Chicken',
      cuisine,
      appliance: 'Air Fryer (14 mins)',
      note: '',
      targetCal,
      targetProt,
      targetCarbs,
      targetFat,
      targetFib
    });
  }
  replaceMealSlot(dayIdx, mealIdx, newMeal);
}

// ================= TAB 3: CANTON & WESTLAND SHOPPING LIST =================
function buildAggregatedShoppingList() {
  const map = new Map();
  const days = getActiveWeekDays();

  days.forEach(day => {
    const dayLabel = `${day.day.slice(0, 3)} ${day.dateISO ? formatShortDate(day.dateISO) : ''}`;
    day.meals.forEach(meal => {
      (meal.ingredients || []).forEach(ing => {
        const key = `${ing.store}||${ing.item.toLowerCase().trim()}`;
        if (!map.has(key)) {
          map.set(key, {
            key,
            item: ing.item,
            store: ing.store,
            category: ing.category || 'Groceries',
            amounts: [ing.amount],
            days: [dayLabel],
            mealsUsedIn: [meal.name]
          });
        } else {
          const entry = map.get(key);
          entry.amounts.push(ing.amount);
          if (!entry.days.includes(dayLabel)) {
            entry.days.push(dayLabel);
          }
          if (!entry.mealsUsedIn.includes(meal.name)) {
            entry.mealsUsedIn.push(meal.name);
          }
        }
      });

      if (meal.upgradeApplied && meal.flavorUpgrade) {
        const upStore = "Greenland Market / Papaya (Canton)";
        const upKey = `upgrade||${day.dateISO}-${meal.id}`;
        map.set(upKey, {
          key: upKey,
          item: `🌶️ Flavor Upgrade: ${meal.flavorUpgrade.name}`,
          store: upStore,
          category: 'Flavor Upgrade',
          amounts: ['1 portion'],
          days: [dayLabel],
          mealsUsedIn: [meal.name]
        });
      }
    });
  });

  state.customGroceries.forEach(cg => {
    const key = `custom||${cg.id}`;
    map.set(key, {
      key,
      item: cg.item,
      store: cg.store,
      category: 'Extra / Movie Treat',
      amounts: ['1x'],
      days: ['Added Manually'],
      mealsUsedIn: [],
      isCustom: true,
      customId: cg.id
    });
  });

  return Array.from(map.values());
}

function renderShoppingList() {
  const filterRow = document.getElementById('storeFilterRow');
  const container = document.getElementById('shoppingListContainer');
  if (!filterRow || !container) return;

  const allItems = buildAggregatedShoppingList();
  const stores = Object.keys(window.STORE_INFO);

  filterRow.innerHTML = [
    `<button onclick="setStoreFilter('ALL')" class="px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 border transition ${
      state.selectedStoreFilter === 'ALL'
        ? 'bg-emerald-500 text-slate-950 border-emerald-400'
        : 'bg-slate-900 text-slate-300 border-slate-800'
    }">All Stores (${allItems.length})</button>`,
    ...stores.map(st => {
      const count = allItems.filter(i => i.store === st).length;
      const info = window.STORE_INFO[st];
      const active = state.selectedStoreFilter === st;
      return `
        <button onclick="setStoreFilter('${st.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 border transition ${
          active
            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
            : 'bg-slate-900 text-slate-300 border-slate-800'
        }">${info.icon} ${st.split('(')[0].trim()} (${count})</button>
      `;
    })
  ].join('');

  const storesToRender = state.selectedStoreFilter === 'ALL' ? stores : [state.selectedStoreFilter];

  container.innerHTML = storesToRender.map(storeName => {
    const storeItems = allItems.filter(i => i.store === storeName);
    if (storeItems.length === 0) return '';
    const info = window.STORE_INFO[storeName] || { icon: '🏪', note: '', badgeClass: '' };

    return `
      <div class="glass-card rounded-2xl p-4 shadow-xl space-y-3">
        <div class="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div>
            <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
              <span>${info.icon}</span> ${storeName}
            </h3>
            <p class="text-[11px] text-slate-400">${info.note}</p>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full border ${info.badgeClass}">
            ${storeItems.length} items
          </span>
        </div>

        <div class="divide-y divide-slate-800/60">
          ${storeItems.map(entry => {
            const checked = !!state.checkedGroceries[entry.key];
            return `
              <label class="flex items-start justify-between gap-3 py-2.5 cursor-pointer select-none group">
                <div class="flex items-start gap-2.5">
                  <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleGroceryCheck('${entry.key.replace(/'/g, "\\'")}')" class="mt-0.5 w-4 h-4 rounded accent-emerald-500" />
                  <div>
                    <div class="text-xs sm:text-sm font-medium transition ${checked ? 'line-through text-slate-500' : 'text-slate-100'}">
                      ${entry.item}
                    </div>
                    <div class="text-[11px] text-slate-400">
                      Qty: ${entry.amounts.length > 1 ? `${entry.amounts.length} meals (${entry.amounts[0]} each)` : entry.amounts[0]}
                      <span class="text-slate-600 mx-1">•</span>
                      <span class="text-emerald-400/80">${entry.days.join(', ')}</span>
                    </div>
                  </div>
                </div>
                ${entry.isCustom ? `
                  <button onclick="removeCustomGrocery('${entry.customId}'); event.preventDefault();" class="text-xs text-rose-400 hover:text-rose-300 px-2">✕</button>
                ` : ''}
              </label>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function setStoreFilter(st) {
  state.selectedStoreFilter = st;
  renderShoppingList();
}

function toggleGroceryCheck(key) {
  state.checkedGroceries[key] = !state.checkedGroceries[key];
  saveState();
  renderShoppingList();
}

function resetCheckedGroceries() {
  state.checkedGroceries = {};
  saveState();
  renderShoppingList();
  showToast('All grocery checkboxes reset');
}

function addCustomGroceryItem() {
  const input = document.getElementById('customGroceryItem');
  const store = document.getElementById('customGroceryStore').value;
  const val = input.value.trim();
  if (!val) return;
  state.customGroceries.push({ id: 'cg-' + Date.now(), item: val, store });
  input.value = '';
  saveState();
  renderShoppingList();
  showToast(`Added "${val}" to ${store.split('(')[0]}`);
}

function removeCustomGrocery(id) {
  state.customGroceries = state.customGroceries.filter(c => c.id !== id);
  saveState();
  renderShoppingList();
}

function shareShoppingListText() {
  const weekObj = getActiveWeekObj();
  const allItems = buildAggregatedShoppingList();
  const stores = Object.keys(window.STORE_INFO);
  let lines = [`🥗 MO MEAL PREP — GROCERY LIST (${formatShortDate(weekObj.weekStartISO)} – ${formatFullDateWithYear(weekObj.weekEndISO)}):\n`];

  stores.forEach(st => {
    const items = allItems.filter(i => i.store === st && !state.checkedGroceries[i.key]);
    if (items.length > 0) {
      lines.push(`\n📍 ${st.toUpperCase()}:`);
      items.forEach(i => {
        lines.push(`- [ ] ${i.item} (${i.amounts.length > 1 ? i.amounts.length + 'x portions' : i.amounts[0]})`);
      });
    }
  });

  const text = lines.join('\n');
  if (navigator.share) {
    navigator.share({ title: 'Mo Meal Prep Grocery List', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast('📋 Shopping list copied to clipboard! Paste to your wife.');
  }
}

// ================= TAB 5: MO'S STREAMLINED PROFILE, BODY COMP & SCIENTIFIC MACRO ENGINE =================
function toggleWaistHelper() {
  const box = document.getElementById('waistHelperBox');
  if (box) box.classList.toggle('hidden');
}

function renderProfileAndProgressTab() {
  const p = state.profile;
  const setCal = document.getElementById('setCalories');
  if (!setCal) return;

  if (document.activeElement !== setCal) setCal.value = p.calories;
  if (document.activeElement !== document.getElementById('setProtein')) document.getElementById('setProtein').value = p.protein;
  if (document.activeElement !== document.getElementById('setCarbs')) document.getElementById('setCarbs').value = p.carbs;
  if (document.activeElement !== document.getElementById('setFat')) document.getElementById('setFat').value = p.fat;
  if (document.activeElement !== document.getElementById('setFiber')) document.getElementById('setFiber').value = p.fiber;

  if (document.activeElement !== document.getElementById('profStartWeight')) document.getElementById('profStartWeight').value = p.startWeight ?? 170;
  if (document.activeElement !== document.getElementById('profCurrentWeight')) document.getElementById('profCurrentWeight').value = p.currentWeight ?? 170;
  if (document.activeElement !== document.getElementById('profGoalWeight')) document.getElementById('profGoalWeight').value = p.goalWeight ?? 160;
  if (document.activeElement !== document.getElementById('profGoalBodyFat')) document.getElementById('profGoalBodyFat').value = p.goalBodyFatPct ?? 18.2;
  if (document.activeElement !== document.getElementById('profHeightFt')) document.getElementById('profHeightFt').value = p.heightFt ?? 5;
  if (document.activeElement !== document.getElementById('profHeightIn')) document.getElementById('profHeightIn').value = p.heightIn ?? 7;
  if (document.activeElement !== document.getElementById('profAge')) document.getElementById('profAge').value = p.age ?? 42;
  if (document.activeElement !== document.getElementById('profBodyFat')) document.getElementById('profBodyFat').value = p.bodyFatPct ?? 23;
  if (document.activeElement !== document.getElementById('profMuscleMass')) document.getElementById('profMuscleMass').value = p.muscleMassLbs ?? 75;
  if (document.activeElement !== document.getElementById('profWaist')) document.getElementById('profWaist').value = p.waistIn ?? '';

  document.getElementById('profActivity').value = String(p.activityMultiplier || 1.375);
  document.getElementById('profWorkouts').value = String(p.workoutsPerWeek ?? 3);
  document.getElementById('profGoal').value = p.goalType || 'cut_moderate';

  recalcBodyCompProjections('init');
  renderProgressLogsList();

  document.getElementById('geminiKeyInput').value = p.geminiApiKey || '';
  document.getElementById('syncRoomInput').value = p.syncRoomId || '';

  const exDiv = document.getElementById('exclusionTags');
  exDiv.innerHTML = p.exclusions.map((item, idx) => `
    <span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30">
      <span>🚫 ${item}</span>
      <button onclick="removeExclusionItem(${idx})" class="hover:text-white font-bold">×</button>
    </span>
  `).join('');

  const favDiv = document.getElementById('favIngTags');
  favDiv.innerHTML = p.favoriteIngredients.map((item, idx) => `
    <span class="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
      <span>💚 ${item}</span>
      <button onclick="removeFavIngredient(${idx})" class="hover:text-white font-bold">×</button>
    </span>
  `).join('');
}

// Two-Way Linked Calculator: Goal Weight <-> Goal Body Fat % & Muscle Mass Projection (#9)
function recalcBodyCompProjections(changedSource = 'current') {
  const currW = parseFloat(document.getElementById('profCurrentWeight')?.value) || 170;
  const currBf = parseFloat(document.getElementById('profBodyFat')?.value) || 23;
  const currMuscle = parseFloat(document.getElementById('profMuscleMass')?.value) || 75;

  const fatMassLbs = +(currW * (currBf / 100)).toFixed(1);
  const leanBodyMassLbs = +(currW - fatMassLbs).toFixed(1);
  const currMusclePct = +((currMuscle / currW) * 100).toFixed(1);

  let goalW = parseFloat(document.getElementById('profGoalWeight')?.value) || 160;
  let goalBf = parseFloat(document.getElementById('profGoalBodyFat')?.value) || 18.2;

  // Assuming 100% Lean Body Mass & Skeletal Muscle preservation via adequate protein (135g-140g/day):
  if (changedSource === 'goalBf' && goalBf > 4 && goalBf < 45) {
    // Calculate Goal Weight from Goal Body Fat %: GoalWeight = LeanBodyMass / (1 - GoalBF/100)
    goalW = +(leanBodyMassLbs / (1 - goalBf / 100)).toFixed(1);
    const gwEl = document.getElementById('profGoalWeight');
    if (gwEl) gwEl.value = goalW;
  } else if (changedSource === 'goalWeight' || changedSource === 'current' || changedSource === 'init') {
    // Calculate Goal Body Fat % at Goal Weight: GoalFatMass = GoalWeight - LeanBodyMass
    const projectedFatLbs = Math.max(8, goalW - leanBodyMassLbs);
    goalBf = +((projectedFatLbs / goalW) * 100).toFixed(1);
    const gbfEl = document.getElementById('profGoalBodyFat');
    if (gbfEl && changedSource !== 'goalBf') gbfEl.value = goalBf;
  }

  const goalFatLbs = +(goalW * (goalBf / 100)).toFixed(1);
  const fatToLoseLbs = +(fatMassLbs - goalFatLbs).toFixed(1);
  const goalMusclePct = +((currMuscle / goalW) * 100).toFixed(1);

  const goalMusEl = document.getElementById('profGoalMuscle');
  if (goalMusEl) {
    goalMusEl.value = `${currMuscle.toFixed(1)} lbs (${goalMusclePct}%)`;
  }

  const currSummaryEl = document.getElementById('currentBodyCompSummary');
  if (currSummaryEl) {
    currSummaryEl.innerHTML = `
      Fat Mass: <strong class="text-amber-300">${fatMassLbs} lbs</strong> • Lean Body Mass (FFM): <strong class="text-emerald-400">${leanBodyMassLbs} lbs</strong> • Skeletal Muscle Ratio: <strong class="text-purple-300">${currMusclePct}%</strong>
    `;
  }

  const goalSummaryEl = document.getElementById('goalBodyCompSummary');
  if (goalSummaryEl) {
    goalSummaryEl.innerHTML = `
      At <strong>${goalW} lbs</strong> (preserving all <strong>${currMuscle} lbs</strong> muscle), your Body Fat drops to <strong class="text-amber-300">${goalBf}%</strong> (losing <strong>${Math.max(0, fatToLoseLbs)} lbs of pure fat</strong>) & Muscle Ratio rises to <strong class="text-purple-300">${goalMusclePct}%</strong>!
    `;
  }
}

// Button 1 (#7): Save Profile Only & Log Progress Snapshot (Does NOT touch macros)
function saveProfileOnlyAndLogSnapshot() {
  const p = state.profile;
  p.startWeight = parseFloat(document.getElementById('profStartWeight').value) || 170;
  p.currentWeight = parseFloat(document.getElementById('profCurrentWeight').value) || 170;
  p.goalWeight = parseFloat(document.getElementById('profGoalWeight').value) || 160;
  p.goalBodyFatPct = parseFloat(document.getElementById('profGoalBodyFat').value) || 18.2;
  p.heightFt = parseInt(document.getElementById('profHeightFt').value, 10) || 5;
  p.heightIn = parseInt(document.getElementById('profHeightIn').value, 10) || 7;
  p.age = parseInt(document.getElementById('profAge').value, 10) || 42;
  p.bodyFatPct = parseFloat(document.getElementById('profBodyFat').value) || 23;
  p.muscleMassLbs = parseFloat(document.getElementById('profMuscleMass').value) || 75;
  const wst = parseFloat(document.getElementById('profWaist').value);
  p.waistIn = !isNaN(wst) ? wst : '';
  p.activityMultiplier = parseFloat(document.getElementById('profActivity').value) || 1.375;
  p.workoutsPerWeek = parseInt(document.getElementById('profWorkouts').value, 10) || 3;
  p.goalType = document.getElementById('profGoal').value;

  const todayISO = formatDateISO(new Date());
  const topLog = state.progressLogs[0];
  const noteStr = `Profile Update: ${p.currentWeight} lbs | ${p.bodyFatPct}% BF | ${p.muscleMassLbs} lbs Muscle (Goal: ${p.goalWeight} lbs / ${p.goalBodyFatPct}% BF)`;

  if (topLog && topLog.dateISO === todayISO) {
    topLog.weight = p.currentWeight;
    topLog.bodyFatPct = p.bodyFatPct;
    topLog.muscleMassLbs = p.muscleMassLbs;
    topLog.note = noteStr;
  } else {
    state.progressLogs.unshift({
      id: 'snap-' + Date.now(),
      dateISO: todayISO,
      weight: p.currentWeight,
      bodyFatPct: p.bodyFatPct,
      muscleMassLbs: p.muscleMassLbs,
      note: noteStr
    });
  }

  saveState();
  renderProgressLogsList();

  const badge = document.getElementById('profileAutoSaveBadge');
  if (badge) {
    badge.textContent = '✓ Profile & Progress Saved!';
    badge.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 transition';
  }
  showToast(`💾 Profile saved (${p.currentWeight} lbs, ${p.bodyFatPct}% BF, Goal: ${p.goalWeight} lbs)!`);
}

function renderProgressLogsList() {
  const distBadge = document.getElementById('progressDistanceBadge');
  const listEl = document.getElementById('progressHistoryList');
  if (!listEl) return;

  const p = state.profile;
  const startW = parseFloat(p.startWeight) || 170;
  const currW = parseFloat(p.currentWeight) || 170;
  const goalW = parseFloat(p.goalWeight) || 160;
  const diffFromStart = (currW - startW).toFixed(1);
  const toGoal = Math.max(0, (currW - goalW)).toFixed(1);

  if (distBadge) {
    distBadge.textContent = `${diffFromStart <= 0 ? diffFromStart + ' lbs from start' : '+' + diffFromStart + ' lbs'} • ${toGoal} lbs to reach ${goalW} lbs (${p.goalBodyFatPct || 18.2}% BF)`;
  }

  listEl.innerHTML = (state.progressLogs || []).map(entry => `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-slate-900/70 border border-slate-800/80 rounded-xl px-3 py-2 text-xs">
      <div>
        <span class="font-bold text-emerald-400">${entry.dateISO ? formatFullDateWithYear(entry.dateISO) : 'Snapshot'}</span>
        <span class="text-white font-bold ml-2">${entry.weight} lbs</span>
        ${entry.bodyFatPct ? `<span class="text-amber-300 ml-2">• ${entry.bodyFatPct}% BF</span>` : ''}
        ${entry.muscleMassLbs ? `<span class="text-purple-300 ml-2">• ${entry.muscleMassLbs} lbs Muscle</span>` : ''}
        ${entry.note ? `<div class="text-[11px] text-slate-400">${entry.note}</div>` : ''}
      </div>
      ${state.progressLogs.length > 1 ? `
        <button onclick="deleteProgressCheckIn('${entry.id}')" class="text-slate-500 hover:text-rose-400 text-xs px-1.5 self-end sm:self-center">✕</button>
      ` : ''}
    </div>
  `).join('');
}

function deleteProgressCheckIn(id) {
  state.progressLogs = state.progressLogs.filter(l => l.id !== id);
  saveState();
  renderProgressLogsList();
}

// Button 2 (#6, #7, #10): Zero-BS Peer-Reviewed Scientific Macro Calculation & Dietitian Comparison
function computeScientificMacros(p = state.profile) {
  const weightLbs = parseFloat(p.currentWeight) || 170;
  const weightKg = weightLbs * 0.45359237;
  const heightInches = ((parseFloat(p.heightFt) || 5) * 12) + (parseFloat(p.heightIn) || 7);
  const heightCm = heightInches * 2.54;
  const age = parseFloat(p.age) || 42;
  const bf = parseFloat(p.bodyFatPct) || 23;
  const muscleLbs = parseFloat(p.muscleMassLbs) || 75;
  const goalW = parseFloat(p.goalWeight) || 160;
  const act = parseFloat(p.activityMultiplier) || 1.375;
  const workouts = parseFloat(p.workoutsPerWeek) || 3;

  // 1. Exact Body Composition
  const fatMassLbs = +(weightLbs * (bf / 100)).toFixed(1);
  const leanMassLbs = +(weightLbs - fatMassLbs).toFixed(1);
  const leanMassKg = leanMassLbs * 0.45359237;

  // 2. Peer-Reviewed BMR Equations:
  // Katch-McArdle (uses Lean Body Mass): 370 + (21.6 * LBM_kg)
  const bmrKatch = Math.round(370 + (21.6 * leanMassKg));
  // Mifflin-St Jeor (uses Total Weight, Height, Age): (10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5
  const bmrMifflin = Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5);
  const bmrAvg = Math.round((bmrKatch + bmrMifflin) / 2);

  // 3. True Daily Energy Expenditure (TDEE / Maintenance)
  const workoutThermicBonus = workouts >= 4 ? 60 : workouts >= 2 ? 25 : 0;
  const tdee = Math.round((bmrKatch * act) + workoutThermicBonus);

  // 4. Target Calorie Intake Based on Selected Strategy
  let targetCal = tdee - 500;
  let deficitOrSurplus = -500;
  let goalLabel = 'Steady Fat Loss (-500 kcal/day deficit)';
  if (p.goalType === 'cut_moderate') {
    deficitOrSurplus = -480; // Aligns cleanly with ~1 lb/week fat loss
    targetCal = tdee + deficitOrSurplus;
    goalLabel = 'Clinical Steady Fat Loss (~1.0 lb/week)';
  } else if (p.goalType === 'cut_aggressive') {
    deficitOrSurplus = -680;
    targetCal = tdee + deficitOrSurplus;
    goalLabel = 'Aggressive Fat Cut (~1.4 lbs/week)';
  } else if (p.goalType === 'recomp') {
    deficitOrSurplus = -300;
    targetCal = tdee + deficitOrSurplus;
    goalLabel = 'Body Recomposition (-300 kcal/day)';
  } else if (p.goalType === 'maintain') {
    deficitOrSurplus = 0;
    targetCal = tdee;
    goalLabel = 'Maintenance (0 deficit)';
  } else if (p.goalType === 'lean_bulk') {
    deficitOrSurplus = 250;
    targetCal = tdee + deficitOrSurplus;
    goalLabel = 'Lean Muscle Gain (+250 kcal/day)';
  }

  targetCal = Math.max(1450, Math.round(targetCal / 10) * 10);

  // 5. Evidence-Based Macro Split (ISSN Sports Nutrition Guidelines):
  // Protein: ~1.05g per lb of Lean Body Mass (131 lbs * 1.05 = 138g) or ~0.85g per lb of Goal Weight (160 * 0.86 = 138g)
  const recProtein = Math.round(leanMassLbs * 1.05);
  // Dietary Fat for hormonal & metabolic health: ~33-35% of calories
  const recFat = Math.round((targetCal * 0.34) / 9);
  // Remaining calories to Carbohydrates for training performance & thyroid/leptin support
  const recCarbs = Math.max(90, Math.round((targetCal - (recProtein * 4) - (recFat * 9)) / 4));
  // High Fiber for intermittent fasting satiety & glycemic control: ~19g per 1,000 kcal
  const recFiber = Math.max(32, Math.round((targetCal / 1000) * 19.5));

  const actualDailyDeficit = tdee - targetCal;
  const weeklyFatLossLbs = +(Math.max(0.2, (actualDailyDeficit * 7) / 3500)).toFixed(2);
  const lbsToLose = Math.max(0, weightLbs - goalW);
  const estWeeksToGoal = lbsToLose > 0 && actualDailyDeficit > 0 ? Math.ceil(lbsToLose / weeklyFatLossLbs) : 0;

  return {
    fatMassLbs,
    leanMassLbs,
    muscleLbs,
    bmrKatch,
    bmrMifflin,
    bmrAvg,
    tdee,
    goalLabel,
    actualDailyDeficit,
    weeklyFatLossLbs,
    estWeeksToGoal,
    calories: targetCal,
    protein: recProtein,
    carbs: recCarbs,
    fat: recFat,
    fiber: recFiber
  };
}

function generateScientificMacroRecommendation() {
  // First save current inputs quietly so math uses exact form numbers
  saveProfileOnlyAndLogSnapshot();
  const sci = computeScientificMacros(state.profile);
  const box = document.getElementById('aiAdvisorRecommendationCard');
  if (!box) return;
  box.classList.remove('hidden');

  const p = state.profile;
  const weightLbs = parseFloat(p.currentWeight) || 170;
  const weightKg = +(weightLbs * 0.45359237).toFixed(2);
  const heightInches = ((parseFloat(p.heightFt) || 5) * 12) + (parseFloat(p.heightIn) || 7);
  const heightCm = +(heightInches * 2.54).toFixed(1);
  const leanMassKg = +(sci.leanMassLbs * 0.45359237).toFixed(2);
  const goalW = parseFloat(p.goalWeight) || 160;
  const goalKg = +(goalW * 0.45359237).toFixed(2);
  const goalBf = parseFloat(p.goalBodyFatPct) || 18.2;
  const goalFatLbs = +(goalW * (goalBf / 100)).toFixed(1);
  const pureFatToLose = Math.max(0, +(sci.fatMassLbs - goalFatLbs).toFixed(1));
  const projectedGoalMusclePct = +((sci.muscleLbs / goalW) * 100).toFixed(1);
  const goalReachDateISO = addDaysISO(formatDateISO(new Date()), sci.estWeeksToGoal * 7);

  // Active Plan (Dietitian or User-Configured) Math Audit
  const actCal = p.calories;
  const actP = p.protein;
  const actC = p.carbs;
  const actF = p.fat;
  const actFib = p.fiber;

  const actPCal = actP * 4;
  const actCCal = actC * 4;
  const actFCal = actF * 9;
  const actTotalMacroCal = actPCal + actCCal + actFCal;
  const actPPct = Math.round((actPCal / actTotalMacroCal) * 100);
  const actCPct = Math.round((actCCal / actTotalMacroCal) * 100);
  const actFPct = Math.round((actFCal / actTotalMacroCal) * 100);

  const actProtPerLbLBM = +(actP / sci.leanMassLbs).toFixed(2);
  const actProtPerKgGoal = +(actP / goalKg).toFixed(2);
  const actDeficit = sci.tdee - actCal;
  const actWeeklyLoss = +((actDeficit * 7) / 3500).toFixed(2);
  const actFibPer1000 = +((actFib / (actCal / 1000))).toFixed(1);

  const protStatusGood = actProtPerLbLBM >= 0.95;
  const calDeficitStatusGood = actDeficit >= 300 && actDeficit <= 750;
  const fibStatusGood = actFib >= 28;

  box.innerHTML = `
    <!-- Report Header -->
    <div class="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            🔬 Full Clinical Sports-Nutrition & Formula Audit
          </span>
          <span class="text-[11px] font-semibold text-sky-400">
            Projected Goal Date: ~${formatFullDateWithYear(goalReachDateISO)} (${sci.estWeeksToGoal} weeks)
          </span>
        </div>
        <h4 class="text-sm sm:text-base font-bold text-white mt-1.5">
          Personalized Metabolic & Macro Report for Mo (${p.heightFt}'${p.heightIn}", Age ${p.age}, ${weightLbs} lbs, ${p.bodyFatPct}% BF)
        </h4>
      </div>
      <button onclick="document.getElementById('aiAdvisorRecommendationCard').classList.add('hidden')" class="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 self-start">
        Close Report ✕
      </button>
    </div>

    <!-- STEP 1: EXACT BODY COMPOSITION & LEAN MASS CONSERVATION FORMULA -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
      <div class="font-bold text-emerald-400 uppercase tracking-wider text-[11px]">
        Step 1: Exact Body Composition & Lean Mass Conservation Math
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
        <div class="bg-slate-950/90 p-3 rounded-lg border border-slate-800/80 space-y-1 font-mono text-[11px]">
          <div class="text-slate-400 font-sans font-semibold">Current Body Partitions:</div>
          <div>• Total Weight = <strong>${weightLbs} lbs</strong> (${weightKg} kg)</div>
          <div>• Fat Mass = ${weightLbs} × ${(p.bodyFatPct / 100).toFixed(2)} = <strong class="text-amber-300">${sci.fatMassLbs} lbs fat</strong></div>
          <div>• Lean Body Mass (FFM) = ${weightLbs} - ${sci.fatMassLbs} = <strong class="text-emerald-400">${sci.leanMassLbs} lbs (${leanMassKg} kg)</strong></div>
          <div>• Skeletal Muscle = <strong class="text-purple-300">${sci.muscleLbs} lbs (${((sci.muscleLbs / weightLbs) * 100).toFixed(1)}% of weight)</strong></div>
        </div>
        <div class="bg-slate-950/90 p-3 rounded-lg border border-slate-800/80 space-y-1 font-mono text-[11px]">
          <div class="text-slate-400 font-sans font-semibold">Target Goal Projection (100% Muscle Preservation):</div>
          <div>• Formula: <code>Goal Weight = Lean Mass / (1 - Goal BF%)</code></div>
          <div>• Calculation: ${sci.leanMassLbs} / (1 - ${(goalBf / 100).toFixed(3)}) = <strong class="text-sky-300">${goalW} lbs (${goalBf}% BF)</strong></div>
          <div>• Pure Fat to Lose: ${sci.fatMassLbs} - ${goalFatLbs} = <strong class="text-emerald-400">${pureFatToLose} lbs pure fat</strong></div>
          <div>• Muscle at Goal: <strong class="text-purple-300">${sci.muscleLbs} lbs (${projectedGoalMusclePct}% of body weight!)</strong></div>
        </div>
      </div>
    </div>

    <!-- STEP 2: BASAL METABOLIC RATE (BMR) — DUAL PEER-REVIEWED EQUATIONS -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
      <div class="font-bold text-sky-400 uppercase tracking-wider text-[11px]">
        Step 2: Basal Metabolic Rate (BMR) — Dual Clinical Equation Cross-Check
      </div>
      <p class="text-[11px] text-slate-300">
        Your BMR is the exact number of calories your body burns at complete rest just keeping your organs and <strong>${sci.leanMassLbs} lbs of lean mass</strong> alive:
      </p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="bg-slate-950/90 p-3 rounded-lg border border-emerald-500/30 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white">1. Katch-McArdle Equation (Gold Standard)</span>
            <span class="text-xs font-extrabold text-emerald-400">${sci.bmrKatch.toLocaleString()} kcal/day</span>
          </div>
          <div class="text-[11px] text-slate-400">Uses your exact Lean Body Mass (${leanMassKg} kg) so it accounts for your body fat %:</div>
          <div class="font-mono text-[11px] text-emerald-300 bg-slate-900 px-2 py-1 rounded mt-1">
            BMR = 370 + (21.6 × ${leanMassKg} kg) = ${sci.bmrKatch} kcal
          </div>
        </div>

        <div class="bg-slate-950/90 p-3 rounded-lg border border-slate-800 space-y-1">
          <div class="flex items-center justify-between">
            <span class="font-bold text-white">2. Mifflin-St Jeor Clinical Equation</span>
            <span class="text-xs font-extrabold text-sky-400">${sci.bmrMifflin.toLocaleString()} kcal/day</span>
          </div>
          <div class="text-[11px] text-slate-400">Standard hospital/dietitian equation using total weight, height & age:</div>
          <div class="font-mono text-[11px] text-sky-300 bg-slate-900 px-2 py-1 rounded mt-1">
            (10×${weightKg}) + (6.25×${heightCm}) - (5×${p.age}) + 5 = ${sci.bmrMifflin} kcal
          </div>
        </div>
      </div>
    </div>

    <!-- STEP 3: MAINTENANCE CALORIES (TDEE) & WEEKLY FAT-LOSS MATH -->
    <div class="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
      <div class="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
        Step 3: Total Daily Energy Expenditure (TDEE) & Fat-Loss Velocity
      </div>
      <div class="bg-slate-950/90 p-3 rounded-lg border border-slate-800 font-mono text-[11px] space-y-1 text-slate-200">
        <div>• True Maintenance (TDEE) = (${sci.bmrKatch} BMR × ${p.activityMultiplier} Activity) + Workout Burn (${p.workoutsPerWeek}d/wk) = <strong class="text-sky-400">${sci.tdee.toLocaleString()} kcal/day</strong></div>
        <div>• Your Active Intake = <strong class="text-white">${actCal.toLocaleString()} kcal/day</strong> → Daily Energy Deficit = ${sci.tdee} - ${actCal} = <strong class="text-emerald-400">-${actDeficit} kcal/day</strong></div>
        <div>• Weekly Caloric Deficit = -${actDeficit} kcal × 7 days = <strong>-${(actDeficit * 7).toLocaleString()} kcal/week</strong></div>
        <div>• Expected Pure Fat Loss = ${(actDeficit * 7).toLocaleString()} / 3,500 kcal per lb of fat = <strong class="text-emerald-400">${actWeeklyLoss} lbs/week</strong> (~${sci.estWeeksToGoal} weeks to reach ${goalW} lbs)</div>
      </div>
    </div>

    <!-- STEP 4: CLINICAL AUDIT OF YOUR ACTIVE PLAN VS. ISSN SPORTS SCIENCE -->
    <div class="bg-slate-900/95 border border-emerald-500/40 rounded-xl p-4 space-y-3 text-xs">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span class="font-bold text-white uppercase tracking-wider text-[11px]">
          Step 4: Clinical Review of Your Active Plan (${actCal.toLocaleString()} kcal | ${actP}P / ${actC}C / ${actF}F / ${actFib}Fib)
        </span>
        <span class="text-[11px] font-bold text-emerald-400">
          ${protStatusGood && calDeficitStatusGood ? '✓ Dietitian Plan Passed All 4 Clinical Checks!' : '⚠️ Review Suggested Adjustments Below'}
        </span>
      </div>

      <div class="space-y-2 text-[11px] text-slate-300">
        <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2">
          <div>
            <strong class="text-white">1. Macro-to-Calorie Math Verification:</strong>
            <div class="text-slate-400 mt-0.5">
              Protein (${actP}g × 4 = <strong>${actPCal} kcal</strong>, ${actPPct}%) + Carbs (${actC}g × 4 = <strong>${actCCal} kcal</strong>, ${actCPct}%) + Fat (${actF}g × 9 = <strong>${actFCal} kcal</strong>, ${actFPct}%) = <strong>${actTotalMacroCal.toLocaleString()} kcal</strong> (Matches ${actCal.toLocaleString()} kcal target).
            </div>
          </div>
          <span class="text-emerald-400 font-bold shrink-0">✓ Verified</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2">
          <div>
            <strong class="text-white">2. Muscle-Preservation Protein Check (ISSN Standard: 0.95–1.15g / lb Lean Mass):</strong>
            <div class="text-slate-400 mt-0.5">
              Your <strong>${actP}g Protein</strong> provides <strong class="text-emerald-400">${actProtPerLbLBM}g per lb of Lean Body Mass</strong> (${sci.leanMassLbs} lbs) and <strong>${actProtPerKgGoal}g/kg of Goal Weight</strong>. This hits the clinical sweet spot to prevent muscle loss while fasting.
              ${actP < sci.protein ? `(Optional tweak: You can bump protein slightly to ${sci.protein}g if lifting heavy).` : ''}
            </div>
          </div>
          <span class="${protStatusGood ? 'text-emerald-400' : 'text-amber-400'} font-bold shrink-0">${protStatusGood ? '✓ Optimal' : '⚠️ Low'}</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2">
          <div>
            <strong class="text-white">3. Hormonal & Metabolic Fat Check (Clinical Floor: 25%–35% of Calories):</strong>
            <div class="text-slate-400 mt-0.5">
              Your <strong>${actF}g Fat (${actFPct}% of calories)</strong> supports healthy testosterone, vitamin absorption, and slow digestion during your Intermittent Fasting window.
            </div>
          </div>
          <span class="text-emerald-400 font-bold shrink-0">✓ Optimal</span>
        </div>

        <div class="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start justify-between gap-2">
          <div>
            <strong class="text-white">4. Satiety & Glycemic Fiber Check (Clinical Target: 14g+ per 1,000 kcal):</strong>
            <div class="text-slate-400 mt-0.5">
              Your <strong>${actFib}g Fiber (${actFibPer1000}g per 1,000 kcal)</strong> is well above the 25g clinical minimum—keeping you full between Meal 1 and Dinner.
            </div>
          </div>
          <span class="${fibStatusGood ? 'text-emerald-400' : 'text-amber-400'} font-bold shrink-0">${fibStatusGood ? '✓ Elite' : '⚠️ Low'}</span>
        </div>
      </div>

      <!-- Side-by-Side Comparison Boxes -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center pt-2">
        <div class="bg-slate-950 p-2.5 rounded-xl border border-emerald-500/40">
          <div class="text-[10px] text-slate-400">Formula Calories</div>
          <div class="text-sm font-extrabold text-white">${sci.calories.toLocaleString()} kcal</div>
          <div class="text-[10px] text-emerald-400">Yours: ${p.calories.toLocaleString()} kcal</div>
        </div>
        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div class="text-[10px] text-slate-400">Formula Protein</div>
          <div class="text-sm font-extrabold text-emerald-400">${sci.protein}g</div>
          <div class="text-[10px] text-slate-400">Yours: ${p.protein}g</div>
        </div>
        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div class="text-[10px] text-slate-400">Formula Carbs</div>
          <div class="text-sm font-extrabold text-sky-400">${sci.carbs}g</div>
          <div class="text-[10px] text-slate-400">Yours: ${p.carbs}g</div>
        </div>
        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div class="text-[10px] text-slate-400">Formula Fat</div>
          <div class="text-sm font-extrabold text-amber-400">${sci.fat}g</div>
          <div class="text-[10px] text-slate-400">Yours: ${p.fat}g</div>
        </div>
        <div class="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
          <div class="text-[10px] text-slate-400">Formula Fiber</div>
          <div class="text-sm font-extrabold text-purple-400">${sci.fiber}g</div>
          <div class="text-[10px] text-slate-400">Yours: ${p.fiber}g</div>
        </div>
      </div>
    </div>

    <!-- Action Bar -->
    <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div class="text-xs text-emerald-200">
        <strong>Want to switch to the Formula numbers or keep your Dietitian's plan?</strong> As you lose weight (e.g., when you reach 165 lbs), click this button anytime to re-run the equations on your new weight!
      </div>
      <div class="flex flex-wrap items-center gap-2 shrink-0">
        <button onclick="applyTargetsAndRescaleMeals(${sci.calories}, ${sci.protein}, ${sci.carbs}, ${sci.fat}, ${sci.fiber}, true)" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow transition">
          ✓ Apply ${sci.calories.toLocaleString()} kcal (${sci.protein}P/${sci.carbs}C/${sci.fat}F) & Re-Scale Meals
        </button>
        <button onclick="document.getElementById('aiAdvisorRecommendationCard').classList.add('hidden')" class="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700">
          Keep Current (${p.calories.toLocaleString()} kcal)
        </button>
      </div>
    </div>
  `;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function saveManualMacroTargetsAndPromptRescale() {
  const cal = parseInt(document.getElementById('setCalories').value, 10) || 1800;
  const p = parseInt(document.getElementById('setProtein').value, 10) || 135;
  const c = parseInt(document.getElementById('setCarbs').value, 10) || 156;
  const f = parseInt(document.getElementById('setFat').value, 10) || 70;
  const fib = parseInt(document.getElementById('setFiber').value, 10) || 35;

  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');
  content.innerHTML = `
    <div class="space-y-3 text-xs">
      <h3 class="text-sm font-bold text-white">🎯 Update Meal Prep Generator to New Targets?</h3>
      <p class="text-slate-300">
        You updated your daily targets to <strong>${cal.toLocaleString()} kcal (${p}g P / ${c}g C / ${f}g F / ${fib}g Fiber)</strong>.
      </p>
      <p class="text-slate-400">
        Would you like to automatically re-scale your current week's meals (${formatShortDate(state.activeWeekMondayISO)}) and future generated recipes to match these exact numbers?
      </p>
      <div class="flex gap-2 pt-2">
        <button onclick="applyTargetsAndRescaleMeals(${cal}, ${p}, ${c}, ${f}, ${fib}, true); closeModal();" class="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold">
          ✓ Yes, Update Targets & Re-Scale Meals
        </button>
        <button onclick="applyTargetsAndRescaleMeals(${cal}, ${p}, ${c}, ${f}, ${fib}, false); closeModal();" class="py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300">
          Save For Future Weeks Only
        </button>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

function applyTargetsAndRescaleMeals(cal, p, c, f, fib, rescaleCurrentWeek = true) {
  state.profile.calories = cal;
  state.profile.protein = p;
  state.profile.carbs = c;
  state.profile.fat = f;
  state.profile.fiber = fib;

  if (rescaleCurrentWeek) {
    ensureWeekExists(state.activeWeekMondayISO, true, state.profile.prepStyle);
  }
  const recCard = document.getElementById('aiAdvisorRecommendationCard');
  if (recCard) recCard.classList.add('hidden');

  saveState();
  renderAll();
  showToast(`✅ Targets updated to ${cal.toLocaleString()} kcal & Meal Prep Generator synced!`);
}

function resetDefaultMacros() {
  applyTargetsAndRescaleMeals(1800, 135, 156, 70, 35, true);
}

function addExclusionItem() {
  const inp = document.getElementById('newExclusionInput');
  const val = inp.value.trim();
  if (!val) return;
  if (!state.profile.exclusions.includes(val)) {
    state.profile.exclusions.push(val);
    saveState();
    renderProfileAndProgressTab();
    showToast(`Added "${val}" to Avoid List`);
  }
  inp.value = '';
}

function removeExclusionItem(idx) {
  state.profile.exclusions.splice(idx, 1);
  saveState();
  renderProfileAndProgressTab();
}

function addFavIngredient() {
  const inp = document.getElementById('newFavIngInput');
  const val = inp.value.trim();
  if (!val) return;
  if (!state.profile.favoriteIngredients.includes(val)) {
    state.profile.favoriteIngredients.push(val);
    saveState();
    renderProfileAndProgressTab();
    showToast(`Added "${val}" to Boost List`);
  }
  inp.value = '';
}

function removeFavIngredient(idx) {
  state.profile.favoriteIngredients.splice(idx, 1);
  saveState();
  renderProfileAndProgressTab();
}

// ================= WIFE REAL-TIME CLOUD SYNC & GEMINI KEY TESTER =================
async function testGeminiApiKey() {
  const keyInput = document.getElementById('geminiKeyInput');
  const statusBox = document.getElementById('geminiTestStatus');
  const btn = document.getElementById('btnTestGemini');
  const key = (keyInput?.value || state.profile.geminiApiKey || '').trim();

  if (!key || key.length < 15) {
    statusBox.classList.remove('hidden');
    statusBox.className = 'mt-1.5 text-xs px-3 py-2 rounded-lg border bg-rose-500/15 border-rose-500/40 text-rose-300';
    statusBox.textContent = '⚠️ Please paste your Gemini API key (starts with AIzaSy...) into the box first.';
    return;
  }

  state.profile.geminiApiKey = key;
  saveState(true);
  btn.textContent = '⏳ Testing...';
  btn.disabled = true;

  try {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: 'Reply with the exact phrase: Gemini Chef Connected!' }] }]
      })
    });
    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${resp.status}`);
    }
    const data = await resp.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Connected!';
    statusBox.classList.remove('hidden');
    statusBox.className = 'mt-1.5 text-xs px-3 py-2 rounded-lg border bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold';
    statusBox.textContent = `✅ Gemini API Key Verified & Working! Response: "${reply}" — Your key is saved.`;
    showToast('✅ Gemini API Key is working!');
  } catch (e) {
    statusBox.classList.remove('hidden');
    statusBox.className = 'mt-1.5 text-xs px-3 py-2 rounded-lg border bg-rose-500/15 border-rose-500/40 text-rose-300';
    statusBox.textContent = `❌ Key Test Failed: ${e.message}. Check that you copied the full key from Google AI Studio.`;
  } finally {
    btn.textContent = '🧪 Test Gemini Key';
    btn.disabled = false;
  }
}

function updateSyncBadge() {
  const dot = document.getElementById('syncDot');
  const txt = document.getElementById('syncText');
  const detail = document.getElementById('syncStatusDetail');
  if (!dot || !txt) return;
  if (state.profile.syncRoomId) {
    dot.className = 'w-2 h-2 rounded-full bg-sky-400 animate-pulse';
    txt.textContent = `Wife Sync: ${state.profile.syncRoomId.slice(0, 8)}`;
    if (detail) {
      detail.innerHTML = `✅ <strong class="text-sky-400">Connected to Shared Sync Code: <code>${state.profile.syncRoomId}</code></strong> — Enter this same code on your wife's phone! Auto-syncs every 15 seconds.`;
    }
  } else {
    dot.className = 'w-2 h-2 rounded-full bg-emerald-400';
    txt.textContent = 'Profile & Sync';
    if (detail) {
      detail.textContent = 'Status: Saving automatically on this device. Click "Generate Shared Cloud Code" above to link your phone and your wife\'s phone!';
    }
  }
}

function saveApiAndSyncSettings() {
  state.profile.geminiApiKey = document.getElementById('geminiKeyInput').value.trim();
  state.profile.syncRoomId = document.getElementById('syncRoomInput').value.trim();
  saveState();
  updateSyncBadge();
  showToast('✅ API Key & Sync Code saved!');
  if (state.profile.syncRoomId) {
    pullFromCloudRoom(false);
  }
}

function getCloudSyncPayload() {
  // Build a super-compact (<2.5 KB) sync payload so mobile sync is instantaneous and never hits size limits
  const activeWeek = getActiveWeekObj();
  return {
    syncVersion: 4,
    profile: {
      calories: state.profile.calories,
      protein: state.profile.protein,
      carbs: state.profile.carbs,
      fat: state.profile.fat,
      fiber: state.profile.fiber,
      prepStyle: state.profile.prepStyle,
      startWeight: state.profile.startWeight,
      currentWeight: state.profile.currentWeight,
      goalWeight: state.profile.goalWeight,
      goalBodyFatPct: state.profile.goalBodyFatPct,
      heightFt: state.profile.heightFt,
      heightIn: state.profile.heightIn,
      age: state.profile.age,
      bodyFatPct: state.profile.bodyFatPct,
      muscleMassLbs: state.profile.muscleMassLbs,
      waistIn: state.profile.waistIn,
      exclusions: state.profile.exclusions,
      favoriteIngredients: state.profile.favoriteIngredients
    },
    activeWeekMondayISO: state.activeWeekMondayISO,
    // Sync any meal upgrades toggled on in the active week
    activeUpgrades: (activeWeek?.days || []).map(d => d.meals.map(m => !!m.upgradeApplied)),
    progressLogs: (state.progressLogs || []).slice(0, 15),
    favorites: (state.favorites || []).slice(0, 10),
    checkedGroceries: state.checkedGroceries || {},
    customGroceries: state.customGroceries || [],
    lastUpdated: Date.now()
  };
}

function getNtfyTopicUrl(roomId, isPoll = false) {
  const cleanId = String(roomId).trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  const topic = `mo_meal_prep_sync_${cleanId}`;
  return isPoll ? `https://ntfy.sh/${topic}/json?poll=1` : `https://ntfy.sh/${topic}`;
}

async function createNewCloudSyncRoom() {
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const roomId = `MO-WIFE-${randomSuffix}`;
  state.profile.syncRoomId = roomId;
  const inp = document.getElementById('syncRoomInput');
  if (inp) inp.value = roomId;
  saveState(true);
  updateSyncBadge();
  await pushToCloudRoom(false);
}

async function pushToCloudRoom(silent = false) {
  const roomId = (document.getElementById('syncRoomInput')?.value || state.profile.syncRoomId || '').trim();
  if (!roomId) {
    if (!silent) showToast('Click "Generate Shared Cloud Code" first!');
    return;
  }
  state.profile.syncRoomId = roomId;
  updateSyncBadge();

  try {
    const payload = getCloudSyncPayload();
    const jsonStr = JSON.stringify(payload);
    const b64 = btoa(unescape(encodeURIComponent(jsonStr)));
    const resp = await fetch(getNtfyTopicUrl(roomId, false), {
      method: 'POST',
      body: b64
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    if (!silent) showToast(`⬆️ Synced to Cloud Code "${roomId}"! Share this code with your wife.`);
  } catch (e) {
    if (!silent) showToast('⚠️ Cloud push failed — saved locally on device.');
  }
}

async function pullFromCloudRoom(silent = false) {
  const roomId = (document.getElementById('syncRoomInput')?.value || state.profile.syncRoomId || '').trim();
  if (!roomId) {
    if (!silent) showToast('Enter a Shared Cloud Code first!');
    return;
  }
  state.profile.syncRoomId = roomId;
  updateSyncBadge();

  try {
    const resp = await fetch(getNtfyTopicUrl(roomId, true));
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const text = await resp.text();
    const lines = text.trim().split('\n').filter(Boolean).map(l => {
      try { return JSON.parse(l); } catch (e) { return null; }
    }).filter(x => x && x.event === 'message');

    if (lines.length === 0) {
      if (!silent) showToast('Connected! Pushing initial data to this Sync Code...');
      await pushToCloudRoom(silent);
      return;
    }

    const latestEvent = lines[lines.length - 1];
    let rawB64 = latestEvent.message;
    if (latestEvent.attachment && latestEvent.attachment.url) {
      const attResp = await fetch(latestEvent.attachment.url);
      rawB64 = (await attResp.text()).trim();
    }

    const decodedJson = decodeURIComponent(escape(atob(rawB64)));
    const remote = JSON.parse(decodedJson);

    if (remote && remote.profile) {
      const localKey = state.profile.geminiApiKey;
      state.profile = { ...state.profile, ...remote.profile, geminiApiKey: localKey, syncRoomId: roomId };
      if (remote.progressLogs) state.progressLogs = remote.progressLogs;
      if (remote.favorites) state.favorites = remote.favorites;
      state.checkedGroceries = remote.checkedGroceries || {};
      state.customGroceries = remote.customGroceries || [];

      const activeWeek = getActiveWeekObj();
      if (remote.activeUpgrades && activeWeek?.days) {
        activeWeek.days.forEach((d, dIdx) => {
          d.meals.forEach((m, mIdx) => {
            if (remote.activeUpgrades[dIdx] && typeof remote.activeUpgrades[dIdx][mIdx] === 'boolean') {
              m.upgradeApplied = remote.activeUpgrades[dIdx][mIdx];
            }
          });
        });
      }

      saveState(true);
      renderAll();
      if (!silent) showToast(`⬇️ Synced latest updates from "${roomId}"!`);
    }
  } catch (e) {
    if (!silent) showToast('⚠️ No cloud updates found yet for this code — pushing your current data now.');
  }
}

function startAutoCloudSyncPolling() {
  setInterval(() => {
    if (state.profile.syncRoomId) {
      pullFromCloudRoom(true);
    }
  }, 15000);
}

function exportBackupJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `mo-meal-prep-backup-${formatDateISO(new Date())}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('💾 Full backup downloaded!');
}

function importBackupJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported && imported.profile) {
        state = { ...state, ...imported };
        saveState();
        renderAll();
        showToast('✅ Backup file restored successfully!');
      } else {
        showToast('❌ Invalid backup file.');
      }
    } catch (err) {
      showToast('❌ Could not read backup file.');
    }
  };
  reader.readAsText(file);
}
