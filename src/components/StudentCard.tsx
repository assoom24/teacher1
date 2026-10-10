import React, { useState } from 'react';
import { Star, Plus, Minus, MoreVertical, Trash2 } from 'lucide-react';
import { Student } from '../types';
import { INITIAL_BADGES } from '../data/initialData';
import { soundEffects } from '../utils/soundEffects';

interface StudentCardProps {
  student: Student;
  currentClass?: string;
  onAddPoint: (studentId: string, delta: number, reason?: string) => void;
  onOpenDetails: (student: Student) => void;
  onRemoveStudent?: (studentId: string, studentName: string) => void;
  rank?: number;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  currentClass,
  onAddPoint,
  onOpenDetails,
  onRemoveStudent,
  rank,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const [floatingDelta, setFloatingDelta] = useState<number | null>(null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playStarSound();
    onAddPoint(student.id, 1, 'مشاركة وتفاعل في الحصة');
    setJustAdded(true);
    setFloatingDelta(1);
    setTimeout(() => {
      setJustAdded(false);
      setFloatingDelta(null);
    }, 600);
  };

  const handleQuickSubtract = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (student.stars <= 0) return;
    soundEffects.playBuzzerSound();
    onAddPoint(student.id, -1, 'مخالفة تعليمات الحصة');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const classNameText = currentClass ? `من ${currentClass}` : 'من هذا الصف';
    if (window.confirm(`هل أنتِ متأكدة من حذف الطالب "${student.name}" ${classNameText}؟`)) {
      soundEffects.playBuzzerSound();
      if (onRemoveStudent) {
        onRemoveStudent(student.id, student.name);
      }
    }
  };

  const studentBadges = INITIAL_BADGES.filter((b) => student.badges.includes(b.id));

  return (
    <div
      onClick={() => onOpenDetails(student)}
      className="group relative bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[145px] hover:-translate-y-1 select-none overflow-hidden"
    >
      {/* Floating Star Notification on point addition */}
      {floatingDelta !== null && (
        <div className="absolute top-3 left-3 bg-amber-500 text-white font-extrabold text-xs px-2 py-1 rounded-full shadow-lg pointer-events-none animate-star-pop z-20">
          +{floatingDelta} ⭐
        </div>
      )}

      {/* Delete button on top left corner (RTL) - visible on hover or mobile tap */}
      {onRemoveStudent && (
        <button
          onClick={handleDelete}
          title="حذف الطالب من الصف"
          className="absolute top-2 left-2 p-1.5 rounded-lg text-slate-300 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Rank badge if top 3 */}
      {rank && rank <= 3 && student.stars > 0 && (
        <div className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full z-10 flex items-center gap-1 shadow-xs bg-amber-100 text-amber-800 border border-amber-300">
          {rank === 1 && '🥇 الأول'}
          {rank === 2 && '🥈 الثاني'}
          {rank === 3 && '🥉 الثالث'}
        </div>
      )}

      {/* Student Name */}
      <div className="pt-1">
        <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl text-center tracking-tight truncate leading-tight group-hover:text-blue-700 transition-colors">
          {student.name}
        </h3>

        {/* Badges strip if any */}
        {studentBadges.length > 0 && (
          <div className="flex items-center justify-center gap-1 mt-1.5 flex-wrap">
            {studentBadges.map((badge) => (
              <span
                key={badge.id}
                title={badge.name}
                className="text-xs px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1"
              >
                <span>{badge.icon}</span>
                <span className="hidden sm:inline text-[10px]">{badge.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Center Star Counter Matching Reference Photo Exactly (e.g. "0 ⭐") */}
      <div className="my-2 flex items-center justify-center">
        <div
          onClick={handleQuickAdd}
          className={`flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl transition-all transform active:scale-95 ${
            justAdded ? 'scale-110 bg-amber-100 ring-2 ring-amber-400' : 'bg-slate-50 hover:bg-amber-50'
          }`}
          title="انقر لإضافة نجمة فورية"
        >
          <span className="text-2xl font-black text-blue-900 tabular-nums">
            {student.stars}
          </span>
          <Star
            className={`w-6 h-6 transition-transform ${
              student.stars > 0
                ? 'fill-amber-400 text-amber-500 group-hover:scale-110'
                : 'fill-amber-300/60 text-amber-400'
            }`}
          />
        </div>
      </div>

      {/* Action Strip at bottom of Card */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs text-slate-500">
        <button
          onClick={handleQuickSubtract}
          disabled={student.stars <= 0}
          title="خصم نقطة (-1)"
          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleQuickAdd}
          className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded-lg transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span>نجمة</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            soundEffects.playClick();
            onOpenDetails(student);
          }}
          title="تفاصيل وسام وملاحظات"
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <MoreVertical className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
