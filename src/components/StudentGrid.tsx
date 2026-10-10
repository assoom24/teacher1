import React, { useState } from 'react';
import { Search, ArrowUpDown, Sparkles, Plus, Award } from 'lucide-react';
import { Student } from '../types';
import { StudentCard } from './StudentCard';
import { soundEffects } from '../utils/soundEffects';

interface StudentGridProps {
  students: Student[];
  currentClass: string;
  onAddPoint: (studentId: string, delta: number, reason?: string) => void;
  onOpenDetails: (student: Student) => void;
  onQuickAddStudent: () => void;
  onRemoveStudent?: (studentId: string, studentName: string) => void;
}

export const StudentGrid: React.FC<StudentGridProps> = ({
  students,
  currentClass,
  onAddPoint,
  onOpenDetails,
  onQuickAddStudent,
  onRemoveStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'stars-desc' | 'stars-asc' | 'alpha'>('default');

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === 'stars-desc') return b.stars - a.stars;
    if (sortBy === 'stars-asc') return a.stars - b.stars;
    if (sortBy === 'alpha') return a.name.localeCompare(b.name, 'ar');
    return 0;
  });

  // Calculate ranks for star counts > 0
  const starSortedAll = [...students].sort((a, b) => b.stars - a.stars);
  const getRank = (studentId: string) => {
    const idx = starSortedAll.findIndex((s) => s.id === studentId);
    return idx !== -1 ? idx + 1 : undefined;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-5">
      {/* Sub-bar: Search, Sort and Class Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="البحث عن طالب..."
            className="w-full pr-9 pl-3 py-1.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Sort and Count */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => {
                soundEffects.playClick();
                setSortBy(e.target.value as any);
              }}
              className="bg-transparent font-semibold focus:outline-none cursor-pointer"
            >
              <option value="default">الترتيب الأصلي</option>
              <option value="stars-desc">الأكثر نجوماً ⭐</option>
              <option value="stars-asc">الأقل نجوماً</option>
              <option value="alpha">أبجدياً (أ-ي)</option>
            </select>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            {students.length} طالب
          </div>

          <button
            onClick={onQuickAddStudent}
            className="flex items-center gap-1 text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">إضافة طالب</span>
          </button>
        </div>
      </div>

      {/* Grid of Student Cards Matching Reference Picture */}
      {sortedStudents.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700">لا يوجد طلبة يطابقون البحث</h3>
          <p className="text-xs text-slate-400 mt-1">جرب مسح البحث أو إضافة طالب جديد</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {sortedStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              currentClass={currentClass}
              onAddPoint={onAddPoint}
              onOpenDetails={onOpenDetails}
              onRemoveStudent={onRemoveStudent}
              rank={getRank(student.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
