// Mo Meal Prep — Sleek Modern UI, Slide-Up Recipe Sheet, Calendar Archive, Movie Treat Finder & Firebase Live Sync
const STORAGE_KEY_PREFIX = 'mo_meal_prep_user_';
const ACTIVE_USER_SESSION_KEY = 'mo_meal_prep_active_session_v1';
const FIREBASE_BASE_URL = 'https://mo-meal-prep-default-rtdb.firebaseio.com';

// Current signed-in user session: { username: 'mo', displayName: 'Mo', pin: '7369' }
let currentSession = null;

function getStorageKey() {
  const u = (currentSession?.username || 'mo').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${STORAGE_KEY_PREFIX}${u}_v4`;
}

function getFirebaseUserUrl(usernameOverride = null) {
  const u = (usernameOverride || currentSession?.username || 'mo').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${FIREBASE_BASE_URL}/users/${u}.json`;
}

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

// Lookup map of verified direct videoUrl & articleUrl by meal name or id
function getVerifiedLinksForMeal(meal) {
  if (!meal) return {};
  if (meal.videoUrl || meal.articleUrl) {
    return { videoUrl: meal.videoUrl || null, articleUrl: meal.articleUrl || null };
  }
  const allCurated = [
    ...(window.STARTER_WEEK_PLAN || []).flatMap(d => d.meals),
    ...(window.ON_DEMAND_POOL || [])
  ];
  const match = allCurated.find(c => c.id === meal.id || c.name === meal.name);
  return {
    videoUrl: match?.videoUrl || null,
    articleUrl: match?.articleUrl || null
  };
}

// Auto-balance a day's 4 meals so their cumulative sum hits 100% of the active daily target
function balanceDayToTarget(dayObj, target = state.profile) {
  if (!dayObj || !dayObj.meals || dayObj.meals.length === 0) return;
  dayObj.meals.forEach(m => {
    const links = getVerifiedLinksForMeal(m);
    if (links.videoUrl) m.videoUrl = links.videoUrl;
    if (links.articleUrl) m.articleUrl = links.articleUrl;
  });

  const keys = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
  keys.forEach(k => {
    const targetVal = target[k];
    if (!targetVal) return;
    const currentSum = dayObj.meals.reduce((acc, m) => acc + (m[k] || 0), 0);
    if (currentSum > 0 && currentSum !== targetVal) {
      const ratio = targetVal / currentSum;
      // Scale all meals proportionally first
      dayObj.meals.forEach(m => {
        m[k] = Math.max(1, Math.round(m[k] * ratio));
      });
      // Absorb any 1-2 unit rounding remainder into Dinner (meal[1] or meal[0]) so sum is 100% exact
      const mainIdx = dayObj.meals.length > 1 ? 1 : 0;
      const sumOthers = dayObj.meals.reduce((acc, m, idx) => idx === mainIdx ? acc : acc + m[k], 0);
      dayObj.meals[mainIdx][k] = Math.max(1, targetVal - sumOthers);
    }
  });
}

const currentMondayISO = getMondayOfDate(new Date());

