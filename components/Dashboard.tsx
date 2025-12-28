
import React from 'react';
import { UserProfile, NutritionGuidelines } from '../types';
import { Flame, Target, Utensils, Zap } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  guidelines: NutritionGuidelines;
}

const Dashboard: React.FC<DashboardProps> = ({ user, guidelines }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Hi, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-slate-500">Here's your nutritional summary for today.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600">
            <Flame size={24} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Target</div>
            <div className="text-xl font-bold text-slate-800">{guidelines.dailyCalories} kcal</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
            <Target size={24} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Goal</div>
            <div className="text-lg font-bold text-slate-800 capitalize">{user.goal.replace('_', ' ')}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <Zap size={24} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Protein</div>
            <div className="text-xl font-bold text-slate-800">{guidelines.macros.protein}g</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
            <Utensils size={24} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Carbs</div>
            <div className="text-xl font-bold text-slate-800">{guidelines.macros.carbs}g</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Nutrition Tips</h3>
          <div className="space-y-3">
            {guidelines.keyTips.slice(0, 3).map((tip, idx) => (
              <div key={idx} className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-emerald-800 text-sm font-medium">
                {tip}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-bold text-slate-800">Recommended Foods</h3>
          <div className="flex flex-wrap gap-2">
            {guidelines.recommendedFoods.map((food, idx) => (
              <span key={idx} className="px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-600 text-xs font-semibold shadow-sm">
                {food}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
