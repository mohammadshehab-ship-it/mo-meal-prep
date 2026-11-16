// Default Starter 7-Day Meal Plan & Recipes
// Exact Daily Macro Targets: 1,800 kcal, 135g Protein, 156g Carbs, 70g Fat, 35g Fiber
window.DEFAULT_PROFILE = {
  "calories": 1800,
  "protein": 135,
  "carbs": 156,
  "fat": 70,
  "fiber": 35,
  "tolerancePct": 5,
  "prepStyle": "mix",
  "exclusions": [
    "Pork",
    "Bacon",
    "Ham",
    "Gelatin",
    "Salmon",
    "Tuna",
    "Cod",
    "Crab",
    "Lobster"
  ],
  "favoriteIngredients": [
    "Chicken Shawarma Spices",
    "Garlic Toum / Yogurt Sauce",
    "Shrimp",
    "Tilapia",
    "Lean Ground Beef",
    "Avocado",
    "Berries",
    "Chickpeas",
    "Air Fryer Crispy Potatoes"
  ],
  "equipment": [
    "Air Fryer",
    "Instant Pot",
    "Grill",
    "Rice Cooker",
    "Stovetop",
    "Oven"
  ],
  "geminiApiKey": "",
  "syncRoomId": ""
};

window.STORE_INFO = {
  "Joe Randazzo's (Westland)": {
    "badgeClass": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    "icon": "🥬",
    "note": "Best & cheapest fresh fruits, vegetables, and fresh herbs"
  },
  "Greenland Market / Papaya (Canton)": {
    "badgeClass": "bg-amber-500/20 text-amber-300 border-amber-500/40",
    "icon": "🥩",
    "note": "Fresh Halal meats, Arabic spices, pita, labneh, tahini"
  },
  "Costco / Sam's Club (Canton)": {
    "badgeClass": "bg-blue-500/20 text-blue-300 border-blue-500/40",
    "icon": "📦",
    "note": "Bulk Halal chicken/beef, frozen shrimp & tilapia, Greek yogurt, eggs"
  },
  "Walmart / Meijer / Kroger / Target (Canton)": {
    "badgeClass": "bg-purple-500/20 text-purple-300 border-purple-500/40",
    "icon": "🛒",
    "note": "Everyday pantry items, canned goods, low-carb wraps & condiments"
  }
};