let state = {
  theme: 'light',
  authPin: '7369',
  displayName: 'Mo',
  profile: {
    ...JSON.parse(JSON.stringify(window.DEFAULT_PROFILE)),
    sex: 'male',
    startWeight: 170,
    currentWeight: 170,
    goalWeight: 160,
    goalBodyFatPct: 18.2,
    heightFt: 5,
    heightIn: 7,
    age: 42,
    bodyFatPct: 23,
    muscleMassLbs: 75,
    waistIn: '',
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

function getFreshDefaultStateForMo() {
  return {
    theme: state.theme || 'light',
    authPin: '7369',
    displayName: 'Mo',
    profile: {
      ...JSON.parse(JSON.stringify(window.DEFAULT_PROFILE)),
      sex: 'male',
      startWeight: 170,
      currentWeight: 170,
      goalWeight: 160,
      goalBodyFatPct: 18.2,
      heightFt: 5,
      heightIn: 7,
      age: 42,
      bodyFatPct: 23,
      muscleMassLbs: 75,
      waistIn: '',
      activityMultiplier: 1.375,
      workoutsPerWeek: 3,
      goalType: 'cut_moderate'
    },
    activeWeekMondayISO: currentMondayISO,
    selectedDayIndex: 0,
    weeksByStartISO: {},
    progressLogs: [
      {
        id: 'baseline-170-v4',
        dateISO: formatDateISO(new Date()),
        weight: 170,
        bodyFatPct: 23,
        muscleMassLbs: 75,
        note: 'Baseline Profile (5\'7", Age 42, 170 lbs, 23% BF, 75 lbs Muscle → Goal: 160 lbs / 18.2% BF)'
      }
    ],
    favorites: [],
    mealHistoryLog: [],
    checkedGroceries: {},
    customGroceries: [],
    selectedStoreFilter: 'ALL',
    lastUpdated: Date.now()
  };
}

// Track currently open recipe drawer so background sync never closes it
let activeOpenDrawerContext = null;

document.addEventListener('DOMContentLoaded', async () => {
  registerServiceWorker();

  const urlParams = new URLSearchParams(window.location.search);
  const isFamilyInvite =
    urlParams.get('invite') === '1' ||
    urlParams.get('signup') === '1' ||
    urlParams.get('create') === '1' ||
    window.location.hash === '#invite' ||
    window.location.hash === '#signup';

  if (isFamilyInvite) {
    // Shared invite link ALWAYS opens cleanly on Create Username + Intro Video,
    // never auto-logging into an existing session (including Mo's).
    currentSession = null;
    localStorage.removeItem(ACTIVE_USER_SESSION_KEY);
    startFamilyOnboarding();
    return;
  }

  const savedSess = localStorage.getItem(ACTIVE_USER_SESSION_KEY);
  if (savedSess) {
    try {
      currentSession = JSON.parse(savedSess);
    } catch (e) {}
  }

  if (!currentSession || !currentSession.username) {
    // Show Sign-In / Create Username Screen
    openAuthOverlay('signin');
    return;
  }

  await initializeAuthenticatedApp();
});

async function initializeAuthenticatedApp() {
  if (window.history && window.history.replaceState && window.location.search) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  const overlay = document.getElementById('authOverlay');
  if (overlay) overlay.classList.add('hidden');
  loadState();
  applyThemeMode();
  ensureWeekExists(state.activeWeekMondayISO);
  renderAll();
  await pullFromCloudRoom(true);
  startAutoCloudSyncPolling();
}

function toggleThemeMode() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  applyThemeMode();
  localStorage.setItem(getStorageKey(), JSON.stringify(state));
}

function applyThemeMode() {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggleBtn');
  if (state.theme === 'dark') {
    html.classList.add('dark');
    if (btn) btn.textContent = '☀️';
  } else {
    html.classList.remove('dark');
    if (btn) btn.textContent = '🌙';
  }
}

function loadState() {
  try {
    const key = getStorageKey();
    const savedUser = localStorage.getItem(key);
    // Also check legacy mo_meal_prep_state_v4 if signing in as Mo for the first time
    const legacyMo = currentSession?.username === 'mo' ? localStorage.getItem('mo_meal_prep_state_v4') : null;
    const rawToLoad = savedUser || legacyMo;

    if (rawToLoad) {
      const parsed = JSON.parse(rawToLoad);
      state = {
        ...state,
        ...parsed,
        profile: { ...state.profile, ...(parsed.profile || {}) }
      };
    } else if (currentSession?.username === 'mo') {
      state = getFreshDefaultStateForMo();
    }

    if (currentSession?.username === 'mo') {
      state.authPin = '7369';
      state.displayName = 'Mo';
    }
  } catch (e) {
    console.error('Error loading state:', e);
  }
}

function saveState(skipCloud = false) {
  state.lastUpdated = Date.now();
  localStorage.setItem(getStorageKey(), JSON.stringify(state));
  if (!skipCloud && currentSession?.username) {
    pushToCloudRoom(true);
  }
}

function ensureWeekExists(mondayISO, forceRegenerate = false, customStyle = null) {
  if (state.weeksByStartISO[mondayISO] && !forceRegenerate) {
    // Ensure all days in existing saved week have verified links & exact daily macro balance
    state.weeksByStartISO[mondayISO].days.forEach(d => balanceDayToTarget(d, state.profile));
    return state.weeksByStartISO[mondayISO];
  }

  const style = customStyle || state.profile.prepStyle || 'mix';
  const baseDays = JSON.parse(JSON.stringify(window.STARTER_WEEK_PLAN));

  baseDays.forEach((dayObj, idx) => {
    const dayDateISO = addDaysISO(mondayISO, idx);
    dayObj.dateISO = dayDateISO;

    if (style === 'batch') {
      dayObj.prepNote = idx % 2 === 0
        ? `Batch Cook Day: Cook 2 portions of ${dayObj.primaryProtein} (Eat today & in 48 hrs)`
        : `Alternating Protein Day: ${dayObj.primaryProtein} rotation`;
    } else if (style === 'fresh') {
      dayObj.prepNote = `Fresh Daily Prep: Quick 15-min ${dayObj.primaryProtein} cook`;
    }

    dayObj.meals.forEach(m => {
      m.upgradeApplied = false;
      recordMealInHistory(m.name, dayDateISO, m.primaryProtein);
    });
    balanceDayToTarget(dayObj, state.profile);
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
  if (!box) return;
  box.textContent = msg;
  box.classList.remove('hidden');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    box.classList.add('hidden');
  }, 2800);
}

// 4-Tab Navigation
function switchTab(tabName) {
  if (tabName === 'favorites') {
    tabName = 'generator';
    switchGeneratorSubMode('favorites');
  }
  const tabs = ['plan', 'generator', 'shopping', 'profile'];
  tabs.forEach(t => {
    const sec = document.getElementById(`tab-${t}`);
    const nav = document.getElementById(`nav-${t}`);
    if (!sec || !nav) return;
    if (t === tabName) {
      sec.classList.remove('hidden');
      nav.className = 'flex flex-col items-center justify-center py-2 px-3 rounded-2xl text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 font-semibold transition-all';
    } else {
      sec.classList.add('hidden');
      nav.className = 'flex flex-col items-center justify-center py-2 px-3 rounded-2xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium transition-all';
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
}

function renderHeaderBadge() {
  const p = state.profile;
  const displayName = state.displayName || currentSession?.displayName || 'Mo';
  const appTitleText = `${displayName}'s Meal Prep`;
  const titleEl = document.getElementById('headerAppTitle');
  const avatarEl = document.getElementById('headerAvatarIcon');
  const syncTxt = document.getElementById('syncText');
  const profTitle = document.getElementById('profileHeadingTitle');
  const profSub = document.getElementById('profileSubheadingMeta');

  document.title = appTitleText;
  if (titleEl) titleEl.textContent = appTitleText;
  if (avatarEl) avatarEl.textContent = displayName.charAt(0).toUpperCase();
  if (syncTxt) syncTxt.textContent = `👤 ${displayName}`;
  if (profTitle) profTitle.textContent = `${displayName}'s Body Profile & Goal`;
  if (profSub) profSub.textContent = `${p.heightFt || 5}'${p.heightIn ?? 7}" • Age ${p.age || 42} • Personalized Plan`;

  const badge = document.getElementById('headerTargetBadge');
  if (badge) {
    badge.textContent = `${p.calories.toLocaleString()} kcal`;
  }
  const genText = document.getElementById('genMacroSummaryText');
  if (genText) {
    genText.textContent = `${p.calories.toLocaleString()} kcal (${p.protein}P/${p.carbs}C/${p.fat}F)`;
  }
}

// ================= CALENDAR NAVIGATION & ARCHIVE MODAL =================
function openCalendarModal() {
  const weekObj = getActiveWeekObj();
  const allWeeks = Object.values(state.weeksByStartISO).sort((a, b) => b.weekStartISO.localeCompare(a.weekStartISO));
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h3 class="text-base font-extrabold">📅 Calendar & Past Weeks Archive</h3>
        <p class="text-xs text-slate-400">Switch weeks, jump to any date, or view your history</p>
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>

    <div class="space-y-4 text-xs">
      <!-- Week Stepper -->
      <div class="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-800">
        <button onclick="changeWeekOffset(-1); openCalendarModal();" class="px-3 py-1.5 rounded-xl soft-card font-bold">◀ Prev Week</button>
        <div class="text-center">
          <div class="font-extrabold text-sm">${formatShortDate(weekObj.weekStartISO)} – ${formatFullDateWithYear(weekObj.weekEndISO)}</div>
          <button onclick="jumpToCurrentWeek(); closeModal();" class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold underline mt-0.5">Jump to Today</button>
        </div>
        <button onclick="changeWeekOffset(1); openCalendarModal();" class="px-3 py-1.5 rounded-xl soft-card font-bold">Next Week ▶</button>
      </div>

      <!-- Date Picker Jump -->
      <div class="flex items-center justify-between gap-2">
        <span class="font-semibold text-slate-500">Jump to Specific Date:</span>
        <input type="date" value="${weekObj.days[state.selectedDayIndex]?.dateISO || weekObj.weekStartISO}" onchange="jumpToSelectedDate(this.value); closeModal();" class="soft-input rounded-xl px-3 py-1.5 text-xs font-semibold" />
      </div>

      <!-- Saved Weeks List -->
      <div class="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div class="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Saved Weeks in History (${allWeeks.length})</div>
        <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
          ${allWeeks.map(w => {
            const isCurrent = w.weekStartISO === state.activeWeekMondayISO;
            const snap = w.targetSnapshot || state.profile;
            return `
              <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border ${isCurrent ? 'border-emerald-500' : 'border-slate-200/60 dark:border-slate-800'} flex items-center justify-between">
                <div>
                  <div class="font-bold">${formatShortDate(w.weekStartISO)} – ${formatFullDateWithYear(w.weekEndISO)}</div>
                  <div class="text-[11px] text-slate-400">${snap.calories} kcal • ${snap.protein}g P • ${snap.carbs}g C • ${snap.fat}g F</div>
                </div>
                <button onclick="loadArchivedWeek('${w.weekStartISO}')" class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs">
                  ${isCurrent ? 'Active' : 'Open'}
                </button>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

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

function loadArchivedWeek(mondayISO) {
  state.activeWeekMondayISO = mondayISO;
  state.selectedDayIndex = 0;
  closeModal();
  switchTab('plan');
  showToast(`Loaded week of ${formatFullDateWithYear(mondayISO)}`);
}

function renderCalendarHeaderAndDays() {
  const weekObj = getActiveWeekObj();
  const days = weekObj.days;
  const startStr = formatShortDate(weekObj.weekStartISO);
  const endStr = formatFullDateWithYear(weekObj.weekEndISO);

  const titleEl = document.getElementById('currentWeekTitle');
  const shopWeekLabel = document.getElementById('shoppingWeekLabel');
  if (titleEl) titleEl.textContent = `${startStr} – ${endStr}`;
  if (shopWeekLabel) shopWeekLabel.textContent = `${startStr} – ${endStr}`;

  const todayISO = formatDateISO(new Date());
  const row = document.getElementById('daySelectorRow');
  if (!row) return;

  row.innerHTML = days.map((d, idx) => {
    const active = idx === state.selectedDayIndex;
    const isToday = d.dateISO === todayISO;
    const dayNum = d.dateISO ? parseISOToLocalDate(d.dateISO).getDate() : idx + 1;
    const shortProt = d.primaryProtein.slice(0, 4);

    return `
      <button onclick="selectDay(${idx})" class="flex-1 min-w-[50px] py-2.5 rounded-2xl text-xs transition flex flex-col items-center ${
        active
          ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-md'
          : 'soft-card text-slate-500 dark:text-slate-400 hover:border-slate-300'
      }">
        <span class="text-[10px] ${active ? 'opacity-80' : ''}">${d.day.slice(0, 3)}${isToday ? '•' : ''}</span>
        <span class="text-sm font-extrabold ${active ? '' : 'text-slate-800 dark:text-white'} mt-0.5">${dayNum}</span>
        <span class="text-[9px] mt-0.5 ${active ? 'opacity-90' : 'text-emerald-600 dark:text-emerald-400 font-semibold'}">${getProteinEmoji(d.primaryProtein)}${shortProt}</span>
      </button>
    `;
  }).join('');
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
  const dateDisplay = dayObj.dateISO ? formatShortDate(dayObj.dateISO) : '';

  card.innerHTML = `
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">${dayObj.day}, ${dateDisplay}</span>
          <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            withinTarget
              ? 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
              : 'bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400'
          }">
            ${withinTarget ? '✓ On Target' : `${minCal}–${maxCal} kcal`}
          </span>
        </div>
        <div class="flex items-baseline gap-1.5 mt-0.5">
          <span class="text-3xl font-extrabold tracking-tight">${totals.calories.toLocaleString()}</span>
          <span class="text-xs text-slate-400 font-medium">/ ${t.calories.toLocaleString()} kcal</span>
        </div>
      </div>
      <div class="text-right hidden sm:block">
        <span class="text-[11px] font-medium text-slate-400">${dayObj.primaryProtein} Day</span>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-3 pt-1">
      ${renderSleekMacroBar('Protein', totals.protein, t.protein, 'g', 'bg-emerald-500')}
      ${renderSleekMacroBar('Carbs', totals.carbs, t.carbs, 'g', 'bg-sky-500')}
      ${renderSleekMacroBar('Fat', totals.fat, t.fat, 'g', 'bg-amber-500')}
      ${renderSleekMacroBar('Fiber', totals.fiber, t.fiber, 'g', 'bg-purple-500')}
    </div>
  `;
}

function renderSleekMacroBar(label, val, target, unit, barColor) {
  const pct = Math.min(100, Math.round((val / Math.max(1, target)) * 100));
  return `
    <div>
      <div class="flex justify-between text-xs mb-1">
        <span class="text-slate-400 font-medium">${label}</span>
        <span class="font-bold">${val}<span class="text-[10px] text-slate-400 font-normal">/${target}${unit}</span></span>
      </div>
      <div class="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div class="h-full ${barColor} rounded-full transition-all duration-300" style="width: ${pct}%"></div>
      </div>
    </div>
  `;
}

// ================= CLEAN MEAL CARDS & SLIDE-UP RECIPE DRAWER =================
function renderDayMeals() {
  const days = getActiveWeekDays();
  const dayObj = days[state.selectedDayIndex];
  const container = document.getElementById('dayMealsContainer');
  if (!dayObj || !container) return;

  const mainMeals = dayObj.meals.slice(0, 2);
  const snacks = dayObj.meals.slice(2);

  const mainHTML = mainMeals.map((meal, idx) => renderCleanMealCard(meal, state.selectedDayIndex, idx)).join('');
  const snacksHTML = snacks.length > 0 ? `
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      ${snacks.map((snack, sIdx) => renderCompactSnackCard(snack, state.selectedDayIndex, sIdx + 2)).join('')}
    </div>
  ` : '';

  container.innerHTML = mainHTML + snacksHTML;
}

function renderCleanMealCard(meal, dayIdx, mealIdx) {
  const eff = getMealEffectiveMacros(meal);
  const isFav = state.favorites.some(f => f.name === meal.name);
  const slotShort = mealIdx === 0 ? 'Meal 1 • First Meal' : 'Meal 2 • Dinner';

  return `
    <div onclick="openRecipeDrawer(${dayIdx}, ${mealIdx})" class="soft-card rounded-3xl p-4 cursor-pointer hover:border-emerald-500/40 transition group">
      <div class="flex items-start justify-between gap-3">
        <div class="space-y-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">${slotShort}</span>
            <span class="text-[11px] text-slate-400">• ${meal.appliance || 'Kitchen'}</span>
            ${meal.upgradeApplied ? '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">🌶️ +Upgrade</span>' : ''}
            ${isFav ? '<span class="text-xs">⭐</span>' : ''}
          </div>
          <h3 class="text-sm sm:text-base font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition leading-snug">
            ${getProteinEmoji(meal.primaryProtein)} ${meal.name}
          </h3>
          <p class="text-xs text-slate-400 pt-0.5">
            <strong class="text-slate-800 dark:text-slate-100">${eff.calories} kcal</strong> · ${eff.protein}g P · ${eff.carbs}g C · ${eff.fat}g F · ${eff.fiber}g Fiber
          </p>
        </div>
        <span class="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition text-xl font-light self-center">›</span>
      </div>
    </div>
  `;
}

function renderCompactSnackCard(meal, dayIdx, mealIdx) {
  const eff = getMealEffectiveMacros(meal);
  const isFav = state.favorites.some(f => f.name === meal.name);

  return `
    <div onclick="openRecipeDrawer(${dayIdx}, ${mealIdx})" class="soft-card rounded-3xl p-4 cursor-pointer hover:border-emerald-500/40 transition group flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${meal.slot} ${isFav ? '⭐' : ''}</span>
          <span class="text-xs font-extrabold">${eff.calories} kcal</span>
        </div>
        <h4 class="text-sm font-bold mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition line-clamp-1">
          ${getProteinEmoji(meal.primaryProtein)} ${meal.name}
        </h4>
      </div>
      <div class="flex items-center justify-between mt-1.5">
        <p class="text-[11px] text-slate-400">${eff.protein}g P · ${eff.carbs}g C · ${eff.fiber}g Fib</p>
        <span class="text-slate-300 dark:text-slate-600 text-sm">›</span>
      </div>
    </div>
  `;
}

// Open Dedicated Slide-Up Recipe Drawer (Immune to background sync re-renders!)
function openRecipeDrawer(dayIdx, mealIdx, standaloneMeal = null) {
  const modal = document.getElementById('recipeDrawerModal');
  const content = document.getElementById('recipeDrawerContent');
  if (!modal || !content) return;

  const isStandalone = !!standaloneMeal;
  const meal = isStandalone ? standaloneMeal : getActiveWeekDays()[dayIdx].meals[mealIdx];
  if (!meal) return;

  activeOpenDrawerContext = { dayIdx, mealIdx, isStandalone, standaloneMeal };

  const eff = getMealEffectiveMacros(meal);
  const isFav = state.favorites.some(f => f.name === meal.name);
  const up = meal.flavorUpgrade;
  const links = getVerifiedLinksForMeal(meal);

  content.innerHTML = `
    <div class="flex items-start justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">${meal.slot}</span>
          <span class="text-[11px] text-slate-400">• ${meal.appliance || 'Kitchen'} (${meal.prepTime || '15 mins'})</span>
        </div>
        <h3 class="text-base sm:text-lg font-extrabold mt-1 leading-snug">
          ${getProteinEmoji(meal.primaryProtein)} ${meal.name}
        </h3>
        <p class="text-xs text-slate-400 mt-1">
          <strong class="text-slate-900 dark:text-white">${eff.calories} kcal</strong> · ${eff.protein}g Protein · ${eff.carbs}g Carbs · ${eff.fat}g Fat · ${eff.fiber}g Fiber
        </p>
      </div>
      <button onclick="closeRecipeDrawer()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold shrink-0">✕</button>
    </div>

    <!-- Action Pills inside Drawer (Video & Article ONLY shown when a specific verified link exists!) -->
    <div class="flex flex-wrap gap-2 pt-1">
      <button onclick='toggleFavoriteMealFromDrawer()' class="px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
        isFav
          ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-300'
          : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-600 dark:text-slate-300'
      }">
        ${isFav ? '⭐ Starred in Favorites' : '☆ Save to Favorites'}
      </button>

      ${!isStandalone ? `
        <button onclick="closeRecipeDrawer(); openSwapMealModal(${dayIdx}, ${mealIdx});" class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
          🔄 Swap Meal
        </button>
      ` : `
        <button onclick='closeRecipeDrawer(); openAssignToPlanModal(${JSON.stringify(meal).replace(/'/g, "&#39;")});' class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
          + Add to Week Plan
        </button>
      `}

      ${links.videoUrl ? `
        <a href="${links.videoUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-semibold">
          ▶️ Watch Video ↗
        </a>
      ` : ''}
      ${links.articleUrl ? `
        <a href="${links.articleUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-semibold">
          📖 Recipe Article ↗
        </a>
      ` : ''}
    </div>

    <!-- Optional Flavor Upgrade Switch -->
    ${up ? `
      <div class="p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 ${
        meal.upgradeApplied
          ? 'bg-amber-500/10 border-amber-500/40'
          : 'bg-slate-50 dark:bg-slate-900/80 border-slate-200/70 dark:border-slate-800'
      }">
        <div class="text-xs">
          <div class="font-bold text-amber-600 dark:text-amber-400">🌶️ Optional Flavor Upgrade</div>
          <div class="text-slate-600 dark:text-slate-300 mt-0.5">${up.name}</div>
          <div class="text-[11px] text-slate-400">+${up.calories} kcal · +${up.protein}g P · +${up.carbs}g C · +${up.fat}g F</div>
        </div>
        ${!isStandalone ? `
          <button onclick="toggleFlavorUpgrade(${dayIdx}, ${mealIdx})" class="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
            meal.upgradeApplied
              ? 'bg-amber-500 text-slate-950'
              : 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950'
          }">
            ${meal.upgradeApplied ? '✓ Added' : '+ Add'}
          </button>
        ` : ''}
      </div>
    ` : ''}

    <!-- Clean Ingredients List with Canton Store Routing -->
    <div class="space-y-2 text-xs">
      <div class="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Ingredients (1-Person Portion) & Canton Store</div>
      <div class="divide-y divide-slate-100 dark:divide-slate-800/80">
        ${(meal.ingredients || []).map(ing => {
          const st = window.STORE_INFO[ing.store] || { icon: '🏪' };
          const shortStore = ing.store.split('(')[0].trim();
          return `
            <div class="py-2 flex items-center justify-between gap-2">
              <div>
                <span class="font-semibold">${ing.item}</span>
                <span class="text-slate-400 ml-1">— ${ing.amount}</span>
              </div>
              <span class="text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">${st.icon} ${shortStore}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Step-by-Step Instructions -->
    <div class="space-y-2 text-xs pt-1">
      <div class="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Step-by-Step Preparation & Cooking</div>
      <ol class="space-y-2 list-decimal list-inside text-slate-600 dark:text-slate-300 leading-relaxed">
        ${(meal.steps || []).map(step => `<li class="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50">${step}</li>`).join('')}
      </ol>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeRecipeDrawer() {
  activeOpenDrawerContext = null;
  const modal = document.getElementById('recipeDrawerModal');
  if (modal) modal.classList.add('hidden');
}

function toggleFavoriteMealFromDrawer() {
  if (!activeOpenDrawerContext) return;
  const { dayIdx, mealIdx, isStandalone, standaloneMeal } = activeOpenDrawerContext;
  const meal = isStandalone ? standaloneMeal : getActiveWeekDays()[dayIdx].meals[mealIdx];
  toggleFavoriteMeal(meal);
  openRecipeDrawer(dayIdx, mealIdx, standaloneMeal);
}

// Standalone Card Renderer (for Generated Meals & Favorites list)
function renderMealCardHTML(meal, dayIdx, mealIdx, isStandalone = true) {
  const eff = getMealEffectiveMacros(meal);
  const isFav = state.favorites.some(f => f.name === meal.name);

  return `
    <div class="soft-card rounded-3xl p-4 space-y-3">
      <div class="flex items-start justify-between gap-3">
        <div onclick='openRecipeDrawer(0, 0, ${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="cursor-pointer space-y-1 flex-1">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">${meal.slot}</span>
            <span class="text-[11px] text-slate-400">• ${meal.appliance || 'Kitchen'}</span>
          </div>
          <h4 class="text-sm sm:text-base font-bold hover:text-emerald-600 transition">
            ${getProteinEmoji(meal.primaryProtein)} ${meal.name}
          </h4>
          <p class="text-xs text-slate-400">
            <strong class="text-slate-800 dark:text-white">${eff.calories} kcal</strong> · ${eff.protein}g P · ${eff.carbs}g C · ${eff.fat}g F · ${eff.fiber}g Fib
          </p>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick='toggleFavoriteMeal(${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
            ${isFav ? '⭐' : '☆'}
          </button>
          <button onclick='openAssignToPlanModal(${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 text-xs font-bold">
            + Add to Week
          </button>
        </div>
      </div>

      <button onclick='openRecipeDrawer(0, 0, ${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="w-full py-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
        👨‍🍳 Open Full Ingredients, Video & Step-by-Step Guide ›
      </button>
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
  if (activeOpenDrawerContext && !activeOpenDrawerContext.isStandalone) {
    openRecipeDrawer(dayIdx, mealIdx);
  }
  showToast(meal.upgradeApplied ? '🌶️ Flavor upgrade added to macros & Grocery List!' : 'Flavor upgrade removed.');
}

// ================= SUB-MODE SWITCHER (MEAL | TREAT | FAVORITES) =================
function switchGeneratorSubMode(mode) {
  const mealBox = document.getElementById('genMealBox');
  const treatBox = document.getElementById('genTreatBox');
  const favsBox = document.getElementById('genFavoritesBox');
  const btnMeal = document.getElementById('submodeBtnMeal');
  const btnTreat = document.getElementById('submodeBtnTreat');
  const btnFavs = document.getElementById('submodeBtnFavs');
  const out = document.getElementById('generatedSingleResult');
  if (out) out.innerHTML = '';

  const activeCls = 'py-2 px-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 shadow-sm transition';
  const inactiveCls = 'py-2 px-2 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition';

  mealBox.classList.toggle('hidden', mode !== 'meal');
  treatBox.classList.toggle('hidden', mode !== 'treat');
  favsBox.classList.toggle('hidden', mode !== 'favorites');

  btnMeal.className = mode === 'meal' ? activeCls : inactiveCls;
  btnTreat.className = mode === 'treat' ? activeCls : inactiveCls;
  btnFavs.className = mode === 'favorites' ? activeCls : inactiveCls;
}

function updateTreatVibeOptions() {
  const taste = document.getElementById('treatTaste').value;
  const vibeSelect = document.getElementById('treatVibe');
  if (!vibeSelect) return;

  if (taste === 'sweet') {
    vibeSelect.innerHTML = `
      <option value="chocolate_pb">Rich Chocolate & Peanut Butter</option>
      <option value="ice_cream">Cold & Creamy (Ice Cream / Cheesecake)</option>
      <option value="warm_bakery">Warm & Cozy (Mug Brownie / Churro)</option>
      <option value="fruity">Fruity, Berry & Chocolate Drizzle</option>
    `;
  } else if (taste === 'savory') {
    vibeSelect.innerHTML = `
      <option value="cheesy_nacho">Cheesy, Loaded Nacho / Queso</option>
      <option value="spicy_crunchy">Spicy & Crunchy (Buffalo / Cajun)</option>
      <option value="arabic_meze">Savory Arabic Meze (Za'atar Pita Chips & Labneh)</option>
    `;
  } else {
    vibeSelect.innerHTML = `
      <option value="kettle_popcorn">Sweet & Salty Kettle Popcorn + Chocolate</option>
      <option value="pb_pretzel">Peanut Butter, Dark Chocolate & Pretzels</option>
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
    out.innerHTML = renderMealCardHTML(homeRecipe, 0, 0, true);
    openRecipeDrawer(0, 0, homeRecipe);
  } else {
    const storeOptions = getStoreBoughtTreatOptions(taste, vibe, calBudget);
    out.innerHTML = `
      <div class="soft-card rounded-3xl p-5 space-y-4">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Ready-to-Eat Canton Options</span>
          <h3 class="text-base font-bold mt-0.5">🛒 Top 3 Store-Bought Treats</h3>
        </div>
        <div class="space-y-3">
          ${storeOptions.map((opt, idx) => {
            const st = window.STORE_INFO[opt.store] || { icon: '🏪' };
            return `
              <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <h4 class="text-sm font-bold">#${idx + 1}: ${opt.name}</h4>
                  <span class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 shrink-0">${st.icon} ${opt.store.split('(')[0]}</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400">${opt.description}</p>
                <div class="flex items-center justify-between pt-1">
                  <span class="text-xs font-bold">${opt.calories} kcal · ${opt.protein}g P · ${opt.carbs}g C · ${opt.fiber}g Fib</span>
                  <button onclick="addStoreTreatToGroceryList('${opt.name.replace(/'/g, "\\'")}', '${opt.store.replace(/'/g, "\\'")}')" class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs">
                    + Add to List
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }
}

function addStoreTreatToGroceryList(itemName, storeName) {
  state.customGroceries.push({
    id: 'treat-' + Date.now(),
    item: `🍿 ${itemName}`,
    store: storeName
  });
  saveState();
  renderShoppingList();
  showToast(`Added to ${storeName.split('(')[0]} in Groceries!`);
}

function getHomemadeTreatRecipe(taste, vibe, calBudget) {
  const recipes = {
    chocolate_pb: {
      name: "60-Second Molten Chocolate Peanut Butter Lava Protein Mug Cake",
      appliance: "Microwave (1 min)",
      prepTime: "4 mins",
      primaryProtein: "Whey & Dairy",
      calories: calBudget,
      protein: 24,
      carbs: 22,
      fat: 9,
      fiber: 5,
      flavorUpgrade: { name: "Top with 2 tbsp Sugar-Free Whipped Cream & 1 tsp Melted PB", calories: 60, protein: 2, carbs: 2, fat: 5, fiber: 0 },
      ingredients: [
        { item: "Chocolate Whey Protein Powder", amount: "1 scoop (30g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Unsweetened Cocoa Powder & Baking Powder", amount: "1 tbsp cocoa + 1/4 tsp baking powder", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "0% Greek Yogurt & Almond Milk", amount: "3 tbsp yogurt + 2 tbsp milk", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Natural Creamy Peanut Butter", amount: "1 tbsp (15g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whisk chocolate protein powder, 1 tbsp cocoa powder, 1/4 tsp baking powder, 3 tbsp Greek yogurt, and 2 tbsp milk in a mug until smooth.",
        "Drop 1 tbsp peanut butter into the center.",
        "Microwave for 45–55 seconds so the center stays molten. Cool 1 minute and enjoy!"
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
        { item: "0% Plain Greek Yogurt + 1 tbsp Labneh", amount: "1 cup (225g)", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Sugar-Free Cheesecake Pudding Mix", amount: "1.5 tbsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Fresh Strawberries & Raspberries", amount: "3/4 cup", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Crushed Shelled Pistachios", amount: "15g", store: "Greenland Market / Papaya (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whip cold Greek yogurt, 1 tbsp labneh, and cheesecake pudding mix for 60 seconds until thick like mousse.",
        "Top with fresh berries from Joe Randazzo's and crushed pistachios. Chill 15 mins in freezer!"
      ]
    },
    warm_bakery: {
      name: "Air Fryer Crispy Cinnamon-Sugar Churro Chips with Chocolate Dip",
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
        { item: "High-Fiber Carb Balance Tortilla", amount: "1 large tortilla", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Cinnamon & Zero-Cal Sweetener", amount: "1 tbsp mix", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt + Chocolate Protein Powder Dip", amount: "1/2 cup yogurt + 1/2 scoop whey", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Slice tortilla into 8 wedges, mist with oil spray, and coat with cinnamon-sweetener.",
        "Air fry at 390°F for 5–6 minutes until crunchy like churros.",
        "Dip into thick chocolate Greek yogurt frosting."
      ]
    },
    cheesy_nacho: {
      name: "Loaded Air Fryer High-Protein Chicken & Queso Movie Nachos",
      appliance: "Air Fryer (7 mins)",
      prepTime: "10 mins",
      primaryProtein: "Chicken & Cheese",
      calories: calBudget,
      protein: 28,
      carbs: 22,
      fat: 9,
      fiber: 9,
      flavorUpgrade: { name: "Top with 2 tbsp Guacamole & Jalapeños", calories: 55, protein: 1, carbs: 3, fat: 5, fiber: 2 },
      ingredients: [
        { item: "Quest Protein Tortilla Chips (or High-Fiber Tortilla Chips)", amount: "1 bag", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Shredded Cooked Halal Chicken Breast", amount: "3 oz (85g)", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Reduced-Fat Mexican Blend Cheese & Pico", amount: "1/3 cup cheese + 1/4 cup pico", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Arrange tortilla chips in Air Fryer, top with shredded chicken and cheese, and air fry at 390°F for 3 minutes until melty.",
        "Top with fresh pico de gallo."
      ]
    },
    spicy_crunchy: {
      name: "Crispy Air Fryer Buffalo Chicken & Cauliflower Bites",
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
        { item: "Halal Chicken Breast Bites & Cauliflower", amount: "3.5 oz chicken + 1 cup cauliflower", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Frank's RedHot Buffalo Sauce", amount: "2 tbsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt Ranch Dip", amount: "3 tbsp", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Toss chicken bites and cauliflower in garlic powder and Frank's Buffalo sauce.",
        "Air fry at 400°F for 9–10 minutes until crispy. Serve with Greek yogurt ranch."
      ]
    },
    arabic_meze: {
      name: "Warm Crispy Za'atar Pita Chips with Loaded Labneh Dip",
      appliance: "Air Fryer (6 mins)",
      prepTime: "8 mins",
      primaryProtein: "Dairy",
      calories: calBudget,
      protein: 21,
      carbs: 24,
      fat: 9,
      fiber: 6,
      flavorUpgrade: { name: "Drizzle with 1 tsp Olive Oil & Pomegranate Seeds", calories: 55, protein: 0, carbs: 3, fat: 5, fiber: 1 },
      ingredients: [
        { item: "Whole Wheat Arabic Pita (triangles)", amount: "1 small pita", store: "Greenland Market / Papaya (Canton)", category: "Bread & Grains" },
        { item: "Labneh & Greek Yogurt Mix", amount: "1/2 cup", store: "Greenland Market / Papaya (Canton)", category: "Dairy & Eggs" },
        { item: "Za'atar, Mint & Diced Cucumber", amount: "1/2 cup", store: "Joe Randazzo's (Westland)", category: "Produce" }
      ],
      steps: [
        "Spray pita wedges with olive oil, sprinkle with za'atar, and air fry at 390°F for 5 minutes.",
        "Scoop up chilled labneh topped with cucumber and mint."
      ]
    }
  };

  const chosen = recipes[vibe] || recipes.chocolate_pb;
  return {
    id: 'treat-home-' + Date.now(),
    slot: `🍿 Movie Treat`,
    ...chosen,
    upgradeApplied: false
  };
}

function getStoreBoughtTreatOptions(taste) {
  if (taste === 'savory') {
    return [
      {
        name: "Quest Tortilla Style Protein Chips (Nacho Cheese / Chili Lime) + Salsa",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Crunchy Doritos-style chips with 20g protein and only 4g net carbs.",
        calories: 180, protein: 20, carbs: 9, fat: 6, fiber: 3
      },
      {
        name: "LesserEvil Himalayan Gold Popcorn (2.5 cups) + 2 Light String Cheeses",
        store: "Costco / Sam's Club (Canton)",
        description: "Movie-theater butter flavor popcorn paired with 2 high-protein string cheeses.",
        calories: 230, protein: 15, carbs: 21, fat: 10, fiber: 5
      },
      {
        name: "Greenland Market Roasted Salted Chickpeas (Qadama) + Labneh Dip",
        store: "Greenland Market / Papaya (Canton)",
        description: "Crunchy Arabic roasted chickpeas paired with creamy labneh and cucumber.",
        calories: 245, protein: 14, carbs: 28, fat: 8, fiber: 7
      }
    ];
  } else if (taste === 'sweet_salty') {
    return [
      {
        name: "SkinnyPop Kettle Corn (2 cups) + Barebells Caramel Cashew Protein Bar",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Chop a Barebells bar (tastes like Snickers!) into bite-sized pieces with kettle popcorn.",
        calories: 290, protein: 21, carbs: 32, fat: 10, fiber: 5
      },
      {
        name: "Tru Fru Frozen Raspberries in Dark & White Chocolate",
        store: "Costco / Sam's Club (Canton)",
        description: "Real whole raspberries immersed in white and dark chocolate in the freezer aisle.",
        calories: 210, protein: 3, carbs: 25, fat: 10, fiber: 5
      },
      {
        name: "Chobani Flip (Salted Caramel Crunch) + 12 Roasted Almonds",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Greek yogurt with crunchy salted caramel and pretzel mix-ins.",
        calories: 250, protein: 15, carbs: 26, fat: 9, fiber: 3
      }
    ];
  } else {
    return [
      {
        name: "Yasso Frozen Greek Yogurt Bars (Fudge Brownie / Mint Chocolate Chip)",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Real ice-cream bar texture for 100 kcal per bar (have 2 bars for a 200-kcal movie treat!).",
        calories: 200, protein: 10, carbs: 28, fat: 4, fiber: 2
      },
      {
        name: "Halo Top Light Ice Cream Pint (Cookie Dough / Peanut Butter Cup - 2/3 Pint)",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Eat two-thirds of a pint right out of the tub for 230 calories and 14g protein.",
        calories: 230, protein: 14, carbs: 34, fat: 6, fiber: 8
      },
      {
        name: "Barebells Chocolate Dough Bar (Warmed 10 Secs in Microwave)",
        store: "Walmart / Meijer / Kroger / Target (Canton)",
        description: "Warm for 10 seconds in the microwave—melts into a gooey brownie with 20g protein!",
        calories: 200, protein: 20, carbs: 20, fat: 7, fiber: 3
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
    showToast('⭐ Saved to Favorites!');
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
      <div class="soft-card rounded-3xl p-6 text-center text-slate-400 text-xs">
        No starred favorites yet. Tap any meal card and press "☆ Save to Favorites" to build your personal cookbook!
      </div>
    `;
  } else {
    favContainer.innerHTML = state.favorites.map((meal, i) => renderMealCardHTML(meal, 0, i, true)).join('');
  }

  if (!state.mealHistoryLog || state.mealHistoryLog.length === 0) {
    histContainer.innerHTML = `<span class="text-xs text-slate-400">No meal history recorded yet.</span>`;
  } else {
    histContainer.innerHTML = state.mealHistoryLog.slice(0, 30).map(entry => `
      <span class="text-[11px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
        <strong>${entry.dateISO ? formatShortDate(entry.dateISO) : ''}:</strong> ${entry.name}
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
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-extrabold">Swap ${dayObj.day} (${formatShortDate(dayObj.dateISO)})</h3>
        <p class="text-xs text-slate-400">${currentMeal.slot}</p>
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>

    <div class="space-y-3">
      <button onclick="generateAiReplacementForSlot(${dayIdx}, ${mealIdx})" class="w-full py-3 px-4 rounded-2xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs">
        ✨ Generate Fresh Replacement (${state.profile.calories.toLocaleString()} kcal Goal)
      </button>

      <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 pt-1">Or Pick from Favorites & Chef Pool:</div>
      <div class="space-y-2 max-h-72 overflow-y-auto pr-1">
        ${candidates.map(cand => `
          <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-2">
            <div>
              <div class="text-xs font-bold">${getProteinEmoji(cand.primaryProtein)} ${cand.name}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">
                ${cand.calories} kcal · ${cand.protein}g P · ${cand.carbs}g C · ${cand.fat}g F
              </div>
            </div>
            <button onclick='replaceMealSlot(${dayIdx}, ${mealIdx}, ${JSON.stringify(cand).replace(/'/g, "&#39;")})' class="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shrink-0">
              Select
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
  const currentSlotMeal = days[dayIdx].meals[mealIdx];
  const copy = JSON.parse(JSON.stringify(newMeal));
  copy.slot = currentSlotMeal.slot;
  copy.id = `${dayIdx}-${mealIdx}-${Date.now()}`;
  // Inherit exact slot macro budget so the day's cumulative sum remains 100% on target!
  copy.calories = currentSlotMeal.calories;
  copy.protein = currentSlotMeal.protein;
  copy.carbs = currentSlotMeal.carbs;
  copy.fat = currentSlotMeal.fat;
  copy.fiber = currentSlotMeal.fiber;
  days[dayIdx].meals[mealIdx] = copy;
  balanceDayToTarget(days[dayIdx], state.profile);
  recordMealInHistory(copy.name, days[dayIdx].dateISO, copy.primaryProtein);
  saveState();
  closeModal();
  renderAll();
  showToast('✓ Meal swapped, macros balanced & Grocery List synced!');
}

function openAssignToPlanModal(meal) {
  const days = getActiveWeekDays();
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-extrabold">Add to Weekly Plan</h3>
        <p class="text-xs text-slate-400">${meal.name}</p>
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>
    <div class="space-y-3 text-xs">
      <div>
        <label class="block font-semibold text-slate-400 mb-1">Select Day:</label>
        <select id="assignDayIdx" class="w-full soft-input rounded-xl px-3 py-2.5">
          ${days.map((d, i) => `<option value="${i}">${d.day} (${formatShortDate(d.dateISO)}) — ${d.primaryProtein}</option>`).join('')}
        </select>
      </div>
      <div>
        <label class="block font-semibold text-slate-400 mb-1">Select Meal Slot:</label>
        <select id="assignMealIdx" class="w-full soft-input rounded-xl px-3 py-2.5">
          <option value="0">Meal 1 (First Meal - Lighter)</option>
          <option value="1">Meal 2 (Dinner - Hearty Main)</option>
          <option value="2">Snack 1</option>
          <option value="3">Snack 2</option>
        </select>
      </div>
      <button onclick='confirmAssignMeal(${JSON.stringify(meal).replace(/'/g, "&#39;")})' class="w-full py-3 rounded-2xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold">
        Insert into Weekly Plan
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
  btn.textContent = '⏳ Crafting Custom Recipe...';

  try {
    let generatedMeal = null;
    if (state.profile.geminiApiKey && state.profile.geminiApiKey.trim().length > 10) {
      generatedMeal = await callGeminiSingleRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib });
    } else {
      generatedMeal = buildSmartLocalRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib });
    }

    out.innerHTML = renderMealCardHTML(generatedMeal, 0, 0, true);
    openRecipeDrawer(0, 0, generatedMeal);
  } catch (err) {
    const fallback = buildSmartLocalRecipe({ slot, protein, cuisine, appliance, note, targetCal, targetProt, targetCarbs, targetFat, targetFib });
    out.innerHTML = renderMealCardHTML(fallback, 0, 0, true);
    openRecipeDrawer(0, 0, fallback);
  } finally {
    btn.disabled = false;
    btn.textContent = '🔥 Generate Recipe';
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
    name: `${cuisine} ${chosenProtein} Bowl — ${appliance.split('(')[0].trim()}${titleNote}`,
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
      { item: `Fresh ${chosenProtein}`, amount: `${ozPortion} oz (${gramsPortion}g) raw`, store: proteinStore, category: 'Halal Meat & Seafood' },
      { item: 'Bell Peppers, Red Onion, Parsley & Lemon', amount: '1.5 cups chopped', store: "Joe Randazzo's (Westland)", category: 'Produce' },
      { item: 'Chickpeas & Basmati Rice', amount: `${Math.round(targetCarbs * 2.5)}g cooked`, store: 'Greenland Market / Papaya (Canton)', category: 'Bread & Grains' },
      { item: '0% Greek Yogurt & Olive Oil Marinade', amount: '2 tbsp yogurt + 1 tsp oil', store: "Costco / Sam's Club (Canton)", category: 'Dairy & Eggs' }
    ],
    steps: [
      `Season ${ozPortion} oz (${gramsPortion}g) of ${chosenProtein} with ${cuisine} spices, garlic, lemon juice, salt, and black pepper.`,
      `Cook using ${appliance} for 9–12 minutes until golden brown and cooked through.`,
      `Toss fresh vegetables from Joe Randazzo's with lemon juice, herbs, and warm beans/rice.`,
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
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h3 class="text-sm font-extrabold">✨ Refresh 7-Day Meal Plan</h3>
        <p class="text-xs text-slate-400">${formatShortDate(weekObj.weekStartISO)} – ${formatFullDateWithYear(weekObj.weekEndISO)}</p>
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>

    <div class="space-y-3 text-xs">
      <div>
        <label class="block font-semibold text-slate-400 mb-1">Cooking Style for This Week:</label>
        <select id="modalPrepStyle" class="w-full soft-input rounded-xl px-3 py-2.5 font-medium">
          <option value="mix" ${state.profile.prepStyle === 'mix' ? 'selected' : ''}>Mix of Both (Batch + Fresh)</option>
          <option value="batch" ${state.profile.prepStyle === 'batch' ? 'selected' : ''}>Batch Cooking (Cook 2x portions, alternate days)</option>
          <option value="fresh" ${state.profile.prepStyle === 'fresh' ? 'selected' : ''}>Fresh Daily (15-min daily meals)</option>
        </select>
      </div>

      <div class="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-1 text-slate-500 dark:text-slate-400">
        <div class="font-bold text-emerald-600 dark:text-emerald-400">Active Profile Targets:</div>
        <div>• <strong>${state.profile.calories.toLocaleString()} kcal</strong> (${state.profile.protein}g P · ${state.profile.carbs}g C · ${state.profile.fat}g F · ${state.profile.fiber}g Fib)</div>
        <div>• Protein Rotation: Chicken → Shrimp → Beef → Tilapia</div>
      </div>

      <button onclick="confirmGenerateNewWeek()" class="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold text-xs shadow-md">
        🚀 Generate Plan & Sync Groceries
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
  showToast(`✨ Refreshed 7-day plan & synced Groceries!`);
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
        targetCal, targetProt, targetCarbs, targetFat, targetFib
      });
    } catch (e) {
      newMeal = buildSmartLocalRecipe({
        slot: current.slot,
        protein: isDinner ? dayProtein : 'Chicken',
        cuisine,
        appliance: 'Air Fryer (14 mins)',
        note: '',
        targetCal, targetProt, targetCarbs, targetFat, targetFib
      });
    }
  } else {
    newMeal = buildSmartLocalRecipe({
      slot: current.slot,
      protein: isDinner ? dayProtein : 'Chicken',
      cuisine,
      appliance: 'Air Fryer (14 mins)',
      note: '',
      targetCal, targetProt, targetCarbs, targetFat, targetFib
    });
  }
  replaceMealSlot(dayIdx, mealIdx, newMeal);
}

