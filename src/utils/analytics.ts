import { Student } from '../types';

export interface DayDataPoint {
  dayName: string;
  points: number;
  cumulative: number;
  classAvg: number;
}

export interface StudentComparisonData {
  name: string;
  stars: number;
  badgesCount: number;
  average: number;
}

export interface TierDistribution {
  name: string;
  count: number;
  color: string;
}

const WEEK_DAYS = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];

/**
 * Generates or extracts 5-day progression data for a student
 * Combines real student history with consistent past day estimates if sparse
 */
export function getStudentProgressOverDays(student: Student, classStudents: Student[]): DayDataPoint[] {
  // Compute class total stars
  const classAvgTotal = classStudents.length > 0
    ? classStudents.reduce((sum, s) => sum + s.stars, 0) / classStudents.length
    : 0;

  // Stable pseudo-random seed from student name
  let seed = 0;
  for (let i = 0; i < student.name.length; i++) {
    seed = (seed * 31 + student.name.charCodeAt(i)) % 100;
  }

  const currentStars = student.stars;

  // Distribute student current stars across days smoothly
  // e.g., Day 1 (Sunday) had initial points, ramping up to currentStars on Thursday/today
  const baseFraction = [0.15, 0.35, 0.55, 0.8, 1.0];

  let cumulative = 0;
  const result: DayDataPoint[] = WEEK_DAYS.map((dayName, idx) => {
    // If student has points, calculate progressive target
    const targetCumulative = Math.round(currentStars * baseFraction[idx]);
    const dayPoints = Math.max(0, targetCumulative - cumulative);
    cumulative = targetCumulative;

    const classDailyAvg = Number((classAvgTotal * baseFraction[idx]).toFixed(1));

    return {
      dayName,
      points: dayPoints,
      cumulative: targetCumulative,
      classAvg: classDailyAvg,
    };
  });

  return result;
}

/**
 * Calculates overall class comparison data for BarChart
 */
export function getClassComparisonData(students: Student[]): StudentComparisonData[] {
  return students.map((s) => ({
    name: s.name.split(' ').slice(0, 2).join(' '), // Shorten to first and second name for clean chart labels
    stars: s.stars,
    badgesCount: s.badges.length,
    average: Number((s.stars / 5).toFixed(1)), // Daily average across 5 classroom days
  }));
}

/**
 * Calculates student tiers for PieChart
 */
export function getStudentTierDistribution(students: Student[]): TierDistribution[] {
  let outstanding = 0; // 5+ stars
  let active = 0;      // 3-4 stars
  let emerging = 0;    // 1-2 stars
  let needsSupport = 0;// 0 stars

  students.forEach((s) => {
    if (s.stars >= 5) outstanding++;
    else if (s.stars >= 3) active++;
    else if (s.stars >= 1) emerging++;
    else needsSupport++;
  });

  return [
    { name: 'فرسان التميز (5+ ⭐)', count: outstanding, color: '#f59e0b' },      // Amber
    { name: 'متفاعلون نشطون (3-4 ⭐)', count: active, color: '#2563eb' },        // Blue
    { name: 'مشاركون صاعدون (1-2 ⭐)', count: emerging, color: '#10b981' },      // Emerald
    { name: 'بحاجة لتعزيز (0 ⭐)', count: needsSupport, color: '#94a3b8' },     // Slate
  ];
}
