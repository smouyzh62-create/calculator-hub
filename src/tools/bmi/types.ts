export type Gender = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'heavy' | 'athlete';
export type UnitSystem = 'metric' | 'imperial';
export type Locale = 'en' | 'zh';
export type Theme = 'light' | 'dark';

export interface BMIInputs {
  weight: number;     // kg or lb
  height: number;     // cm or in
  age: number;
  gender: Gender;
  activity: ActivityLevel;
  unit: UnitSystem;
}

export interface BMIResults {
  bmi: number;
  category: 'underweight' | 'healthy' | 'overweight' | 'obese';
  bmr: number;               // Base Metabolic Rate (kcal)
  tdee: number;              // Total Daily Energy Expenditure (kcal)
  cutCalories: number;       // TDEE - 500
  maintainCalories: number;  // TDEE
  bulkCalories: number;      // TDEE + 300
  healthyRangeMin: number;   // BMI 18.5 weight
  healthyRangeMax: number;   // BMI 24.9 weight
}