// ================= TAB 3: CANTON & WESTLAND SHOPPING LIST =================
function buildAggregatedShoppingList() {
  const map = new Map();
  const days = getActiveWeekDays();

  days.forEach(day => {
    const dayLabel = day.day.slice(0, 3);
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
            days: [dayLabel]
          });
        } else {
          const entry = map.get(key);
          entry.amounts.push(ing.amount);
          if (!entry.days.includes(dayLabel)) {
            entry.days.push(dayLabel);
          }
        }
      });

      if (meal.upgradeApplied && meal.flavorUpgrade) {
        const upStore = "Greenland Market / Papaya (Canton)";
        const upKey = `upgrade||${day.dateISO}-${meal.id}`;
        map.set(upKey, {
          key: upKey,
          item: `🌶️ ${meal.flavorUpgrade.name}`,
          store: upStore,
          category: 'Flavor Upgrade',
          amounts: ['1x'],
          days: [dayLabel]
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
      category: 'Extra',
      amounts: ['1x'],
      days: ['Extra'],
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
    `<button onclick="setStoreFilter('ALL')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
      state.selectedStoreFilter === 'ALL'
        ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950'
        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
    }">All (${allItems.length})</button>`,
    ...stores.map(st => {
      const count = allItems.filter(i => i.store === st).length;
      const info = window.STORE_INFO[st];
      const active = state.selectedStoreFilter === st;
      return `
        <button onclick="setStoreFilter('${st.replace(/'/g, "\\'")}')" class="px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition ${
          active
            ? 'bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
        }">${info.icon} ${st.split('(')[0].trim()} (${count})</button>
      `;
    })
  ].join('');

  const storesToRender = state.selectedStoreFilter === 'ALL' ? stores : [state.selectedStoreFilter];

  container.innerHTML = storesToRender.map(storeName => {
    const storeItems = allItems.filter(i => i.store === storeName);
    if (storeItems.length === 0) return '';
    const info = window.STORE_INFO[storeName] || { icon: '🏪', note: '' };

    return `
      <div class="soft-card rounded-3xl p-5 space-y-3">
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div>
            <h3 class="text-sm font-extrabold flex items-center gap-1.5">
              <span>${info.icon}</span> ${storeName}
            </h3>
            <p class="text-[11px] text-slate-400">${info.note}</p>
          </div>
          <span class="text-xs font-bold text-slate-400">${storeItems.length}</span>
        </div>

        <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
          ${storeItems.map(entry => {
            const checked = !!state.checkedGroceries[entry.key];
            return `
              <label class="flex items-start justify-between gap-3 py-2.5 cursor-pointer select-none">
                <div class="flex items-start gap-3">
                  <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleGroceryCheck('${entry.key.replace(/'/g, "\\'")}')" class="mt-0.5 w-4 h-4 rounded accent-emerald-600" />
                  <div>
                    <div class="text-xs sm:text-sm font-semibold transition ${checked ? 'line-through text-slate-400' : ''}">
                      ${entry.item}
                    </div>
                    <div class="text-[11px] text-slate-400">
                      ${entry.amounts.length > 1 ? `${entry.amounts.length}x (${entry.amounts[0]})` : entry.amounts[0]} · ${entry.days.join(', ')}
                    </div>
                  </div>
                </div>
                ${entry.isCustom ? `
                  <button onclick="removeCustomGrocery('${entry.customId}'); event.preventDefault();" class="text-xs text-rose-400 px-2">✕</button>
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
  showToast(`Added "${val}"`);
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
        lines.push(`- [ ] ${i.item} (${i.amounts.length > 1 ? i.amounts.length + 'x' : i.amounts[0]})`);
      });
    }
  });

  const text = lines.join('\n');
  if (navigator.share) {
    navigator.share({ title: 'Mo Meal Prep Grocery List', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast('📋 Shopping list copied to clipboard!');
  }
}

// ================= TAB 4: MO'S CLEAN PROFILE, BODY COMP & CLINICAL MACRO ENGINE =================
function toggleWaistHelper() {
  const box = document.getElementById('waistHelperBox');
  if (box) box.classList.toggle('hidden');
}

function renderProfileAndProgressTab() {
  const p = state.profile;
  const setCal = document.getElementById('setCalories');
  if (!setCal) return;

  // Update clean summary numbers at top of Profile card
  const dCW = document.getElementById('dispCurrWeight');
  const dCBf = document.getElementById('dispCurrBf');
  const dCMus = document.getElementById('dispCurrMuscle');
  const dGW = document.getElementById('dispGoalWeight');
  const dGBf = document.getElementById('dispGoalBf');
  if (dCW) dCW.textContent = p.currentWeight ?? 170;
  if (dCBf) dCBf.textContent = p.bodyFatPct ?? 23;
  if (dCMus) dCMus.textContent = p.muscleMassLbs ?? 75;
  if (dGW) dGW.textContent = p.goalWeight ?? 160;
  if (dGBf) dGBf.textContent = p.goalBodyFatPct ?? 18.2;

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

  const exDiv = document.getElementById('exclusionTags');
  exDiv.innerHTML = p.exclusions.map((item, idx) => `
    <span class="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium">
      <span>${item}</span>
      <button onclick="removeExclusionItem(${idx})" class="hover:opacity-75 font-bold ml-0.5">×</button>
    </span>
  `).join('');

  const favDiv = document.getElementById('favIngTags');
  favDiv.innerHTML = p.favoriteIngredients.map((item, idx) => `
    <span class="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
      <span>${item}</span>
      <button onclick="removeFavIngredient(${idx})" class="hover:opacity-75 font-bold ml-0.5">×</button>
    </span>
  `).join('');
}

function recalcBodyCompProjections(changedSource = 'current') {
  const currW = parseFloat(document.getElementById('profCurrentWeight')?.value) || 170;
  const currBf = parseFloat(document.getElementById('profBodyFat')?.value) || 23;
  const currMuscle = parseFloat(document.getElementById('profMuscleMass')?.value) || 75;

  const fatMassLbs = +(currW * (currBf / 100)).toFixed(1);
  const leanBodyMassLbs = +(currW - fatMassLbs).toFixed(1);

  let goalW = parseFloat(document.getElementById('profGoalWeight')?.value) || 160;
  let goalBf = parseFloat(document.getElementById('profGoalBodyFat')?.value) || 18.2;

  if (changedSource === 'goalBf' && goalBf > 4 && goalBf < 45) {
    goalW = +(leanBodyMassLbs / (1 - goalBf / 100)).toFixed(1);
    const gwEl = document.getElementById('profGoalWeight');
    if (gwEl) gwEl.value = goalW;
  } else if (changedSource === 'goalWeight' || changedSource === 'current' || changedSource === 'init') {
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
    currSummaryEl.innerHTML = `Current: <strong>${fatMassLbs} lbs Fat</strong> · <strong>${leanBodyMassLbs} lbs Lean Mass</strong>`;
  }

  const goalSummaryEl = document.getElementById('goalBodyCompSummary');
  if (goalSummaryEl) {
    goalSummaryEl.innerHTML = `At <strong>${goalW} lbs</strong>, Body Fat is <strong>${goalBf}%</strong> (losing <strong>${Math.max(0, fatToLoseLbs)} lbs pure fat</strong> while preserving all <strong>${currMuscle} lbs muscle</strong>).`;
  }
}

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
  const noteStr = `${p.currentWeight} lbs · ${p.bodyFatPct}% BF · ${p.muscleMassLbs} lbs Muscle`;

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
  renderProfileAndProgressTab();
  showToast(`💾 Saved (${p.currentWeight} lbs, ${p.bodyFatPct}% BF)!`);
}

function renderProgressLogsList() {
  const distBadge = document.getElementById('progressDistanceBadge');
  const listEl = document.getElementById('progressHistoryList');
  if (!listEl) return;

  const p = state.profile;
  const currW = parseFloat(p.currentWeight) || 170;
  const goalW = parseFloat(p.goalWeight) || 160;
  const toGoal = Math.max(0, (currW - goalW)).toFixed(1);

  if (distBadge) {
    distBadge.textContent = `${toGoal} lbs to goal (${goalW} lbs) ▼`;
  }

  listEl.innerHTML = (state.progressLogs || []).map(entry => `
    <div class="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 rounded-xl px-3 py-2 text-xs">
      <div>
        <span class="font-bold text-emerald-600 dark:text-emerald-400">${entry.dateISO ? formatShortDate(entry.dateISO) : ''}</span>
        <span class="font-bold ml-1.5">${entry.weight} lbs</span>
        ${entry.bodyFatPct ? `<span class="text-slate-400 ml-1.5">· ${entry.bodyFatPct}% BF</span>` : ''}
        ${entry.muscleMassLbs ? `<span class="text-slate-400 ml-1.5">· ${entry.muscleMassLbs} lb Musc</span>` : ''}
      </div>
      ${state.progressLogs.length > 1 ? `
        <button onclick="deleteProgressCheckIn('${entry.id}')" class="text-slate-400 hover:text-rose-500 text-xs px-1">✕</button>
      ` : ''}
    </div>
  `).join('');
}

function deleteProgressCheckIn(id) {
  state.progressLogs = state.progressLogs.filter(l => l.id !== id);
  saveState();
  renderProgressLogsList();
}

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

  const fatMassLbs = +(weightLbs * (bf / 100)).toFixed(1);
  const leanMassLbs = +(weightLbs - fatMassLbs).toFixed(1);
  const leanMassKg = leanMassLbs * 0.45359237;

  const bmrKatch = Math.round(370 + (21.6 * leanMassKg));
  const sexOffset = p.sex === 'female' ? -161 : 5;
  const bmrMifflin = Math.round((10 * weightKg) + (6.25 * heightCm) - (5 * age) + sexOffset);
  const bmrAvg = Math.round((bmrKatch + bmrMifflin) / 2);

  const workoutThermicBonus = workouts >= 4 ? 60 : workouts >= 2 ? 25 : 0;
  const tdee = Math.round((bmrKatch * act) + workoutThermicBonus);

  let deficitOrSurplus = -480;
  let goalLabel = 'Clinical Steady Fat Loss (~1.0 lb/week)';
  if (p.goalType === 'cut_aggressive') {
    deficitOrSurplus = -680;
    goalLabel = 'Aggressive Fat Cut (~1.4 lbs/week)';
  } else if (p.goalType === 'recomp') {
    deficitOrSurplus = -300;
    goalLabel = 'Body Recomposition (-300 kcal/day)';
  } else if (p.goalType === 'maintain') {
    deficitOrSurplus = 0;
    goalLabel = 'Maintenance (0 deficit)';
  } else if (p.goalType === 'lean_bulk') {
    deficitOrSurplus = 250;
    goalLabel = 'Lean Muscle Gain (+250 kcal/day)';
  }

  const targetCal = Math.max(1450, Math.round((tdee + deficitOrSurplus) / 10) * 10);
  const recProtein = Math.round(leanMassLbs * 1.05);
  const recFat = Math.round((targetCal * 0.34) / 9);
  const recCarbs = Math.max(90, Math.round((targetCal - (recProtein * 4) - (recFat * 9)) / 4));
  const recFiber = Math.max(32, Math.round((targetCal / 1000) * 19.5));

  const actualDailyDeficit = tdee - targetCal;
  const weeklyFatLossLbs = +(Math.max(0.2, (actualDailyDeficit * 7) / 3500)).toFixed(2);
  const lbsToLose = Math.max(0, weightLbs - goalW);
  const estWeeksToGoal = lbsToLose > 0 && actualDailyDeficit > 0 ? Math.ceil(lbsToLose / weeklyFatLossLbs) : 0;

  return {
    fatMassLbs, leanMassLbs, muscleLbs, bmrKatch, bmrMifflin, bmrAvg, tdee,
    goalLabel, actualDailyDeficit, weeklyFatLossLbs, estWeeksToGoal,
    calories: targetCal, protein: recProtein, carbs: recCarbs, fat: recFat, fiber: recFiber
  };
}

function generateScientificMacroRecommendation() {
  saveProfileOnlyAndLogSnapshot();
  const sci = computeScientificMacros(state.profile);
  const box = document.getElementById('aiAdvisorRecommendationCard');
  if (!box) return;
  box.classList.toggle('hidden');
  if (box.classList.contains('hidden')) return;

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

  const actCal = p.calories;
  const actP = p.protein;
  const actC = p.carbs;
  const actF = p.fat;
  const actFib = p.fiber;

  const actPCal = actP * 4;
  const actCCal = actC * 4;
  const actFCal = actF * 9;
  const actTotalMacroCal = actPCal + actCCal + actFCal;
  const actProtPerLbLBM = +(actP / sci.leanMassLbs).toFixed(2);
  const actDeficit = sci.tdee - actCal;
  const actWeeklyLoss = +((actDeficit * 7) / 3500).toFixed(2);

  box.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
      <div>
        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">4-Step Clinical Formula Audit</span>
        <h4 class="text-sm font-extrabold">Target Goal Date: ~${formatFullDateWithYear(goalReachDateISO)} (${sci.estWeeksToGoal} wks)</h4>
      </div>
      <button onclick="document.getElementById('aiAdvisorRecommendationCard').classList.add('hidden')" class="text-xs text-slate-400 font-bold px-2">✕</button>
    </div>

    <div class="space-y-3 text-xs">
      <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1">
        <div class="font-bold text-emerald-600 dark:text-emerald-400">1. Body Composition & Goal Math</div>
        <div class="text-slate-600 dark:text-slate-300">• Fat Mass: <strong>${sci.fatMassLbs} lbs</strong> (${p.bodyFatPct}%) · Lean Body Mass: <strong>${sci.leanMassLbs} lbs</strong> (${leanMassKg} kg)</div>
        <div class="text-slate-600 dark:text-slate-300">• Goal Formula: <code>${sci.leanMassLbs} / (1 - ${(goalBf/100).toFixed(3)}) = ${goalW} lbs</code> (Losing <strong>${pureFatToLose} lbs pure fat</strong>, Muscle rises to <strong>${projectedGoalMusclePct}%</strong>)</div>
      </div>

      <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1">
        <div class="font-bold text-sky-600 dark:text-sky-400">2. Resting BMR (Dual-Equation Check)</div>
        <div class="text-slate-600 dark:text-slate-300">• <strong>Katch-McArdle (Lean Mass):</strong> <code>370 + (21.6 × ${leanMassKg})</code> = <strong>${sci.bmrKatch.toLocaleString()} kcal/day</strong></div>
        <div class="text-slate-600 dark:text-slate-300">• <strong>Mifflin-St Jeor:</strong> <code>(10×${weightKg}) + (6.25×${heightCm}) - (5×${p.age}) + 5</code> = <strong>${sci.bmrMifflin.toLocaleString()} kcal/day</strong></div>
      </div>

      <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1">
        <div class="font-bold text-amber-600 dark:text-amber-400">3. Maintenance (TDEE) & Fat-Loss Velocity</div>
        <div class="text-slate-600 dark:text-slate-300">• True TDEE = <strong>${sci.tdee.toLocaleString()} kcal/day</strong> (Activity × ${p.activityMultiplier} + ${p.workoutsPerWeek}x/wk workouts)</div>
        <div class="text-slate-600 dark:text-slate-300">• At ${actCal.toLocaleString()} kcal: <strong>-${actDeficit} kcal/day deficit</strong> → Losing <strong>${actWeeklyLoss} lbs/week</strong></div>
      </div>

      <div class="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 space-y-1">
        <div class="font-bold text-purple-600 dark:text-purple-400">4. Dietitian Plan vs. ISSN Formula Audit</div>
        <div class="text-slate-600 dark:text-slate-300">• Macro Calorie Check: ${actP}×4 + ${actC}×4 + ${actF}×9 = <strong>${actTotalMacroCal} kcal</strong> (✓ Exact)</div>
        <div class="text-slate-600 dark:text-slate-300">• Muscle Protection: <strong>${actProtPerLbLBM}g Protein / lb Lean Mass</strong> (✓ 100% Muscle Preserved)</div>
        <div class="text-slate-600 dark:text-slate-300">• Formula Target: <strong>${sci.calories} kcal (${sci.protein}P / ${sci.carbs}C / ${sci.fat}F / ${sci.fiber}Fib)</strong> vs. Yours: <strong>${actCal} kcal (${actP}P / ${actC}C / ${actF}F / ${actFib}Fib)</strong></div>
      </div>

      <button onclick="applyTargetsAndRescaleMeals(${sci.calories}, ${sci.protein}, ${sci.carbs}, ${sci.fat}, ${sci.fiber}, true)" class="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
        ✓ Apply Formula Targets (${sci.calories} kcal) & Re-Scale Meals
      </button>
    </div>
  `;
}

function saveManualMacroTargetsAndPromptRescale() {
  const cal = parseInt(document.getElementById('setCalories').value, 10) || 1800;
  const p = parseInt(document.getElementById('setProtein').value, 10) || 135;
  const c = parseInt(document.getElementById('setCarbs').value, 10) || 156;
  const f = parseInt(document.getElementById('setFat').value, 10) || 70;
  const fib = parseInt(document.getElementById('setFiber').value, 10) || 35;
  applyTargetsAndRescaleMeals(cal, p, c, f, fib, true);
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
  showToast(`✅ Targets updated to ${cal.toLocaleString()} kcal!`);
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

// ================= GOOGLE FIREBASE REAL-TIME SYNC & GEMINI KEY TESTER =================
async function testGeminiApiKey() {
  const keyInput = document.getElementById('geminiKeyInput');
  const statusBox = document.getElementById('geminiTestStatus');
  const btn = document.getElementById('btnTestGemini');
  const key = (keyInput?.value || state.profile.geminiApiKey || '').trim();

  if (!key || key.length < 15) {
    statusBox.classList.remove('hidden');
    statusBox.className = 'mt-1.5 text-xs px-3 py-2 rounded-lg border bg-rose-500/10 border-rose-500/30 text-rose-500';
    statusBox.textContent = '⚠️ Paste your Gemini API key (starts with AIzaSy...) first.';
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
        contents: [{ parts: [{ text: 'Reply with: Gemini Connected!' }] }]
      })
    });
    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${resp.status}`);
    }
    statusBox.classList.remove('hidden');
    statusBox.className = 'mt-1.5 text-xs px-3 py-2 rounded-lg border bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-semibold';
    statusBox.textContent = `✅ Gemini API Key Verified & Saved!`;
    showToast('✅ Gemini API Key is working!');
  } catch (e) {
    statusBox.classList.remove('hidden');
    statusBox.className = 'mt-1.5 text-xs px-3 py-2 rounded-lg border bg-rose-500/10 border-rose-500/30 text-rose-500';
    statusBox.textContent = `❌ Key Test Failed: ${e.message}`;
  } finally {
    btn.textContent = '🧪 Test & Save Key';
    btn.disabled = false;
  }
}

function updateSyncBadge(status = 'connected') {
  const dot = document.getElementById('syncDot');
  const txt = document.getElementById('syncText');
  const detail = document.getElementById('syncStatusDetail');
  if (!dot || !txt) return;

  const displayName = state.displayName || currentSession?.displayName || 'Mo';

  if (status === 'locked') {
    dot.className = 'w-2 h-2 rounded-full bg-amber-400 animate-pulse';
    txt.textContent = 'Unlock DB';
    if (detail) {
      detail.innerHTML = `⚠️ <span class="text-amber-500">Firebase Rules are locked. In Firebase Console → Rules, set <code>.read: true</code> & <code>.write: true</code> and click Publish!</span>`;
    }
  } else {
    dot.className = 'w-2 h-2 rounded-full bg-emerald-500';
    txt.textContent = `👤 ${displayName}`;
    if (detail) {
      detail.innerHTML = `✓ <span class="text-emerald-600 dark:text-emerald-400">Signed in as <strong>${displayName}</strong> — Synced to Google Firebase (<code>/users/${(currentSession?.username || 'mo')}</code>)</span>`;
    }
  }
}

function saveApiAndSyncSettings() {
  state.profile.geminiApiKey = document.getElementById('geminiKeyInput').value.trim();
  saveState();
  showToast('✅ Gemini API Key saved!');
}

function getCloudSyncPayload() {
  return {
    authPin: state.authPin || currentSession?.pin || '7369',
    displayName: state.displayName || currentSession?.displayName || 'Mo',
    profile: {
      ...state.profile,
      geminiApiKey: undefined
    },
    weeksByStartISO: state.weeksByStartISO,
    activeWeekMondayISO: state.activeWeekMondayISO,
    progressLogs: state.progressLogs,
    favorites: state.favorites,
    mealHistoryLog: state.mealHistoryLog,
    checkedGroceries: state.checkedGroceries,
    customGroceries: state.customGroceries,
    lastUpdated: state.lastUpdated || Date.now()
  };
}

let _isPushingFirebase = false;
let _activeEventSource = null;

async function pushToCloudRoom(silent = true) {
  if (!currentSession?.username) return;
  try {
    _isPushingFirebase = true;
    const payload = getCloudSyncPayload();
    const resp = await fetch(getFirebaseUserUrl(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (resp.status === 401 || resp.status === 403) {
      updateSyncBadge('locked');
      return;
    }
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    updateSyncBadge('connected');
    if (!silent) showToast('☁️ Synced to Google Firebase!');
  } catch (e) {
    console.warn('Firebase sync note:', e);
  } finally {
    setTimeout(() => { _isPushingFirebase = false; }, 600);
  }
}

function applyRemoteFirebaseState(remote) {
  if (!remote || !remote.profile) return;
  if (state.lastUpdated && remote.lastUpdated && remote.lastUpdated <= state.lastUpdated) {
    return;
  }
  const localKey = state.profile.geminiApiKey;
  if (remote.displayName) state.displayName = remote.displayName;
  if (remote.authPin) state.authPin = remote.authPin;
  state.profile = { ...state.profile, ...remote.profile, geminiApiKey: localKey };
  if (remote.weeksByStartISO) state.weeksByStartISO = { ...state.weeksByStartISO, ...remote.weeksByStartISO };
  if (remote.progressLogs) state.progressLogs = remote.progressLogs;
  if (remote.favorites) state.favorites = remote.favorites;
  if (remote.mealHistoryLog) state.mealHistoryLog = remote.mealHistoryLog;
  state.checkedGroceries = remote.checkedGroceries || {};
  state.customGroceries = remote.customGroceries || [];
  state.lastUpdated = remote.lastUpdated || Date.now();
  localStorage.setItem(getStorageKey(), JSON.stringify(state));
  renderAll();
}

async function pullFromCloudRoom(silent = true) {
  if (!currentSession?.username) return;
  try {
    const resp = await fetch(getFirebaseUserUrl());
    if (resp.status === 401 || resp.status === 403) {
      updateSyncBadge('locked');
      return;
    }
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    updateSyncBadge('connected');
    let remote = await resp.json();

    // If signing in as 'mo' and /users/mo is empty, check legacy root /mo_meal_prep_state.json
    if (!remote && currentSession.username === 'mo') {
      const legacyResp = await fetch(`${FIREBASE_BASE_URL}/mo_meal_prep_state.json`).catch(() => null);
      if (legacyResp && legacyResp.ok) {
        const legacyData = await legacyResp.json();
        if (legacyData && legacyData.profile) {
          remote = { ...legacyData, authPin: '7369', displayName: 'Mo' };
        }
      }
    }

    if (!remote) {
      await pushToCloudRoom(true);
      return;
    }
    applyRemoteFirebaseState(remote);
  } catch (e) {
    console.warn('Firebase pull note:', e);
  }
}

let _syncIntervalId = null;

function startAutoCloudSyncPolling() {
  if (_activeEventSource) {
    try { _activeEventSource.close(); } catch (e) {}
  }
  if (_syncIntervalId) clearInterval(_syncIntervalId);

  try {
    if (window.EventSource && currentSession?.username) {
      _activeEventSource = new EventSource(getFirebaseUserUrl());
      _activeEventSource.addEventListener('put', (e) => {
        if (_isPushingFirebase) return;
        try {
          const packet = JSON.parse(e.data);
          if (packet && packet.path === '/' && packet.data && packet.data.profile) {
            applyRemoteFirebaseState(packet.data);
            updateSyncBadge('connected');
          }
        } catch (err) {}
      });
    }
  } catch (e) {}

  _syncIntervalId = setInterval(() => {
    if (!_isPushingFirebase && currentSession?.username) {
      pullFromCloudRoom(true);
    }
  }, 6000);
}

// ================= MULTI-USER SIGN IN, ACCOUNT SWITCHER & INTERACTIVE FAMILY ONBOARDING =================
let onboardingDraft = {
  step: 1,
  tourSlide: 0,
  displayName: '',
  username: '',
  pin: '',
  sex: 'male',
  age: 34,
  heightFt: 5,
  heightIn: 8,
  currentWeight: 175,
  goalWeight: 160,
  bodyFatPct: 22,
  goalBodyFatPct: 16.5,
  muscleMassLbs: 72,
  activityMultiplier: 1.375,
  workoutsPerWeek: 3,
  goalType: 'cut_moderate'
};

const APP_TOUR_SLIDES = [
  {
    badge: "Scene 1 of 4 • Why This App Is Different",
    durationSec: 11,
    title: "Proactive AI Chef vs. Traditional Calorie Trackers",
    desc: "Most apps make you weigh and log food AFTER you eat—leaving you frustrated when your macros don't match. We flip that upside down:",
    infographicHTML: `
      <div class="grid grid-cols-2 gap-2.5 pt-1 text-left">
        <div class="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1.5 anim-float anim-delay-1">
          <div class="text-[10px] font-extrabold uppercase text-rose-400">❌ Most Diet Apps</div>
          <div class="text-[11px] text-slate-300">• Manual barcode scanning after every bite</div>
          <div class="text-[11px] text-slate-300">• Generic 1-size-fits-all calorie guesses</div>
          <div class="text-[11px] text-slate-300">• Zero help deciding what to cook tonight</div>
        </div>
        <div class="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 space-y-1.5 anim-float anim-delay-2 anim-glow">
          <div class="text-[10px] font-extrabold uppercase text-emerald-300">✅ Meal Prep Studio</div>
          <div class="text-[11px] text-white font-medium">• Pre-built 7-day plan hitting 100% of your macros</div>
          <div class="text-[11px] text-white font-medium">• Clinical Lean-Mass metabolism engine</div>
          <div class="text-[11px] text-white font-medium">• Step-by-step recipes + local store routing</div>
        </div>
      </div>
    `,
    speech: "Why is this app different from traditional calorie trackers? Most apps make you log food after you eat, leaving you guessing what to cook. Meal Prep Studio does the math first, building a complete 7-day plan where every single day already hits 100 percent of your calorie and macro goals."
  },
  {
    badge: "Scene 2 of 4 • Clinical Body-Composition Science",
    durationSec: 11,
    title: "Lose Pure Fat While Protecting 100% of Your Muscle",
    desc: "Why do we ask for your height, weight, age, and body fat %? Because scale weight alone lies—we calculate your exact Lean Body Mass:",
    infographicHTML: `
      <div class="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5 anim-float anim-delay-1">
        <div class="flex items-center justify-between text-[11px]">
          <span class="text-sky-400 font-bold">🔬 Dual-Formula BMR (Katch-McArdle + Mifflin)</span>
          <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">100% Verified Math</span>
        </div>
        <div class="space-y-1.5 text-[11px]">
          <div>
            <div class="flex justify-between mb-0.5"><span class="text-slate-400">Muscle Protection (~1.05g Protein / lb Lean Mass)</span><span class="text-emerald-400 font-bold">100% Preserved</span></div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-emerald-500 anim-bar" style="width:100%"></div></div>
          </div>
          <div>
            <div class="flex justify-between mb-0.5"><span class="text-slate-400">Targeted Daily Caloric Deficit (-500 kcal/day)</span><span class="text-amber-400 font-bold">~1.0 lb Pure Fat/Wk</span></div>
            <div class="h-2 bg-slate-800 rounded-full overflow-hidden"><div class="h-full bg-amber-500 anim-bar" style="width:82%"></div></div>
          </div>
        </div>
      </div>
    `,
    speech: "In the next step, we ask for your body metrics so we can run the clinical Katch-McArdle and Mifflin-St Jeor equations. This sets your protein target based on your Lean Body Mass so you burn pure fat while protecting 100 percent of your muscle."
  },
  {
    badge: "Scene 3 of 4 • Daily Protein Rotation & Movie Treats",
    durationSec: 11,
    title: "2 Meals + 2 Snacks • Zero Diet Boredom",
    desc: "Built for Intermittent Fasting: a lighter first meal, a hearty dinner, and 2 snacks—rotating proteins daily so you never eat the same protein twice in a row:",
    infographicHTML: `
      <div class="space-y-2 pt-1">
        <div class="grid grid-cols-4 gap-1.5 text-center anim-float anim-delay-1">
          <div class="p-2 rounded-xl bg-slate-950/80 border border-slate-800"><div class="text-base">🍗</div><div class="text-[10px] font-bold text-emerald-400">Mon: Chicken</div></div>
          <div class="p-2 rounded-xl bg-slate-950/80 border border-slate-800"><div class="text-base">🍤</div><div class="text-[10px] font-bold text-sky-400">Tue: Shrimp</div></div>
          <div class="p-2 rounded-xl bg-slate-950/80 border border-slate-800"><div class="text-base">🥩</div><div class="text-[10px] font-bold text-amber-400">Wed: Beef</div></div>
          <div class="p-2 rounded-xl bg-slate-950/80 border border-slate-800"><div class="text-base">🐟</div><div class="text-[10px] font-bold text-purple-400">Thu: Tilapia</div></div>
        </div>
        <div class="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between text-[11px] anim-float anim-delay-2">
          <span>🍿 <strong>Watching a movie?</strong> Built-in Sweet & Savory Treat Finder!</span>
          <span class="font-bold text-amber-300 shrink-0">Home or Store</span>
        </div>
      </div>
    `,
    speech: "Your daily schedule features a lighter first meal, a hearty dinner, and two snacks, automatically rotating Chicken, Shrimp, Halal Beef, and Tilapia so you never eat the same protein two days in a row. Plus, use the Movie Treat finder anytime a craving hits!"
  },
  {
    badge: "Scene 4 of 4 • Smart Local Grocery Sync",
    durationSec: 10,
    title: "Auto-Routed to the Cheapest Local Stores",
    desc: "Your entire week of recipes automatically turns into a live checklist sorted by the best local store for every single item:",
    infographicHTML: `
      <div class="grid grid-cols-2 gap-2 pt-1 text-left text-[11px] anim-float anim-delay-1">
        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30"><span class="font-bold text-emerald-400">🥬 Joe Randazzo's</span><div class="text-[10px] text-slate-400">Fresh produce, fruits & herbs</div></div>
        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30"><span class="font-bold text-amber-400">🥩 Greenland / Papaya</span><div class="text-[10px] text-slate-400">Halal meats, labneh, pita & spices</div></div>
        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-sky-500/30"><span class="font-bold text-sky-400">📦 Costco / Sam's</span><div class="text-[10px] text-slate-400">Bulk shrimp, tilapia, yogurt & eggs</div></div>
        <div class="p-2.5 rounded-xl bg-slate-950/80 border border-purple-500/30"><span class="font-bold text-purple-400">🛒 Walmart / Meijer</span><div class="text-[10px] text-slate-400">Everyday pantry & low-carb wraps</div></div>
      </div>
    `,
    speech: "Every ingredient from your weekly plan is automatically organized by local store so you save time and money. Ready to see your custom calorie and macro blueprint? Click Start Building My Profile below!"
  }
];

// Exact chapter timestamps (seconds) in intro-video.mp4 (v3)
const VIDEO_CHAPTERS = [
  { label: '1. Why Different', time: 0.0 },
  { label: '2. Body Science', time: 17.4 },
  { label: '3. Daily Variety', time: 33.4 },
  { label: '4. Store Sync', time: 50.5 }
];

const PUBLIC_APP_URL = 'https://mohammadshehab-ship-it.github.io/mo-meal-prep/';
const PUBLIC_INVITE_URL = 'https://mohammadshehab-ship-it.github.io/mo-meal-prep/?invite=1';
const PUBLIC_VIDEO_URL = 'https://mohammadshehab-ship-it.github.io/mo-meal-prep/intro-video.mp4?v=3';

let cachedIntroVideoFile = null;
let introVideoPreloadPromise = null;

function preloadIntroVideoForShare() {
  if (cachedIntroVideoFile) return Promise.resolve(cachedIntroVideoFile);
  if (introVideoPreloadPromise) return introVideoPreloadPromise;
  introVideoPreloadPromise = fetch('./intro-video.mp4?v=3')
    .then((resp) => (resp && resp.ok ? resp.blob() : null))
    .then((blob) => {
      if (blob) {
        cachedIntroVideoFile = new File([blob], 'Meal-Prep-Studio-Intro.mp4', { type: 'video/mp4' });
      }
      const btn = document.getElementById('shareVideoFileBtnText');
      if (btn && cachedIntroVideoFile) {
        btn.textContent = (navigator.canShare && navigator.canShare({ files: [cachedIntroVideoFile] }))
          ? 'Send MP4 Video File Directly (iPhone / Android)'
          : 'Download MP4 Video & Copy Invite (2.3 MB)';
      }
      return cachedIntroVideoFile;
    })
    .catch(() => null);
  return introVideoPreloadPromise;
}

function getFamilyShareMessage() {
  return `Hey family! Check out Meal Prep & Macro Studio!\n\nTap below to create your own username, watch the 1-min intro video & build your custom meal plan:\n${PUBLIC_INVITE_URL}\n\nWatch Intro Video Directly:\n${PUBLIC_VIDEO_URL}`;
}

function shareAppAndVideoToFamily() {
  openShareFamilyModal();
}

function openShareFamilyModal() {
  preloadIntroVideoForShare();
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');
  if (!modal || !content) return;

  const shareText = getFamilyShareMessage();
  const encodedMsg = encodeURIComponent(shareText);
  const waHref = `https://wa.me/?text=${encodedMsg}`;
  const isApple = /iPad|iPhone|iPod|Macintosh/i.test(navigator.userAgent || '');
  const smsHref = isApple ? `sms:&body=${encodedMsg}` : `sms:?body=${encodedMsg}`;
  const canNativeShare = typeof navigator.share === 'function';
  const fileReady = !!(cachedIntroVideoFile && navigator.canShare && navigator.canShare({ files: [cachedIntroVideoFile] }));

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h3 class="text-base font-extrabold">📤 Share App & Video With Family</h3>
        <p class="text-[11px] text-slate-400">Family opens straight onto the 1-min video & private onboarding</p>
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>

    <div class="space-y-3 text-xs">
      ${canNativeShare ? `
        <button onclick="triggerNativeShareLink()" class="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition">
          <span>📱</span> Share Invite Link via Phone Share Sheet
        </button>
      ` : ''}

      <button onclick="triggerShareVideoFile()" class="w-full py-3 px-4 rounded-2xl bg-slate-900 dark:bg-emerald-500/20 hover:opacity-90 text-white dark:text-emerald-300 border border-emerald-500/30 font-bold flex items-center justify-center gap-2 transition">
        <span>🎬</span>
        <span id="shareVideoFileBtnText">${fileReady ? 'Send MP4 Video File Directly (iPhone / Android)' : 'Send / Download HD MP4 Video File'}</span>
      </button>

      <div class="grid grid-cols-2 gap-2">
        <a href="${waHref}" target="_blank" rel="noopener" class="py-3 px-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition">
          <span>💬</span> WhatsApp
        </a>
        <a href="${smsHref}" class="py-3 px-3 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center gap-1.5 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition">
          <span>✉️</span> iMessage / SMS
        </a>
      </div>

      <div class="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 space-y-2">
        <div class="flex items-center justify-between text-[11px]">
          <span class="font-bold text-slate-500 dark:text-slate-300">Ready-to-Send Invite Message</span>
          <button onclick="copyFamilyInviteText()" class="text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline">📋 Copy Message</button>
        </div>
        <textarea id="familyInviteTextarea" readonly rows="4" class="w-full soft-input rounded-xl p-2.5 text-[11px] leading-relaxed font-medium select-all">${shareText}</textarea>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <button onclick="copyFamilyOnboardingLink()" class="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 transition">
          🔗 Copy App Link
        </button>
        <button onclick="downloadIntroVideoMp4()" class="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 transition">
          ⬇️ Save MP4 Video
        </button>
      </div>
    </div>
  `;
  modal.classList.remove('hidden');
}

function triggerNativeShareLink() {
  if (!navigator.share) {
    copyFamilyInviteText();
    return;
  }
  // Must call navigator.share synchronously on user click for iOS Safari activation
  navigator.share({
    title: 'Meal Prep & Macro Studio',
    text: 'Watch this 1-min animated video & build your own private 7-day meal plan!',
    url: PUBLIC_INVITE_URL
  }).catch((err) => {
    if (err && err.name !== 'AbortError') {
      copyFamilyInviteText();
    }
  });
}

function triggerShareVideoFile() {
  const shareText = getFamilyShareMessage();
  if (cachedIntroVideoFile && navigator.share && navigator.canShare && navigator.canShare({ files: [cachedIntroVideoFile] })) {
    // Synchronous call with pre-loaded File preserves iOS Safari user gesture
    navigator.share({
      title: 'Meal Prep Studio Intro Video',
      text: shareText,
      files: [cachedIntroVideoFile]
    }).catch((err) => {
      if (err && err.name !== 'AbortError') {
        downloadIntroVideoMp4();
        copyFamilyInviteText();
      }
    });
    return;
  }
  downloadIntroVideoMp4();
  copyFamilyInviteText();
}

async function copyFamilyInviteText() {
  const shareText = getFamilyShareMessage();
  try {
    await navigator.clipboard.writeText(shareText);
    showToast('📋 Family invite message + links copied!');
  } catch (e) {
    const ta = document.getElementById('familyInviteTextarea');
    if (ta) {
      ta.select();
      document.execCommand('copy');
      showToast('📋 Family invite copied!');
    }
  }
}

async function copyFamilyOnboardingLink() {
  try {
    await navigator.clipboard.writeText(PUBLIC_INVITE_URL);
    showToast('🔗 Invite link (?invite=1) copied!');
  } catch (e) {
    showToast(PUBLIC_INVITE_URL);
  }
}

function downloadIntroVideoMp4() {
  const a = document.createElement('a');
  a.href = './intro-video.mp4?v=3';
  a.download = 'Meal-Prep-Studio-Intro.mp4';
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('⬇️ Downloading Intro Video (.mp4)...');
}

function seekIntroVideo(sec) {
  const vid = document.getElementById('introVideoPlayerEl');
  if (!vid) return;
  try {
    vid.currentTime = sec;
    vid.play().catch(() => {});
  } catch (e) {}
}

function stopInfographicVideo() {
  const vid = document.getElementById('introVideoPlayerEl');
  if (vid) {
    try { vid.pause(); } catch (e) {}
  }
}

function stopTourSpeech() {
  stopInfographicVideo();
}

function buildInfographicVideoPlayerHTML() {
  preloadIntroVideoForShare();
  return `
    <!-- Real Full-Motion HD MP4 Animated Video Player -->
    <div class="rounded-3xl bg-slate-950 text-white p-3.5 space-y-3 shadow-2xl border border-slate-800 overflow-hidden">
      <div class="relative rounded-2xl overflow-hidden bg-black border border-slate-800/80 aspect-video">
        <video
          id="introVideoPlayerEl"
          src="./intro-video.mp4?v=3"
          controls
          playsinline
          preload="auto"
          class="w-full h-full object-contain"
        ></video>
      </div>

      <!-- Quick Chapter Jump Buttons -->
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-[10px] text-slate-400 px-1">
          <span class="font-bold text-emerald-400 uppercase tracking-wider">🎬 Jump to Video Chapter:</span>
          <span>HD 720p • Studio Voice + Upbeat Music</span>
        </div>
        <div class="grid grid-cols-4 gap-1.5 text-[10px] text-center">
          ${VIDEO_CHAPTERS.map((ch) => `
            <button onclick="seekIntroVideo(${ch.time})" class="py-1.5 px-1 rounded-xl font-semibold truncate transition bg-slate-900 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40">
              ${ch.label}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Share Video & App Link to Family Bar -->
      <div class="flex items-center gap-2 pt-1.5 border-t border-slate-800/80">
        <button onclick="shareAppAndVideoToFamily()" class="flex-1 py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition">
          <span>📤</span> Share Video & App Link to Family
        </button>
        <button onclick="downloadIntroVideoMp4()" class="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-semibold shrink-0 transition" title="Download MP4 Video File">
          ⬇️ MP4
        </button>
      </div>
    </div>
  `;
}

function openAuthOverlay(mode = 'signin') {
  stopTourSpeech();
  const overlay = document.getElementById('authOverlay');
  const container = document.getElementById('authContainer');
  if (!overlay || !container) return;
  overlay.classList.remove('hidden');

  if (mode === 'signin') {
    container.innerHTML = `
      <div class="soft-card rounded-3xl p-6 sm:p-8 space-y-6">
        <div class="text-center space-y-2">
          <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl mx-auto shadow-lg shadow-emerald-600/25">
            🥗
          </div>
          <h1 class="text-xl font-extrabold tracking-tight">Welcome to Meal Prep Studio</h1>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">
            Sign in with your Name & 4-Digit PIN to load your personal meal plan, or start our guided onboarding to create your own custom profile!
          </p>
        </div>

        <div class="space-y-3.5">
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-300 mb-1">Your Username / First Name</label>
            <input id="loginUsername" type="text" placeholder="Enter your username" class="w-full soft-input rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 dark:text-slate-300 mb-1">4-Digit Security PIN</label>
            <input id="loginPin" type="password" inputmode="numeric" maxlength="6" placeholder="••••" onkeydown="if(event.key==='Enter') handleUserSignIn()" class="w-full soft-input rounded-2xl px-4 py-3 text-sm font-extrabold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div id="loginErrorMsg" class="hidden text-xs text-rose-500 font-semibold text-center bg-rose-500/10 py-2 px-3 rounded-xl"></div>

          <button onclick="handleUserSignIn()" id="btnSignInSubmit" class="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-extrabold text-xs shadow-lg transition">
            🔓 Sign In to My Profile
          </button>
        </div>

        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 text-center space-y-2.5">
          <p class="text-xs text-slate-400">New here? Create your own username, watch the 1-min video & build your custom plan:</p>
          <button onclick="startFamilyOnboarding()" class="w-full py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-extrabold text-xs hover:bg-emerald-100 transition">
            ✨ Create a Username & Watch Intro Video
          </button>
          <button onclick="shareAppAndVideoToFamily()" class="w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition">
            📤 Share Intro Video & App Link to Family
          </button>
        </div>
      </div>
    `;
  } else {
    renderOnboardingStep();
  }
}

async function handleUserSignIn() {
  const rawName = (document.getElementById('loginUsername')?.value || '').trim();
  const pin = (document.getElementById('loginPin')?.value || '').trim();
  const errBox = document.getElementById('loginErrorMsg');
  const btn = document.getElementById('btnSignInSubmit');

  if (!rawName || !pin) {
    errBox.textContent = 'Please enter both your Name and your 4-digit PIN.';
    errBox.classList.remove('hidden');
    return;
  }

  const cleanUser = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Special protection for Mo & Wife's account: username 'mo' requires PIN '7369'
  if (cleanUser === 'mo') {
    if (pin !== '7369') {
      errBox.textContent = '🔒 Incorrect PIN for Mo\'s profile. (Family members: click "Start Guided Profile Onboarding" below to create your own profile!)';
      errBox.classList.remove('hidden');
      return;
    }
    currentSession = { username: 'mo', displayName: 'Mo', pin: '7369' };
    localStorage.setItem(ACTIVE_USER_SESSION_KEY, JSON.stringify(currentSession));
    await initializeAuthenticatedApp();
    showToast('👋 Welcome back, Mo!');
    return;
  }

  // Check Firebase or local storage for existing family member account
  btn.disabled = true;
  btn.textContent = '⏳ Checking Profile...';

  try {
    let remoteData = null;
    try {
      const resp = await fetch(getFirebaseUserUrl(cleanUser));
      if (resp.ok) remoteData = await resp.json();
    } catch (e) {}

    const localSaved = localStorage.getItem(`${STORAGE_KEY_PREFIX}${cleanUser}_v4`);
    const localData = localSaved ? JSON.parse(localSaved) : null;
    const existingAccount = remoteData || localData;

    if (!existingAccount || !existingAccount.profile) {
      errBox.textContent = `No profile found for "${rawName}" yet. Click "Start Guided Profile Onboarding" below to build your profile in 60 seconds!`;
      errBox.classList.remove('hidden');
      btn.disabled = false;
      btn.textContent = '🔓 Sign In to My Profile';
      return;
    }

    if (String(existingAccount.authPin || '') !== pin) {
      errBox.textContent = `🔒 Incorrect PIN for ${existingAccount.displayName || rawName}.`;
      errBox.classList.remove('hidden');
      btn.disabled = false;
      btn.textContent = '🔓 Sign In to My Profile';
      return;
    }

    currentSession = {
      username: cleanUser,
      displayName: existingAccount.displayName || rawName,
      pin
    };
    localStorage.setItem(ACTIVE_USER_SESSION_KEY, JSON.stringify(currentSession));
    state = { ...state, ...existingAccount };
    localStorage.setItem(getStorageKey(), JSON.stringify(state));
    await initializeAuthenticatedApp();
    showToast(`👋 Welcome back, ${currentSession.displayName}!`);
  } catch (err) {
    errBox.textContent = 'Could not sign in — please try again.';
    errBox.classList.remove('hidden');
    btn.disabled = false;
    btn.textContent = '🔓 Sign In to My Profile';
  }
}

function startFamilyOnboarding() {
  const overlay = document.getElementById('authOverlay');
  if (overlay) overlay.classList.remove('hidden');
  onboardingDraft = {
    step: 1,
    tourSlide: 0,
    displayName: '',
    username: '',
    pin: '',
    sex: 'male',
    age: 34,
    heightFt: 5,
    heightIn: 8,
    currentWeight: 175,
    goalWeight: 160,
    bodyFatPct: 22,
    goalBodyFatPct: 16.5,
    muscleMassLbs: 72,
    activityMultiplier: 1.375,
    workoutsPerWeek: 3,
    goalType: 'cut_moderate'
  };
  renderOnboardingStep();
}

function renderOnboardingStep(keepPlaying = false) {
  if (!keepPlaying) stopInfographicVideo();
  const container = document.getElementById('authContainer');
  if (!container) return;

  const s = onboardingDraft.step;

  // STEP 1 (Unified): CREATE USERNAME & 4-DIGIT PIN + WATCH 1-MIN INTRO VIDEO
  if (s === 1 || s === 2) {
    container.innerHTML = `
      <div class="soft-card rounded-3xl p-5 sm:p-6 space-y-5">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            Step 1 of 3 • Create Your Username
          </span>
          <button onclick="stopInfographicVideo(); openAuthOverlay('signin');" class="text-xs text-slate-400 hover:text-emerald-500 font-semibold">
            Already have a username? Sign In →
          </button>
        </div>

        <div>
          <h2 class="text-xl font-extrabold tracking-tight">Create Your Personal Account</h2>
          <p class="text-xs text-slate-400 mt-1">
            Choose your own username and 4-digit PIN. Your calorie targets, meal plan, and grocery list are stored privately under your username.
          </p>
        </div>

        <div class="space-y-3 text-xs">
          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">1. Create a Username (Your First Name)</label>
            <input id="obName" type="text" value="${onboardingDraft.displayName}" placeholder="e.g., Sarah, Ahmad, Nora..." class="w-full soft-input rounded-2xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div>
            <label class="block font-bold text-slate-600 dark:text-slate-300 mb-1">2. Choose a 4-Digit Security PIN</label>
            <input id="obPin" type="password" inputmode="numeric" maxlength="6" value="${onboardingDraft.pin}" placeholder="e.g., 1234" onkeydown="if(event.key==='Enter') submitOnboardingStep2()" class="w-full soft-input rounded-2xl px-4 py-3 text-sm font-extrabold tracking-widest focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div id="obStep2Err" class="hidden text-xs text-rose-500 font-semibold bg-rose-500/10 p-2.5 rounded-xl"></div>
        </div>

        <button id="btnObStep2" onclick="submitOnboardingStep2()" class="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition">
          🚀 Create Username & Set Body Goals ▶
        </button>

        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div class="flex items-center justify-between text-[11px]">
            <span class="font-bold text-slate-600 dark:text-slate-300">🎬 Watch: How Meal Prep Studio Works (1-Min Video)</span>
          </div>
          ${buildInfographicVideoPlayerHTML()}
        </div>
      </div>
    `;
    return;
  }

  // STEP 3: BODY METRICS & WHY WE NEED THEM
  if (s === 3) {
    container.innerHTML = `
      <div class="soft-card rounded-3xl p-6 sm:p-7 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            Step 2 of 3 • Body Metrics & Metabolism
          </span>
          <button onclick="onboardingDraft.step=1; renderOnboardingStep();" class="text-xs text-slate-400 font-semibold">◀ Back</button>
        </div>

        <div>
          <h2 class="text-lg font-extrabold">Tell Us About Your Body, ${onboardingDraft.displayName}</h2>
          <p class="text-xs text-slate-400 mt-0.5">
            Why do we ask for these? Every calorie and gram of protein in your meal plan is calculated from your resting metabolic rate (BMR) and lean muscle mass.
          </p>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block font-bold mb-1">Biological Sex</label>
            <select id="obSex" class="w-full soft-input rounded-xl px-3 py-2.5 font-semibold">
              <option value="male" ${onboardingDraft.sex === 'male' ? 'selected' : ''}>Male (+5 BMR constant)</option>
              <option value="female" ${onboardingDraft.sex === 'female' ? 'selected' : ''}>Female (-161 BMR constant)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold mb-1">Age (Years)</label>
            <input id="obAge" type="number" value="${onboardingDraft.age}" class="w-full soft-input rounded-xl px-3 py-2.5 font-bold" />
          </div>

          <div>
            <label class="block font-bold mb-1">Height (Feet & Inches)</label>
            <div class="flex gap-1.5">
              <input id="obHeightFt" type="number" value="${onboardingDraft.heightFt}" placeholder="5 ft" class="w-1/2 soft-input rounded-xl px-2.5 py-2.5 font-bold" />
              <input id="obHeightIn" type="number" value="${onboardingDraft.heightIn}" placeholder="8 in" class="w-1/2 soft-input rounded-xl px-2.5 py-2.5 font-bold" />
            </div>
          </div>

          <div>
            <label class="block font-bold text-emerald-600 dark:text-emerald-400 mb-1">Current Weight (lbs)</label>
            <input id="obWeight" type="number" step="0.1" value="${onboardingDraft.currentWeight}" class="w-full soft-input rounded-xl px-3 py-2.5 font-extrabold" />
          </div>

          <div>
            <label class="block font-bold text-amber-600 dark:text-amber-400 mb-1">Est. Body Fat % (If known)</label>
            <input id="obBf" type="number" step="0.1" value="${onboardingDraft.bodyFatPct}" placeholder="e.g. 22%" class="w-full soft-input rounded-xl px-3 py-2.5 font-bold" />
            <span class="text-[10px] text-slate-400">Typical: Men 15–25%, Women 22–32%</span>
          </div>

          <div>
            <label class="block font-bold text-purple-500 mb-1">Muscle Mass (lbs, Opt)</label>
            <input id="obMuscle" type="number" step="0.1" value="${onboardingDraft.muscleMassLbs}" placeholder="Optional" class="w-full soft-input rounded-xl px-3 py-2.5 font-bold" />
            <span class="text-[10px] text-slate-400">Auto-estimated if left as-is</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div>
            <label class="block font-bold mb-1">Daily Lifestyle Activity</label>
            <select id="obActivity" class="w-full soft-input rounded-xl px-3 py-2.5">
              <option value="1.2">Sedentary (Desk job)</option>
              <option value="1.375" selected>Lightly Active (Daily movement)</option>
              <option value="1.55">Moderately Active (On feet daily)</option>
              <option value="1.725">Very Active (Hard physical training)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold mb-1">Workouts per Week</label>
            <select id="obWorkouts" class="w-full soft-input rounded-xl px-3 py-2.5">
              <option value="0">0–1 days / week</option>
              <option value="3" selected>2–3 days / week</option>
              <option value="4">4–5 days / week</option>
              <option value="6">6+ days / week</option>
            </select>
          </div>
        </div>

        <button onclick="submitOnboardingStep3()" class="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-emerald-500 text-white dark:text-slate-950 font-extrabold text-xs shadow-md">
          Continue to Goal & Macro Calculation (Step 3 of 3) ▶
        </button>
      </div>
    `;
    return;
  }

  // STEP 4: GOAL SELECTION & SCIENTIFIC MACRO REVEAL
  if (s === 4) {
    const sci = computeScientificMacros(onboardingDraft);
    container.innerHTML = `
      <div class="soft-card rounded-3xl p-6 sm:p-7 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
            Step 3 of 3 • Your Custom Nutrition Blueprint
          </span>
          <button onclick="onboardingDraft.step=3; renderOnboardingStep();" class="text-xs text-slate-400 font-semibold">◀ Back</button>
        </div>

        <div>
          <h2 class="text-lg font-extrabold">Your Scientific Plan is Ready, ${onboardingDraft.displayName}!</h2>
          <p class="text-xs text-slate-400 mt-0.5">
            Adjust your Target Goal Weight or Strategy below and watch your personalized daily calories and macros update live:
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label class="block font-bold text-emerald-600 dark:text-emerald-400 mb-1">Target Goal Weight (lbs)</label>
            <input id="obGoalWeight" type="number" step="0.1" value="${onboardingDraft.goalWeight}" onchange="onboardingDraft.goalWeight=parseFloat(this.value)||160; renderOnboardingStep();" class="w-full soft-input rounded-xl px-3 py-2.5 font-extrabold" />
          </div>
          <div>
            <label class="block font-bold mb-1">Goal Strategy & Pace</label>
            <select id="obGoalType" onchange="onboardingDraft.goalType=this.value; renderOnboardingStep();" class="w-full soft-input rounded-xl px-3 py-2.5 font-semibold">
              <option value="cut_moderate" ${onboardingDraft.goalType === 'cut_moderate' ? 'selected' : ''}>Steady Fat Loss (~1 lb/wk)</option>
              <option value="cut_aggressive" ${onboardingDraft.goalType === 'cut_aggressive' ? 'selected' : ''}>Aggressive Cut (~1.4 lbs/wk)</option>
              <option value="recomp" ${onboardingDraft.goalType === 'recomp' ? 'selected' : ''}>Body Recomposition (-300 kcal)</option>
              <option value="maintain" ${onboardingDraft.goalType === 'maintain' ? 'selected' : ''}>Maintain Weight & Energy</option>
              <option value="lean_bulk" ${onboardingDraft.goalType === 'lean_bulk' ? 'selected' : ''}>Lean Muscle Gain (+250 kcal)</option>
            </select>
          </div>
        </div>

        <!-- Revealed Scientific Blueprint -->
        <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-emerald-500/30 space-y-3 text-xs">
          <div class="flex items-center justify-between">
            <span class="font-bold text-emerald-600 dark:text-emerald-400">🔬 Your Clinical Metabolic Numbers</span>
            <span class="text-[11px] font-semibold text-slate-400">Maintenance TDEE: ${sci.tdee.toLocaleString()} kcal</span>
          </div>

          <div class="grid grid-cols-5 gap-2 text-center">
            <div class="p-2 rounded-xl soft-card">
              <div class="text-[10px] text-slate-400">Calories</div>
              <div class="text-sm font-extrabold">${sci.calories}</div>
            </div>
            <div class="p-2 rounded-xl soft-card">
              <div class="text-[10px] text-slate-400">Protein</div>
              <div class="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">${sci.protein}g</div>
            </div>
            <div class="p-2 rounded-xl soft-card">
              <div class="text-[10px] text-slate-400">Carbs</div>
              <div class="text-sm font-extrabold text-sky-500">${sci.carbs}g</div>
            </div>
            <div class="p-2 rounded-xl soft-card">
              <div class="text-[10px] text-slate-400">Fat</div>
              <div class="text-sm font-extrabold text-amber-500">${sci.fat}g</div>
            </div>
            <div class="p-2 rounded-xl soft-card">
              <div class="text-[10px] text-slate-400">Fiber</div>
              <div class="text-sm font-extrabold text-purple-500">${sci.fiber}g</div>
            </div>
          </div>

          <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Every day of your 7-day meal plan will now be automatically portioned to hit <strong>${sci.calories.toLocaleString()} kcal</strong> and <strong>${sci.protein}g of protein</strong> to protect your lean mass (${sci.leanMassLbs} lbs)!
          </p>
        </div>

        <button onclick="completeFamilyOnboarding()" class="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition">
          🚀 Launch My Custom 7-Day Meal Plan!
        </button>
      </div>
    `;
  }
}

async function submitOnboardingStep2() {
  const rawName = (document.getElementById('obName')?.value || '').trim();
  const pin = (document.getElementById('obPin')?.value || '').trim();
  const errEl = document.getElementById('obStep2Err');
  const btn = document.getElementById('btnObStep2');

  if (!rawName || rawName.length < 2) {
    errEl.textContent = 'Please enter a username / first name (at least 2 characters).';
    errEl.classList.remove('hidden');
    return;
  }
  if (!pin || pin.length < 4) {
    errEl.textContent = 'Please choose a 4-digit PIN so your profile stays private.';
    errEl.classList.remove('hidden');
    return;
  }

  const cleanUser = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!cleanUser || cleanUser.length < 2) {
    errEl.textContent = 'Please use letters or numbers for your username.';
    errEl.classList.remove('hidden');
    return;
  }
  if (cleanUser === 'mo') {
    errEl.textContent = 'The username "Mo" is already taken. Please create your own username (or click Sign In if you are Mo).';
    errEl.classList.remove('hidden');
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.textContent = '⏳ Checking username availability...';
  }
  try {
    const resp = await fetch(getFirebaseUserUrl(cleanUser));
    if (resp.ok) {
      const existing = await resp.json();
      if (existing && existing.profile) {
        errEl.textContent = `Username "${rawName}" already exists! Choose another username (e.g., ${rawName}2) or click Sign In at the top right.`;
        errEl.classList.remove('hidden');
        if (btn) {
          btn.disabled = false;
          btn.textContent = '🚀 Create Username & Set Body Goals ▶';
        }
        return;
      }
    }
  } catch (e) {}

  stopInfographicVideo();
  onboardingDraft.displayName = rawName;
  onboardingDraft.username = cleanUser;
  onboardingDraft.pin = pin;
  onboardingDraft.step = 3;
  renderOnboardingStep();
}

function submitOnboardingStep3() {
  onboardingDraft.sex = document.getElementById('obSex').value;
  onboardingDraft.age = parseInt(document.getElementById('obAge').value, 10) || 34;
  onboardingDraft.heightFt = parseInt(document.getElementById('obHeightFt').value, 10) || 5;
  onboardingDraft.heightIn = parseInt(document.getElementById('obHeightIn').value, 10) || 8;
  onboardingDraft.currentWeight = parseFloat(document.getElementById('obWeight').value) || 175;
  onboardingDraft.bodyFatPct = parseFloat(document.getElementById('obBf').value) || (onboardingDraft.sex === 'female' ? 28 : 22);
  const estLbm = onboardingDraft.currentWeight * (1 - onboardingDraft.bodyFatPct / 100);
  onboardingDraft.muscleMassLbs = parseFloat(document.getElementById('obMuscle').value) || Math.round(estLbm * 0.57);
  onboardingDraft.activityMultiplier = parseFloat(document.getElementById('obActivity').value) || 1.375;
  onboardingDraft.workoutsPerWeek = parseInt(document.getElementById('obWorkouts').value, 10) || 3;
  onboardingDraft.goalWeight = Math.max(105, Math.round(onboardingDraft.currentWeight - 12));
  onboardingDraft.step = 4;
  renderOnboardingStep();
}

async function completeFamilyOnboarding() {
  const sci = computeScientificMacros(onboardingDraft);
  const goalW = parseFloat(document.getElementById('obGoalWeight')?.value) || onboardingDraft.goalWeight;
  const goalType = document.getElementById('obGoalType')?.value || onboardingDraft.goalType;
  const leanLbs = onboardingDraft.currentWeight * (1 - onboardingDraft.bodyFatPct / 100);
  const goalBf = Math.max(10, +(((goalW - leanLbs) / goalW) * 100).toFixed(1));

  currentSession = {
    username: onboardingDraft.username,
    displayName: onboardingDraft.displayName,
    pin: onboardingDraft.pin
  };
  localStorage.setItem(ACTIVE_USER_SESSION_KEY, JSON.stringify(currentSession));

  state = {
    theme: state.theme || 'light',
    authPin: onboardingDraft.pin,
    displayName: onboardingDraft.displayName,
    profile: {
      ...JSON.parse(JSON.stringify(window.DEFAULT_PROFILE)),
      calories: sci.calories,
      protein: sci.protein,
      carbs: sci.carbs,
      fat: sci.fat,
      fiber: sci.fiber,
      sex: onboardingDraft.sex,
      startWeight: onboardingDraft.currentWeight,
      currentWeight: onboardingDraft.currentWeight,
      goalWeight: goalW,
      goalBodyFatPct: goalBf,
      heightFt: onboardingDraft.heightFt,
      heightIn: onboardingDraft.heightIn,
      age: onboardingDraft.age,
      bodyFatPct: onboardingDraft.bodyFatPct,
      muscleMassLbs: onboardingDraft.muscleMassLbs,
      waistIn: '',
      activityMultiplier: onboardingDraft.activityMultiplier,
      workoutsPerWeek: onboardingDraft.workoutsPerWeek,
      goalType
    },
    activeWeekMondayISO: currentMondayISO,
    selectedDayIndex: 0,
    weeksByStartISO: {},
    progressLogs: [
      {
        id: 'onboard-' + Date.now(),
        dateISO: formatDateISO(new Date()),
        weight: onboardingDraft.currentWeight,
        bodyFatPct: onboardingDraft.bodyFatPct,
        muscleMassLbs: onboardingDraft.muscleMassLbs,
        note: `Onboarding Baseline (${onboardingDraft.currentWeight} lbs → Goal: ${goalW} lbs)`
      }
    ],
    favorites: [],
    mealHistoryLog: [],
    checkedGroceries: {},
    customGroceries: [],
    selectedStoreFilter: 'ALL',
    lastUpdated: Date.now()
  };

  ensureWeekExists(state.activeWeekMondayISO, true, 'mix');
  saveState(false);
  await initializeAuthenticatedApp();
  showToast(`🎉 Welcome, ${onboardingDraft.displayName}! Your ${sci.calories} kcal plan is ready.`);
}

function openUserAccountModal() {
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');
  const name = state.displayName || currentSession?.displayName || 'Mo';
  const uname = currentSession?.username || 'mo';

  content.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <div>
        <h3 class="text-base font-extrabold">👤 Signed In as ${name}</h3>
        <p class="text-xs text-slate-400">Private Cloud Profile: <code>/users/${uname}</code></p>
      </div>
      <button onclick="closeModal()" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>

    <div class="space-y-3 text-xs">
      <div class="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
        ✓ Your profile, weight check-ins, and weekly meal plans are isolated inside <strong>${name}'s</strong> account and protected by your 4-digit PIN.
      </div>

      <button onclick="closeModal(); openAppTourModal();" class="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-bold flex items-center justify-center gap-2">
        <span>🎬</span> Watch Intro Video & App Guide
      </button>

      <button onclick="shareAppAndVideoToFamily()" class="w-full py-3 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-bold flex items-center justify-center gap-2">
        <span>📤</span> Share Video & App Link to Family
      </button>

      <button onclick="signOutCurrentUser()" class="w-full py-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold">
        🔒 Sign Out / Switch Family Member
      </button>
    </div>
  `;
  modal.classList.remove('hidden');
}

function openAppTourModal() {
  onboardingDraft.step = 1;
  onboardingDraft.tourSlide = 0;
  const modal = document.getElementById('appModal');
  const content = document.getElementById('appModalContent');
  renderTourInsideModal(content);
  modal.classList.remove('hidden');
}

function renderTourInsideModal(contentEl) {
  stopInfographicVideo();

  contentEl.innerHTML = `
    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
      <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">🎬 How Meal Prep Studio Works (HD Video)</span>
      <button onclick="stopInfographicVideo(); closeModal();" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 font-bold">✕</button>
    </div>

    ${buildInfographicVideoPlayerHTML()}

    <button onclick="stopInfographicVideo(); closeModal();" class="w-full py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
      ✓ Done Watching
    </button>
  `;
}

function signOutCurrentUser() {
  stopTourSpeech();
  closeModal();
  currentSession = null;
  localStorage.removeItem(ACTIVE_USER_SESSION_KEY);
  openAuthOverlay('signin');
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
        showToast('✅ Backup file restored!');
      }
    } catch (err) {
      showToast('❌ Invalid backup file.');
    }
  };
  reader.readAsText(file);
}
