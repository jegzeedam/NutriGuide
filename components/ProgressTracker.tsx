
import React, { useState, useEffect } from 'react';
import { ProgressEntry } from '../types';
import { LineChart, Plus, Calendar, Smile, TrendingUp } from 'lucide-react';

const ProgressTracker: React.FC = () => {
  const [history, setHistory] = useState<ProgressEntry[]>(() => {
    const saved = localStorage.getItem('nutriguide_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [weight, setWeight] = useState('');
  const [mood, setMood] = useState(3);
  const [adherence, setAdherence] = useState(80);

  const saveEntry = () => {
    if (!weight) return;
    const newEntry: ProgressEntry = {
      date: new Date().toLocaleDateString(),
      weight: parseFloat(weight),
      mood,
      adherence
    };
    const updated = [newEntry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('nutriguide_history', JSON.stringify(updated));
    setWeight('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Progress Tracker</h2>
        <p className="text-slate-500">Keep an eye on your journey to a healthier you.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Plus className="text-emerald-500" size={20} />
              Quick Check-in
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Weight (kg)</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Daily Adherence: {adherence}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={adherence}
                  onChange={(e) => setAdherence(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">How's your mood?</label>
                <div className="flex justify-between bg-slate-50 p-1 rounded-xl border border-slate-200">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMood(val)}
                      className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-all ${
                        mood === val ? 'bg-white shadow-sm scale-110' : 'text-slate-300'
                      }`}
                    >
                      {['😫', '😕', '😐', '🙂', '🤩'][val - 1]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={saveEntry}
                disabled={!weight}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                Save Progress
              </button>
            </div>
          </div>
        </section>

        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[400px]">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="text-emerald-500" size={20} />
              Recent History
            </h3>

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-4">
                <LineChart size={48} className="opacity-20" />
                <p>No progress data yet. Start tracking today!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-800">{entry.date}</div>
                        <div className="text-xs text-slate-500">Plan adherence: {entry.adherence}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-600">{entry.weight} kg</div>
                      <div className="text-xs text-slate-400">Mood: {['😫', '😕', '😐', '🙂', '🤩'][entry.mood - 1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProgressTracker;
