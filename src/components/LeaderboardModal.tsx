import React, { useState } from 'react';
import { X, Trophy, Star, Award, Medal, Printer, Download, Sparkles } from 'lucide-react';
import { Student } from '../types';
import { INITIAL_BADGES } from '../data/initialData';
import { soundEffects } from '../utils/soundEffects';

interface LeaderboardModalProps {
  students: Student[];
  currentClass: string;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  students,
  currentClass,
  onClose,
}) => {
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<Student | null>(null);

  const sortedStudents = [...students].sort((a, b) => b.stars - a.stars);
  const top1 = sortedStudents[0];
  const top2 = sortedStudents[1];
  const top3 = sortedStudents[2];

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <Trophy className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">لوحة الشرف والتعزيز (نقاطي)</h2>
              <p className="text-amber-100 text-xs">ترتيب فرسان الحصة ورصيد النجوم والأوسمة - {currentClass}</p>
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* Certificate View if active */}
          {selectedStudentForCert ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-amber-300 rounded-3xl p-6 sm:p-8 text-center relative shadow-md">
              <button
                onClick={() => setSelectedStudentForCert(null)}
                className="absolute top-4 left-4 text-xs font-bold bg-white text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50"
              >
                العودة للترتيب
              </button>

              <div className="text-5xl mb-2">📜</div>
              <div className="text-xs font-bold text-amber-800 tracking-wider">سلطنة عُمان · وزارة التربية والتعليم</div>
              <h3 className="text-2xl font-black text-slate-900 mt-2 mb-1">شهادة فخر وتميز رقمي</h3>
              <p className="text-sm text-slate-600 font-semibold mb-6">
                تمنح معلمة تقنية المعلومات <span className="font-extrabold text-blue-900">أ. أسماء العلوية</span> هذه الشهادة بكل فخر إلى:
              </p>

              <div className="text-3xl sm:text-4xl font-black text-blue-900 border-b-2 border-amber-400 pb-3 mb-4 inline-block px-8">
                الطالب / {selectedStudentForCert.name}
              </div>

              <p className="text-sm text-slate-700 max-w-md mx-auto mb-6 leading-relaxed">
                تقديراً لتفوقه ومشاركته الفعالة وحصوله على <span className="font-extrabold text-amber-600">{selectedStudentForCert.stars} نجمة</span> في حصة تقنية المعلومات للصف ({currentClass}).
              </p>

              <div className="flex items-center justify-between max-w-sm mx-auto text-xs text-slate-500 border-t border-amber-200 pt-4">
                <div>ختم التميز: ⭐⭐⭐</div>
                <div>معلمة المادة: أ. أسماء العلوية</div>
              </div>

              <div className="mt-6 flex justify-center gap-3 print:hidden">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm transition-transform active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة الشهادة</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Top 3 Podium */}
              {sortedStudents.length >= 3 && sortedStudents[0].stars > 0 && (
                <div className="mb-8 pt-4">
                  <div className="text-center font-bold text-slate-600 text-xs mb-4">
                    منصة تتويج فرسان تقنية المعلومات 🎖️
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end max-w-lg mx-auto">
                    {/* Rank 2 (Silver) */}
                    <div className="flex flex-col items-center">
                      <div className="text-2xl sm:text-3xl mb-1">🥈</div>
                      <div className="font-extrabold text-slate-800 text-xs sm:text-sm text-center truncate w-full">
                        {top2?.name}
                      </div>
                      <div className="text-xs font-bold text-slate-500 mb-1">{top2?.stars} ⭐</div>
                      <div className="w-full bg-gradient-to-t from-slate-300 to-slate-200 h-24 rounded-t-2xl flex items-center justify-center font-black text-slate-700 text-lg border-t-2 border-slate-400">
                        2
                      </div>
                    </div>

                    {/* Rank 1 (Gold) */}
                    <div className="flex flex-col items-center -mt-4">
                      <div className="text-3xl sm:text-4xl mb-1 animate-bounce">👑</div>
                      <div className="font-extrabold text-blue-900 text-sm sm:text-base text-center truncate w-full">
                        {top1?.name}
                      </div>
                      <div className="text-xs font-black text-amber-600 mb-1">{top1?.stars} ⭐</div>
                      <div className="w-full bg-gradient-to-t from-amber-400 to-amber-300 h-32 rounded-t-2xl flex items-center justify-center font-black text-amber-950 text-2xl border-t-2 border-amber-500 shadow-md">
                        1
                      </div>
                    </div>

                    {/* Rank 3 (Bronze) */}
                    <div className="flex flex-col items-center">
                      <div className="text-2xl sm:text-3xl mb-1">🥉</div>
                      <div className="font-extrabold text-slate-800 text-xs sm:text-sm text-center truncate w-full">
                        {top3?.name}
                      </div>
                      <div className="text-xs font-bold text-slate-500 mb-1">{top3?.stars} ⭐</div>
                      <div className="w-full bg-gradient-to-t from-amber-700/30 to-amber-600/20 h-16 rounded-t-2xl flex items-center justify-center font-black text-amber-900 text-base border-t-2 border-amber-700/40">
                        3
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Full Roster Ranking Table */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-3 bg-slate-100 font-bold text-xs text-slate-600 border-b border-slate-200 flex items-center justify-between">
                  <span>الترتيب والاسم</span>
                  <span className="flex items-center gap-6">
                    <span>الأوسمة</span>
                    <span>مجموع النجوم</span>
                    <span>شهادة</span>
                  </span>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {sortedStudents.map((st, index) => {
                    const stBadges = INITIAL_BADGES.filter((b) => st.badges.includes(b.id));
                    return (
                      <div
                        key={st.id}
                        className="p-3 flex items-center justify-between hover:bg-white transition-colors text-sm"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                              index === 0
                                ? 'bg-amber-400 text-amber-950 font-black'
                                : index === 1
                                ? 'bg-slate-300 text-slate-800'
                                : index === 2
                                ? 'bg-amber-200 text-amber-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="font-bold text-slate-800">{st.name}</span>
                        </div>

                        <div className="flex items-center gap-6">
                          {/* Badges */}
                          <div className="flex items-center gap-1">
                            {stBadges.length > 0 ? (
                              stBadges.map((b) => (
                                <span key={b.id} title={b.name} className="text-base">
                                  {b.icon}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-slate-300">—</span>
                            )}
                          </div>

                          {/* Stars */}
                          <div className="flex items-center gap-1 font-black text-amber-600 min-w-[50px] justify-end">
                            <span className="tabular-nums">{st.stars}</span>
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          </div>

                          {/* Certificate button */}
                          <button
                            onClick={() => {
                              soundEffects.playClick();
                              setSelectedStudentForCert(st);
                            }}
                            className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                            title="إصدار شهادة تقدير"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
