"use client";
import React, { useState } from "react";
import {
  Search,
  Sunrise,
  Sun,
  Moon,
  Flame,
  Clock,
  ChefHat,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const RECIPE_DETAILS_DB = {
  oats_chilla: {
    name: "🥣 Oats Chilla with Curd",
    category: "Breakfast Pick",
    calories: "220 kcal",
    time: "12 mins",
    macros: { protein: "12g", carbs: "30g", fats: "5g" },
    ingredients: ["Oats (50g)", "Low-fat Curd (100g)", "Tomato", "Green Chili"],
    steps: [
      "Grind oats powder.",
      "Mix with curd and veggies.",
      "Cook on tawa until golden brown.",
    ],
  },
  paneer_bhurji: {
    name: "🧀 Low-Fat Paneer Bhurji",
    category: "Lunch Pick",
    calories: "310 kcal",
    time: "10 mins",
    macros: { protein: "22g", carbs: "8g", fats: "15g" },
    ingredients: ["Low-fat Paneer (150g)", "Onion", "Tomato", "Spices"],
    steps: [
      "Crumble paneer.",
      "Saute onions and tomatoes with spices.",
      "Add paneer and cook for 2 mins.",
    ],
  },
  tomato_soup: {
    name: "🍅 Healthy Tomato Soup",
    category: "Dinner Pick",
    calories: "110 kcal",
    time: "15 mins",
    macros: { protein: "3g", carbs: "18g", fats: "2g" },
    ingredients: ["Tomatoes (3)", "Garlic", "Onion", "Black Pepper"],
    steps: [
      "Chop veggies and boil with water.",
      "Blend to smooth puree.",
      "Strain and reheat with pepper.",
    ],
  },
};

export default function ResponsiveSidebarLayout() {
  const [activeRecipeKey, setActiveRecipeKey] = useState("oats_chilla");
  const [isCollapsed, setIsCollapsed] = useState(false); // For Desktop
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For Mobile Drawer
  const [searchQuery, setSearchQuery] = useState("");

  const activeRecipe = RECIPE_DETAILS_DB[activeRecipeKey];

  const sidebarItems = [
    {
      key: "oats_chilla",
      name: "Breakfast Pick",
      short: "🍳",
      icon: <Sunrise size={16} />,
    },
    {
      key: "paneer_bhurji",
      name: "Lunch Pick",
      short: "🍛",
      icon: <Sun size={16} />,
    },
    {
      key: "tomato_soup",
      name: "Dinner Pick",
      short: "🌙",
      icon: <Moon size={16} />,
    },
  ];

  const libraryItems = [
    { key: "paneer_bhurji", name: "Paneer Bhurji", short: "🧀" },
    { key: "oats_chilla", name: "Oats Chilla", short: "🥣" },
    { key: "tomato_soup", name: "Tomato Soup", short: "🍅" },
  ].filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

 
  const MenuContent = () => (
    <div className="space-y-6 overflow-y-auto">
      {/* AI Picks */}
      <div className="space-y-1">
        {(!isCollapsed || isMobileMenuOpen) && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block mb-2">
            ✨ Today's AI Picks
          </span>
        )}
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveRecipeKey(item.key);
              setIsMobileMenuOpen(false); // Close drawer on selection
            }}
            className={`w-full rounded-xl flex items-center text-xs font-semibold transition-all hover:translate-x-1 ${
              isCollapsed && !isMobileMenuOpen
                ? "justify-center p-2.5"
                : "px-3 py-2.5 gap-2.5"
            } ${
              activeRecipeKey === item.key
                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-100 shadow-sm"
                : "hover:bg-slate-50 text-slate-600"
            }`}
          >
            {isCollapsed && !isMobileMenuOpen ? (
              <span className="text-lg">{item.short}</span>
            ) : (
              item.icon
            )}
            {(!isCollapsed || isMobileMenuOpen) && (
              <span className="truncate">{item.name}</span>
            )}
          </button>
        ))}
      </div>

      {/* Library */}
      <div className="space-y-3">
        {(!isCollapsed || isMobileMenuOpen) && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 block">
            📚 Recipe Library
          </span>
        )}
        {!isCollapsed || isMobileMenuOpen ? (
          <div className="relative mx-1">
            <Search
              className="absolute left-2.5 top-2 text-slate-400"
              size={14}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-slate-50 pl-8 pr-3 py-1.5 rounded-lg text-[11px] border border-slate-200 focus:outline-none"
            />
          </div>
        ) : (
          <div className="flex justify-center text-slate-300 py-1">
            <Search size={16} />
          </div>
        )}

        <div className="space-y-1">
          {libraryItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveRecipeKey(item.key);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full rounded-lg text-xs font-medium flex items-center transition-colors hover:translate-x-1 ${
                isCollapsed && !isMobileMenuOpen
                  ? "justify-center p-2.5"
                  : "py-2 px-3 gap-2"
              } ${activeRecipeKey === item.key ? "bg-slate-100 text-slate-900 font-bold border-l-2 border-slate-900" : "hover:bg-slate-50 text-slate-600"}`}
            >
              {isCollapsed && !isMobileMenuOpen ? (
                <span className="text-lg">{item.short}</span>
              ) : (
                <BookOpen size={12} className="text-slate-400" />
              )}
              {(!isCollapsed || isMobileMenuOpen) && (
                <span className="truncate">{item.name}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gradient-to-tr from-slate-50 via-white to-emerald-50 min-h-screen text-slate-800 font-sans relative ">

      <div className="md:hidden w-full p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-1.5 shadow md border bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 active:scale-95 transition-all"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>


      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 z-50 animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-[75%] max-w-[280px] bg-white h-full p-4 space-y-6 pt-24 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <MenuContent />
          </div>
        </div>
      )}

  
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 bg-white border-r border-slate-200 transition-all duration-300 z-30 ${
          isCollapsed ? "w-[70px]" : "w-[30%] max-w-[280px]"
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-6 bg-white border border-slate-200 text-slate-500 p-1 rounded-full shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div
          className={`p-5 border-b border-slate-100 flex items-center ${isCollapsed ? "justify-center" : "gap-2"}`}
        >
          <ChefHat className="text-emerald-600 flex-shrink-0" size={22} />
          {!isCollapsed && (
            <h1 className="text-base font-black tracking-tight text-slate-900">
              QuickChefAI
            </h1>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <MenuContent />
        </div>
      </aside>


      <main className="flex-1 p-4 md:p-8 pt-28 md:pt-8 overflow-y-auto w-full max-w-4xl mx-auto">
        {activeRecipe ? (
          <div className=" rounded-2xl md:rounded-3xl p-4 md:p-6 space-y-5 md:space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-4 pt-10">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">
                  {activeRecipe.category}
                </span>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-1 tracking-tight">
                  {activeRecipe.name}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mt-1">
                  <span className="flex items-center gap-1">
                    <Clock size={13} /> {activeRecipe.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame size={13} className="text-orange-500" />{" "}
                    {activeRecipe.calories}
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5 w-full sm:w-auto justify-between sm:justify-start">
                {Object.entries(activeRecipe.macros).map(([key, val]) => (
                  <div
                    key={key}
                    className={`px-3 py-2 rounded-2xl text-center flex-1 sm:flex-initial min-w-[70px]
                    border shadow-sm transition-all
                    ${
                        key === "protein"
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                        : key === "carbs"
                            ? "bg-blue-50 border-blue-100 text-blue-700"
                            : "bg-orange-50 border-orange-100 text-orange-700"
                    }
                    `}
                  >
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">
                      {key}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  🛒 Ingredients
                </h3>
                <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="text-xs font-semibold text-slate-600 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span className="truncate">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>


              <div className="md:col-span-2 md:pl-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  👩‍🍳 Directions
                </h3>
                <ol className="space-y-3.5">
                  {activeRecipe.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 items-start">
                      <span className="bg-slate-100 text-slate-700 font-bold text-xs w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs font-medium text-slate-600 leading-relaxed">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs">
            Select an item to view.
          </div>
        )}
      </main>
    </div>
  );
}
