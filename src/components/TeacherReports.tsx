import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileDown, FileText, Download, X, Eye, Users, TrendingUp } from 'lucide-react';
import { Navigation } from './Navigation';
import { getStudentsByClassAndSection, getTeacherForClassSection } from '../data/studentsData';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function TeacherReports() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedSection, setSelectedSection] = useState<'A' | 'B'>('A');
  const [selectedExam, setSelectedExam] = useState<'Exam 1' | 'Exam 2'>('Exam 1');
  const [showClassReport, setShowClassReport] = useState(false);

  const students = getStudentsByClassAndSection(selectedClass, selectedSection);
  const teacher = getTeacherForClassSection(selectedClass, selectedSection);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  // Calculate class statistics
  const calculateClassStats = () => {
    const totalStudents = students.length;
    const overallPercentage = students.reduce((sum, s) => {
      const avg = s.subjects.reduce((subSum, sub) => subSum + sub.marks, 0) / s.subjects.length;
      return sum + avg;
    }, 0) / totalStudents;

    const overallAttendance = students.reduce((sum, s) => {
      return sum + (s.presentDays / s.totalDays) * 100;
    }, 0) / totalStudents;

    const excellentCount = students.filter(s => {
      const avg = s.subjects.reduce((sum, sub) => sum + sub.marks, 0) / s.subjects.length;
      return avg >= 90;
    }).length;

    const goodCount = students.filter(s => {
      const avg = s.subjects.reduce((sum, sub) => sum + sub.marks, 0) / s.subjects.length;
      return avg >= 75 && avg < 90;
    }).length;

    const averageCount = students.filter(s => {
      const avg = s.subjects.reduce((sum, sub) => sum + sub.marks, 0) / s.subjects.length;
      return avg >= 60 && avg < 75;
    }).length;

    const weakCount = students.filter(s => {
      const avg = s.subjects.reduce((sum, sub) => sum + sub.marks, 0) / s.subjects.length;
      return avg < 60;
    }).length;

    const totalDrawbacks = students.reduce((sum, s) => sum + s.drawbacks, 0);
    const totalFeesPending = students.reduce((sum, s) => sum + s.feesPending, 0);

    return {
      totalStudents,
      overallPercentage,
      overallAttendance,
      excellentCount,
      goodCount,
      averageCount,
      weakCount,
      totalDrawbacks,
      totalFeesPending,
    };
  };

  const stats = calculateClassStats();

  const performanceDistribution = [
    { name: 'Excellent (≥90%)', value: stats.excellentCount, color: '#10b981' },
    { name: 'Good (75-89%)', value: stats.goodCount, color: '#3b82f6' },
    { name: 'Average (60-74%)', value: stats.averageCount, color: '#f59e0b' },
    { name: 'Weak (<60%)', value: stats.weakCount, color: '#ef4444' },
  ];

  // Subject-wise average for the class
  const subjectAverages = students[0]?.subjects.map((_, subjectIndex) => {
    const subjectName = students[0].subjects[subjectIndex].name;
    const avg = students.reduce((sum, student) => {
      return sum + student.subjects[subjectIndex].marks;
    }, 0) / students.length;
    return { subject: subjectName, average: Math.round(avg) };
  }) || [];

  const handleDownloadClassReport = () => {
    alert(`Downloading Class ${selectedClass}${selectedSection} ${selectedExam} Report PDF...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      <Navigation role="Faculty" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 animate-slideUp">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Reports</h1>
          <p className="text-gray-600">View and download comprehensive class performance reports.</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 card-hover">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Class & Exam</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">
                Class
              </label>
              <select
                id="class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(parseInt(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((classNum) => (
                  <option key={classNum} value={classNum}>Class {classNum}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-2">
                Section
              </label>
              <select
                id="section"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value as 'A' | 'B')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>

            <div>
              <label htmlFor="exam" className="block text-sm font-medium text-gray-700 mb-2">
                Exam
              </label>
              <select
                id="exam"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value as 'Exam 1' | 'Exam 2')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="Exam 1">Exam 1</option>
                <option value="Exam 2">Exam 2</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-8 h-8 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Class Average</p>
                <p className="text-2xl font-bold text-green-700">{stats.overallPercentage.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attendance</p>
              <p className="text-2xl font-bold text-blue-700">{stats.overallAttendance.toFixed(1)}%</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Drawbacks</p>
              <p className="text-2xl font-bold text-red-700">{stats.totalDrawbacks}</p>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white card-hover">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Class {selectedClass} - Section {selectedSection} Report</h2>
              <p className="text-indigo-100">{selectedExam} Performance Summary</p>
            </div>
            <button
              onClick={() => setShowClassReport(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium glow-button"
            >
              <Eye className="w-5 h-5" />
              View Details
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Subject-wise Average */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Subject-wise Class Average</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#4f46e5" name="Average Marks" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Class Report Modal */}
      {showClassReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setShowClassReport(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Class {selectedClass} - Section {selectedSection}</h2>
                  <p className="text-indigo-100">{selectedExam} - Overall Performance Report</p>
                </div>
                <button
                  onClick={() => setShowClassReport(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Teacher Info */}
              {teacher && (
                <div className="bg-gray-50 p-4 rounded-xl mb-6">
                  <h3 className="font-bold text-gray-900 mb-2">Class Teacher Information</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Teacher Name</p>
                      <p className="font-medium text-gray-900">{teacher.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Subject</p>
                      <p className="font-medium text-gray-900">{teacher.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium text-gray-900">{teacher.experience} Years</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p className="font-medium text-gray-900">{teacher.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Overall Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-600 mb-2">Overall Academic Percentage</p>
                  <p className="text-4xl font-bold text-blue-700">{stats.overallPercentage.toFixed(1)}%</p>
                  <p className="text-xs text-blue-600 mt-1">Class Average</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <p className="text-sm text-green-600 mb-2">Overall Attendance Percentage</p>
                  <p className="text-4xl font-bold text-green-700">{stats.overallAttendance.toFixed(1)}%</p>
                  <p className="text-xs text-green-600 mt-1">Class Average</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <p className="text-sm text-purple-600 mb-2">Total Students</p>
                  <p className="text-4xl font-bold text-purple-700">{stats.totalStudents}</p>
                  <p className="text-xs text-purple-600 mt-1">In this class</p>
                </div>
              </div>

              {/* Performance Breakdown */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Performance Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                    <p className="text-sm text-green-600 mb-1">Excellent (≥90%)</p>
                    <p className="text-2xl font-bold text-green-700">{stats.excellentCount}</p>
                    <p className="text-xs text-green-600">{((stats.excellentCount / stats.totalStudents) * 100).toFixed(0)}% of class</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-600 mb-1">Good (75-89%)</p>
                    <p className="text-2xl font-bold text-blue-700">{stats.goodCount}</p>
                    <p className="text-xs text-blue-600">{((stats.goodCount / stats.totalStudents) * 100).toFixed(0)}% of class</p>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-600 mb-1">Average (60-74%)</p>
                    <p className="text-2xl font-bold text-amber-700">{stats.averageCount}</p>
                    <p className="text-xs text-amber-600">{((stats.averageCount / stats.totalStudents) * 100).toFixed(0)}% of class</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                    <p className="text-sm text-red-600 mb-1">Weak (&lt;60%)</p>
                    <p className="text-2xl font-bold text-red-700">{stats.weakCount}</p>
                    <p className="text-xs text-red-600">{((stats.weakCount / stats.totalStudents) * 100).toFixed(0)}% of class</p>
                  </div>
                </div>
              </div>

              {/* Student List with Performance */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Student-wise Performance</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Avg %</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attendance</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {students.map((student) => {
                        const avgMarks = student.subjects.reduce((sum, s) => sum + s.marks, 0) / student.subjects.length;
                        const attendancePercentage = (student.presentDays / student.totalDays) * 100;
                        const status = avgMarks >= 90 ? 'Excellent' : avgMarks >= 75 ? 'Good' : avgMarks >= 60 ? 'Average' : 'Weak';
                        
                        return (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.rollNo}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
                            <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">{avgMarks.toFixed(1)}%</td>
                            <td className="px-4 py-3 text-center text-sm">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                attendancePercentage >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {attendancePercentage.toFixed(0)}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                status === 'Excellent' ? 'bg-green-100 text-green-700' :
                                status === 'Good' ? 'bg-blue-100 text-blue-700' :
                                status === 'Average' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Additional Insights */}
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 mb-6">
                <h3 className="font-bold text-indigo-900 mb-2">Key Insights</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Total Fees Pending: ₹{stats.totalFeesPending}</li>
                  <li>• Students with Drawbacks: {stats.totalDrawbacks}</li>
                  <li>• {stats.weakCount > 0 ? `${stats.weakCount} student(s) need immediate attention` : 'All students performing well'}</li>
                  <li>• Average Attendance: {stats.overallAttendance.toFixed(1)}% ({stats.overallAttendance >= 75 ? 'Good' : 'Needs Improvement'})</li>
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end border-t border-gray-200 pt-4">
                <button
                  onClick={() => setShowClassReport(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-gray-700 glow-button-subtle"
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadClassReport}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button"
                >
                  <Download className="w-4 h-4" />
                  Download Class Report PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}