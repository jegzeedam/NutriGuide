
import React, { useState, useEffect } from 'react';
import { EducationalTip } from '../types';
import { generateDailyTips } from '../services/geminiService';
import { BookOpen, Droplets, Utensils, Zap, Loader2 } from 'lucide-react';

const TipsLibrary: React.FC = () => {
  const [tips, setTips] = useState<EducationalTip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const data = await generateDailyTips();
        setTips(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTips();
  }, []);

  const getIcon = (category: string) => {
    switch (category) {
      case 'hydration': return <Droplets className="text-blue-500" />;
      case 'nutrition': return <Utensils className="text-emerald-500" />;
      case 'habit': return <Zap className="text-amber-500" />;
      case 'cooking': return <BookOpen className="text-purple-500" />;
      default: return <BookOpen />;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="animate-spin text-emerald-500 mb-2" />
        <p className="text-slate-500">Curating the best tips for you...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Learn Nutrition</h2>
        <p className="text-slate-500">Evidence-based bites of knowledge for your health journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tips.map((tip, idx) => (
          <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white transition-all">
              {getIcon(tip.category)}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 block">{tip.category}</span>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{tip.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-emerald-600 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
        <div className="relative z-10 space-y-4">
          <h2 className="text-3xl font-bold max-w-md">Why focus on whole foods?</h2>
          <p className="text-emerald-50 max-w-lg leading-relaxed">
            Whole foods are generally more nutrient-dense and less processed, helping you stay full longer and maintain stable blood sugar levels throughout the day.
          </p>
          <button className="bg-white text-emerald-600 px-6 py-3 rounded-2xl font-bold text-sm shadow-lg">Explore More</button>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen size={180} />
        </div>
      </div>
    </div>
  );
};

export default TipsLibrary;
