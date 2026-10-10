export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  stars: number;
  badges: string[]; // Badge IDs
  avatarBg?: string;
  history?: {
    timestamp: number;
    delta: number;
    reason: string;
  }[];
}

export interface Classroom {
  id: string;
  name: string;
  grade: string;
  students: Student[];
}

export interface Team {
  id: string;
  name: string;
  color: string;
  members: Student[];
  score: number;
}

export type GradeLevel = 'grade5' | 'grade6' | 'grade7' | 'grade8' | 'general';

export interface ITQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
  grade?: GradeLevel;
}

export interface HardwareSoftwareItem {
  id: string;
  name: string;
  type: 'hardware' | 'software';
  categoryAr: string;
  icon: string;
  hint: string;
}

export function detectGradeLevel(className: string): GradeLevel {
  const normalized = className.trim();
  if (normalized.includes('خامس') || normalized.includes('5')) return 'grade5';
  if (normalized.includes('سادس') || normalized.includes('6')) return 'grade6';
  if (normalized.includes('سابع') || normalized.includes('7')) return 'grade7';
  if (normalized.includes('ثامن') || normalized.includes('8')) return 'grade8';
  return 'general';
}

export function getGradeLabel(grade: GradeLevel): string {
  switch (grade) {
    case 'grade5':
      return 'الصف الخامس';
    case 'grade6':
      return 'الصف السادس';
    case 'grade7':
      return 'الصف السابع';
    case 'grade8':
      return 'الصف الثامن';
    default:
      return 'المستوى العام';
  }
}
