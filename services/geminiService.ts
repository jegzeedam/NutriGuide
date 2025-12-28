
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, DailyPlan, NutritionGuidelines, EducationalTip } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MEAL_PLAN_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      day: { type: Type.STRING },
      breakfast: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fat: { type: Type.NUMBER },
        },
        required: ["name", "ingredients", "instructions", "calories", "protein", "carbs", "fat"],
      },
      lunch: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fat: { type: Type.NUMBER },
        },
        required: ["name", "ingredients", "instructions", "calories", "protein", "carbs", "fat"],
      },
      dinner: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fat: { type: Type.NUMBER },
        },
        required: ["name", "ingredients", "instructions", "calories", "protein", "carbs", "fat"],
      },
      snack: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
          instructions: { type: Type.STRING },
          calories: { type: Type.NUMBER },
          protein: { type: Type.NUMBER },
          carbs: { type: Type.NUMBER },
          fat: { type: Type.NUMBER },
        },
        required: ["name", "ingredients", "instructions", "calories", "protein", "carbs", "fat"],
      },
      totalCalories: { type: Type.NUMBER },
    },
    required: ["day", "breakfast", "lunch", "dinner", "snack", "totalCalories"],
  },
};

const GUIDELINES_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    dailyCalories: { type: Type.NUMBER },
    macros: {
      type: Type.OBJECT,
      properties: {
        protein: { type: Type.NUMBER },
        carbs: { type: Type.NUMBER },
        fat: { type: Type.NUMBER },
      },
      required: ["protein", "carbs", "fat"],
    },
    keyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommendedFoods: { type: Type.ARRAY, items: { type: Type.STRING } },
    avoidFoods: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["dailyCalories", "macros", "keyTips", "recommendedFoods", "avoidFoods"],
};

export const generateMealPlan = async (profile: UserProfile): Promise<DailyPlan[]> => {
  const prompt = `Generate a 3-day healthy and affordable meal plan for a ${profile.age}-year-old ${profile.gender} who is ${profile.height}cm, ${profile.weight}kg. 
  Activity Level: ${profile.activityLevel}. Goal: ${profile.goal}. Allergies: ${profile.allergies.join(', ') || 'none'}. Preferences: ${profile.preferences}. 
  Ensure meals are easy to cook and use common ingredients.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: MEAL_PLAN_SCHEMA,
    },
  });

  return JSON.parse(response.text);
};

export const generateGuidelines = async (profile: UserProfile): Promise<NutritionGuidelines> => {
  const prompt = `Based on the following profile, provide professional nutrition guidelines:
  - Age: ${profile.age}
  - Gender: ${profile.gender}
  - Height: ${profile.height}cm
  - Weight: ${profile.weight}kg
  - Goal: ${profile.goal}
  - Activity: ${profile.activityLevel}
  Calculate daily caloric needs and macronutrient distribution (protein, carbs, fat in grams). Provide specific tips for their goal.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: GUIDELINES_SCHEMA,
    },
  });

  return JSON.parse(response.text);
};

export const generateDailyTips = async (): Promise<EducationalTip[]> => {
  const prompt = `Generate 4 short, actionable nutrition and wellness tips for beginner health enthusiasts. 
  Categories: nutrition, habit, hydration, cooking.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.STRING },
            category: { type: Type.STRING },
          },
          required: ["title", "content", "category"],
        },
      },
    },
  });

  return JSON.parse(response.text);
};
