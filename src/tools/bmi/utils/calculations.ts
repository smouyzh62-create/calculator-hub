import type { BMIInputs, BMIResults, ActivityLevel, Gender } from '../types';

/**
 * Calculate BMI and TDEE using Mifflin-St Jeor formula.
 *
 * BMI = weight(kg) / (height(cm)/100)^2
 *
 * BMR (Mifflin-St Jeor):
 *   Male:   10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
 *   Female: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
 *
 * Activity multipliers:
 *   sedentary: 1.2 | light: 1.375 | moderate: 1.55 | heavy: 1.725 | athlete: 1.9
 */

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2, light: 1.375, moderate: 1.55, heavy: 1.725, athlete: 1.9,
};

export function convertToMetric(weight: number, height: number, unit: 'metric' | 'imperial'): { weightKg: number; heightCm: number } {
  if (unit === 'metric') return { weightKg: weight, heightCm: height };
  return { weightKg: weight * 0.453592, heightCm: height * 2.54 };
}

export function calculateBMI(inputs: BMIInputs): BMIResults {
  const { age, gender, activity, unit } = inputs;
  const { weightKg, heightCm } = convertToMetric(inputs.weight, inputs.height, unit);

  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 100) / 100;

  let category: BMIResults['category'] = 'healthy';
  if (bmi < 18.5) category = 'underweight';
  else if (bmi < 25) category = 'healthy';
  else if (bmi < 30) category = 'overweight';
  else category = 'obese';

  // Mifflin-St Jeor BMR
  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = Math.round(gender === 'male' ? baseBMR + 5 : baseBMR - 161);
  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);

  const healthyRangeMin = Math.round(18.5 * heightM * heightM * 100) / 100;
  const healthyRangeMax = Math.round(24.9 * heightM * heightM * 100) / 100;

  return {
    bmi, category, bmr, tdee,
    cutCalories: tdee - 500,
    maintainCalories: tdee,
    bulkCalories: tdee + 300,
    healthyRangeMin,
    healthyRangeMax,
  };
}

export function getBMIColor(category: string): string {
  switch (category) {
    case 'underweight': return '#f59e0b';
    case 'healthy': return '#22c55e';
    case 'overweight': return '#f97316';
    case 'obese': return '#ef4444';
    default: return '#22c55e';
  }
}
