
import React from 'react';
import { UserProfile, NutritionGuidelines } from '../types';
import { User, Mail, Settings, Bell, Shield, HelpCircle } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  guidelines: NutritionGuidelines;
}

const ProfileView: React.FC<ProfileProps> = ({ user, guidelines }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center gap-6">
        <div className="w-24 h-24 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-emerald-200">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-slate-500">Pro Member • Since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Your Stats</h3>
              <button className="text-emerald-600 text-sm font-bold">Edit Profile</button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Height</div>
                <div className="text-lg font-bold text-slate-800">{user.height} cm</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</div>
                <div className="text-lg font-bold text-slate-800">{user.weight} kg</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Age</div>
                <div className="text-lg font-bold text-slate-800">{user.age} years</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Activity</div>
                <div className="text-lg font-bold text-slate-800 capitalize">{user.activityLevel.replace('_', ' ')}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Goal</div>
                <div className="text-lg font-bold text-slate-800 capitalize">{user.goal.replace('_', ' ')}</div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Daily Targets</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-bold text-slate-600">Calorie Target</span>
                  <span className="text-lg font-bold text-emerald-600">{guidelines.dailyCalories} kcal</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                  <span className="text-sm font-bold text-slate-600">Macro Ratio</span>
                  <span className="text-sm font-bold text-slate-400">P:{guidelines.macros.protein}g C:{guidelines.macros.carbs}g F:{guidelines.macros.fat}g</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            {[
              { icon: Bell, label: 'Notifications', color: 'text-blue-500' },
              { icon: Shield, label: 'Privacy & Security', color: 'text-emerald-500' },
              { icon: Settings, label: 'Account Settings', color: 'text-slate-500' },
              { icon: HelpCircle, label: 'Support & FAQ', color: 'text-amber-500' },
            ].map((item, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-slate-50 ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                </div>
                <div className="text-slate-300">
                  <Settings size={16} />
                </div>
              </button>
            ))}
          </div>

          <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
            <h4 className="text-red-800 font-bold mb-2">Danger Zone</h4>
            <p className="text-red-600 text-xs mb-4">Resetting your data will permanently delete your personalized plan and progress history.</p>
            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-sm transition-all shadow-lg shadow-red-100">
              Reset My Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileView;