window.STARTER_WEEK_PLAN = [
  {
    "day": "Monday",
    "primaryProtein": "Chicken",
    "prepNote": "Batch Prep Day: Cook 2 portions of Shawarma Bowl (eat Mon & Wed)",
    "meals": [
      {
        "id": "mon-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Mediterranean High-Protein Egg & Labneh Za'atar Wrap",
        "appliance": "Stovetop (5 mins)",
        "prepTime": "8 mins",
        "primaryProtein": "Eggs & Dairy",
        "calories": 485,
        "protein": 34,
        "carbs": 38,
        "fat": 22,
        "fiber": 11,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 15g crumbled Feta & 1 tsp Chili Crisp",
          "calories": 80,
          "protein": 3,
          "carbs": 1,
          "fat": 7,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Large Eggs",
            "amount": "2 whole + 2 egg whites",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "High-Fiber Carb Balance Whole Wheat Tortilla",
            "amount": "1 large (70g)",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Labneh (or Thick Greek Yogurt)",
            "amount": "2 tbsp (30g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Za'atar Seasoning",
            "amount": "1 tsp",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Baby Spinach & Roma Tomato",
            "amount": "1 cup spinach, 1/2 diced tomato",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Olive Oil Spray",
            "amount": "1 tsp (5g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Spread 2 tbsp labneh across the high-fiber tortilla and sprinkle generously with za'atar.",
          "Heat a non-stick skillet over medium heat with olive oil. Toss in baby spinach and diced tomato for 60 seconds until slightly wilted.",
          "Pour in whisked 2 whole eggs + 2 egg whites seasoned with salt and black pepper. Scramble softly for 2 minutes.",
          "Layer warm eggs over the labneh tortilla, roll tightly into a burrito, and sear seam-side down in the warm pan for 45 seconds per side until golden crispy."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=g_3_iw7gljE"
      },
      {
        "id": "mon-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "Air Fryer Crispy Chicken Shawarma Bowl with Garlic Yogurt & Spiced Chickpeas",
        "appliance": "Air Fryer + Rice Cooker (18 mins)",
        "prepTime": "20 mins",
        "primaryProtein": "Chicken",
        "calories": 865,
        "protein": 63,
        "carbs": 76,
        "fat": 31,
        "fiber": 12,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 1 tbsp Authentic Garlic Toum & Toasted Pine Nuts (10g)",
          "calories": 115,
          "protein": 2,
          "carbs": 2,
          "fat": 11,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Halal Chicken Breast or Trimmed Thighs",
            "amount": "7 oz (200g) raw",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Chickpeas (Garbanzo Beans)",
            "amount": "1/2 cup (85g) rinsed",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Basmati Rice (cooked)",
            "amount": "3/4 cup (120g) cooked",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Cucumber, Parsley & Red Onion",
            "amount": "1 cup chopped salad",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "0% Plain Greek Yogurt (for Garlic Sauce)",
            "amount": "1/4 cup (60g) + lemon + 1 garlic clove",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Extra Virgin Olive Oil & Shawarma Spice Blend",
            "amount": "1 tbsp oil + 1 tbsp Shawarma spice",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Toss cubed Halal chicken and rinsed chickpeas with 1 tbsp olive oil, 1 tbsp Arabic shawarma seasoning, garlic powder, salt, and lemon juice.",
          "Preheat Air Fryer to 400°F (200°C). Air fry the chicken and chickpeas together for 12–14 minutes, shaking the basket halfway through until edges are charred and chickpeas are crispy.",
          "While air frying, whisk 1/4 cup Greek yogurt with grated garlic, lemon juice, a pinch of salt, and 1 tbsp cold water for a drizzleable white shawarma sauce.",
          "Build your bowl with warm basmati rice, chopped cucumber-parsley-onion salad, crispy shawarma chicken & chickpeas, and drizzle with garlic sauce."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=R6e7HItOVNA",
        "articleUrl": "https://feelgoodfoodie.net/recipe/chicken-shawarma/"
      },
      {
        "id": "mon-s1",
        "slot": "Snack 1",
        "name": "Blackberry Chia Greek Yogurt Power Bowl",
        "appliance": "No-Cook (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Dairy",
        "calories": 255,
        "protein": 24,
        "carbs": 24,
        "fat": 7,
        "fiber": 8,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Drizzle 1 tsp Raw Honey & 10g Crushed Pistachios",
          "calories": 75,
          "protein": 2,
          "carbs": 7,
          "fat": 4,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "0% Plain or Vanilla Greek Yogurt",
            "amount": "1 cup (225g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Fresh Blackberries",
            "amount": "3/4 cup (100g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Chia Seeds",
            "amount": "1 tbsp (12g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Scoop Greek yogurt into a chilled bowl and stir in chia seeds (let sit 2 minutes for texture).",
          "Top with fresh blackberries from Joe Randazzo's and a dash of cinnamon."
        ]
      },
      {
        "id": "mon-s2",
        "slot": "Snack 2",
        "name": "Roasted Almonds & Crisp Honeycrisp Apple Slices",
        "appliance": "No-Cook (2 mins)",
        "prepTime": "2 mins",
        "primaryProtein": "Plant / Nuts",
        "calories": 195,
        "protein": 14,
        "carbs": 18,
        "fat": 10,
        "fiber": 4,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 1 tbsp Warm Cinnamon Almond Butter Dip",
          "calories": 95,
          "protein": 3,
          "carbs": 3,
          "fat": 8,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "Small Honeycrisp Apple",
            "amount": "1 small (120g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Roasted Salted Almonds",
            "amount": "18g (~15 almonds)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Light String Cheese (or 1/2 scoop Whey Isolate)",
            "amount": "1 stick / 15g protein",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          }
        ],
        "steps": [
          "Slice the Honeycrisp apple into wedges and sprinkle with cinnamon.",
          "Pair with roasted almonds and string cheese (or protein shake side) to lock in daily protein target."
        ]
      }
    ]
  },
  {
    "day": "Tuesday",
    "primaryProtein": "Shrimp",
    "prepNote": "Protein Rotation: Switching from Chicken (Mon) to Cajun Garlic Shrimp",
    "meals": [
      {
        "id": "tue-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Crispy Air Fryer Turkey Bacon, Egg & Avocado Smash Toast",
        "appliance": "Air Fryer + Stovetop (8 mins)",
        "prepTime": "10 mins",
        "primaryProtein": "Turkey & Eggs",
        "calories": 495,
        "protein": 35,
        "carbs": 36,
        "fat": 23,
        "fiber": 10,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add Hot Honey Drizzle (1 tsp) & Everything Bagel Seasoning",
          "calories": 45,
          "protein": 0,
          "carbs": 11,
          "fat": 0,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Keto / High-Fiber Whole Grain Bread",
            "amount": "2 slices",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Halal Turkey Bacon",
            "amount": "2 slices",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Large Eggs",
            "amount": "2 whole + 2 egg whites",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Hass Avocado",
            "amount": "1/2 medium (70g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Air fry 2 slices of Halal turkey bacon at 390°F for 5 minutes until crisp.",
          "Toast the 2 high-fiber bread slices and smash 1/2 avocado with lemon juice, salt, and red pepper flakes over both slices.",
          "Cook 2 whole eggs + 2 whites sunny-side up or over-medium, place on top of the avocado toast, and crumble crispy turkey bacon on top."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=OlfwIrasHw8",
        "articleUrl": "https://feelgoodfoodie.net/recipe/avocado-toast-with-egg/"
      },
      {
        "id": "tue-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "12-Minute Sizzling Cajun Garlic Butter Shrimp & Roasted Sweet Potato Fajita Skillet",
        "appliance": "Air Fryer + Cast Iron Skillet (15 mins)",
        "prepTime": "18 mins",
        "primaryProtein": "Shrimp",
        "calories": 855,
        "protein": 59,
        "carbs": 80,
        "fat": 32,
        "fiber": 13,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 2 tbsp Queso Fresco & 2 tbsp Chipotle Crema",
          "calories": 110,
          "protein": 5,
          "carbs": 2,
          "fat": 9,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Large Peeled & Deveined Raw Shrimp",
            "amount": "8.5 oz (240g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Sweet Potato (cubed)",
            "amount": "7 oz (200g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Black Beans (rinsed)",
            "amount": "1/2 cup (85g)",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Bell Peppers & Onions (sliced)",
            "amount": "1.5 cups mixed",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Light Butter & Olive Oil",
            "amount": "1 tbsp butter + 1 tbsp olive oil",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Cajun Seasoning, Smoked Paprika & Fresh Lime",
            "amount": "1 tbsp seasoning + 1/2 lime",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Toss cubed sweet potatoes with 1 tsp olive oil, salt, and smoked paprika. Air fry at 400°F for 14 minutes until golden and tender.",
          "Pat shrimp dry and toss with Cajun seasoning, garlic powder, and lime zest.",
          "Heat a skillet over high heat with remaining olive oil and butter. Sear bell peppers and onions for 3 minutes until charred.",
          "Push veggies to the side, add shrimp in a single layer, and sear 90 seconds per side until pink andopaque. Stir in warm black beans, crispy sweet potatoes, and fresh lime juice."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=3RQhhlBeJUw",
        "articleUrl": "https://feelgoodfoodie.net/recipe/shrimp-fajitas/"
      },
      {
        "id": "tue-s1",
        "slot": "Snack 1",
        "name": "Crunchy Roasted Edamame & Raspberry Fiber Mix",
        "appliance": "No-Cook (2 mins)",
        "prepTime": "2 mins",
        "primaryProtein": "Plant / Soy",
        "calories": 245,
        "protein": 21,
        "carbs": 23,
        "fat": 8,
        "fiber": 9,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Toss with 15g Dark Chocolate Chips (70% Cacao)",
          "calories": 80,
          "protein": 1,
          "carbs": 8,
          "fat": 5,
          "fiber": 2
        },
        "ingredients": [
          {
            "item": "Dry Roasted Edamame Beans",
            "amount": "45g (1/3 cup)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Fresh Raspberries",
            "amount": "1 cup (125g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Portion out crunchy sea-salt roasted edamame alongside a full cup of fresh raspberries (8g of fiber alone!)."
        ]
      },
      {
        "id": "tue-s2",
        "slot": "Snack 2",
        "name": "Creamy Chocolate Peanut Butter Protein Pudding",
        "appliance": "No-Cook (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Dairy & Whey",
        "calories": 205,
        "protein": 20,
        "carbs": 17,
        "fat": 7,
        "fiber": 3,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Top with 1 tbsp Natural Creamy Peanut Butter swirl",
          "calories": 95,
          "protein": 4,
          "carbs": 3,
          "fat": 8,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "0% Plain Greek Yogurt",
            "amount": "1/2 cup (115g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Chocolate Whey Protein Powder",
            "amount": "1/2 scoop (16g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Powdered Peanut Butter (PBfit) + Chia Seeds",
            "amount": "1 tbsp PBfit + 1 tsp Chia",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Whisk Greek yogurt, chocolate protein powder, PBfit, and chia seeds vigorously until thick like chocolate mousse. Chill for 10 mins before eating."
        ]
      }
    ]
  },
  {
    "day": "Wednesday",
    "primaryProtein": "Beef",
    "prepNote": "Protein Rotation: Lean Halal Beef Kafta (Dinner) + Batch Chicken Lunch",
    "meals": [
      {
        "id": "wed-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Crispy Chicken Shawarma & Hummus Lavash Pocket (From Mon Batch)",
        "appliance": "Air Fryer / Panini Press (5 mins)",
        "prepTime": "6 mins",
        "primaryProtein": "Chicken",
        "calories": 505,
        "protein": 39,
        "carbs": 42,
        "fat": 20,
        "fiber": 11,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add Pickled Turnips, Shatta Hot Sauce & 1 tbsp Tahini",
          "calories": 90,
          "protein": 3,
          "carbs": 3,
          "fat": 8,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "Prepped Shawarma Chicken (from Monday batch)",
            "amount": "4.5 oz (130g) cooked",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Joseph's Flax/Oat Bran Lavash or High-Fiber Wrap",
            "amount": "1 large wrap",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Roasted Garlic Hummus",
            "amount": "3 tbsp (45g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Romaine Lettuce, Pickles & Tomato",
            "amount": "1 cup shredded",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Avocado",
            "amount": "50g sliced",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Spread garlic hummus evenly across the lavash wrap.",
          "Layer warm reheated shawarma chicken, sliced avocado, romaine, and Arabic pickles.",
          "Fold into a flat rectangular pocket and air fry at 380°F for 4 minutes (or grill in a dry skillet) until crispy outside."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=cLrFcUSIaQU"
      },
      {
        "id": "wed-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "Grilled Halal Beef Kafta Kebabs with Herb Couscous & Charred Zucchini",
        "appliance": "Grill or Air Fryer (14 mins)",
        "prepTime": "20 mins",
        "primaryProtein": "Beef",
        "calories": 865,
        "protein": 57,
        "carbs": 76,
        "fat": 36,
        "fiber": 13,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Serve with Pomegranate Molasses Glaze & 2 tbsp Baba Ganoush",
          "calories": 85,
          "protein": 1,
          "carbs": 12,
          "fat": 4,
          "fiber": 2
        },
        "ingredients": [
          {
            "item": "90/10 Lean Halal Ground Beef",
            "amount": "7 oz (200g) raw",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Finely Minced Parsley, Grated Onion & 7-Spice",
            "amount": "1/3 cup parsley + 2 tbsp onion + 1 tsp 7-spice",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Whole Wheat Couscous or Bulgur Pilaf",
            "amount": "3/4 cup (130g) cooked",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Zucchini & Red Bell Pepper",
            "amount": "2 cups cubed",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Chickpeas (tossed in pilaf)",
            "amount": "1/3 cup (55g)",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Olive Oil",
            "amount": "1 tbsp",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "In a bowl, mix lean Halal ground beef with grated onion, finely minced parsley, Arabic 7-spice, garlic powder, salt, and pepper. Shape into 3 oblong kafta skewers.",
          "Toss cubed zucchini and bell pepper with olive oil, oregano, and salt.",
          "Grill or Air Fry (400°F) the beef kafta and vegetables for 10–12 minutes, turning once until juicy and nicely browned.",
          "Fluff warm whole wheat couscous/bulgur with chickpeas and lemon juice, and plate with the sizzling kafta."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=EVDxpYm6Q_E",
        "articleUrl": "https://feelgoodfoodie.net/recipe/beef-kafta/"
      },
      {
        "id": "wed-s1",
        "slot": "Snack 1",
        "name": "Spiced Pear & Cottage Cheese / Labneh Bowl with Flaxseeds",
        "appliance": "No-Cook (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Dairy",
        "calories": 235,
        "protein": 21,
        "carbs": 24,
        "fat": 6,
        "fiber": 7,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Top with 15g Toasted Walnuts & Cinnamon Maple Drizzle",
          "calories": 105,
          "protein": 2,
          "carbs": 4,
          "fat": 9,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "2% Cottage Cheese (or Strained Greek Yogurt)",
            "amount": "3/4 cup (170g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Ripe Bartlett Pear (diced)",
            "amount": "1 medium pear",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Ground Flaxseed",
            "amount": "1 tbsp (10g)",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Dice fresh pear over cottage cheese or Greek yogurt, sprinkle with ground flaxseed and cinnamon."
        ]
      },
      {
        "id": "wed-s2",
        "slot": "Snack 2",
        "name": "Savory Everything Cucumber, Turkey Roll-Ups & Pistachios",
        "appliance": "No-Cook (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Turkey",
        "calories": 195,
        "protein": 18,
        "carbs": 14,
        "fat": 8,
        "fiber": 4,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 1 Laughing Cow Creamy Swiss Wedge inside roll-ups",
          "calories": 35,
          "protein": 2,
          "carbs": 1,
          "fat": 2,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Halal Deli Sliced Turkey Breast",
            "amount": "3 oz (85g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Persian Cucumbers",
            "amount": "2 cucumbers sliced lengthwise",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Shelled Pistachios",
            "amount": "20g",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Wrap sliced Halal turkey breast around crunchy Persian cucumber spears and enjoy with pistachios."
        ]
      }
    ]
  },
  {
    "day": "Thursday",
    "primaryProtein": "Tilapia",
    "prepNote": "Protein Rotation: Switching from Beef (Wed) to Parmesan Crusted Tilapia",
    "meals": [
      {
        "id": "thu-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Chipotle Chicken & Black Bean Quesadilla with Pico de Gallo",
        "appliance": "Stovetop Skillet (8 mins)",
        "prepTime": "10 mins",
        "primaryProtein": "Chicken",
        "calories": 495,
        "protein": 38,
        "carbs": 40,
        "fat": 20,
        "fiber": 12,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 2 tbsp Fresh Guacamole & Pickled Jalapeños",
          "calories": 65,
          "protein": 1,
          "carbs": 3,
          "fat": 5,
          "fiber": 2
        },
        "ingredients": [
          {
            "item": "High-Fiber Carb Balance Tortilla",
            "amount": "1 large",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Cooked Shredded Halal Chicken Breast",
            "amount": "4 oz (115g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Part-Skim Mozzarella or Mexican Blend Cheese",
            "amount": "1/3 cup (35g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Black Beans",
            "amount": "1/3 cup (55g)",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Fresh Tomato, Cilantro & Onion (Pico)",
            "amount": "1/2 cup",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Layer shredded chicken, black beans, and cheese on one half of the high-fiber tortilla with a pinch of chipotle powder.",
          "Fold and toast in a dry skillet over medium heat for 2.5 minutes per side until golden brown and melty. Serve with fresh pico de gallo."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=NrASojSzDrg"
      },
      {
        "id": "thu-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "Air Fryer Lemon-Garlic Parmesan Crusted Tilapia with Crispy Baby Potatoes & Broccoli",
        "appliance": "Air Fryer (14 mins)",
        "prepTime": "18 mins",
        "primaryProtein": "Tilapia",
        "calories": 850,
        "protein": 61,
        "carbs": 75,
        "fat": 33,
        "fiber": 12,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 1.5 tbsp Homemade Dill Tartar Sauce (Greek Yogurt + Light Mayo + Capers)",
          "calories": 70,
          "protein": 2,
          "carbs": 2,
          "fat": 6,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Fresh or Thawed Tilapia Fillets",
            "amount": "8 oz (225g - 2 fillets)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Grated Parmesan & Panko Breadcrumbs",
            "amount": "2 tbsp Parmesan + 2 tbsp Panko",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Baby Gold Potatoes (halved)",
            "amount": "7 oz (200g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Fresh Broccoli Florets",
            "amount": "2 cups",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Olive Oil & Avocado Oil Mayo",
            "amount": "1 tbsp olive oil + 1 tbsp light mayo (for fish crust)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Toss halved baby potatoes with 1/2 tbsp olive oil, garlic powder, rosemary, and salt. Air fry at 400°F for 10 minutes first.",
          "Meanwhile, pat tilapia fillets dry. Brush tops lightly with 1 tbsp light mayo mixed with lemon zest and garlic. Press grated Parmesan, panko, and paprika onto the fillets.",
          "Push potatoes to one side of the Air Fryer, add tilapia fillets and oiled broccoli florets, and air fry at 400°F for 8–9 minutes until fish flakes easily and crust is golden."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=JXL-j-BGV9w"
      },
      {
        "id": "thu-s1",
        "slot": "Snack 1",
        "name": "Fresh Strawberries, Kiwi & Chia Protein Parfait",
        "appliance": "No-Cook (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Dairy",
        "calories": 250,
        "protein": 22,
        "carbs": 25,
        "fat": 7,
        "fiber": 7,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 2 tbsp Low-Sugar Granola Clusters for Crunch",
          "calories": 75,
          "protein": 2,
          "carbs": 11,
          "fat": 3,
          "fiber": 2
        },
        "ingredients": [
          {
            "item": "0% Greek Yogurt",
            "amount": "1 cup (225g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Strawberries & Green Kiwi",
            "amount": "1 cup sliced",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Chia Seeds",
            "amount": "1 tbsp (12g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Layer Greek yogurt, chia seeds, and sliced strawberries and kiwi in a bowl."
        ]
      },
      {
        "id": "thu-s2",
        "slot": "Snack 2",
        "name": "Hummus, Carrots, Bell Pepper Strips & Hard-Boiled Egg",
        "appliance": "Pre-Boiled (2 mins)",
        "prepTime": "2 mins",
        "primaryProtein": "Eggs",
        "calories": 205,
        "protein": 14,
        "carbs": 16,
        "fat": 10,
        "fiber": 4,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Drizzle Hummus with Extra Virgin Olive Oil & Sumac",
          "calories": 60,
          "protein": 0,
          "carbs": 0,
          "fat": 7,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Large Hard-Boiled Egg",
            "amount": "1 whole egg + 1 egg white",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Roasted Pine Nut or Classic Hummus",
            "amount": "3 tbsp (45g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Baby Carrots & Bell Pepper Strips",
            "amount": "1.5 cups",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Slice hard-boiled egg with a pinch of salt and pepper and dip fresh veggies into hummus."
        ]
      }
    ]
  },
  {
    "day": "Friday",
    "primaryProtein": "Chicken",
    "prepNote": "Protein Rotation: Switching from Tilapia (Thu) to Honey Harissa Chicken",
    "meals": [
      {
        "id": "fri-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Arabic Foul Mudammas (Spiced Fava & Chickpea Bowl) with Boiled Eggs",
        "appliance": "Stovetop (8 mins)",
        "prepTime": "10 mins",
        "primaryProtein": "Eggs & Legumes",
        "calories": 505,
        "protein": 32,
        "carbs": 48,
        "fat": 20,
        "fiber": 13,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Serve with 1/2 Warm Whole Wheat Pita Loaf",
          "calories": 85,
          "protein": 3,
          "carbs": 17,
          "fat": 1,
          "fiber": 2
        },
        "ingredients": [
          {
            "item": "Canned Fava Beans & Chickpeas Mix",
            "amount": "3/4 cup (130g) rinsed",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Large Hard-Boiled Eggs",
            "amount": "2 whole eggs + 2 whites",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Diced Tomato, Parsley, Garlic & Lemon",
            "amount": "1/2 cup",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Extra Virgin Olive Oil & Tahini",
            "amount": "1 tsp olive oil + 1 tbsp tahini",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Warm fava beans and chickpeas in a small pot with minced garlic, cumin, lemon juice, and a splash of water; mash slightly with a fork.",
          "Top with quartered boiled eggs, diced tomatoes, parsley, tahini drizzle, and olive oil."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=hSb8zs0S_7w",
        "articleUrl": "https://www.themediterraneandish.com/foul-mudammas-recipe/"
      },
      {
        "id": "fri-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "Air Fryer Honey-Harissa Glazed Chicken Thighs with Garlic Green Beans & Saffron Rice",
        "appliance": "Air Fryer + Rice Cooker (16 mins)",
        "prepTime": "20 mins",
        "primaryProtein": "Chicken",
        "calories": 855,
        "protein": 62,
        "carbs": 71,
        "fat": 34,
        "fiber": 11,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add Crumbled Goat Cheese (20g) & Toasted Slivered Almonds",
          "calories": 95,
          "protein": 5,
          "carbs": 1,
          "fat": 8,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "Boneless Skinless Halal Chicken Thighs (trimmed)",
            "amount": "7.5 oz (215g) raw",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Harissa Paste & Raw Honey",
            "amount": "1 tbsp Harissa + 1 tsp Honey",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Fresh Green Beans (trimmed)",
            "amount": "2 cups (200g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Saffron / Turmeric Basmati Rice",
            "amount": "3/4 cup (125g) cooked",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Avocado (sliced on the side)",
            "amount": "50g",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Coat trimmed Halal chicken thighs with harissa paste, 1 tsp honey, garlic powder, cumin, and salt.",
          "Air fry at 400°F for 12 minutes, tossing fresh green beans into the basket for the final 7 minutes until blistered.",
          "Plate over saffron basmati rice with sliced avocado."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=wi-Pf49iy80",
        "articleUrl": "https://feelgoodfoodie.net/recipe/harissa-chicken/"
      },
      {
        "id": "fri-s1",
        "slot": "Snack 1",
        "name": "High-Protein Berry Chia Smoothie",
        "appliance": "Blender (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Whey / Dairy",
        "calories": 245,
        "protein": 26,
        "carbs": 22,
        "fat": 6,
        "fiber": 7,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Blend in 1 tbsp Cashew or Almond Butter",
          "calories": 90,
          "protein": 3,
          "carbs": 3,
          "fat": 8,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "Vanilla Whey Protein Powder",
            "amount": "1 scoop (30g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Mixed Frozen Berries (Raspberry/Blackberry)",
            "amount": "1 cup (140g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Produce"
          },
          {
            "item": "Chia Seeds & Unsweetened Almond Milk",
            "amount": "1 tbsp Chia + 1 cup Almond Milk",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Dairy & Eggs"
          }
        ],
        "steps": [
          "Blend almond milk, frozen berries, vanilla protein, and chia seeds until thick and smooth."
        ]
      },
      {
        "id": "fri-s2",
        "slot": "Snack 2",
        "name": "Salted Pistachios & Clementine Duo",
        "appliance": "No-Cook (1 min)",
        "prepTime": "1 min",
        "primaryProtein": "Nuts / Dairy",
        "calories": 195,
        "protein": 15,
        "carbs": 15,
        "fat": 10,
        "fiber": 4,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Pair with 2 squares 85% Dark Chocolate",
          "calories": 80,
          "protein": 2,
          "carbs": 5,
          "fat": 6,
          "fiber": 2
        },
        "ingredients": [
          {
            "item": "Sweet Clementines / Mandarins",
            "amount": "2 small",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Shelled Pistachios",
            "amount": "20g",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Light Mozzarella String Cheese",
            "amount": "1 stick",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          }
        ],
        "steps": [
          "Peel clementines and enjoy with pistachios and string cheese."
        ]
      }
    ]
  },
  {
    "day": "Saturday",
    "primaryProtein": "Shrimp",
    "prepNote": "Protein Rotation: Switching from Chicken (Fri) to Crispy Bang-Bang Shrimp Tacos",
    "meals": [
      {
        "id": "sat-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Loaded Halal Beef & Egg Shakshuka Skillet with High-Fiber Flatbread",
        "appliance": "Stovetop Skillet (12 mins)",
        "prepTime": "15 mins",
        "primaryProtein": "Eggs & Beef",
        "calories": 495,
        "protein": 37,
        "carbs": 36,
        "fat": 22,
        "fiber": 11,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Top with 20g Crumbled Feta & Kalamata Olives",
          "calories": 75,
          "protein": 3,
          "carbs": 1,
          "fat": 6,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Cooked Lean Ground Beef (or Turkey)",
            "amount": "2.5 oz (70g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Large Eggs",
            "amount": "2 whole eggs",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Crushed Tomatoes, Bell Pepper & Garlic",
            "amount": "3/4 cup sauce",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "High-Fiber Carb Balance Tortilla (toasted)",
            "amount": "1 large",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Bread & Grains"
          }
        ],
        "steps": [
          "Simmer crushed tomatoes with diced bell pepper, garlic, cumin, and cooked lean beef in a small skillet for 4 minutes.",
          "Crack 2 eggs into wells in the sauce, cover, and poach for 4 minutes until whites are set and yolks are runny. Scoop up with toasted high-fiber flatbread."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=tr4Y45zb_MI",
        "articleUrl": "https://feelgoodfoodie.net/recipe/shakshuka/"
      },
      {
        "id": "sat-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "Crispy Air Fryer Bang-Bang Shrimp Tacos with Avocado Mango Slaw & Charred Corn",
        "appliance": "Air Fryer (12 mins)",
        "prepTime": "18 mins",
        "primaryProtein": "Shrimp",
        "calories": 860,
        "protein": 59,
        "carbs": 80,
        "fat": 33,
        "fiber": 14,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Extra Drizzle of Sweet Chili Sriracha Mayo (1.5 tbsp)",
          "calories": 80,
          "protein": 0,
          "carbs": 6,
          "fat": 6,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Large Raw Shrimp (peeled)",
            "amount": "8.5 oz (240g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "High-Fiber Taco Sized Tortillas",
            "amount": "2 tortillas",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Shredded Purple Cabbage, Cilantro & Diced Mango",
            "amount": "1.5 cups slaw",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Hass Avocado",
            "amount": "1/2 avocado (70g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Fire-Roasted Corn & Black Beans Side",
            "amount": "1/2 cup mixed",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Greek Yogurt + Sriracha + 1 tsp Honey (Bang-Bang Sauce)",
            "amount": "3 tbsp",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          }
        ],
        "steps": [
          "Toss shrimp with 1 tbsp cornstarch, garlic powder, smoked paprika, and olive oil spray.",
          "Air fry at 400°F for 8 minutes until lightly crispy.",
          "Toss hot shrimp in the Greek yogurt-Sriracha-honey Bang-Bang sauce. Load into warm tortillas with cabbage-mango slaw, sliced avocado, and side of charred corn & black beans."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=TvwbfJEySRY",
        "articleUrl": "https://feelgoodfoodie.net/recipe/grilled-shrimp-tacos/"
      },
      {
        "id": "sat-s1",
        "slot": "Snack 1",
        "name": "Apple Pie Cinnamon Greek Yogurt Bowl",
        "appliance": "Microwave / Stovetop (3 mins)",
        "prepTime": "4 mins",
        "primaryProtein": "Dairy",
        "calories": 245,
        "protein": 23,
        "carbs": 24,
        "fat": 6,
        "fiber": 6,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Top with 15g Crushed Pecans & Sugar-Free Caramel Drizzle",
          "calories": 100,
          "protein": 1,
          "carbs": 2,
          "fat": 10,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "0% Plain Greek Yogurt",
            "amount": "1 cup (225g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          },
          {
            "item": "Diced Gala or Honeycrisp Apple",
            "amount": "1 medium apple",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Chia Seeds & Cinnamon",
            "amount": "1 tbsp Chia + 1 tsp Cinnamon",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Microwave diced apples with cinnamon for 90 seconds until warm and tender like apple pie filling, then spoon over cold Greek yogurt mixed with chia seeds."
        ]
      },
      {
        "id": "sat-s2",
        "slot": "Snack 2",
        "name": "Crispy Roasted Chickpeas & String Cheese",
        "appliance": "No-Cook / Air Fryer",
        "prepTime": "2 mins",
        "primaryProtein": "Dairy & Legumes",
        "calories": 200,
        "protein": 16,
        "carbs": 16,
        "fat": 9,
        "fiber": 4,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Toss Chickpeas in Za'atar & 1 tsp Olive Oil",
          "calories": 45,
          "protein": 0,
          "carbs": 1,
          "fat": 5,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Roasted Crunchy Chickpeas",
            "amount": "35g",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Light String Cheese",
            "amount": "2 sticks",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          }
        ],
        "steps": [
          "Enjoy crunchy roasted chickpeas alongside 2 light string cheeses."
        ]
      }
    ]
  },
  {
    "day": "Sunday",
    "primaryProtein": "Beef",
    "prepNote": "Protein Rotation: Switching from Shrimp (Sat) to Chimichurri Steak Rice Bowl",
    "meals": [
      {
        "id": "sun-m1",
        "slot": "Meal 1 (First Meal - Lighter)",
        "name": "Smoky Grilled Chicken & Avocado Cobb Salad with Crispy Chickpeas",
        "appliance": "No-Cook / Quick Assembly (7 mins)",
        "prepTime": "8 mins",
        "primaryProtein": "Chicken",
        "calories": 490,
        "protein": 40,
        "carbs": 32,
        "fat": 22,
        "fiber": 10,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 2 tbsp Creamy Garlic Ranch (Greek Yogurt Based) & Blue/Feta Crumbles",
          "calories": 80,
          "protein": 4,
          "carbs": 2,
          "fat": 6,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Grilled Halal Chicken Breast (sliced)",
            "amount": "4.5 oz (130g)",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Romaine Lettuce, Cherry Tomatoes & Cucumber",
            "amount": "3 cups chopped",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Avocado",
            "amount": "60g diced",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Chickpeas",
            "amount": "1/2 cup (85g)",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Lemon-Olive Oil Vinaigrette",
            "amount": "1 tbsp",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          }
        ],
        "steps": [
          "Toss chopped romaine, tomatoes, and cucumber with lemon-olive oil vinaigrette.",
          "Top with warm sliced grilled chicken, diced avocado, and chickpeas."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=E_OUST0Wy1I"
      },
      {
        "id": "sun-m2",
        "slot": "Meal 2 (Dinner - Hearty Main)",
        "name": "Sizzling Halal Sirloin Steak Bite Bowl with Fresh Parsley Chimichurri & Charred Asparagus",
        "appliance": "Cast Iron Skillet or Air Fryer (12 mins)",
        "prepTime": "18 mins",
        "primaryProtein": "Beef",
        "calories": 870,
        "protein": 61,
        "carbs": 78,
        "fat": 33,
        "fiber": 11,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Top Steak Bites with 1 tbsp Garlic Herb Compound Butter",
          "calories": 100,
          "protein": 0,
          "carbs": 0,
          "fat": 11,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Halal Top Sirloin or Flank Steak (cubed)",
            "amount": "7 oz (200g) raw",
            "store": "Greenland Market / Papaya (Canton)",
            "category": "Halal Meat & Seafood"
          },
          {
            "item": "Fresh Asparagus Spears & Mushrooms/Peppers",
            "amount": "2 cups",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Roasted Garlic & Herb Brown/Basmati Rice + Black Beans",
            "amount": "3/4 cup rice + 1/3 cup black beans",
            "store": "Walmart / Meijer / Kroger / Target (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Fresh Parsley, Cilantro, Garlic, Red Wine Vinegar & Olive Oil (Chimichurri)",
            "amount": "2 tbsp sauce",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Finely chop fresh parsley, cilantro, and garlic; stir with 1 tbsp olive oil, vinegar, chili flakes, and salt for fresh chimichurri.",
          "Season cubed Halal sirloin generously with salt, black pepper, and garlic powder.",
          "Sear steak bites and asparagus in a smoking-hot cast iron skillet (or Air Fryer at 400°F) for 4–5 minutes until medium-rare and caramelized.",
          "Serve over warm rice and black beans, spooning fresh chimichurri over the steak."
        ],
        "videoUrl": "https://www.youtube.com/watch?v=ggNuUAv7eIQ",
        "articleUrl": "https://cafedelites.com/authentic-chimichurri-uruguay-argentina/"
      },
      {
        "id": "sun-s1",
        "slot": "Snack 1",
        "name": "Blackberry & Almond Butter High-Fiber Toast",
        "appliance": "Toaster (3 mins)",
        "prepTime": "3 mins",
        "primaryProtein": "Plant / Bread",
        "calories": 240,
        "protein": 15,
        "carbs": 28,
        "fat": 9,
        "fiber": 9,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Sprinkle with Hemp Hearts (1 tbsp) & Cinnamon Honey",
          "calories": 65,
          "protein": 3,
          "carbs": 3,
          "fat": 5,
          "fiber": 1
        },
        "ingredients": [
          {
            "item": "High-Fiber Whole Grain Toast",
            "amount": "1 slice",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Bread & Grains"
          },
          {
            "item": "Almond Butter",
            "amount": "1 tbsp (16g)",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Fresh Blackberries (mashed on top)",
            "amount": "3/4 cup (100g)",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          },
          {
            "item": "Side of 1/2 cup Greek Yogurt",
            "amount": "110g",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Dairy & Eggs"
          }
        ],
        "steps": [
          "Spread almond butter on toasted high-fiber bread and press fresh blackberries on top with a side of Greek yogurt."
        ]
      },
      {
        "id": "sun-s2",
        "slot": "Snack 2",
        "name": "Salted Roasted Edamame & Baby Bell Peppers",
        "appliance": "No-Cook (2 mins)",
        "prepTime": "2 mins",
        "primaryProtein": "Plant / Soy",
        "calories": 200,
        "protein": 19,
        "carbs": 18,
        "fat": 6,
        "fiber": 5,
        "upgradeApplied": false,
        "flavorUpgrade": {
          "name": "Add 2 tbsp Tzatziki Dip",
          "calories": 45,
          "protein": 2,
          "carbs": 2,
          "fat": 3,
          "fiber": 0
        },
        "ingredients": [
          {
            "item": "Dry Roasted Edamame",
            "amount": "40g",
            "store": "Costco / Sam's Club (Canton)",
            "category": "Pantry & Spices"
          },
          {
            "item": "Mini Sweet Bell Peppers",
            "amount": "4 mini peppers",
            "store": "Joe Randazzo's (Westland)",
            "category": "Produce"
          }
        ],
        "steps": [
          "Crunch on sweet mini bell peppers and roasted edamame to finish the week strong."
        ]
      }
    ]
  }
];

