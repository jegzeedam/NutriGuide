
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MealPlanView from './components/MealPlanView';
import ProgressTracker from './components/ProgressTracker';
import TipsLibrary from './components/TipsLibrary';
import ProfileView from './components/ProfileView';
import { UserProfile, DailyPlan, NutritionGuidelines } from './types';
import { generateMealPlan, generateGuidelines } from './services/geminiService';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('nutriguide_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [mealPlan, setMealPlan] = useState<DailyPlan[] | null>(() => {
    const saved = localStorage.getItem('nutriguide_meals');
    return saved ? JSON.parse(saved) : null;
  });
  const [guidelines, setGuidelines] = useState<NutritionGuidelines | null>(() => {
    const saved = localStorage.getItem('nutriguide_guidelines');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && (!mealPlan || !guidelines)) {
      initializeData(user);
    }
  }, [user]);

  const initializeData = async (profile: UserProfile) => {
    setLoading(true);
    try {
      const [meals, rules] = await Promise.all([
        generateMealPlan(profile),
        generateGuidelines(profile)
      ]);
      setMealPlan(meals);
      setGuidelines(rules);
      localStorage.setItem('nutriguide_meals', JSON.stringify(meals));
      localStorage.setItem('nutriguide_guidelines', JSON.stringify(rules));
    } catch (error) {
      console.error("Error generating nutrition data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('nutriguide_user', JSON.stringify(profile));
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setMealPlan(null);
    setGuidelines(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">Generating Your Plan</h2>
        <p className="text-slate-500 text-center max-w-sm mt-2">
          Our AI is calculating your nutritional needs and crafting a personalized meal plan...
        </p>
      </div>
    );
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {activeTab === 'dashboard' && guidelines && (
        <Dashboard user={user} guidelines={guidelines} />
      )}
      {activeTab === 'meals' && mealPlan && (
        <MealPlanView mealPlan={mealPlan} />
      )}
      {activeTab === 'progress' && (
        <ProgressTracker />
      )}
      {activeTab === 'tips' && (
        <TipsLibrary />
      )}
      {activeTab === 'profile' && (
        <ProfileView user={user} guidelines={guidelines} />
      )}
    </Layout>
  );
};

export default App;
