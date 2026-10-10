import React, { useState, useEffect, useRef } from 'react';
import { X, Shuffle, Star, Award, Sparkles, UserCheck, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface RandomPickerModalProps {
  students: Student[];
  onClose: () => void;
  onAwardPoints: (studentId: string, delta: number, reason: string) => void;
}

export const RandomPickerModal: React.FC<RandomPickerModalProps> = ({
  students,
  onClose,
  onAwardPoints,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [excludePicked, setExcludePicked] = useState(false);
  const [pickedIds, setPickedIds] = useState<string[]>([]);
  const intervalRef = useRef<number | null>(null);

  const eligibleStudents = excludePicked
    ? students.filter((s) => !pickedIds.includes(s.id))
    : students;

  const currentPool = eligibleStudents.length > 0 ? eligibleStudents : students;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#f59e0b', '#10b981', '#8b5cf6'],
      });
    } catch {
      // Fallback if canvas-confetti is unavailable
    }
  };

  const handleStartSpin = () => {
    if (currentPool.length === 0 || isSpinning) return;

    setIsSpinning(true);
    setSelectedStudent(null);
    let speed = 60;
    let iterations = 0;
    const maxIterations = 28 + Math.floor(Math.random() * 12);

    const spin = () => {
      iterations++;
      soundEffects.playTickSound();
      setDisplayIndex((prev) => (prev + 1) % currentPool.length);

      if (iterations < maxIterations) {
        speed += 12; // Gradual deceleration
        intervalRef.current = window.setTimeout(spin, speed);
      } else {
        const winningIndex = Math.floor(Math.random() * currentPool.length);
        const winner = currentPool[winningIndex];
        setSelectedStudent(winner);
        setIsSpinning(false);
        soundEffects.playFanfare();
        triggerConfetti();

        if (excludePicked) {
          setPickedIds((prev) => [...prev, winner.id]);
        }
      }
    };

    spin();
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <Shuffle className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">الاسم العشوائي (القرعة التفاعلية)</h2>
              <p className="text-blue-100 text-xs">اختيار طالب عشوائياً للمشاركة والإجابة في الحصة</p>
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

        {/* Modal Body */}
        <div className="p-6 text-center">
          {/* Main Display Stage */}
          <div className="my-4 min-h-[190px] rounded-2xl bg-gradient-to-b from-slate-50 to-blue-50/50 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {isSpinning ? (
              <div className="flex flex-col items-center animate-pulse">
                <div className="text-xs font-bold text-blue-600 mb-2">جاري الاختيار الذكي...</div>
                <div className="text-3xl sm:text-4xl font-black text-slate-800 tracking-tight">
                  {currentPool[displayIndex]?.name || '...'}
                </div>
              </div>
            ) : selectedStudent ? (
              <div className="flex flex-col items-center animate-star-pop">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-3xl shadow-lg mb-3">
                  🌟
                </div>
                <div className="text-xs font-extrabold text-blue-700 bg-blue-100 px-3 py-1 rounded-full mb-1">
                  وقع الاختيار على البطل
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-2">
                  {selectedStudent.name}
                </h3>
                <div className="text-sm text-slate-600 flex items-center gap-1.5 font-semibold">
                  <span>الرصيد الحالي:</span>
                  <span className="text-amber-600 font-bold">{selectedStudent.stars} ⭐</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <Sparkles className="w-12 h-12 text-blue-400 mb-2 opacity-60" />
                <p className="text-base font-bold text-slate-700">اضغط على زر السحب لبدء الاختيار</p>
                <p className="text-xs text-slate-400 mt-1">عدد الطلبة المؤهلين: {currentPool.length} طالب</p>
              </div>
            )}
          </div>

          {/* Action to award the chosen student */}
          {selectedStudent && (
            <div className="mt-4 p-3 bg-amber-50 rounded-2xl border border-amber-200 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold text-amber-900 w-full mb-1">
                مكافأة {selectedStudent.name}:
              </span>
              <button
                onClick={() => {
                  soundEffects.playStarSound();
                  onAwardPoints(selectedStudent.id, 1, 'إجابة متميزة في القرعة العشوائية');
                  triggerConfetti();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm transition-transform active:scale-95"
              >
                <Star className="w-4 h-4 fill-white" />
                <span>+1 نجمة</span>
              </button>
              <button
                onClick={() => {
                  soundEffects.playStarSound();
                  onAwardPoints(selectedStudent.id, 2, 'مشاركة استثنائية في النشاط');
                  triggerConfetti();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-transform active:scale-95"
              >
                <Award className="w-4 h-4" />
                <span>+2 نجمتان</span>
              </button>
            </div>
          )}

          {/* Settings & Spin Controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={excludePicked}
                onChange={(e) => setExcludePicked(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <span>عدم تكرار الطلبة الذين تم اختيارهم ({pickedIds.length})</span>
            </label>

            {pickedIds.length > 0 && (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setPickedIds([]);
                }}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>إعادة تصفير القائمة</span>
              </button>
            )}

            <button
              onClick={handleStartSpin}
              disabled={isSpinning || currentPool.length === 0}
              className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
            >
              <Shuffle className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>{isSpinning ? 'جاري السحب...' : 'سحب اسم عشوائي 🎲'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