window.ON_DEMAND_POOL = [
  {
    "id": "od-1",
    "slot": "Meal 1 (First Meal - Lighter)",
    "cuisine": "Arabic / Middle Eastern",
    "appliance": "Air Fryer",
    "prepTime": "12 mins",
    "primaryProtein": "Chicken",
    "name": "Air Fryer Shish Tawook Skewers with Garlic Toum Yogurt & Tabbouleh",
    "calories": 495,
    "protein": 42,
    "carbs": 38,
    "fat": 19,
    "fiber": 10,
    "upgradeApplied": false,
    "flavorUpgrade": {
      "name": "Wrap in Warm Arabic Pita with Extra Toum (1 tbsp)",
      "calories": 120,
      "protein": 3,
      "carbs": 15,
      "fat": 5,
      "fiber": 2
    },
    "ingredients": [
      {
        "item": "Halal Chicken Breast (cubed)",
        "amount": "6 oz (170g)",
        "store": "Greenland Market / Papaya (Canton)",
        "category": "Halal Meat & Seafood"
      },
      {
        "item": "Greek Yogurt, Lemon, Tomato Paste & Garlic Marinade",
        "amount": "2 tbsp",
        "store": "Costco / Sam's Club (Canton)",
        "category": "Dairy & Eggs"
      },
      {
        "item": "Fresh Parsley, Mint, Tomato & Bulgur (Tabbouleh)",
        "amount": "1.5 cups",
        "store": "Joe Randazzo's (Westland)",
        "category": "Produce"
      },
      {
        "item": "Avocado Oil Spray & Chickpeas",
        "amount": "1/3 cup chickpeas",
        "store": "Walmart / Meijer / Kroger / Target (Canton)",
        "category": "Pantry & Spices"
      }
    ],
    "steps": [
      "Toss cubed Halal chicken breast with Greek yogurt, lemon juice, grated garlic, paprika, cardamom, and 1 tsp tomato paste.",
      "Thread onto skewers (or place loose in Air Fryer basket) and air fry at 400°F for 10–11 minutes until charred on the edges.",
      "Serve alongside fresh high-fiber parsley tabbouleh tossed with chickpeas."
    ],
    "videoUrl": "https://www.youtube.com/watch?v=ULm2mXeS7fU",
    "articleUrl": "https://feelgoodfoodie.net/recipe/shish-tawook/"
  },
  {
    "id": "od-2",
    "slot": "Meal 2 (Dinner - Hearty Main)",
    "cuisine": "Asian / Stir-Fry",
    "appliance": "Stovetop",
    "prepTime": "15 mins",
    "primaryProtein": "Shrimp",
    "name": "Szechuan Garlic Honey Shrimp with Crispy Broccoli & Edamame Rice",
    "calories": 845,
    "protein": 60,
    "carbs": 78,
    "fat": 31,
    "fiber": 13,
    "upgradeApplied": false,
    "flavorUpgrade": {
      "name": "Top with 1 tbsp Chili Crisp & 15g Roasted Cashews",
      "calories": 130,
      "protein": 3,
      "carbs": 4,
      "fat": 11,
      "fiber": 1
    },
    "ingredients": [
      {
        "item": "Large Raw Shrimp",
        "amount": "8.5 oz (240g)",
        "store": "Costco / Sam's Club (Canton)",
        "category": "Halal Meat & Seafood"
      },
      {
        "item": "Broccoli Florets & Snap Peas",
        "amount": "2 cups",
        "store": "Joe Randazzo's (Westland)",
        "category": "Produce"
      },
      {
        "item": "Shelled Edamame & Jasmine/Brown Rice",
        "amount": "3/4 cup rice + 1/2 cup edamame",
        "store": "Costco / Sam's Club (Canton)",
        "category": "Bread & Grains"
      },
      {
        "item": "Low-Sodium Soy Sauce, Sesame Oil, Ginger, Garlic & Honey",
        "amount": "2 tbsp sauce + 1 tbsp sesame oil",
        "store": "Walmart / Meijer / Kroger / Target (Canton)",
        "category": "Pantry & Spices"
      }
    ],
    "steps": [
      "Sear broccoli and snap peas in a hot wok or skillet with 1/2 tbsp sesame oil for 3 minutes.",
      "Add shrimp, freshly grated ginger, and garlic; sear 90 seconds per side.",
      "Pour in soy-honey-garlic glaze, toss until glossy, and serve over warm edamame rice."
    ],
    "videoUrl": "https://www.youtube.com/watch?v=eR1i6g4zoQ0",
    "articleUrl": "https://cafedelites.com/garlic-butter-shrimp/"
  },
  {
    "id": "od-3",
    "slot": "Meal 2 (Dinner - Hearty Main)",
    "cuisine": "Mexican / Southwest",
    "appliance": "Air Fryer",
    "prepTime": "15 mins",
    "primaryProtein": "Tilapia",
    "name": "Blackened Baja Tilapia Burrito Bowl with Chipotle Lime Crema & Guacamole",
    "calories": 850,
    "protein": 58,
    "carbs": 76,
    "fat": 34,
    "fiber": 15,
    "upgradeApplied": false,
    "flavorUpgrade": {
      "name": "Add Crispy Tortilla Strips (20g) & Cotija Cheese",
      "calories": 115,
      "protein": 4,
      "carbs": 11,
      "fat": 6,
      "fiber": 1
    },
    "ingredients": [
      {
        "item": "Tilapia Fillets",
        "amount": "8 oz (225g)",
        "store": "Costco / Sam's Club (Canton)",
        "category": "Halal Meat & Seafood"
      },
      {
        "item": "Black Beans & Cilantro Lime Rice",
        "amount": "1/2 cup beans + 3/4 cup rice",
        "store": "Walmart / Meijer / Kroger / Target (Canton)",
        "category": "Bread & Grains"
      },
      {
        "item": "Avocado, Shredded Cabbage & Pico de Gallo",
        "amount": "1/2 avocado + 1 cup cabbage",
        "store": "Joe Randazzo's (Westland)",
        "category": "Produce"
      },
      {
        "item": "Greek Yogurt + Chipotle Adobo + Lime Juice",
        "amount": "2 tbsp",
        "store": "Walmart / Meijer / Kroger / Target (Canton)",
        "category": "Dairy & Eggs"
      }
    ],
    "steps": [
      "Rub tilapia fillets with olive oil, chili powder, cumin, smoked paprika, oregano, and garlic powder.",
      "Air fry at 400°F for 8–9 minutes until blackened and flaky.",
      "Assemble over cilantro-lime rice and black beans, topped with avocado, cabbage slaw, and chipotle lime yogurt crema."
    ],
    "videoUrl": "https://www.youtube.com/watch?v=b1xSG9p4UOg"
  },
  {
    "id": "od-4",
    "slot": "Snack 1",
    "cuisine": "Sweet Craving",
    "appliance": "Air Fryer",
    "prepTime": "6 mins",
    "primaryProtein": "Dairy & Whey",
    "name": "Air Fryer Cinnamon Churro Protein French Toast Bites with Berries",
    "calories": 255,
    "protein": 23,
    "carbs": 25,
    "fat": 7,
    "fiber": 8,
    "upgradeApplied": false,
    "flavorUpgrade": {
      "name": "Add 1 tbsp Melted White/Dark Chocolate Drizzle",
      "calories": 75,
      "protein": 1,
      "carbs": 8,
      "fat": 5,
      "fiber": 1
    },
    "ingredients": [
      {
        "item": "High-Fiber Bread (cubed)",
        "amount": "1.5 slices",
        "store": "Costco / Sam's Club (Canton)",
        "category": "Bread & Grains"
      },
      {
        "item": "Egg Whites, Splash Almond Milk & Vanilla Whey",
        "amount": "1/3 cup egg whites + 1/2 scoop whey",
        "store": "Costco / Sam's Club (Canton)",
        "category": "Dairy & Eggs"
      },
      {
        "item": "Fresh Strawberries",
        "amount": "3/4 cup",
        "store": "Joe Randazzo's (Westland)",
        "category": "Produce"
      }
    ],
    "steps": [
      "Whisk egg whites, vanilla protein powder, cinnamon, and a splash of almond milk. Toss bread cubes quickly so coated.",
      "Air fry at 380°F for 5 minutes until puffed and golden. Serve with fresh strawberries."
    ]
  },
  {
    "id": "od-5",
    "slot": "Snack 1",
    "cuisine": "Savory Craving",
    "appliance": "Air Fryer",
    "prepTime": "8 mins",
    "primaryProtein": "Chicken",
    "name": "Crispy Air Fryer Buffalo Chicken Lettuce Cups with Greek Blue Cheese Drizzle",
    "calories": 235,
    "protein": 27,
    "carbs": 10,
    "fat": 9,
    "fiber": 4,
    "upgradeApplied": false,
    "flavorUpgrade": {
      "name": "Add 15g Real Crumbled Blue Cheese or Ranch Dip",
      "calories": 65,
      "protein": 3,
      "carbs": 1,
      "fat": 5,
      "fiber": 0
    },
    "ingredients": [
      {
        "item": "Halal Chicken Breast Bites",
        "amount": "3.5 oz (100g)",
        "store": "Greenland Market / Papaya (Canton)",
        "category": "Halal Meat & Seafood"
      },
      {
        "item": "Frank's RedHot Buffalo Sauce",
        "amount": "2 tbsp",
        "store": "Walmart / Meijer / Kroger / Target (Canton)",
        "category": "Pantry & Spices"
      },
      {
        "item": "Romaine Lettuce Boats & Celery Sticks",
        "amount": "4 boats + 2 celery stalks",
        "store": "Joe Randazzo's (Westland)",
        "category": "Produce"
      }
    ],
    "steps": [
      "Air fry seasoned chicken bites at 400°F for 7 minutes, toss in warm Buffalo sauce, and spoon into crisp romaine boats."
    ]
  }
];
