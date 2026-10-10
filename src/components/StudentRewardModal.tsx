import React from 'react';
import { X, Star, Award, AlertCircle, Sparkles, Check, Minus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student, Badge } from '../types';
import { INITIAL_BADGES, PRAISE_PHRASES, PENALTY_REASONS } from '../data/initialData';
import { soundEffects } from '../utils/soundEffects';

interface StudentRewardModalProps {
  student: Student;
  currentClass: string;
  onClose: () => void;
  onAddPoint: (studentId: string, delta: number, reason: string) => void;
  onToggleBadge: (studentId: string, badgeId: string) => void;
  onRemoveStudent?: (studentId: string, studentName: string) => void;
}

export const StudentRewardModal: React.FC<StudentRewardModalProps> = ({
  student,
  currentClass,
  onClose,
  onAddPoint,
  onToggleBadge,
  onRemoveStudent,
}) => {
  const handleReward = (delta: number, reason: string) => {
    soundEffects.playStarSound();
    onAddPoint(student.id, delta, reason);
    try {
      confetti({
        particleCount: delta * 25,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  const handlePenalty = (reason: string) => {
    if (student.stars <= 0) return;
    soundEffects.playBuzzerSound();
    onAddPoint(student.id, -1, reason);
  };

  const handleBadgeClick = (badge: Badge) => {
    soundEffects.playStarSound();
    onToggleBadge(student.id, badge.id);
  };

  const handleDelete = () => {
    if (window.confirm(`هل أنتِ متأكدة من حذف الطالب "${student.name}" من ${currentClass}؟`)) {
      soundEffects.playBuzzerSound();
      if (onRemoveStudent) {
        onRemoveStudent(student.id, student.name);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl font-black">
              ⭐
            </div>
            <div>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <span>الرصيد في {currentClass}:</span>
                <span className="font-extrabold text-amber-300">{student.stars} نجمة</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick Positive Rewards */}
          <div>
            <div className="text-xs font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>منح نقاط التعزيز والتميز:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleReward(1, 'مشاركة وتفاعل في الحصة')}
                className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-extrabold text-sm flex flex-col items-center gap-1 transition-transform active:scale-95 shadow-2xs"
              >
                <span className="text-lg">⭐</span>
                <span>+1 نجمة</span>
                <span className="text-[10px] text-amber-700 font-normal">مشاركة وتفاعل</span>
              </button>

              <button
                onClick={() => handleReward(2, 'إجابة نموذجية على السؤال')}
                className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-extrabold text-sm flex flex-col items-center gap-1 transition-transform active:scale-95 shadow-2xs"
              >
                <span className="text-lg">🌟</span>
                <span>+2 نجمتان</span>
                <span className="text-[10px] text-blue-700 font-normal">إجابة نموذجية</span>
              </button>

              <button
                onClick={() => handleReward(3, 'إبداع تقني في التطبيق العملي')}
                className="p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-extrabold text-sm flex flex-col items-center gap-1 transition-transform active:scale-95 shadow-2xs"
              >
                <span className="text-lg">🚀</span>
                <span>+3 نجوم</span>
                <span className="text-[10px] text-emerald-700 font-normal">تطبيق عملي</span>
              </button>

              <button
                onClick={() => handleReward(5, 'نجم الحصة المتفوق')}
                className="p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 font-extrabold text-sm flex flex-col items-center gap-1 transition-transform active:scale-95 shadow-2xs"
              >
                <span className="text-lg">👑</span>
                <span>+5 نجوم</span>
                <span className="text-[10px] text-purple-700 font-normal">نجم الحصة</span>
              </button>
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <div className="text-xs font-bold text-slate-500 mb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-500" />
              <span>أوسمة تقنية المعلومات (انقري للتقلد / الإلغاء):</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {INITIAL_BADGES.map((badge) => {
                const hasBadge = student.badges.includes(badge.id);
                return (
                  <button
                    key={badge.id}
                    onClick={() => handleBadgeClick(badge)}
                    className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                      hasBadge
                        ? `${badge.color} font-extrabold shadow-xs ring-1 ring-offset-1`
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{badge.icon}</span>
                      <div>
                        <div className="text-xs font-bold leading-tight">{badge.name}</div>
                        <div className="text-[10px] opacity-70 truncate max-w-[120px]">{badge.description}</div>
                      </div>
                    </div>
                    {hasBadge && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Negative / Infraction Section */}
          <div className="bg-rose-50/60 p-3.5 rounded-2xl border border-rose-200">
            <div className="text-xs font-bold text-rose-800 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" />
              <span>تسجيل مخالفة صفية (خصم -1 نجمة):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {PENALTY_REASONS.map((reason, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePenalty(reason)}
                  disabled={student.stars <= 0}
                  className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold transition-colors disabled:opacity-40"
                >
                  <Minus className="w-3 h-3 inline-block ml-1" />
                  <span>{reason}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Delete Student Action */}
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-400">إدارة سجل الطالب:</span>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 hover:bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>حذف الطالب من {currentClass}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
