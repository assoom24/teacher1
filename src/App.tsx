import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StudentGrid } from './components/StudentGrid';
import { RandomPickerModal } from './components/RandomPickerModal';
import { TimerModal } from './components/TimerModal';
import { InteractiveGamesModal } from './components/InteractiveGamesModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { QuizModal } from './components/QuizModal';
import { TeamDividerModal } from './components/TeamDividerModal';
import { StudentManagerModal } from './components/StudentManagerModal';
import { StudentRewardModal } from './components/StudentRewardModal';
import { PerformanceReportsModal } from './components/PerformanceReportsModal';
import { Student } from './types';
import {
  INITIAL_STUDENTS_GRADE5,
  INITIAL_STUDENTS_GRADE6,
  INITIAL_STUDENTS_GRADE7,
  INITIAL_STUDENTS_GRADE8,
  PRAISE_PHRASES,
} from './data/initialData';
import { soundEffects } from './utils/soundEffects';

const STORAGE_KEY_CLASSES = 'asma_it_classroom_classes_v3';
const STORAGE_KEY_ACTIVE_CLASS = 'asma_it_classroom_active_v3';

export default function App() {
  const [classesData, setClassesData] = useState<Record<string, Student[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLASSES);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      'الصف الخامس / ١': INITIAL_STUDENTS_GRADE5,
      'الصف الخامس / ٢': INITIAL_STUDENTS_GRADE5.map((s, idx) => ({ ...s, id: `g5b-${idx}`, stars: 0 })),
      'الصف السادس / ١': INITIAL_STUDENTS_GRADE6,
      'الصف السابع / ١': INITIAL_STUDENTS_GRADE7,
      'الصف الثامن / ١': INITIAL_STUDENTS_GRADE8,
    };
  });

  const [currentClass, setCurrentClass] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_CLASS);
      if (saved) return saved;
    } catch {}
    return 'الصف الخامس / ١';
  });

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedStudentForReward, setSelectedStudentForReward] = useState<Student | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [praiseToast, setPraiseToast] = useState<{ studentName: string; text: string; delta: number } | null>(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLASSES, JSON.stringify(classesData));
      localStorage.setItem(STORAGE_KEY_ACTIVE_CLASS, currentClass);
    } catch {}
  }, [classesData, currentClass]);

  const currentStudents = classesData[currentClass] || [];
  const totalStars = currentStudents.reduce((sum, s) => sum + s.stars, 0);

  // Add / deduct points
  const handleAddPoint = (studentId: string, delta: number, reason?: string) => {
    const student = currentStudents.find((s) => s.id === studentId);
    if (!student) return;

    const newStars = Math.max(0, student.stars + delta);

    setClassesData((prev) => {
      const updatedList = (prev[currentClass] || []).map((s) => {
        if (s.id === studentId) {
          const historyItem = {
            timestamp: Date.now(),
            delta,
            reason: reason || 'مشاركة صفية',
          };
          return {
            ...s,
            stars: newStars,
            history: [...(s.history || []), historyItem],
          };
        }
        return s;
      });

      return {
        ...prev,
        [currentClass]: updatedList,
      };
    });

    if (delta > 0) {
      const randomPraise = PRAISE_PHRASES[Math.floor(Math.random() * PRAISE_PHRASES.length)];
      setPraiseToast({
        studentName: student.name,
        text: randomPraise,
        delta,
      });
      setTimeout(() => {
        setPraiseToast(null);
      }, 2500);
    }

    // Keep reward modal student updated if open
    if (selectedStudentForReward && selectedStudentForReward.id === studentId) {
      setSelectedStudentForReward((prev) => (prev ? { ...prev, stars: newStars } : null));
    }
  };

  // Toggle badge for student
  const handleToggleBadge = (studentId: string, badgeId: string) => {
    setClassesData((prev) => {
      const updatedList = (prev[currentClass] || []).map((s) => {
        if (s.id === studentId) {
          const has = s.badges.includes(badgeId);
          const newBadges = has ? s.badges.filter((b) => b !== badgeId) : [...s.badges, badgeId];
          return { ...s, badges: newBadges };
        }
        return s;
      });
      return { ...prev, [currentClass]: updatedList };
    });

    if (selectedStudentForReward && selectedStudentForReward.id === studentId) {
      setSelectedStudentForReward((prev) => {
        if (!prev) return null;
        const has = prev.badges.includes(badgeId);
        const newBadges = has ? prev.badges.filter((b) => b !== badgeId) : [...prev.badges, badgeId];
        return { ...prev, badges: newBadges };
      });
    }
  };

  // Reset all points for current class
  const handleResetPoints = () => {
    setClassesData((prev) => {
      const updatedList = (prev[currentClass] || []).map((s) => ({
        ...s,
        stars: 0,
      }));
      return { ...prev, [currentClass]: updatedList };
    });
  };

  // Add individual student
  const handleAddStudent = (name: string) => {
    const newStudent: Student = {
      id: `st-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name,
      stars: 0,
      badges: [],
    };
    setClassesData((prev) => ({
      ...prev,
      [currentClass]: [...(prev[currentClass] || []), newStudent],
    }));
    setPraiseToast({
      studentName: name,
      text: `تمت إضافة الطالب بنجاح إلى ${currentClass}`,
      delta: 0,
    });
    setTimeout(() => setPraiseToast(null), 2500);
  };

  // Bulk add students
  const handleBulkAddStudents = (names: string[]) => {
    const newStudents: Student[] = names.map((name, idx) => ({
      id: `st-${Date.now()}-${idx}`,
      name,
      stars: 0,
      badges: [],
    }));
    setClassesData((prev) => ({
      ...prev,
      [currentClass]: [...(prev[currentClass] || []), ...newStudents],
    }));
    setPraiseToast({
      studentName: `${names.length} طلبة`,
      text: `تم استيراد قائمة الطلبة بنجاح إلى ${currentClass}`,
      delta: 0,
    });
    setTimeout(() => setPraiseToast(null), 2500);
  };

  // Remove student from class (ACTIVATED FEATURE)
  const handleRemoveStudent = (studentId: string, studentName?: string) => {
    const targetStudent = currentStudents.find((s) => s.id === studentId);
    const resolvedName = studentName || targetStudent?.name || 'الطالب';

    setClassesData((prev) => ({
      ...prev,
      [currentClass]: (prev[currentClass] || []).filter((s) => s.id !== studentId),
    }));

    if (selectedStudentForReward?.id === studentId) {
      setSelectedStudentForReward(null);
    }

    setPraiseToast({
      studentName: resolvedName,
      text: `تم حذف الطالب بنجاح من ${currentClass}`,
      delta: 0,
    });
    setTimeout(() => setPraiseToast(null), 2500);
  };

  // Update student name
  const handleUpdateStudentName = (studentId: string, newName: string) => {
    setClassesData((prev) => ({
      ...prev,
      [currentClass]: (prev[currentClass] || []).map((s) =>
        s.id === studentId ? { ...s, name: newName } : s
      ),
    }));
  };

  // Add a new class
  const handleAddClass = (className: string) => {
    if (classesData[className]) return;
    setClassesData((prev) => ({
      ...prev,
      [className]: INITIAL_STUDENTS_GRADE5.map((s, idx) => ({ ...s, id: `new-c-${idx}`, stars: 0 })),
    }));
    setCurrentClass(className);
    setPraiseToast({
      studentName: className,
      text: 'تم إنشاء الصف الدراسي الجديد بنجاح',
      delta: 0,
    });
    setTimeout(() => setPraiseToast(null), 2500);
  };

  // Award team members
  const handleAwardTeamMembers = (studentIds: string[], delta: number, reason: string) => {
    setClassesData((prev) => {
      const updatedList = (prev[currentClass] || []).map((s) => {
        if (studentIds.includes(s.id)) {
          return { ...s, stars: s.stars + delta };
        }
        return s;
      });
      return { ...prev, [currentClass]: updatedList };
    });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-blue-200">
      {/* Top Header & Tool Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentClass={currentClass}
        onClassChange={setCurrentClass}
        availableClasses={Object.keys(classesData)}
        totalStars={totalStars}
        onResetPoints={handleResetPoints}
        isMuted={isMuted}
        onToggleMute={() => {
          const next = soundEffects.toggleMute();
          setIsMuted(next);
        }}
      />

      {/* Floating Feedback Banner */}
      {praiseToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-gradient-to-r from-blue-700 to-indigo-800 text-white px-6 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 animate-star-pop border border-blue-400">
          <span className="text-2xl">{praiseToast.delta > 0 ? '🌟' : '🔔'}</span>
          <div>
            <div className="font-extrabold text-sm sm:text-base">
              {praiseToast.delta > 0 ? `+${praiseToast.delta} ⭐ للطالب ${praiseToast.studentName}` : praiseToast.studentName}
            </div>
            <div className="text-blue-100 text-xs font-semibold">{praiseToast.text}</div>
          </div>
        </div>
      )}

      {/* Main Student Cards Grid */}
      <main className="flex-1">
        <StudentGrid
          students={currentStudents}
          currentClass={currentClass}
          onAddPoint={handleAddPoint}
          onOpenDetails={(st) => setSelectedStudentForReward(st)}
          onQuickAddStudent={() => setActiveTab('manage')}
          onRemoveStudent={handleRemoveStudent}
        />
      </main>

      {/* Modals for Tools */}
      {activeTab === 'random' && (
        <RandomPickerModal
          students={currentStudents}
          onClose={() => setActiveTab(null)}
          onAwardPoints={handleAddPoint}
        />
      )}

      {activeTab === 'timer' && (
        <TimerModal onClose={() => setActiveTab(null)} />
      )}

      {activeTab === 'games' && (
        <InteractiveGamesModal
          currentClass={currentClass}
          onClose={() => setActiveTab(null)}
        />
      )}

      {activeTab === 'leaderboard' && (
        <LeaderboardModal
          students={currentStudents}
          currentClass={currentClass}
          onClose={() => setActiveTab(null)}
        />
      )}

      {activeTab === 'reports' && (
        <PerformanceReportsModal
          students={currentStudents}
          currentClass={currentClass}
          onClose={() => setActiveTab(null)}
        />
      )}

      {activeTab === 'quiz' && (
        <QuizModal
          students={currentStudents}
          currentClass={currentClass}
          onClose={() => setActiveTab(null)}
          onAwardStudent={handleAddPoint}
        />
      )}

      {activeTab === 'teams' && (
        <TeamDividerModal
          students={currentStudents}
          onClose={() => setActiveTab(null)}
          onAwardTeamMembers={handleAwardTeamMembers}
        />
      )}

      {activeTab === 'manage' && (
        <StudentManagerModal
          students={currentStudents}
          currentClass={currentClass}
          availableClasses={Object.keys(classesData)}
          onAddStudent={handleAddStudent}
          onRemoveStudent={(id) => handleRemoveStudent(id)}
          onUpdateStudentName={handleUpdateStudentName}
          onBulkAddStudents={handleBulkAddStudents}
          onAddClass={handleAddClass}
          onResetAllPoints={handleResetPoints}
          onClose={() => setActiveTab(null)}
        />
      )}

      {/* Student Details & Reward Modal */}
      {selectedStudentForReward && (
        <StudentRewardModal
          student={selectedStudentForReward}
          currentClass={currentClass}
          onClose={() => setSelectedStudentForReward(null)}
          onAddPoint={handleAddPoint}
          onToggleBadge={handleToggleBadge}
          onRemoveStudent={handleRemoveStudent}
        />
      )}

      {/* Footer Identity */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="font-semibold text-slate-600">
            برنامج المعلم المبدع لإدارة وتفعيل حصص تقنية المعلومات · إعداد وتصميم: أ. أسماء العلوية
          </div>
          <div>
            سلطنة عُمان · مسقط © {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
}
