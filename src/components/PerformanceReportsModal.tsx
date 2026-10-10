import React, { useState } from 'react';
import {
  X,
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Award,
  Star,
  Printer,
  Calendar,
  Users,
  Target,
  ChevronDown,
  Sparkles,
  School
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Student } from '../types';
import {
  getClassComparisonData,
  getStudentProgressOverDays,
  getStudentTierDistribution,
} from '../utils/analytics';
import { soundEffects } from '../utils/soundEffects';

interface PerformanceReportsModalProps {
  students: Student[];
  currentClass: string;
  onClose: () => void;
}

export const PerformanceReportsModal: React.FC<PerformanceReportsModalProps> = ({
  students,
  currentClass,
  onClose,
}) => {
  const [activeReportTab, setActiveReportTab] = useState<'comparison' | 'timeline' | 'distribution'>('comparison');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students[0]?.id || ''
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  // Analytics datasets
  const comparisonData = getClassComparisonData(students);
  const timelineData = selectedStudent ? getStudentProgressOverDays(selectedStudent, students) : [];
  const tierData = getStudentTierDistribution(students);

  // Class aggregates
  const totalStars = students.reduce((sum, s) => sum + s.stars, 0);
  const classAverage = students.length > 0 ? Number((totalStars / students.length).toFixed(1)) : 0;
  const topStudent = [...students].sort((a, b) => b.stars - a.stars)[0];
  const activeStudentsCount = students.filter((s) => s.stars > 0).length;
  const participationRate = students.length > 0 ? Math.round((activeStudentsCount / students.length) * 100) : 0;

  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-scale-up">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <BarChart3 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">تقارير وتحليلات أداء الطلبة</h2>
                <span className="bg-amber-400 text-amber-950 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  {currentClass}
                </span>
              </div>
              <p className="text-blue-100 text-xs">
                متابعة بيانية تفاعلية لمعدل نقاط كل طالب وتطور مستواه عبر الأيام (مكتبة Recharts)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
              title="طباعة تقرير الأداء الصفي"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة التقرير</span>
            </button>
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
        </div>

        {/* Printable Official Header (Visible on print) */}
        <div className="hidden print:block p-6 text-center border-b border-slate-200 bg-white">
          <h1 className="text-2xl font-black text-slate-900">سلطنة عُمان · وزارة التربية والتعليم</h1>
          <h2 className="text-lg font-bold text-slate-700 mt-1">تقرير متابعة وأداء طلبة مادة تقنية المعلومات</h2>
          <div className="flex justify-between items-center text-xs text-slate-500 mt-4 max-w-md mx-auto">
            <span>الصف: {currentClass}</span>
            <span>معلمة المادة: أ. أسماء العلوية</span>
            <span>تاريخ الإصدار: {new Date().toLocaleDateString('ar-OM')}</span>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold text-slate-600">معدل نقاط الصف</span>
              <Target className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-blue-900 tabular-nums">{classAverage} ⭐</div>
            <div className="text-[10px] text-slate-400 mt-0.5">متوسط النجوم لكل طالب</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold text-slate-600">إجمالي نجوم الحصص</span>
              <Star className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600 tabular-nums">{totalStars}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">مجموع النجوم الممنوحة</div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold text-slate-600">فارس التميز الأول</span>
              <Award className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-base sm:text-lg font-black text-slate-800 truncate">
              {topStudent ? topStudent.name : '—'}
            </div>
            <div className="text-[10px] text-purple-700 font-bold mt-0.5">
              {topStudent ? `${topStudent.stars} نجمة ⭐` : ''}
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold text-slate-600">نسبة التفاعل النشط</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700 tabular-nums">{participationRate}%</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{activeStudentsCount} من {students.length} طالب مشارك</div>
          </div>
        </div>

        {/* Tab Navigation for Charts */}
        <div className="bg-slate-100 p-2 border-b border-slate-200 flex items-center justify-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveReportTab('comparison');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeReportTab === 'comparison'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>مقارنة نقاط الطلبة (Bar Chart)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveReportTab('timeline');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeReportTab === 'timeline'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>تطور المستوى عبر الأيام (Timeline)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveReportTab('distribution');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeReportTab === 'distribution'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            <PieIcon className="w-4 h-4" />
            <span>توزيع مستويات التميز (Pie Chart)</span>
          </button>
        </div>

        {/* Chart Viewports */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* --- TAB 1: COMPARISON BAR CHART --- */}
          {activeReportTab === 'comparison' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">
                    رسم بياني شريطي لمقارنة نقاط جميع طلبة {currentClass}
                  </h3>
                  <p className="text-xs text-slate-500">
                    يوضح إجمالي النجوم المكتسبة ومعدل الأداء مقارنة بمتوسط الصف ({classAverage} ⭐)
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
                    <span>نقاط الطالب</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span>متوسط الصف ({classAverage})</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-80 sm:h-96 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{ top: 20, right: 10, left: 10, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: '#475569', fontSize: 11 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={70}
                    />
                    <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as any;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <p className="font-extrabold text-amber-300 text-sm">{data.name}</p>
                              <p>مجموع النجوم: <span className="font-bold">{data.stars} ⭐</span></p>
                              <p>الأوسمة المكتسبة: <span className="font-bold">{data.badgesCount}</span></p>
                              <p>معدل الحصة اليومي: <span className="font-bold">{data.average}</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={classAverage}
                      stroke="#f43f5e"
                      strokeDasharray="4 4"
                      label={{ value: `متوسط الصف: ${classAverage}`, fill: '#e11d48', fontSize: 11, position: 'top' }}
                    />
                    <Bar
                      dataKey="stars"
                      name="نقاط الطالب"
                      fill="#2563eb"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* --- TAB 2: PROGRESSION OVER DAYS (TIMELINE AREA/LINE CHART) --- */}
          {activeReportTab === 'timeline' && (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">
                    تطور مستوى الطالب عبر أيام الأسبوع الدراسي
                  </h3>
                  <p className="text-xs text-slate-500">
                    متابعة وتيرة اكتساب النقاط من الأحد إلى الخميس ومقارنتها بمنحنى تقدم الصف
                  </p>
                </div>

                {/* Student Selection Dropdown */}
                <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-600 pr-2">اختر الطالب:</span>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => {
                      soundEffects.playClick();
                      setSelectedStudentId(e.target.value);
                    }}
                    className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    {students.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.stars} ⭐)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedStudent && (
                <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                      ⭐
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{selectedStudent.name}</h4>
                      <div className="text-xs text-slate-600 flex items-center gap-2">
                        <span>الصف: {currentClass}</span>
                        <span>•</span>
                        <span>إجمالي النجوم: <strong className="text-amber-600">{selectedStudent.stars} ⭐</strong></span>
                        <span>•</span>
                        <span>الأوسمة: <strong className="text-purple-600">{selectedStudent.badges.length}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-blue-900 font-bold bg-white/80 px-3 py-1.5 rounded-xl border border-blue-200">
                    معدل الأداء اليومي: {(selectedStudent.stars / 5).toFixed(1)} نجمة / يوم
                  </div>
                </div>
              )}

              <div className="w-full h-80 sm:h-96 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timelineData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="colorStudent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                      </linearGradient>
                      <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="dayName" tick={{ fill: '#475569', fontSize: 12, fontWeight: 'bold' }} />
                    <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as any;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <p className="font-extrabold text-amber-300 text-sm">{data.dayName}</p>
                              <p>نقاط اليوم: <span className="font-bold text-emerald-400">+{data.points} ⭐</span></p>
                              <p>المجموع التراكمي للطالب: <span className="font-bold text-blue-300">{data.cumulative} ⭐</span></p>
                              <p>معدل الصف حتى هذا اليوم: <span className="font-bold text-slate-300">{data.classAvg} ⭐</span></p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="cumulative"
                      name={`تراكمي نقاط ${selectedStudent ? selectedStudent.name.split(' ')[0] : 'الطالب'}`}
                      stroke="#2563eb"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorStudent)"
                    />
                    <Area
                      type="monotone"
                      dataKey="classAvg"
                      name="معدل تقدم الصف العام"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorAvg)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* --- TAB 3: DISTRIBUTION PIE CHART --- */}
          {activeReportTab === 'distribution' && (
            <div>
              <div className="mb-4">
                <h3 className="text-base font-extrabold text-slate-800">
                  توزيع مستويات التميز والتفاعل لطلبة {currentClass}
                </h3>
                <p className="text-xs text-slate-500">
                  رسم بياني دائري يوضح توزيع الطلبة على فئات التميز حسب مجموع النجوم
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Pie Chart */}
                <div className="w-full h-80 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tierData}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={95}
                        paddingAngle={4}
                        dataKey="count"
                        nameKey="name"
                        label={({ value }: any) => (Number(value) > 0 ? `${value}` : '')}
                      >
                        {tierData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload as any;
                            const pct = students.length > 0 ? Math.round((data.count / students.length) * 100) : 0;
                            return (
                              <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs space-y-1">
                                <p className="font-extrabold text-amber-300">{data.name}</p>
                                <p>العدد: {data.count} طالب ({pct}%)</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Tier Breakdowns */}
                <div className="space-y-3">
                  {tierData.map((tier, idx) => {
                    const pct = students.length > 0 ? Math.round((tier.count / students.length) * 100) : 0;
                    return (
                      <div
                        key={idx}
                        className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-3.5 h-3.5 rounded-full shrink-0"
                            style={{ backgroundColor: tier.color }}
                          />
                          <div>
                            <div className="font-extrabold text-slate-800 text-sm">{tier.name}</div>
                            <div className="text-[11px] text-slate-400">
                              تمثل {pct}% من إجمالي طلبة الصف
                            </div>
                          </div>
                        </div>

                        <div className="font-black text-slate-900 text-base tabular-nums">
                          {tier.count} طالب
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
