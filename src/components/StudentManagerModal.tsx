import React, { useState } from 'react';
import { X, Settings2, UserPlus, Trash2, Edit2, RotateCcw, Plus, Save, FileText } from 'lucide-react';
import { Student } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface StudentManagerModalProps {
  students: Student[];
  currentClass: string;
  onClassChange: (className: string) => void;
  availableClasses: string[];
  onAddStudent: (name: string, targetClass?: string) => void;
  onRemoveStudent: (id: string, targetClass?: string) => void;
  onUpdateStudentName: (id: string, newName: string, targetClass?: string) => void;
  onBulkAddStudents: (names: string[], targetClass?: string) => void;
  onAddClass: (className: string) => void;
  onResetAllPoints: (targetClass?: string) => void;
  onClose: () => void;
}

export const StudentManagerModal: React.FC<StudentManagerModalProps> = ({
  students,
  currentClass,
  onClassChange,
  availableClasses,
  onAddStudent,
  onRemoveStudent,
  onUpdateStudentName,
  onBulkAddStudents,
  onAddClass,
  onResetAllPoints,
  onClose,
}) => {
  const [selectedClassToManage, setSelectedClassToManage] = useState(currentClass);
  const [newStudentName, setNewStudentName] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');

  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    soundEffects.playClick();
    onAddStudent(newStudentName.trim(), selectedClassToManage);
    setNewStudentName('');
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const names = bulkText
      .split('\n')
      .map((n) => n.trim())
      .filter((n) => n.length > 0);
    if (names.length === 0) return;

    soundEffects.playStarSound();
    onBulkAddStudents(names, selectedClassToManage);
    setBulkText('');
    setShowBulk(false);
  };

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;
    soundEffects.playClick();
    onAddClass(newClassName.trim());
    setSelectedClassToManage(newClassName.trim());
    setNewClassName('');
  };

  const startEdit = (st: Student) => {
    setEditingId(st.id);
    setEditNameValue(st.name);
  };

  const saveEdit = (id: string) => {
    if (!editNameValue.trim()) return;
    soundEffects.playClick();
    onUpdateStudentName(id, editNameValue.trim(), selectedClassToManage);
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
              <Settings2 className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold">تخصيص وإدارة الطلبة والصفوف الخمسة</h2>
              <p className="text-slate-300 text-xs">مدرسة خلوف للتعليم الأساسي · الصفوف: الأول، السابع، الثامن، التاسع، العاشر</p>
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

        {/* Quick Class Selector Tabs */}
        <div className="bg-slate-100 p-2.5 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-xs font-bold text-slate-600 ml-1">إدارة الصف:</span>
          {availableClasses.map((cls) => (
            <button
              key={cls}
              onClick={() => {
                soundEffects.playClick();
                setSelectedClassToManage(cls);
                onClassChange(cls);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedClassToManage === cls
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Section: Add Student */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-blue-600" />
                <span>إضافة طالب إلى ({selectedClassToManage})</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowBulk(!showBulk)}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{showBulk ? 'إلغاء اللصق الجماعي' : 'لصق قائمة أسماء جماعية'}</span>
              </button>
            </div>

            {showBulk ? (
              <form onSubmit={handleBulkSubmit} className="space-y-3">
                <p className="text-xs text-slate-500">
                  الصق قائمة أسماء الطلبة (كل اسم في سطر جديد كما في بوابة سلطنة عمان التعليمية):
                </p>
                <textarea
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                  placeholder="محمد أحمد&#10;فاطمة سعيد&#10;سيف ناصر..."
                  rows={4}
                  className="w-full p-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  إضافة القائمة كاملة
                </button>
              </form>
            ) : (
              <form onSubmit={handleAddSingle} className="flex gap-2">
                <input
                  type="text"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="اسم الطالب الثلاثي (مثال: ناصر سالم الكعبي)..."
                  className="flex-1 p-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة</span>
                </button>
              </form>
            )}
          </div>

          {/* Section: Create New Class */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3">
              إضافة صف دراسي جديد لمادة تقنية المعلومات
            </h3>
            <form onSubmit={handleCreateClass} className="flex gap-2">
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="اسم الصف (مثال: سادس / ٢)..."
                className="flex-1 p-2.5 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>إنشاء الصف</span>
              </button>
            </form>
          </div>

          {/* Section: Active Class Student List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-extrabold text-slate-900 text-sm">
                قائمة طلبة {currentClass} ({students.length} طالب)
              </h4>
              <button
                onClick={() => {
                  if (window.confirm('هل أنتِ متأكدة من تصفير نجوم جميع الطلبة لبدء حصة جديدة؟')) {
                    soundEffects.playClick();
                    onResetAllPoints();
                  }
                }}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>تصفير نجوم الحصة</span>
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 max-h-60 overflow-y-auto">
              {students.map((st, index) => (
                <div
                  key={st.id}
                  className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors text-sm"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xs font-bold text-slate-400 w-5">{index + 1}</span>
                    {editingId === st.id ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editNameValue}
                          onChange={(e) => setEditNameValue(e.target.value)}
                          className="p-1 px-2 text-sm bg-white border border-blue-400 rounded-lg flex-1"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(st.id)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="font-bold text-slate-800">{st.name}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {st.stars} ⭐
                    </span>
                    <button
                      onClick={() => startEdit(st)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="تعديل الاسم"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`هل أنتِ متأكدة من حذف الطالب ${st.name}؟`)) {
                          soundEffects.playBuzzerSound();
                          onRemoveStudent(st.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="حذف الطالب"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
