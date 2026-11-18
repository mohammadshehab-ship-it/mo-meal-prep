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

// ================= GLOBAL CUISINES CATALOG (SELECT UP TO 5) =================
window.CUISINE_CATALOG = [
  // Mediterranean & Middle Eastern
  {
    id: "lebanese",
    name: "Lebanese / Levantine",
    region: "Mediterranean & Middle Eastern",
    icon: "🇱🇧",
    desc: "Shawarma, Shish Tawook, Kafta, Za'atar, Sumac, Toum & Tabbouleh",
    styles: ["Charred Shish Tawook Platter", "Crispy Shawarma Bowl", "Grilled Kafta Skewers", "Za'atar & Sumac Flatbread Wrap", "Lemony Garlic Herb Meze Bowl"],
    spices: "7-Spice, Sumac, Za'atar, Crushed Garlic & Fresh Lemon",
    sauces: ["Whipped Garlic Toum & Greek Yogurt", "Lemon-Tahini Parsley Drizzle", "Pomegranate Molasses & Mint Yogurt"],
    carbs: ["Vermicelli Basmati Rice", "Parsley Bulgur Tabbouleh", "High-Fiber Arabic Pita", "Spiced Crispy Chickpeas"],
    veggies: ["Cucumber, Roma Tomato, Mint & Radish", "Charred Zucchini & Bell Peppers", "Pickled Turnips, Parsley & Red Onion"]
  },
  {
    id: "egyptian",
    name: "Egyptian",
    region: "Mediterranean & Middle Eastern",
    icon: "🇪🇬",
    desc: "Foul Mudammas, Koshari-Style Lentils & Rice, Meshwi Grill, Dukkah & Tahini",
    styles: ["Alexandrian Spiced Grill Bowl", "Koshari-Inspired Lentil & Rice Power Bowl", "Cairo Cumin-Garlic Skillet", "Dukkah-Crusted Protein Platter", "Baladi Tahini & Herb Wrap"],
    spices: "Toasted Cumin, Coriander, Garlic, Cardamom & Hazelnut-Sesame Dukkah",
    sauces: ["Warm Garlic-Vinegar Dakka & Lemon Tahini", "Spiced Tomato-Coriander Salsa", "Creamy Cumin Labneh"],
    carbs: ["Brown Lentil & Basmati Koshari Mix", "Warm Fava Beans (Foul) & Chickpeas", "Whole Wheat Baladi Pita", "Roasted Crispy Potatoes"],
    veggies: ["Baladi Salad (Tomato, Cucumber, Cilantro & Lime)", "Charred Eggplant, Peppers & Onions", "Baby Spinach & Garlic Greens"]
  },
  {
    id: "mediterranean",
    name: "Mediterranean (Classic)",
    region: "Mediterranean & Middle Eastern",
    icon: "🫒",
    desc: "Extra Virgin Olive Oil, Lemon-Herb Grill, Roasted Veggies & Crisp Greens",
    styles: ["Sun-Dried Tomato & Herb Grill Bowl", "Lemon-Olive Oil Plancha Skillet", "Mediterranean Roasted Vegetable & Grain Bowl", "Crispy Herb-Crusted Pocket", "Coastal Garlic & Caper Plate"],
    spices: "Wild Oregano, Rosemary, Crushed Garlic, Lemon Zest & Sea Salt",
    sauces: ["Herbed Greek Yogurt & Olive Oil Drizzle", "Roasted Red Pepper & Garlic Romesco", "Lemon-Dill Caper Vinaigrette"],
    carbs: ["Fluffy Quinoa & Chickpea Pilaf", "Herb-Roasted Baby Gold Potatoes", "Whole Grain Lavash Wrap", "Orzo & White Bean Medley"],
    veggies: ["Heirloom Cherry Tomatoes, Cucumber & Arugula", "Roasted Zucchini, Bell Peppers & Red Onion", "Artichoke Hearts & Baby Spinach"]
  },
  {
    id: "palestinian_jordanian",
    name: "Palestinian & Jordanian",
    region: "Mediterranean & Middle Eastern",
    icon: "🇯🇴",
    desc: "Musakhan Sumac Onions, Jameed-Style Yogurt Herbs & Maqluba Spices",
    styles: ["Musakhan Sumac & Caramelized Onion Bowl", "Maqluba-Spiced Rice & Roasted Cauliflower Plate", "Amman Herb & Garlic Grill", "Quds Sesame & Za'atar Skillet"],
    spices: "Tangy Red Sumac, Allspice, Cardamom, Cinnamon & Toasted Pine Nut Spice",
    sauces: ["Warm Tangy Herb Yogurt Sauce", "Shatta Red Chili & Lemon Tahini", "Sumac Olive Oil & Garlic Glaze"],
    carbs: ["Spiced Maqluba Basmati Rice", "Whole Wheat Taboon-Style Flatbread", "Freekeh (Roasted Green Wheat) Pilaf"],
    veggies: ["Roasted Cauliflower, Eggplant & Carrots", "Caramelized Sumac Red Onions & Parsley", "Finely Chopped Gazan Dill-Tomato Salad"]
  },
  {
    id: "turkish",
    name: "Turkish & Anatolian",
    region: "Mediterranean & Middle Eastern",
    icon: "🇹🇷",
    desc: "Adana Kebabs, Urfa & Aleppo Pepper, Cacik Yogurt & Charred Peppers",
    styles: ["Adana-Spiced Kebab Platter", "Anatolian Aleppo Pepper & Garlic Skillet", "Istanbul Charred Tomato & Bulgur Bowl", "Izmir Oregano & Lemon Grill"],
    spices: "Aleppo Pepper (Pul Biber), Urfa Chili, Mint, Cumin & Oregano",
    sauces: ["Chilled Cucumber-Dill Cacik Yogurt", "Ezme Spicy Tomato-Pomegranate Salsa", "Smoky Garlic Yogurt Butter"],
    carbs: ["Turkish Tomato & Pepper Bulgur Pilaf", "Warm Lavash Flatbread", "Crispy Sumac Potatoes"],
    veggies: ["Blistered Shishito/Green Peppers & Tomatoes", "Sumac Red Onion & Parsley Salad", "Charred Eggplant & Zucchini"]
  },
  {
    id: "greek",
    name: "Greek Islands",
    region: "Mediterranean & Middle Eastern",
    icon: "🇬🇷",
    desc: "Souvlaki Skewers, Tzatziki, Lemon-Oregano Potatoes, Olives & Feta",
    styles: ["Santorini Lemon-Oregano Souvlaki Bowl", "Aegean Grilled Gyro Platter", "Athenian Village Salad & Protein Skillet", "Cretan Garlic-Herb Roasted Plate"],
    spices: "Greek Mountain Oregano, Fresh Dill, Lemon Juice, Garlic & Cracked Pepper",
    sauces: ["Authentic Cucumber-Garlic Tzatziki", "Lemon-Herb Whipped Feta Crema", "Ladolemono (Olive Oil & Fresh Lemon Emulsion)"],
    carbs: ["Greek Lemon-Roasted Potatoes", "Herbed Brown Rice & Chickpeas", "Warm Whole Wheat Pita"],
    veggies: ["Horiatiki Cucumber, Tomato, Kalamata Olive & Red Onion", "Braised Lemony Spinach & Dill", "Charred Bell Peppers & Courgettes"]
  },
  {
    id: "moroccan",
    name: "Moroccan & North African",
    region: "Mediterranean & Middle Eastern",
    icon: "🇲🇦",
    desc: "Rose Harissa, Chermoula Herbs, Ras el Hanout, Couscous & Chickpeas",
    styles: ["Marrakesh Honey-Harissa Glazed Bowl", "Casablanca Chermoula Herb Skillet", "Ras el Hanout Tagine-Style Plate", "Agadir Spiced Skewer & Couscous Bowl"],
    spices: "Ras el Hanout, Rose Harissa, Cumin, Ginger, Cinnamon & Smoked Paprika",
    sauces: ["Fresh Cilantro-Garlic Chermoula", "Harissa-Spiced Greek Yogurt Drizzle", "Preserved Lemon & Olive Relish"],
    carbs: ["Steamed Whole Wheat Couscous with Chickpeas", "Saffron Basmati & Lentils", "Crispy Harissa Sweet Potatoes"],
    veggies: ["Roasted Carrots, Zucchini & Bell Peppers", "Moroccan Tomato, Cucumber & Mint Salad", "Garlicky Braised Greens"]
  },
  {
    id: "persian",
    name: "Persian / Iranian",
    region: "Mediterranean & Middle Eastern",
    icon: "🌿",
    desc: "Saffron Joojeh Marinade, Sumac, Barberries & Fragrant Dill-Bean Rice",
    styles: ["Saffron-Lemon Joojeh Grill Bowl", "Tehran Herb-Packed Sabzi Skillet", "Shirazi Citrus & Sumac Skewers", "Persian Spiced Koobideh Plate"],
    spices: "Saffron, Advieh (Rose Petal, Cardamom & Cumin), Sumac & Dried Lime",
    sauces: ["Mast-o-Khiar (Cucumber, Mint & Walnut Yogurt)", "Saffron-Lemon Olive Oil Baste", "Pomegranate & Herb Glaze"],
    carbs: ["Baghali Polo (Dill & Lima Bean Basmati Rice)", "Saffron Basmati with Lentils", "Crisp Lavash & Herbs"],
    veggies: ["Shirazi Salad (Diced Cucumber, Tomato, Red Onion & Mint)", "Charred Roma Tomatoes & Peppers", "Sautéed Spinach, Parsley & Cilantro"]
  },
  {
    id: "khaleeji",
    name: "Arabian Gulf / Khaleeji",
    region: "Mediterranean & Middle Eastern",
    icon: "🌴",
    desc: "Kabsa & Machboos Spices, Loomi Black Lime & Fragrant Basmati Bowls",
    styles: ["Royal Kabsa Spiced Protein & Rice Bowl", "Kuwaiti Machboos Loomi Skillet", "Dubai Charcoal-Spiced Grill Platter", "Cardamom-Saffron Rosted Bowl"],
    spices: "Baharat, Dried Black Lime (Loomi), Cardamom, Cloves, Turmeric & Cinnamon",
    sauces: ["Daqoos (Spiced Roasted Tomato-Garlic Sauce)", "Mint & Green Chili Yogurt Raita", "Tamarind-Date Citrus Glaze"],
    carbs: ["Fragrant Kabsa Spiced Basmati Rice", "Yellow Turmeric Rice & Split Peas", "Roasted Spiced Sweet Potato Cubes"],
    veggies: ["Fresh Rocca (Arugula), Tomato & Pomegranate Salad", "Caramelized Onions, Peppers & Raisin/Chickpea Garnish", "Cucumber & Mint Crunch"]
  },

  // South & East Asian
  {
    id: "indian",
    name: "Indian (North & South)",
    region: "South & East Asian",
    icon: "🇮🇳",
    desc: "Tandoori Char, Tikka Masala, Garam Masala, Cumin Rice & Chana",
    styles: ["Smoky Tandoori Charred Bowl", "Light Creamy Tikka Masala Skillet", "South Indian Curry Leaf & Pepper Fry", "Delhi Spiced Biryani-Style Protein Bowl", "Hariyali Mint-Cilantro Grill"],
    spices: "Garam Masala, Kashmiri Chili, Roasted Cumin, Turmeric, Fenugreek (Kasuri Methi) & Ginger-Garlic",
    sauces: ["Fresh Mint-Cilantro Yogurt Chutney", "Light Spiced Tomato-Yogurt Tikka Sauce", "Cucumber Tadka Raita"],
    carbs: ["Jeera (Cumin) Basmati Rice", "Spiced Chana (Chickpea) & Lentil Dal", "Whole Wheat Roti / High-Fiber Flatbread"],
    veggies: ["Kachumber Salad (Cucumber, Tomato, Red Onion & Lime)", "Charred Cauliflower & Bell Peppers (Aloo Gobi Style)", "Garlicky Palak (Spinach) Greens"]
  },
  {
    id: "pakistani",
    name: "Pakistani / Desi Grill",
    region: "South & East Asian",
    icon: "🇵🇰",
    desc: "Lahori Seekh Kabob, Ginger-Tomato Karahi, Chana & Mint Raita",
    styles: ["Lahori Wok Karahi with Fresh Ginger & Tomatoes", "Charcoal-Style Seekh Kabob Platter", "Peshawari Charsi Garlic-Pepper Grill", "Bihari Spiced Protein Bowl"],
    spices: "Crushed Coriander Seeds, Roasted Cumin, Black Pepper, Green Chili, Ginger Julienne & Chaat Masala",
    sauces: ["Zesty Green Chili-Mint Yogurt Raita", "Tamarind-Cumin Imli Chutney", "Sizzling Tomato-Ginger Karahi Reduction"],
    carbs: ["Kabuli Chana (Chickpea) & Basmati Pulao", "High-Fiber Whole Wheat Chapati Wrap", "Spiced Red Lentil & Rice Mix"],
    veggies: ["Fresh Julienne Ginger, Green Chilies, Cilantro & Lime Onion", "Charred Okra/Peppers & Tomatoes", "Crisp Cucumber & Radish Salad"]
  },
  {
    id: "japanese",
    name: "Japanese",
    region: "South & East Asian",
    icon: "🇯🇵",
    desc: "Teriyaki Glaze, Miso-Ginger, Edamame, Sesame & Poke-Style Bowls",
    styles: ["Tokyo Ginger-Teriyaki Donburi Bowl", "Kyoto White Miso & Sesame Glazed Plate", "Crispy Furikake & Edamame Poke-Style Bowl", "Teppanyaki Garlic Skillet"],
    spices: "Toasted White & Black Sesame, Fresh Grated Ginger, Miso, Nori & Seven-Spice Shichimi",
    sauces: ["House Low-Sugar Ginger Teriyaki Glaze", "Savory White Miso-Citrus Dressing", "Spicy Sriracha-Yogurt Ponzu Drizzle"],
    carbs: ["Steamed Jasmine/Sushi Rice with Edamame", "Soba Buckwheat Noodles", "Roasted Japanese Sweet Potato"],
    veggies: ["Shelled Edamame, Cucumber Ribbons & Radish", "Sesame Blistered Broccoli & Snap Peas", "Shredded Purple Cabbage & Pickled Ginger"]
  },
  {
    id: "korean",
    name: "Korean",
    region: "South & East Asian",
    icon: "🇰🇷",
    desc: "Savory Bulgogi, Gochujang Bibimbap Bowls, Sesame Greens & Crispy BBQ",
    styles: ["Seoul Bulgogi BBQ Rice Bowl", "Sizzling Gochujang Bibimbap Skillet", "Korean Garlic-Soy Crispy Bites", "Gwangjang Market Street Wrap"],
    spices: "Gochugaru Korean Chili Flakes, Toasted Sesame Oil, Grated Pear/Apple, Garlic & Ginger",
    sauces: ["Sweet-Spicy Gochujang Sesame Sauce", "Savory Pear-Garlic Bulgogi Glaze", "Scallion-Sesame Soy Dipping Sauce"],
    carbs: ["Steamed Short-Grain Rice & Edamame", "Korean Glass Noodle (Japchae) Stir-Fry", "Crisp Lettuce & Perilla Wraps"],
    veggies: ["Sesame Seasoned Spinach (Sigeumchi), Carrots & Bean Sprouts", "Quick Cucumber Kimchi & Scallions", "Charred Zucchini & Mushrooms"]
  },
  {
    id: "thai",
    name: "Thai & Southeast Asian",
    region: "South & East Asian",
    icon: "🇹🇭",
    desc: "Thai Basil Stir-Fry, Lemongrass-Lime, Satay & Coconut-Herb Bowls",
    styles: ["Bangkok Street Thai Basil (Pad Kra Pao) Bowl", "Chiang Mai Lemongrass-Lime Grill", "Golden Satay Skewer & Cucumber Relish Plate", "Thai Red Curry-Lime Skillet"],
    spices: "Fresh Thai Basil, Lemongrass, Galangal/Ginger, Kaffir Lime, Cilantro Root & Bird's Eye Chili",
    sauces: ["Zesty Thai Chili-Lime Nam Jim Dressing", "Light Creamy PBfit Satay Sauce", "Savory Garlic-Basil Stir-Fry Glaze"],
    carbs: ["Fragrant Jasmine Rice", "Rice Noodle Pad-Thai Style Toss", "Quinoa & Edamame Crunch"],
    veggies: ["Crisp Green Beans, Bell Peppers & Thai Basil", "Shredded Green Papaya/Cabbage, Carrot & Lime Slaw", "Snap Peas, Broccoli & Fresh Mint"]
  },
  {
    id: "chinese",
    name: "Chinese Wok & Stir-Fry",
    region: "South & East Asian",
    icon: "🥢",
    desc: "Szechuan Garlic-Ginger, Scallion Soy Glaze & Crisp Wok Vegetables",
    styles: ["Szechuan Garlic-Honey Wok Bowl", "Cantonese Ginger-Scallion Sizzle Plate", "Kung Pao Style High-Protein Skillet", "Crispy Black Pepper & Broccoli Bowl"],
    spices: "Five-Spice, Szechuan Peppercorn, Crushed Garlic, Fresh Ginger & Scallion Whites",
    sauces: ["Glossy Garlic-Ginger Soy Glaze", "Spicy Chili Crisp & Black Vinegar Sauce", "Light Citrus-Honey Sesame Sauce"],
    carbs: ["Edamame & Scallion Brown/Jasmine Rice", "Stir-Fried Cabbage & Whole Wheat Noodles", "Steamed Rice & Water Chestnuts"],
    veggies: ["Wok-Charred Broccoli, Snow Peas & Bell Peppers", "Bok Choy, Mushrooms & Scallions", "Smashed Cucumber & Garlic Salad"]
  },

  // European & Americas
  {
    id: "italian",
    name: "Italian Trattoria",
    region: "European & Americas",
    icon: "🇮🇹",
    desc: "Tuscan Garlic-Herb, Basil Pesto, Pomodoro, Balsamic & Parmesan",
    styles: ["Tuscan Sun-Dried Tomato & Spinach Skillet", "Amalfi Lemon-Caper Piccata Plate", "Roman Garlic-Rosemary Tagliata Bowl", "Crispy Parmesan-Herb Crusted Cutlet"],
    spices: "Fresh Sweet Basil, Rosemary, Oregano, Crushed Garlic, Balsamic & Cracked Black Pepper",
    sauces: ["Fresh Basil-Lemon Pesto Drizzle", "San Marzano Tomato, Garlic & Basil Marinara", "Aged Balsamic Glaze & Ricotta/Yogurt"],
    carbs: ["High-Protein Chickpea/Lentil Pasta", "Rosemary-Garlic Baby Gold Potatoes", "Cannellini White Beans & Farro"],
    veggies: ["Charred Broccolini, Zucchini & Cherry Tomatoes", "Arugula, Shaved Parmesan & Balsamic Salad", "Roasted Bell Peppers, Spinach & Artichokes"]
  },
  {
    id: "spanish",
    name: "Spanish Tapas & Paella",
    region: "European & Americas",
    icon: "🇪🇸",
    desc: "Smoked Paprika Pimentón, Garlic Gambas al Ajillo & Saffron Rice",
    styles: ["Valencia Saffron & Smoked Paprika Paella Bowl", "Madrid Garlic-Chili (Al Ajillo) Skillet", "Barcelona Romesco & Charred Veggie Plate", "Andalusian Moorish Spiced Skewers"],
    spices: "Smoked Spanish Paprika (Pimentón de la Vera), Saffron Threads, Garlic, Thyme & Bay Leaf",
    sauces: ["Roasted Red Pepper & Almond Romesco", "Sizzling Garlic-Lemon Olive Oil (Ajillo)", "Smoky Paprika Aioli (Greek Yogurt Based)"],
    carbs: ["Saffron Paella Rice with Green Peas", "Patatas Bravas (Crispy Spiced Potatoes)", "Chickpea & Spinach Cazuela"],
    veggies: ["Charred Padrón/Bell Peppers & Onions", "Roasted Tomatoes, Asparagus & Artichokes", "Crisp Orange, Fennel & Olive Salad"]
  },
  {
    id: "mexican",
    name: "Mexican & Baja Southwest",
    region: "European & Americas",
    icon: "🇲🇽",
    desc: "Sizzling Fajitas, Chipotle Burrito Bowls, Street Tacos, Black Beans & Pico",
    styles: ["Sizzling Cast-Iron Fajita Skillet", "Chipotle-Lime Burrito Power Bowl", "Baja Crispy Street Taco Plate", "Oaxacan Adobo Grilled Quesadilla/Wrap"],
    spices: "Smoky Chipotle, Ancho Chili, Roasted Cumin, Mexican Oregano, Garlic & Fresh Lime",
    sauces: ["Zesty Chipotle-Lime Greek Yogurt Crema", "Fresh Avocado Tomatillo Salsa Verde", "Fire-Roasted Tomato & Cilantro Pico de Gallo"],
    carbs: ["Cilantro-Lime Rice & Seasoned Black Beans", "High-Fiber Corn/Carb-Balance Tortillas", "Roasted Sweet Potato & Charred Corn"],
    veggies: ["Sizzling Tri-Color Bell Peppers & Red Onions", "Purple Cabbage, Mango & Cilantro Lime Slaw", "Romaine, Avocado, Tomato & Jalapeño"]
  },
  {
    id: "latin_peruvian",
    name: "Latin & Peruvian",
    region: "European & Americas",
    icon: "🇵🇪",
    desc: "Fresh Herb Chimichurri, Peruvian Pollo a la Brasa, Aji Verde & Citrus",
    styles: ["Gaucho Steakhouse Chimichurri Bowl", "Lima Pollo a la Brasa Spiced Plate", "Havana Mojo Citrus-Garlic Skillet", "Andean Quinoa & Aji Verde Bowl"],
    spices: "Smoked Paprika, Cumin, Garlic, Fresh Parsley, Cilantro, Oregano & Sour Orange/Lime",
    sauces: ["Argentine Fresh Parsley-Garlic Chimichurri", "Peruvian Spicy Cilantro-Lime Aji Verde (Yogurt Base)", "Cuban Citrus-Garlic Mojo Drizzle"],
    carbs: ["Peruvian Garlic Rice & Black Beans", "Crispy Air-Fried Sweet Potatoes", "Tri-Color Andean Quinoa"],
    veggies: ["Charred Asparagus, Peppers & Red Onion", "Avocado, Cucumber, Tomato & Lime Salad", "Roasted Corn & Zucchini"]
  },
  {
    id: "american_steakhouse",
    name: "American Grillhouse & BBQ",
    region: "European & Americas",
    icon: "🔥",
    desc: "Smoky Steakhouse Rub, Garlic-Herb Butter, Loaded Bowls & Crisp Salads",
    styles: ["Steakhouse Garlic-Herb Sizzle Bowl", "Smoky Backyard BBQ Glazed Plate", "Loaded California Cobb Power Salad", "Smash-Style High-Protein Burger Bowl"],
    spices: "Coarse Cracked Pepper, Smoked Sea Salt, Roasted Garlic, Onion & Hickory Paprika",
    sauces: ["Light Garlic-Herb Compound Butter", "Tangy Sugar-Free Hickory BBQ Glaze", "Creamy Greek-Yogurt Peppercorn Ranch"],
    carbs: ["Crispy Air-Fried Garlic Baby Potatoes", "Roasted Sweet Potato Wedges", "High-Fiber Brioche/Wrap or Brown Rice"],
    veggies: ["Charred Asparagus Spears & Cremini Mushrooms", "Crisp Romaine, Cherry Tomatoes & Avocado", "Roasted Broccoli Florets & Green Beans"]
  },
  {
    id: "cajun",
    name: "Cajun & Southern",
    region: "European & Americas",
    icon: "🎺",
    desc: "Louisiana Blackened Spice, Cajun Garlic Butter Skillets & Charred Corn",
    styles: ["New Orleans Blackened Cajun Skillet", "Bayou Garlic-Lemon Butter Bowl", "Creole Spiced Rice & Protein Jambalaya Bowl", "Southern Hot-Honey Crispy Bites"],
    spices: "Louisiana Cajun Blend, Smoked Paprika, Cayenne, Garlic, Onion, Thyme & Oregano",
    sauces: ["Cajun Lemon-Garlic Butter Pan Jus", "Creole Remoulade (Light Yogurt Base)", "Spicy Hot-Honey Citrus Drizzle"],
    carbs: ["Dirty-Style Spiced Rice & Red Beans", "Roasted Cajun Sweet Potatoes", "Fire-Roasted Corn & Black Bean Succotash"],
    veggies: ["Holy Trinity (Charred Bell Peppers, Celery & Red Onion)", "Blistered Cajun Green Beans", "Crisp Slaw with Apple Cider Tang"]
  },
  {
    id: "ethiopian",
    name: "Ethiopian / East African",
    region: "Mediterranean & Middle Eastern",
    icon: "🇪🇹",
    desc: "Warm Berbere Spice, Garlic-Ginger Tibs & Spiced Red Lentil Misir",
    styles: ["Addis Ababa Sizzling Tibs Skillet", "Berbere-Spiced Protein & Misir Lentil Bowl", "East African Ginger-Turmeric Grill Plate"],
    spices: "Authentic Berbere Spice (Fenugreek, Cardamom, Coriander, Chili, Allspice & Ginger)",
    sauces: ["Warm Berbere Awaze Dipping Sauce", "Cooling Herbed Yogurt Side", "Spiced Garlic-Ginger Oil Drizzle"],
    carbs: ["Misir Wot (Spiced Red Lentils) & Brown Rice", "Teff / Whole Grain Flatbread", "turmeric-Roasted Potatoes & Chickpeas"],
    veggies: ["Gomen (Garlicky Braised Collard Greens/Spinach)", "Tikil Gomen (Turmeric Cabbage & Carrots)", "Fresh Tomato, Jalapeño & Red Onion Salad"]
  }
];

