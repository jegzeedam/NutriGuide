
import React, { useState } from 'react';
import { UserProfile, Gender, ActivityLevel, Goal } from '../types';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: 25,
    gender: 'female',
    height: 170,
    weight: 70,
    activityLevel: 'moderate',
    goal: 'maintenance',
    allergies: [],
    preferences: '',
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender: Gender) => setFormData(prev => ({ ...prev, gender }));
  const handleActivitySelect = (level: ActivityLevel) => setFormData(prev => ({ ...prev, activityLevel: level }));
  const handleGoalSelect = (goal: Goal) => setFormData(prev => ({ ...prev, goal }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-emerald-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">
        <div className="h-2 bg-emerald-100 flex">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">Let's get started!</h2>
              <p className="text-slate-500">First, tell us your basic details so we can personalize your plan.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g. Alex Doe"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
                    <input
                      required
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Gender</label>
                    <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-200">
                      {(['male', 'female'] as Gender[]).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => handleGenderSelect(g)}
                          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                            formData.gender === g ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500'
                          }`}
                        >
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={nextStep}
                disabled={!formData.name}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Next Step <ArrowRight size={20} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">Your Measurements</h2>
              <p className="text-slate-500">We use these to calculate your metabolic rate and calorie needs.</p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Height (cm)</label>
                    <span className="text-emerald-600 font-bold">{formData.height} cm</span>
                  </div>
                  <input
                    type="range"
                    name="height"
                    min="100"
                    max="250"
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-semibold text-slate-700">Weight (kg)</label>
                    <span className="text-emerald-600 font-bold">{formData.weight} kg</span>
                  </div>
                  <input
                    type="range"
                    name="weight"
                    min="30"
                    max="200"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">Goals & Activity</h2>
              
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Primary Health Goal</label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { id: 'weight_loss', label: 'Weight Loss', sub: 'Burn fat and get leaner' },
                    { id: 'maintenance', label: 'Maintenance', sub: 'Stay healthy and energized' },
                    { id: 'weight_gain', label: 'Weight Gain', sub: 'Build muscle and strength' },
                    { id: 'better_skin', label: 'Better Skin', sub: 'Focus on skin-clearing nutrition' },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => handleGoalSelect(goal.id as Goal)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        formData.goal === goal.id 
                        ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                        : 'border-slate-200 hover:border-emerald-200 bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-slate-800">{goal.label}</div>
                      <div className="text-xs text-slate-500">{goal.sub}</div>
                    </button>
                  ))}
                </div>

                <label className="block text-sm font-semibold text-slate-700 mt-4 mb-1">Activity Level</label>
                <select
                  name="activityLevel"
                  value={formData.activityLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="sedentary">Sedentary (Office job, little exercise)</option>
                  <option value="light">Lightly Active (1-3 days exercise)</option>
                  <option value="moderate">Moderately Active (3-5 days exercise)</option>
                  <option value="active">Very Active (Daily exercise)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl"
                >
                  <ArrowLeft size={20} className="mx-auto" />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
                >
                  Next Step <ArrowRight size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">Final Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Dietary Preferences / Restrictions</label>
                  <textarea
                    name="preferences"
                    value={formData.preferences}
                    onChange={handleInputChange}
                    placeholder="e.g. Vegetarian, no spicy food, budget friendly meals..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl h-32 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Any Allergies?</label>
                  <input
                    name="allergiesInput"
                    placeholder="e.g. Peanuts, Shellfish (comma separated)"
                    onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value.split(',').map(s => s.trim()) }))}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-1/3 border border-slate-200 text-slate-600 font-bold py-4 rounded-2xl"
                >
                  <ArrowLeft size={20} className="mx-auto" />
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-200"
                >
                  Generate My Plan <CheckCircle2 size={20} />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
