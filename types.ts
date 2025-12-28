
export type Gender = 'male' | 'female' | 'other';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type Goal = 'weight_loss' | 'weight_gain' | 'maintenance' | 'better_skin' | 'high_energy';

export interface UserProfile {
  name: string;
  age: number;
  gender: Gender;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: ActivityLevel;
  goal: Goal;
  allergies: string[];
  preferences: string; // e.g., "vegetarian", "no seafood"
}

export interface Meal {
  name: string;
  ingredients: string[];
  instructions: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface DailyPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snack: Meal;
  totalCalories: number;
}

export interface NutritionGuidelines {
  dailyCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  keyTips: string[];
  recommendedFoods: string[];
  avoidFoods: string[];
}

export interface ProgressEntry {
  date: string;
  weight: number;
  mood: number; // 1-5
  adherence: number; // 1-100%
}

export interface EducationalTip {
  title: string;
  content: string;
  category: 'nutrition' | 'habit' | 'hydration' | 'cooking';
}
