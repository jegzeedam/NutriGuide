
import React, { useState } from 'react';
import { DailyPlan, Meal } from '../types';
import { ChevronRight, Clock, Scale } from 'lucide-react';

interface MealPlanViewProps {
  mealPlan: DailyPlan[];
}

const MealCard: React.FC<{ label: string; meal: Meal }> = ({ label, meal }) => (
  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
    <div className="p-6 flex-1">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
          {label}
        </span>
        <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
          <span className="flex items-center gap-1"><Scale size={14} /> {meal.calories} kcal</span>
          <span className="flex items-center gap-1"><Clock size={14} /> 15-20 min</span>
        </div>
      </div>
      <h4 className="text-xl font-bold text-slate-800 mb-2">{meal.name}</h4>
      <p className="text-sm text-slate-500 line-clamp-2 mb-4">{meal.instructions}</p>
      
      <div className="flex flex-wrap gap-1.5">
        {meal.ingredients.slice(0, 4).map((ing, i) => (
          <span key={i} className="text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded-lg border border-slate-100">
            {ing}
          </span>
        ))}
        {meal.ingredients.length > 4 && <span className="text-[10px] text-slate-400 py-1 px-1">+{meal.ingredients.length - 4} more</span>}
      </div>
    </div>
    <div className="bg-slate-50 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 min-w-[140px]">
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 font-medium">Protein</span>
          <span className="text-slate-700 font-bold">{meal.protein}g</span>
        </div>
        <div className="w-full bg-slate-200 h-1 rounded-full">
          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, meal.protein * 2)}%` }} />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 font-medium">Carbs</span>
          <span className="text-slate-700 font-bold">{meal.carbs}g</span>
        </div>
        <div className="w-full bg-slate-200 h-1 rounded-full">
          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, meal.carbs)}%` }} />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400 font-medium">Fat</span>
          <span className="text-slate-700 font-bold">{meal.fat}g</span>
        </div>
        <div className="w-full bg-slate-200 h-1 rounded-full">
          <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, meal.fat * 3)}%` }} />
        </div>
      </div>
    </div>
  </div>
);

const MealPlanView: React.FC<MealPlanViewProps> = ({ mealPlan }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Your Meal Plan</h2>
          <p className="text-slate-500">A personalized 3-day nutrition cycle.</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm w-fit">
          {mealPlan.map((plan, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedDay === idx ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              Day {idx + 1}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-4">
        <MealCard label="Breakfast" meal={mealPlan[selectedDay].breakfast} />
        <MealCard label="Lunch" meal={mealPlan[selectedDay].lunch} />
        <MealCard label="Snack" meal={mealPlan[selectedDay].snack} />
        <MealCard label="Dinner" meal={mealPlan[selectedDay].dinner} />
      </div>

      <div className="bg-slate-800 p-6 rounded-3xl text-white flex justify-between items-center shadow-xl shadow-slate-200">
        <div>
          <h5 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Daily Fuel</h5>
          <div className="text-2xl font-bold">{mealPlan[selectedDay].totalCalories} kcal</div>
        </div>
        <button className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl transition-all">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MealPlanView;
