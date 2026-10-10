import React, { useState, useEffect } from 'react';
import { X, HelpCircle, CheckCircle2, ChevronLeft, ChevronRight, Star, Clock, Sparkles, Filter, Plus } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GRADE_QUIZ_QUESTIONS } from '../data/initialData';
import { Student, GradeLevel, detectGradeLevel, getGradeLabel, ITQuizQuestion } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface QuizModalProps {
  students: Student[];
  currentClass: string;
  onClose: () => void;
  onAwardStudent: (studentId: string, delta: number, reason: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  students,
  currentClass,
  onClose,
  onAwardStudent,
}) => {
  const initialGrade = detectGradeLevel(currentClass);
  const [activeGrade, setActiveGrade] = useState<GradeLevel>(
    initialGrade === 'general' ? 'grade5' : initialGrade
  );

  const [questionList, setQuestionList] = useState<ITQuizQuestion[]>(() => {
    return GRADE_QUIZ_QUESTIONS[activeGrade] || GRADE_QUIZ_QUESTIONS.grade5;
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [rewardStudentId, setRewardStudentId] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // When active grade changes, update question list and reset index
  const handleGradeChange = (newGrade: GradeLevel) => {
    soundEffects.playClick();
    setActiveGrade(newGrade);
    const questions = GRADE_QUIZ_QUESTIONS[newGrade] || GRADE_QUIZ_QUESTIONS.grade5;
    setQuestionList(questions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setTimerSeconds(25);
    setIsTimerRunning(false);
  };

  const question = questionList[currentQuestionIndex] || questionList[0];

  useEffect(() => {
    let interval: number;
    if (isTimerRunning && timerSeconds > 0) {
      interval = window.setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            soundEffects.playAlarmSound();
            return 0;
          }
          if (prev <= 5) {
            soundEffects.playTickSound();
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const handleRevealAnswer = () => {
    soundEffects.playClick();
    setIsAnswerRevealed(true);
    setIsTimerRunning(false);
    soundEffects.playFanfare();
    try {
      confetti({ particleCount: 60, spread: 60 });
    } catch {}
  };

  const handleNextQuestion = () => {
    soundEffects.playClick();
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setTimerSeconds(25);
    setIsTimerRunning(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % questionList.length);
  };

  const handlePrevQuestion = () => {
    soundEffects.playClick();
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setTimerSeconds(25);
    setIsTimerRunning(false);
    setCurrentQuestionIndex((prev) => (prev - 1 + questionList.length) % questionList.length);
  };

  const handleAwardReward = () => {
    if (!rewardStudentId) return;
    soundEffects.playStarSound();
    onAwardStudent(rewardStudentId, 1, `إجابة صحيحة في مسابقة ${getGradeLabel(activeGrade)} (${question.category})`);
    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch {}
    setRewardStudentId('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 via-teal-700 to-cyan-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <HelpCircle className="w-6 h-6 text-cyan-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">مسابقة التحدي الصفي</h2>
                <span className="bg-amber-400 text-amber-950 text-[11px] font-black px-2 py-0.5 rounded-full">
                  أسئلة {getGradeLabel(activeGrade)}
                </span>
              </div>
              <p className="text-cyan-100 text-xs">بنك أسئلة مخصص لمنهج تقنية المعلومات لكل صف دراسي</p>
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

        {/* Grade Filter Bar */}
        <div className="bg-slate-900 text-white p-2.5 px-4 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>تصفية الأسئلة حسب الصف:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['grade5', 'grade6', 'grade7', 'grade8'] as GradeLevel[]).map((grade) => (
              <button
                key={grade}
                onClick={() => handleGradeChange(grade)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  activeGrade === grade
                    ? 'bg-cyan-500 text-white font-black shadow-md ring-2 ring-cyan-300'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                {getGradeLabel(grade)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 flex flex-col justify-between">
          <div>
            {/* Metadata bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-100 text-cyan-800 px-2.5 py-0.5 rounded-full font-bold">
                  {question.category}
                </span>
                <span>
                  السؤال {currentQuestionIndex + 1} من {questionList.length}
                </span>
              </div>

              {/* Timer Pill */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setIsTimerRunning(!isTimerRunning);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs transition-colors ${
                    isTimerRunning
                      ? 'bg-rose-100 text-rose-700 animate-pulse'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{timerSeconds} ثانية</span>
                </button>
              </div>
            </div>

            {/* Question Text Box */}
            <div className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 border-2 border-cyan-200 rounded-3xl p-5 sm:p-7 text-center my-3 shadow-xs">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {question.question}
              </h3>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              {question.options.map((opt, idx) => {
                const isCorrect = idx === question.correctIndex;
                const isSelected = selectedOption === idx;

                let cardStyle = 'bg-white border-slate-200 text-slate-800 hover:border-cyan-300 hover:bg-cyan-50/30';
                if (isAnswerRevealed) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-extrabold ring-2 ring-emerald-400';
                  } else if (isSelected) {
                    cardStyle = 'bg-rose-50 border-rose-300 text-rose-800 line-through opacity-70';
                  }
                } else if (isSelected) {
                  cardStyle = 'bg-cyan-50 border-cyan-500 text-cyan-900 font-bold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isAnswerRevealed) {
                        soundEffects.playClick();
                        setSelectedOption(idx);
                      }
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-right transition-all flex items-center justify-between text-sm sm:text-base font-bold active:scale-98 ${cardStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswerRevealed && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation when revealed */}
            {isAnswerRevealed && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold animate-star-pop">
                💡 <span className="font-extrabold">الشرح والتعليل العلمي:</span> {question.explanation}
              </div>
            )}
          </div>

          {/* Bottom Bar: Quick Reward, Reveal & Navigation */}
          <div className="mt-5 border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quick Reward to winning student */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={rewardStudentId}
                onChange={(e) => setRewardStudentId(e.target.value)}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">اختر الطالب الفائز بالنقاط...</option>
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAwardReward}
                disabled={!rewardStudentId}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 disabled:opacity-40 flex items-center gap-1 shrink-0"
              >
                <Star className="w-3.5 h-3.5 fill-white" />
                <span>+1 نجمة</span>
              </button>
            </div>

            {/* Answer Reveal & Navigation */}
            <div className="flex items-center gap-2">
              {!isAnswerRevealed && (
                <button
                  onClick={handleRevealAnswer}
                  className="px-5 py-2.5 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
                >
                  كشف الإجابة الصحيحة 🎯
                </button>
              )}

              <button
                onClick={handlePrevQuestion}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="السؤال السابق"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextQuestion}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="السؤال التالي"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