// ================= DIETARY RESTRICTIONS & ALLERGY CATALOGS =================
window.DIETARY_CATALOG = [
  { id: "halal", label: "Halal Only", icon: "🌙", desc: "Strictly Halal meats; zero pork, bacon, ham, gelatin, or alcohol" },
  { id: "kosher", label: "Kosher Style", icon: "✡️", desc: "No pork or shellfish; never mixes meat and dairy in the same meal" },
  { id: "pork_free", label: "Pork-Free", icon: "🚫🐷", desc: "Excludes all pork, bacon, ham, prosciutto, and gelatin" },
  { id: "vegan", label: "Vegan (100% Plant)", icon: "🌱", desc: "100% plant-based proteins (tofu, tempeh, legumes, seitan); no meat, fish, dairy, or eggs" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥗", desc: "No meat, poultry, or fish; includes plant proteins, eggs, and dairy" },
  { id: "pescatarian", label: "Pescatarian", icon: "🐟", desc: "Fish & seafood + plant proteins, eggs, and dairy; no poultry or red meat" },
  { id: "keto_low_carb", label: "Low-Carb / Keto Friendly", icon: "🥑", desc: "Prioritizes high protein, healthy fats, cauliflower rice, and low-carb wraps" },
  { id: "high_protein", label: "High-Protein Athlete", icon: "💪", desc: "Maximizes lean protein density in every main meal and snack" }
];

window.ALLERGY_CATALOG = [
  { id: "gluten_free", label: "Gluten-Free", icon: "🌾", excludes: ["Wheat", "Bread", "Flour Tortilla", "Couscous", "Bulgur", "Pasta", "Panko"] },
  { id: "dairy_free", label: "Dairy-Free / Lactose-Free", icon: "🥛", excludes: ["Milk", "Cheese", "Yogurt", "Labneh", "Butter", "Cream", "Whey", "Cottage Cheese", "Feta", "Mozzarella", "Parmesan"] },
  { id: "nut_free", label: "Nut-Free (Peanuts & Tree Nuts)", icon: "🥜", excludes: ["Almonds", "Walnuts", "Pistachios", "Cashews", "Pecans", "Peanut Butter", "Almond Butter", "Pine Nuts", "Hazelnuts"] },
  { id: "shellfish_free", label: "Shellfish-Free", icon: "🦐", excludes: ["Shrimp", "Crab", "Lobster", "Prawns", "Scallops"] },
  { id: "fish_free", label: "Fish / Finfish-Free", icon: "🐠", excludes: ["Tilapia", "Salmon", "Cod", "Tuna", "Halibut", "Mahi"] },
  { id: "egg_free", label: "Egg-Free", icon: "🥚", excludes: ["Eggs", "Egg Whites", "Mayo"] },
  { id: "soy_free", label: "Soy-Free", icon: "🫘", excludes: ["Edamame", "Tofu", "Tempeh", "Soy Sauce"] }
];

// ================= EXPANDED HOMEMADE & STORE TREAT VAULTS (MULTI-OPTION ROTATION) =================
window.HOMEMADE_TREAT_VAULT = {
  chocolate_pb: [
    {
      name: "60-Second Molten Chocolate Peanut Butter Lava Protein Mug Cake",
      appliance: "Microwave (1 min)", prepTime: "4 mins", primaryProtein: "Whey & Dairy",
      protein: 24, carbs: 22, fat: 9, fiber: 5,
      flavorUpgrade: { name: "Top with 2 tbsp Sugar-Free Whipped Cream & 1 tsp Melted PB", calories: 60, protein: 2, carbs: 2, fat: 5, fiber: 0 },
      ingredients: [
        { item: "Chocolate Protein Powder", amount: "1 scoop (30g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Unsweetened Cocoa Powder & Baking Powder", amount: "1 tbsp cocoa + 1/4 tsp baking powder", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "0% Greek Yogurt & Almond Milk", amount: "3 tbsp yogurt + 2 tbsp milk", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Natural Creamy Peanut Butter", amount: "1 tbsp (15g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whisk chocolate protein powder, cocoa, baking powder, Greek yogurt, and almond milk in a mug until glossy.",
        "Drop 1 tbsp creamy peanut butter right into the center.",
        "Microwave 45–55 seconds so the edges set and the peanut butter core stays molten."
      ]
    },
    {
      name: "No-Bake Double Chocolate Peanut Butter Cup Protein Mousse",
      appliance: "No-Cook (3 mins)", prepTime: "3 mins", primaryProtein: "Dairy & Peanut",
      protein: 26, carbs: 19, fat: 8, fiber: 6,
      flavorUpgrade: { name: "Top with 10g Mini Dark Chocolate Chips & Flaky Sea Salt", calories: 55, protein: 1, carbs: 5, fat: 4, fiber: 1 },
      ingredients: [
        { item: "0% Plain Greek Yogurt", amount: "3/4 cup (170g)", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Powdered Peanut Butter (PBfit)", amount: "2 tbsp (16g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Dark Cocoa Powder & Zero-Cal Sweetener", amount: "1 tbsp cocoa + 1 tsp sweetener", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Chia Seeds", amount: "1 tsp", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whip Greek yogurt with cocoa powder and sweetener until airy like chocolate pudding.",
        "In a small cup, stir PBfit with 1.5 tbsp warm water into a silky peanut butter ribbon and swirl through the mousse."
      ]
    },
    {
      name: "Air Fryer Warm Chocolate-Stuffed Banana & PB Protein Pocket",
      appliance: "Air Fryer (5 mins)", prepTime: "6 mins", primaryProtein: "Plant & Whey",
      protein: 21, carbs: 28, fat: 8, fiber: 10,
      flavorUpgrade: { name: "Dust with Cinnamon & 1 tsp Crushed Roasted Peanuts", calories: 45, protein: 2, carbs: 1, fat: 4, fiber: 1 },
      ingredients: [
        { item: "High-Fiber Carb Balance Tortilla", amount: "1 wrap", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Ripe Banana (sliced)", amount: "1/2 medium banana", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Peanut Butter & Dark Chocolate Chips", amount: "1 tbsp PB + 10g dark chocolate", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Side Protein Shake or Greek Yogurt", amount: "1/2 cup", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Spread peanut butter in the center of the high-fiber tortilla, layer banana slices and dark chocolate chips.",
        "Fold into a tight pocket, mist with oil spray, and air fry at 390°F for 5 minutes until golden and melty inside."
      ]
    },
    {
      name: "Frozen Snickers-Style Date, Peanut Butter & Greek Yogurt Bark",
      appliance: "Freezer / No-Cook (5 mins)", prepTime: "5 mins", primaryProtein: "Dairy & Nuts",
      protein: 22, carbs: 25, fat: 9, fiber: 5,
      flavorUpgrade: { name: "Drizzle with 1 tsp Melted 85% Dark Chocolate", calories: 50, protein: 1, carbs: 3, fat: 4, fiber: 1 },
      ingredients: [
        { item: "Medjool Dates (halved & pitted)", amount: "2 dates", store: "Greenland Market / Papaya (Canton)", category: "Produce" },
        { item: "0% Vanilla Greek Yogurt", amount: "3/4 cup", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Powdered Peanut Butter (PBfit) + Cocoa", amount: "2 tbsp", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Chop Medjool dates into caramel-like bits.",
        "Swirl Greek yogurt with PBfit and cocoa in a shallow bowl, top with date bits, and freeze 12 minutes for a cold Snickers bowl!"
      ]
    }
  ],
  ice_cream: [
    {
      name: "Thick Pistachio & Berry Cheesecake Frozen Yogurt Bowl",
      appliance: "No-Cook / Freezer (5 mins)", prepTime: "5 mins", primaryProtein: "Dairy",
      protein: 23, carbs: 26, fat: 8, fiber: 6,
      flavorUpgrade: { name: "Add 15g Crushed Biscoff or Graham Cracker Crust", calories: 70, protein: 1, carbs: 11, fat: 3, fiber: 0 },
      ingredients: [
        { item: "0% Plain Greek Yogurt + 1 tbsp Labneh", amount: "1 cup (225g)", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Sugar-Free Cheesecake Pudding Mix", amount: "1.5 tbsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Fresh Strawberries & Raspberries", amount: "3/4 cup", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Crushed Shelled Pistachios", amount: "15g", store: "Greenland Market / Papaya (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whip cold Greek yogurt, labneh, and cheesecake pudding mix for 60 seconds until thick like soft-serve.",
        "Top with fresh berries and crushed pistachios. Freeze 10 mins for ice-cream texture!"
      ]
    },
    {
      name: "Blender Creamy Mango-Passionfruit Protein Sorbet Float",
      appliance: "Blender (3 mins)", prepTime: "3 mins", primaryProtein: "Whey & Dairy",
      protein: 25, carbs: 28, fat: 4, fiber: 5,
      flavorUpgrade: { name: "Top with Toasted Coconut Flakes & Tajin Rim", calories: 55, protein: 1, carbs: 3, fat: 4, fiber: 1 },
      ingredients: [
        { item: "Frozen Mango Chunks", amount: "1 cup (140g)", store: "Costco / Sam's Club (Canton)", category: "Produce" },
        { item: "Vanilla Protein Powder + Greek Yogurt", amount: "1/2 scoop protein + 1/2 cup yogurt", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Fresh Lime Juice & Splash Almond Milk", amount: "1/2 lime + 3 tbsp milk", store: "Joe Randazzo's (Westland)", category: "Produce" }
      ],
      steps: [
        "Pulse frozen mango, vanilla protein, Greek yogurt, lime juice, and just a splash of almond milk in a blender until thick like Gelato."
      ]
    },
    {
      name: "Cookies & Cream High-Protein FroYo McFlurry Bowl",
      appliance: "No-Cook (3 mins)", prepTime: "3 mins", primaryProtein: "Dairy & Whey",
      protein: 26, carbs: 24, fat: 6, fiber: 4,
      flavorUpgrade: { name: "Add 1 Extra Crushed Oreo Thins Cookie", calories: 35, protein: 0, carbs: 6, fat: 1, fiber: 0 },
      ingredients: [
        { item: "0% Plain or Vanilla Greek Yogurt", amount: "1 cup (225g)", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Vanilla Whey or Casein Protein", amount: "1/2 scoop (15g)", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Oreo Thins or Chocolate Wafer (crushed)", amount: "2 cookies crushed", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whip Greek yogurt and vanilla protein powder until ultra-thick, fold in crushed chocolate wafer crumbs, and chill in the freezer for 10 minutes."
      ]
    },
    {
      name: "Lebanese Ashta-Style Rosewater, Berry & Pistachio Cream Cup",
      appliance: "No-Cook (4 mins)", prepTime: "4 mins", primaryProtein: "Dairy",
      protein: 22, carbs: 23, fat: 8, fiber: 6,
      flavorUpgrade: { name: "Drizzle with 1 tsp Raw Orange Blossom Honey", calories: 45, protein: 0, carbs: 12, fat: 0, fiber: 0 },
      ingredients: [
        { item: "2% Cottage Cheese & Thick Greek Yogurt (whipped)", amount: "1/2 cup each", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Drop of Rosewater or Vanilla Extract", amount: "1/4 tsp", store: "Greenland Market / Papaya (Canton)", category: "Pantry & Spices" },
        { item: "Fresh Blackberries & Crushed Pistachios", amount: "1/2 cup berries + 15g pistachios", store: "Joe Randazzo's (Westland)", category: "Produce" }
      ],
      steps: [
        "Blend or whip cottage cheese and Greek yogurt with a drop of rosewater/vanilla into a rich Ashta-style clotted cream.",
        "Crown with fresh berries and green pistachios."
      ]
    }
  ],
  warm_bakery: [
    {
      name: "Air Fryer Crispy Cinnamon-Sugar Churro Chips with Chocolate Dip",
      appliance: "Air Fryer (6 mins)", prepTime: "8 mins", primaryProtein: "Dairy & Fiber",
      protein: 22, carbs: 28, fat: 7, fiber: 11,
      flavorUpgrade: { name: "Dip in Warm Caramel Sauce (1 tbsp)", calories: 55, protein: 0, carbs: 13, fat: 0, fiber: 0 },
      ingredients: [
        { item: "High-Fiber Carb Balance Tortilla", amount: "1 large tortilla", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Cinnamon & Zero-Cal Sweetener", amount: "1 tbsp mix", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt + Chocolate Protein Powder Dip", amount: "1/2 cup yogurt + 1/2 scoop whey", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Slice tortilla into 8 wedges, mist with oil spray, and coat with cinnamon-sweetener.",
        "Air fry at 390°F for 5–6 minutes until crunchy like churros. Dip into thick chocolate yogurt frosting."
      ]
    },
    {
      name: "Warm Apple Pie Crisp with Vanilla Protein Cream",
      appliance: "Air Fryer / Microwave (5 mins)", prepTime: "6 mins", primaryProtein: "Dairy & Oats",
      protein: 21, carbs: 30, fat: 6, fiber: 7,
      flavorUpgrade: { name: "Add 10g Toasted Pecans & Maple Drizzle", calories: 65, protein: 1, carbs: 3, fat: 6, fiber: 1 },
      ingredients: [
        { item: "Honeycrisp Apple (diced)", amount: "1 medium apple", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Rolled Oats & Cinnamon", amount: "2 tbsp oats + 1 tsp cinnamon", store: "Costco / Sam's Club (Canton)", category: "Bread & Grains" },
        { item: "0% Vanilla Greek Yogurt", amount: "3/4 cup", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Toss diced Honeycrisp apple with cinnamon, oats, and a splash of water; microwave 2 mins (or air fry 6 mins) until bubbling and tender.",
        "Top warm spiced apples with cold vanilla Greek yogurt."
      ]
    },
    {
      name: "60-Second Warm Cinnamon Roll Protein Mug Cake with Cream Cheese Glaze",
      appliance: "Microwave (1 min)", prepTime: "4 mins", primaryProtein: "Whey & Dairy",
      protein: 25, carbs: 21, fat: 7, fiber: 4,
      flavorUpgrade: { name: "Sprinkle with Crushed Walnuts (10g)", calories: 65, protein: 2, carbs: 1, fat: 6, fiber: 1 },
      ingredients: [
        { item: "Vanilla Protein Powder & Oat Flour", amount: "1 scoop protein + 1 tbsp oat flour", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Cinnamon & Baking Powder", amount: "1 tsp cinnamon + 1/4 tsp baking powder", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt & Whipped Cream Cheese Glaze", amount: "3 tbsp yogurt + 1 tbsp light cream cheese", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Stir vanilla protein, oat flour, baking powder, yogurt, and 2 tbsp water in a mug; swirl cinnamon through the batter.",
        "Microwave 50 seconds and top with melted light cream cheese glaze."
      ]
    }
  ],
  fruity: [
    {
      name: "Dark Chocolate Dipped Strawberries & Whipped Berry Greek Mousse",
      appliance: "No-Cook (4 mins)", prepTime: "4 mins", primaryProtein: "Dairy",
      protein: 21, carbs: 26, fat: 8, fiber: 7,
      flavorUpgrade: { name: "Sprinkle with Crushed Pistachios & Sea Salt", calories: 50, protein: 2, carbs: 2, fat: 4, fiber: 1 },
      ingredients: [
        { item: "Fresh Strawberries & Blackberries", amount: "1.5 cups", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "0% Vanilla Greek Yogurt", amount: "3/4 cup", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "70% Dark Chocolate Chips (melted)", amount: "15g", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Spoon cold Greek yogurt into a shallow bowl, top with halved strawberries and blackberries, and drizzle warm melted dark chocolate on top (it hardens into a magic shell!)."
      ]
    },
    {
      name: "Caramelized Air-Fryer Peach/Pear Halves with Cinnamon Labneh",
      appliance: "Air Fryer (7 mins)", prepTime: "8 mins", primaryProtein: "Dairy",
      protein: 20, carbs: 29, fat: 7, fiber: 6,
      flavorUpgrade: { name: "Add 1 tbsp Low-Sugar Granola Crunch", calories: 45, protein: 1, carbs: 7, fat: 2, fiber: 1 },
      ingredients: [
        { item: "Ripe Pear or Peach (halved)", amount: "1 medium fruit", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "0% Greek Yogurt + 1 tbsp Labneh", amount: "3/4 cup", store: "Greenland Market / Papaya (Canton)", category: "Dairy & Eggs" },
        { item: "Cinnamon & 1 tsp Honey", amount: "1 tsp", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Dust pear or peach halves with cinnamon and air fry at 390°F for 6–7 minutes until caramelized.",
        "Fill the warm centers with cold creamy Greek yogurt & labneh."
      ]
    },
    {
      name: "Pomegranate, Kiwi & Mint Berry Parfait with Chia Crunch",
      appliance: "No-Cook (3 mins)", prepTime: "3 mins", primaryProtein: "Dairy",
      protein: 22, carbs: 27, fat: 6, fiber: 8,
      flavorUpgrade: { name: "Add 1 tbsp Shredded Unsweetened Coconut", calories: 40, protein: 0, carbs: 1, fat: 4, fiber: 1 },
      ingredients: [
        { item: "0% Greek Yogurt", amount: "1 cup", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Green Kiwi, Raspberries & Pomegranate Arils", amount: "1 cup mixed", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Chia Seeds & Fresh Mint", amount: "1 tbsp chia", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Layer Greek yogurt with chia seeds, diced kiwi, raspberries, and jewel-like pomegranate arils."
      ]
    }
  ],
  cheesy_nacho: [
    {
      name: "Loaded Air Fryer High-Protein Chicken & Queso Movie Nachos",
      appliance: "Air Fryer (7 mins)", prepTime: "10 mins", primaryProtein: "Chicken & Cheese",
      protein: 28, carbs: 22, fat: 9, fiber: 9,
      flavorUpgrade: { name: "Top with 2 tbsp Guacamole & Jalapeños", calories: 55, protein: 1, carbs: 3, fat: 5, fiber: 2 },
      ingredients: [
        { item: "Quest Protein Tortilla Chips (or High-Fiber Tortilla Chips)", amount: "1 bag", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Shredded Cooked Chicken Breast", amount: "3 oz (85g)", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Reduced-Fat Mexican Blend Cheese & Pico", amount: "1/3 cup cheese + 1/4 cup pico", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Arrange tortilla chips in Air Fryer, top with shredded chicken and cheese, and air fry at 390°F for 3 minutes until melty. Top with fresh pico de gallo."
      ]
    },
    {
      name: "Warm Skillet Whipped Cottage-Cheese & Cheddar Blanco Queso Dip with Bell Peppers",
      appliance: "Blender + Microwave (4 mins)", prepTime: "5 mins", primaryProtein: "Dairy",
      protein: 25, carbs: 18, fat: 8, fiber: 5,
      flavorUpgrade: { name: "Stir in 2 tbsp Fire-Roasted Corn & Black Beans", calories: 45, protein: 2, carbs: 8, fat: 0, fiber: 2 },
      ingredients: [
        { item: "2% Cottage Cheese (blended smooth)", amount: "3/4 cup", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Sharp Cheddar + Taco Seasoning", amount: "25g cheese + 1 tsp seasoning", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Dairy & Eggs" },
        { item: "Mini Bell Pepper Scoops & High-Fiber Tortilla Wedges", amount: "1 cup", store: "Joe Randazzo's (Westland)", category: "Produce" }
      ],
      steps: [
        "Blend cottage cheese with taco seasoning until silky, stir in shredded cheddar, and microwave 45 seconds into warm stadium queso.",
        "Scoop up with toasted tortilla wedges and crunchy bell pepper boats."
      ]
    },
    {
      name: "Crispy Air Fryer Mozzarella & Marinara Pizza Roll-Ups",
      appliance: "Air Fryer (5 mins)", prepTime: "6 mins", primaryProtein: "Cheese & Turkey",
      protein: 24, carbs: 20, fat: 9, fiber: 10,
      flavorUpgrade: { name: "Dust with Grated Parmesan & Red Pepper Flakes", calories: 35, protein: 2, carbs: 0, fat: 2, fiber: 0 },
      ingredients: [
        { item: "High-Fiber Carb Balance Tortilla", amount: "1 large wrap", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Light Mozzarella String Cheese & Deli Turkey", amount: "2 sticks cheese + 2 slices turkey", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Warm Marinara Dipping Sauce", amount: "1/3 cup", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Wrap turkey and string cheese tightly inside tortilla halves, spray with olive oil and Italian seasoning, and air fry at 400°F for 5 minutes until golden and stretchy. Dip in warm marinara!"
      ]
    }
  ],
  spicy_crunchy: [
    {
      name: "Crispy Air Fryer Buffalo Chicken & Cauliflower Bites",
      appliance: "Air Fryer (10 mins)", prepTime: "12 mins", primaryProtein: "Chicken",
      protein: 26, carbs: 16, fat: 8, fiber: 5,
      flavorUpgrade: { name: "Add 15g Crumbled Blue Cheese or Feta", calories: 55, protein: 3, carbs: 1, fat: 4, fiber: 0 },
      ingredients: [
        { item: "Chicken Breast Bites & Cauliflower", amount: "3.5 oz chicken + 1 cup cauliflower", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Frank's RedHot Buffalo Sauce", amount: "2 tbsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" },
        { item: "Greek Yogurt Ranch Dip", amount: "3 tbsp", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" }
      ],
      steps: [
        "Toss chicken bites and cauliflower in garlic powder and Frank's Buffalo sauce.",
        "Air fry at 400°F for 9–10 minutes until crispy. Serve with Greek yogurt ranch."
      ]
    },
    {
      name: "Sizzling Cajun Chili-Lime Edamame & Crunchy Roasted Chickpeas",
      appliance: "Air Fryer / Skillet (5 mins)", prepTime: "5 mins", primaryProtein: "Plant / Legumes",
      protein: 22, carbs: 26, fat: 8, fiber: 9,
      flavorUpgrade: { name: "Toss with 15g Spicy Wasabi Peas or Almonds", calories: 70, protein: 3, carbs: 6, fat: 4, fiber: 2 },
      ingredients: [
        { item: "Steamed Edamame Pods & Roasted Chickpeas", amount: "1 cup edamame + 30g chickpeas", store: "Costco / Sam's Club (Canton)", category: "Produce" },
        { item: "Tajin Chili-Lime, Cayenne & Garlic", amount: "1 tsp", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Char edamame pods and chickpeas in a hot dry skillet or air fryer for 4 minutes, squeeze fresh lime juice over top, and toss generously in Tajin chili-lime seasoning."
      ]
    },
    {
      name: "Jalapeño Popper Stuffed Mini Peppers (Air Fryer)",
      appliance: "Air Fryer (7 mins)", prepTime: "9 mins", primaryProtein: "Dairy & Turkey",
      protein: 23, carbs: 15, fat: 9, fiber: 4,
      flavorUpgrade: { name: "Drizzle with Hot Honey (1 tsp)", calories: 30, protein: 0, carbs: 8, fat: 0, fiber: 0 },
      ingredients: [
        { item: "Mini Sweet Peppers & 1 Sliced Jalapeño", amount: "6 halved peppers", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Whipped Light Cream Cheese + Greek Yogurt + Cheddar", amount: "1/2 cup mix", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Chopped Crispy Turkey Bacon", amount: "2 slices", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" }
      ],
      steps: [
        "Spoon creamy cheddar-yogurt filling into halved mini peppers, top with jalapeño slices and turkey bacon bits, and air fry at 390°F for 6–7 minutes."
      ]
    }
  ],
  arabic_meze: [
    {
      name: "Warm Crispy Za'atar Pita Chips with Loaded Labneh Dip",
      appliance: "Air Fryer (6 mins)", prepTime: "8 mins", primaryProtein: "Dairy",
      protein: 21, carbs: 24, fat: 9, fiber: 6,
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
    },
    {
      name: "Sizzling Pan-Seared Halloumi & Watermelon-Mint Meze Plate",
      appliance: "Non-Stick Skillet (4 mins)", prepTime: "5 mins", primaryProtein: "Cheese",
      protein: 20, carbs: 19, fat: 11, fiber: 4,
      flavorUpgrade: { name: "Drizzle with 1 tsp Pomegranate Molasses & Pistachios", calories: 55, protein: 1, carbs: 6, fat: 3, fiber: 1 },
      ingredients: [
        { item: "Light Halloumi or Grilling Cheese (sliced)", amount: "2.5 oz (70g)", store: "Greenland Market / Papaya (Canton)", category: "Dairy & Eggs" },
        { item: "Persian Cucumber, Tomato & Fresh Mint", amount: "1.5 cups", store: "Joe Randazzo's (Westland)", category: "Produce" },
        { item: "Roasted Chickpeas (Qadama)", amount: "25g", store: "Greenland Market / Papaya (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Sear sliced halloumi in a dry non-stick skillet for 90 seconds per side until golden crusted.",
        "Serve warm with crisp cucumber, mint, and crunchy roasted chickpeas."
      ]
    },
    {
      name: "Loaded Hummus & Spiced Beef/Chickpea Shawarma Meze Bowl",
      appliance: "Stovetop (4 mins)", prepTime: "5 mins", primaryProtein: "Beef / Legumes",
      protein: 24, carbs: 22, fat: 9, fiber: 6,
      flavorUpgrade: { name: "Add Pickled Turnips & Shatta Hot Pepper Relish", calories: 25, protein: 0, carbs: 4, fat: 1, fiber: 1 },
      ingredients: [
        { item: "Classic or Pine-Nut Hummus", amount: "1/3 cup (80g)", store: "Greenland Market / Papaya (Canton)", category: "Dairy & Eggs" },
        { item: "Warm Cooked Lean Beef or Spiced Chickpeas", amount: "2.5 oz", store: "Greenland Market / Papaya (Canton)", category: "Halal Meat & Seafood" },
        { item: "Cucumber Spears, Radishes & Bell Pepper Strips", amount: "2 cups", store: "Joe Randazzo's (Westland)", category: "Produce" }
      ],
      steps: [
        "Swirl hummus in a shallow bowl, spoon warm spiced beef or chickpeas into the center with sumac and parsley, and scoop with crunchy vegetables."
      ]
    }
  ],
  kettle_popcorn: [
    {
      name: "Warm Cinnamon-Cocoa Kettle Popcorn & Protein Chocolate Drizzle Bowl",
      appliance: "No-Cook / Microwave (2 mins)", prepTime: "3 mins", primaryProtein: "Whey & Fiber",
      protein: 20, carbs: 26, fat: 8, fiber: 6,
      flavorUpgrade: { name: "Toss in 12 Roasted Salted Almonds", calories: 80, protein: 3, carbs: 3, fat: 7, fiber: 2 },
      ingredients: [
        { item: "Light Kettle or Sea-Salt Popcorn", amount: "3 cups popped", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Chocolate Whey Protein + 1 tbsp Water (Fudge Drizzle)", amount: "3/4 scoop", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Flaky Sea Salt & Cinnamon", amount: "Pinch", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Stir chocolate protein powder with just enough warm water (1 tbsp) to form a thick fudge icing.",
        "Drizzle over 3 cups of crunchy popcorn and toss with a pinch of flaky sea salt."
      ]
    },
    {
      name: "Sweet & Salty White Cheddar + Caramel Apple Popcorn Snack Mix",
      appliance: "No-Cook (2 mins)", prepTime: "2 mins", primaryProtein: "Dairy",
      protein: 19, carbs: 27, fat: 7, fiber: 5,
      flavorUpgrade: { name: "Add 10g Dark Chocolate Chunks", calories: 55, protein: 1, carbs: 5, fat: 4, fiber: 1 },
      ingredients: [
        { item: "Sea-Salt Air-Popped Popcorn", amount: "2.5 cups", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Freeze-Dried Apple Crisps & Light String Cheese", amount: "1/2 cup apples + 2 sticks cheese", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Produce" }
      ],
      steps: [
        "Toss crunchy popcorn with cinnamon-dusted apple crisps and pair with 2 high-protein string cheeses."
      ]
    }
  ],
  pb_pretzel: [
    {
      name: "Dark Chocolate, Pretzel & Peanut Butter Greek Yogurt Bark Bites",
      appliance: "No-Cook (4 mins)", prepTime: "4 mins", primaryProtein: "Dairy & Peanut",
      protein: 23, carbs: 24, fat: 8, fiber: 4,
      flavorUpgrade: { name: "Add 1 tsp Melted Creamy Peanut Butter", calories: 45, protein: 2, carbs: 1, fat: 4, fiber: 0 },
      ingredients: [
        { item: "0% Vanilla Greek Yogurt + 2 tbsp PBfit", amount: "3/4 cup yogurt", store: "Costco / Sam's Club (Canton)", category: "Dairy & Eggs" },
        { item: "Crunchy Mini Pretzel Twists (crushed)", amount: "20g (~10 pretzels)", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" },
        { item: "Dark Chocolate Chips", amount: "12g", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" }
      ],
      steps: [
        "Whip Greek yogurt and PBfit into a thick peanut butter frosting, fold in dark chocolate chips, and scoop up with salty crunchy pretzels!"
      ]
    },
    {
      name: "Warm Peanut Butter & Chocolate Pretzel Protein Mug Dip",
      appliance: "Microwave (30 secs)", prepTime: "3 mins", primaryProtein: "Peanut & Whey",
      protein: 24, carbs: 23, fat: 8, fiber: 5,
      flavorUpgrade: { name: "Slice 1/2 Banana for Dipping", calories: 50, protein: 1, carbs: 13, fat: 0, fiber: 2 },
      ingredients: [
        { item: "Powdered Peanut Butter (PBfit) + Chocolate Protein", amount: "3 tbsp PBfit + 1/2 scoop protein", store: "Costco / Sam's Club (Canton)", category: "Pantry & Spices" },
        { item: "Pretzel Thins & Apple Wedges", amount: "1 serving", store: "Walmart / Meijer / Kroger / Target (Canton)", category: "Bread & Grains" }
      ],
      steps: [
        "Mix PBfit and chocolate protein powder with warm milk/water into a glossy peanut-butter-cup fondue and warm 25 seconds. Dip crunchy pretzels and apple wedges!"
      ]
    }
  ]
};

window.STORE_TREAT_VAULT = {
  sweet: [
    {
      name: "Yasso Frozen Greek Yogurt Bars (Fudge Brownie / Mint Chip / Cookie Dough)",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Real ice-cream bar texture for 100 kcal per bar (have 2 bars for a 200-kcal movie treat!).",
      calories: 200, protein: 10, carbs: 28, fat: 4, fiber: 2
    },
    {
      name: "Halo Top Light Ice Cream Pint (Peanut Butter Cup / Chocolate Cake - 2/3 Pint)",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Eat two-thirds of a pint right out of the tub for 230 calories and 14g protein.",
      calories: 230, protein: 14, carbs: 34, fat: 6, fiber: 8
    },
    {
      name: "Barebells Chocolate Dough or Creamy Crisp Bar (Warmed 10 Secs in Microwave)",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Warm for 10 seconds in the microwave—melts into a gooey bakery brownie with 20g protein!",
      calories: 200, protein: 20, carbs: 20, fat: 7, fiber: 3
    },
    {
      name: "Tru Fru Hyper-Chilled Strawberries or Cherries in Dark Chocolate",
      store: "Costco / Sam's Club (Canton)",
      description: "Whole ripe berries immersed in real dark chocolate in the freezer aisle.",
      calories: 210, protein: 3, carbs: 26, fat: 10, fiber: 4
    },
    {
      name: "Quest Peanut Butter Cups (2-Pack Twin Pouch)",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Tastes just like Reese's Cups with 11g protein and less than 1g sugar per pack.",
      calories: 190, protein: 11, carbs: 11, fat: 15, fiber: 4
    },
    {
      name: "Oikos Triple Zero Vanilla + Fresh Randazzo Berries & Dark Choc Chips",
      store: "Costco / Sam's Club (Canton)",
      description: "Ready-to-eat 15g protein cup topped with fresh raspberries and dark chocolate.",
      calories: 220, protein: 17, carbs: 25, fat: 5, fiber: 6
    },
    {
      name: "Nick's Swedish-Style Light Ice Cream (Triple Choklad or Pistachio - 2/3 Pint)",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Ultra-creamy keto-friendly Swedish ice cream packed with fiber and low net carbs.",
      calories: 210, protein: 7, carbs: 22, fat: 12, fiber: 9
    },
    {
      name: "Built Puff Marshmallow Protein Bar (Brownie Batter or Coconut)",
      store: "Costco / Sam's Club (Canton)",
      description: "3- Musketeers fluffy chocolate-coated marshmallow texture with 17g protein.",
      calories: 150, protein: 17, carbs: 15, fat: 3, fiber: 2
    },
    {
      name: "Legendary Foods Tasty Pastry (Brown Sugar Cinnamon or Chocolate Pop-Tart)",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Toast for 10 seconds—a warm frosted toaster pastry with 20g protein and 4g net carbs!",
      calories: 180, protein: 20, carbs: 22, fat: 8, fiber: 9
    }
  ],
  savory: [
    {
      name: "Quest Tortilla Style Protein Chips (Nacho Cheese / Chili Lime) + Fresh Salsa",
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
    },
    {
      name: "The Only Bean Crunchy Dry-Roasted Edamame (Sea Salt / Buffalo / Wasabi)",
      store: "Costco / Sam's Club (Canton)",
      description: "Single snack pouch packs 14g plant protein and 5g fiber with intense crunch.",
      calories: 195, protein: 18, carbs: 13, fat: 7, fiber: 7
    },
    {
      name: "Wilde Protein Chips (Buffalo Style or Nashville Hot Chicken)",
      store: "Costco / Sam's Club (Canton)",
      description: "Crispy kettle-style chips made from real chicken breast & bone broth.",
      calories: 170, protein: 10, carbs: 10, fat: 10, fiber: 1
    },
    {
      name: "Whisps Parmesan Cheese Crisps + Persian Cucumbers & Hummus",
      store: "Costco / Sam's Club (Canton)",
      description: "100% baked artisan cheese crisps paired with cool cucumber slices and garlic hummus.",
      calories: 225, protein: 16, carbs: 12, fat: 13, fiber: 4
    },
    {
      name: "Hippeas Chickpea Puffs (Vegan White Cheddar) + Turkey Bites",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Crunchy cheesy chickpea puffs paired with lean deli turkey roll-ups.",
      calories: 215, protein: 18, carbs: 20, fat: 7, fiber: 4
    },
    {
      name: "Greenland Warm Spiced Lupini Beans (Termos) with Lemon & Cumin",
      store: "Greenland Market / Papaya (Canton)",
      description: "Classic Mediterranean street snack—ultra-high protein, high fiber, and zero guilt.",
      calories: 185, protein: 19, carbs: 16, fat: 4, fiber: 8
    },
    {
      name: "Quest Cheese Crackers (Cheddar Blast) + Sliced Bell Peppers",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Cheez-It style crunch with 10g protein and 5g net carbs per bag.",
      calories: 165, protein: 11, carbs: 13, fat: 9, fiber: 5
    }
  ],
  sweet_salty: [
    {
      name: "SkinnyPop Kettle Corn (2 cups) + Barebells Caramel Cashew Protein Bar",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Chop a Barebells bar (tastes like Snickers!) into bite-sized pieces with kettle popcorn.",
      calories: 280, protein: 21, carbs: 31, fat: 10, fiber: 5
    },
    {
      name: "Tru Fru Frozen Raspberries in Dark & White Chocolate + Salted Pistachios",
      store: "Costco / Sam's Club (Canton)",
      description: "Real whole raspberries in chocolate paired with crunchy salted pistachios.",
      calories: 235, protein: 6, carbs: 26, fat: 12, fiber: 6
    },
    {
      name: "Chobani Flip (Salted Caramel Crunch / S'mores) + 12 Roasted Almonds",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Greek yogurt with crunchy salted caramel and pretzel mix-ins.",
      calories: 245, protein: 15, carbs: 26, fat: 9, fiber: 3
    },
    {
      name: " Drizzilicious Cinnamon Swirl Mini Rice Cakes + String Cheese",
      store: "Costco / Sam's Club (Canton)",
      description: "90-calorie bag of white-chocolate drizzled cinnamon mini crisps + 1 protein cheese stick.",
      calories: 170, protein: 9, carbs: 20, fat: 6, fiber: 2
    },
    {
      name: "SkinnyDipped Dark Chocolate Cocoa Almonds + Fresh Strawberries",
      store: "Costco / Sam's Club (Canton)",
      description: "Lightly chocolate-dusted roasted almonds paired with sweet strawberries.",
      calories: 210, protein: 7, carbs: 20, fat: 12, fiber: 6
    },
    {
      name: "Snack Factory Pretzel Crisps + PBfit Chocolate Peanut Butter Dip",
      store: "Walmart / Meijer / Kroger / Target (Canton)",
      description: "Thin crunchy salted pretzel crisps dunked into high-protein chocolate peanut butter.",
      calories: 225, protein: 14, carbs: 28, fat: 6, fiber: 4
    }
  ]
};

