import { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileDown, FileText, Download, X, Eye, Users, TrendingUp, BookOpen } from 'lucide-react';
import { Navigation } from './Navigation';
import { toast } from 'sonner@2.0.3';

const examReportsData = [
  {
    id: 1,
    exam: 'Exam 1',
    year: '2025-26',
    term: 'First Term',
    dateRange: 'Apr 2025 - Jun 2025',
    teachersInCharge: [
      { id: 'T001', name: 'Mr. John Smith', subject: 'Mathematics', classes: ['10-A', '10-B'] },
      { id: 'T002', name: 'Ms. Sarah Johnson', subject: 'English', classes: ['8-A', '8-B'] },
      { id: 'T003', name: 'Mr. David Chen', subject: 'Science', classes: ['9-A', '9-B'] },
    ],
    students: [
      { id: 'STU001', name: 'Alice Johnson', class: '10-A', percentage: 85, attendance: 92, grade: 'A', rank: 2 },
      { id: 'STU002', name: 'Bob Smith', class: '10-A', percentage: 78, attendance: 88, grade: 'B+', rank: 5 },
      { id: 'STU003', name: 'Charlie Brown', class: '10-B', percentage: 92, attendance: 95, grade: 'A+', rank: 1 },
      { id: 'STU004', name: 'Diana Prince', class: '10-B', percentage: 81, attendance: 90, grade: 'A-', rank: 3 },
      { id: 'STU005', name: 'Ethan Hunt', class: '9-A', percentage: 75, attendance: 85, grade: 'B', rank: 8 },
      { id: 'STU006', name: 'Fiona Green', class: '9-A', percentage: 88, attendance: 93, grade: 'A', rank: 4 },
      { id: 'STU007', name: 'George Miller', class: '9-B', percentage: 72, attendance: 82, grade: 'B', rank: 12 },
      { id: 'STU008', name: 'Hannah White', class: '9-B', percentage: 86, attendance: 91, grade: 'A', rank: 6 },
      { id: 'STU009', name: 'Ian Thompson', class: '8-A', percentage: 79, attendance: 87, grade: 'B+', rank: 7 },
      { id: 'STU010', name: 'Julia Roberts', class: '8-A', percentage: 83, attendance: 89, grade: 'A-', rank: 9 },
      { id: 'STU011', name: 'Kevin Hart', class: '8-B', percentage: 76, attendance: 84, grade: 'B', rank: 10 },
      { id: 'STU012', name: 'Laura Palmer', class: '8-B', percentage: 90, attendance: 94, grade: 'A+', rank: 11 },
    ],
    overallStats: {
      totalStudents: 480,
      averagePercentage: 82,
      averageAttendance: 89,
      passPercentage: 95,
      topPerformers: 45,
      needsImprovement: 24,
    }
  },
  {
    id: 2,
    exam: 'Exam 2',
    year: '2025-26',
    term: 'Second Term',
    dateRange: 'Jul 2025 - Sep 2025',
    teachersInCharge: [
      { id: 'T001', name: 'Mr. John Smith', subject: 'Mathematics', classes: ['10-A', '10-B'] },
      { id: 'T004', name: 'Ms. Emily White', subject: 'History', classes: ['7-A', '7-B'] },
      { id: 'T005', name: 'Mr. James Wilson', subject: 'Physics', classes: ['11-A', '12-A'] },
      { id: 'T006', name: 'Ms. Maria Garcia', subject: 'Chemistry', classes: ['11-B', '12-B'] },
    ],
    students: [
      { id: 'STU001', name: 'Alice Johnson', class: '10-A', percentage: 88, attendance: 93, grade: 'A', rank: 1 },
      { id: 'STU002', name: 'Bob Smith', class: '10-A', percentage: 81, attendance: 90, grade: 'A-', rank: 4 },
      { id: 'STU003', name: 'Charlie Brown', class: '10-B', percentage: 94, attendance: 96, grade: 'A+', rank: 2 },
      { id: 'STU004', name: 'Diana Prince', class: '10-B', percentage: 84, attendance: 91, grade: 'A', rank: 3 },
      { id: 'STU005', name: 'Ethan Hunt', class: '9-A', percentage: 78, attendance: 87, grade: 'B+', rank: 6 },
      { id: 'STU006', name: 'Fiona Green', class: '9-A', percentage: 91, attendance: 94, grade: 'A+', rank: 5 },
      { id: 'STU007', name: 'George Miller', class: '9-B', percentage: 75, attendance: 84, grade: 'B', rank: 9 },
      { id: 'STU008', name: 'Hannah White', class: '9-B', percentage: 89, attendance: 92, grade: 'A', rank: 7 },
      { id: 'STU009', name: 'Ian Thompson', class: '8-A', percentage: 82, attendance: 88, grade: 'A-', rank: 8 },
      { id: 'STU010', name: 'Julia Roberts', class: '8-A', percentage: 86, attendance: 90, grade: 'A', rank: 10 },
      { id: 'STU011', name: 'Kevin Hart', class: '8-B', percentage: 79, attendance: 86, grade: 'B+', rank: 11 },
      { id: 'STU012', name: 'Laura Palmer', class: '8-B', percentage: 93, attendance: 95, grade: 'A+', rank: 12 },
    ],
    overallStats: {
      totalStudents: 480,
      averagePercentage: 85,
      averageAttendance: 91,
      passPercentage: 97,
      topPerformers: 52,
      needsImprovement: 18,
    }
  },
  {
    id: 3,
    exam: 'Exam 3',
    year: '2025-26',
    term: 'Third Term',
    dateRange: 'Oct 2025 - Dec 2025',
    teachersInCharge: [
      { id: 'T002', name: 'Ms. Sarah Johnson', subject: 'English', classes: ['8-A', '8-B'] },
      { id: 'T003', name: 'Mr. David Chen', subject: 'Science', classes: ['9-A', '9-B'] },
      { id: 'T005', name: 'Mr. James Wilson', subject: 'Physics', classes: ['11-A', '12-A'] },
    ],
    students: [
      { id: 'STU001', name: 'Alice Johnson', class: '10-A', percentage: 87, attendance: 94, grade: 'A', rank: 2 },
      { id: 'STU002', name: 'Bob Smith', class: '10-A', percentage: 80, attendance: 89, grade: 'B+', rank: 5 },
      { id: 'STU003', name: 'Charlie Brown', class: '10-B', percentage: 95, attendance: 97, grade: 'A+', rank: 1 },
      { id: 'STU004', name: 'Diana Prince', class: '10-B', percentage: 83, attendance: 92, grade: 'A-', rank: 3 },
      { id: 'STU005', name: 'Ethan Hunt', class: '9-A', percentage: 77, attendance: 86, grade: 'B+', rank: 7 },
      { id: 'STU006', name: 'Fiona Green', class: '9-A', percentage: 90, attendance: 95, grade: 'A+', rank: 4 },
      { id: 'STU007', name: 'George Miller', class: '9-B', percentage: 74, attendance: 83, grade: 'B', rank: 10 },
      { id: 'STU008', name: 'Hannah White', class: '9-B', percentage: 88, attendance: 93, grade: 'A', rank: 6 },
      { id: 'STU009', name: 'Ian Thompson', class: '8-A', percentage: 81, attendance: 88, grade: 'A-', rank: 8 },
      { id: 'STU010', name: 'Julia Roberts', class: '8-A', percentage: 85, attendance: 91, grade: 'A', rank: 9 },
      { id: 'STU011', name: 'Kevin Hart', class: '8-B', percentage: 78, attendance: 85, grade: 'B+', rank: 11 },
      { id: 'STU012', name: 'Laura Palmer', class: '8-B', percentage: 92, attendance: 96, grade: 'A+', rank: 12 },
    ],
    overallStats: {
      totalStudents: 480,
      averagePercentage: 84,
      averageAttendance: 90,
      passPercentage: 96,
      topPerformers: 48,
      needsImprovement: 20,
    }
  },
  {
    id: 4,
    exam: 'Exam 4',
    year: '2025-26',
    term: 'Fourth Term (Final)',
    dateRange: 'Jan 2026 - Mar 2026',
    teachersInCharge: [
      { id: 'T001', name: 'Mr. John Smith', subject: 'Mathematics', classes: ['10-A', '10-B'] },
      { id: 'T002', name: 'Ms. Sarah Johnson', subject: 'English', classes: ['8-A', '8-B'] },
      { id: 'T003', name: 'Mr. David Chen', subject: 'Science', classes: ['9-A', '9-B'] },
      { id: 'T004', name: 'Ms. Emily White', subject: 'History', classes: ['7-A', '7-B'] },
      { id: 'T005', name: 'Mr. James Wilson', subject: 'Physics', classes: ['11-A', '12-A'] },
      { id: 'T006', name: 'Ms. Maria Garcia', subject: 'Chemistry', classes: ['11-B', '12-B'] },
    ],
    students: [
      { id: 'STU001', name: 'Alice Johnson', class: '10-A', percentage: 90, attendance: 95, grade: 'A+', rank: 1 },
      { id: 'STU002', name: 'Bob Smith', class: '10-A', percentage: 83, attendance: 91, grade: 'A-', rank: 4 },
      { id: 'STU003', name: 'Charlie Brown', class: '10-B', percentage: 96, attendance: 98, grade: 'A+', rank: 2 },
      { id: 'STU004', name: 'Diana Prince', class: '10-B', percentage: 86, attendance: 93, grade: 'A', rank: 3 },
      { id: 'STU005', name: 'Ethan Hunt', class: '9-A', percentage: 80, attendance: 88, grade: 'B+', rank: 6 },
      { id: 'STU006', name: 'Fiona Green', class: '9-A', percentage: 93, attendance: 96, grade: 'A+', rank: 5 },
      { id: 'STU007', name: 'George Miller', class: '9-B', percentage: 76, attendance: 85, grade: 'B+', rank: 9 },
      { id: 'STU008', name: 'Hannah White', class: '9-B', percentage: 91, attendance: 94, grade: 'A+', rank: 7 },
      { id: 'STU009', name: 'Ian Thompson', class: '8-A', percentage: 84, attendance: 89, grade: 'A-', rank: 8 },
      { id: 'STU010', name: 'Julia Roberts', class: '8-A', percentage: 88, attendance: 92, grade: 'A', rank: 10 },
      { id: 'STU011', name: 'Kevin Hart', class: '8-B', percentage: 81, attendance: 87, grade: 'A-', rank: 11 },
      { id: 'STU012', name: 'Laura Palmer', class: '8-B', percentage: 94, attendance: 97, grade: 'A+', rank: 12 },
    ],
    overallStats: {
      totalStudents: 480,
      averagePercentage: 87,
      averageAttendance: 92,
      passPercentage: 98,
      topPerformers: 58,
      needsImprovement: 15,
    }
  },
];

export function Reports() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const [selectedExam, setSelectedExam] = useState<typeof examReportsData[0] | null>(null);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleDownloadExamPDF = (exam: typeof examReportsData[0]) => {
    toast.success(`Downloading ${exam.exam} comprehensive report PDF...`);
    // In production, this would generate and download a real PDF
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-100 text-green-700';
    if (grade === 'A-' || grade === 'B+') return 'bg-blue-100 text-blue-700';
    if (grade === 'B' || grade === 'B-') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-700';
    if (percentage >= 75) return 'text-blue-700';
    if (percentage >= 60) return 'text-amber-700';
    return 'text-red-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      <Navigation role={user.role || 'Student'} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 animate-slideUp">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Reports</h1>
          <p className="text-gray-600">
            {user.role === 'Admin' 
              ? 'Comprehensive exam-wise reports with teacher and student details'
              : 'Reports provide downloadable academic summaries'}
          </p>
        </div>

        {/* Download All Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white card-hover">
          <h2 className="text-xl font-bold mb-4">Download Complete Academic Record</h2>
          <div className="flex gap-4">
            <button
              onClick={() => toast.success('Downloading complete PDF report...')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium glow-button"
            >
              <FileText className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={() => toast.success('Downloading complete CSV report...')}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300 font-medium glow-button-subtle"
            >
              <FileDown className="w-5 h-5" />
              Download CSV
            </button>
          </div>
        </div>

        {/* Exam-wise Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 card-hover">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Exam-wise Summary</h2>
            <p className="text-sm text-gray-600 mt-1">Click on any exam to view detailed report with teachers and students</p>
          </div>

          <div className="divide-y divide-gray-200">
            {examReportsData.map((report) => (
              <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{report.exam}</h3>
                    <p className="text-sm text-gray-600">{report.term} • {report.dateRange}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                    report.overallStats.averagePercentage >= 85 
                      ? 'bg-green-100 text-green-700' 
                      : report.overallStats.averagePercentage >= 75 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {report.overallStats.averagePercentage}% Average
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Total Students</p>
                    <p className="text-xl font-bold text-blue-700">{report.overallStats.totalStudents}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-600 mb-1">Pass Rate</p>
                    <p className="text-xl font-bold text-green-700">{report.overallStats.passPercentage}%</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-xs text-purple-600 mb-1">Top Performers</p>
                    <p className="text-xl font-bold text-purple-700">{report.overallStats.topPerformers}</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <p className="text-xs text-amber-600 mb-1">Attendance</p>
                    <p className="text-xl font-bold text-amber-700">{report.overallStats.averageAttendance}%</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedExam(report)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 text-sm font-medium glow-button"
                  >
                    <Eye className="w-4 h-4" />
                    View Full Details
                  </button>
                  <button
                    onClick={() => handleDownloadExamPDF(report)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm font-medium text-gray-700 glow-button-subtle"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6 card-hover">
          <h3 className="font-bold text-blue-900 mb-2">About Reports</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Comprehensive exam reports include all teachers, students, grades, and attendance</li>
            <li>• PDF reports contain detailed breakdowns and can be shared with stakeholders</li>
            <li>• CSV files can be opened in Excel for custom analysis and data processing</li>
            <li>• All reports are generated in real-time based on the latest faculty entries</li>
            <li>• Historical reports are archived and available for download anytime</li>
          </ul>
        </div>
      </div>

      {/* Detailed Exam Report Modal */}
      {selectedExam && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setSelectedExam(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedExam.exam} - Comprehensive Report</h2>
                  <p className="text-lg text-indigo-100">{selectedExam.term} ({selectedExam.dateRange})</p>
                </div>
                <button
                  onClick={() => setSelectedExam(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Overall Statistics */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Overall Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200 card-hover">
                    <Users className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-blue-600 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-blue-900">{selectedExam.overallStats.totalStudents}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200 card-hover">
                    <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-green-600 mb-1">Average %</p>
                    <p className="text-2xl font-bold text-green-900">{selectedExam.overallStats.averagePercentage}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200 card-hover">
                    <BookOpen className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-purple-600 mb-1">Pass Rate</p>
                    <p className="text-2xl font-bold text-purple-900">{selectedExam.overallStats.passPercentage}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl border border-amber-200 card-hover">
                    <TrendingUp className="w-8 h-8 text-amber-600 mb-2" />
                    <p className="text-sm text-amber-600 mb-1">Attendance</p>
                    <p className="text-2xl font-bold text-amber-900">{selectedExam.overallStats.averageAttendance}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200 card-hover">
                    <Users className="w-8 h-8 text-emerald-600 mb-2" />
                    <p className="text-sm text-emerald-600 mb-1">Top Performers</p>
                    <p className="text-2xl font-bold text-emerald-900">{selectedExam.overallStats.topPerformers}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200 card-hover">
                    <Users className="w-8 h-8 text-red-600 mb-2" />
                    <p className="text-sm text-red-600 mb-1">Need Support</p>
                    <p className="text-2xl font-bold text-red-900">{selectedExam.overallStats.needsImprovement}</p>
                  </div>
                </div>
              </div>

              {/* Teachers In Charge */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Teachers In Charge</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedExam.teachersInCharge.map((teacher) => (
                    <div key={teacher.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow card-hover bg-gradient-to-br from-white to-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">{teacher.name}</h4>
                          <p className="text-sm text-gray-600">{teacher.subject}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {teacher.classes.map((cls, idx) => (
                              <span key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                                {cls}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Student Performance Table */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Student Performance Details</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                      <tr>
                        <th className="px-4 py-3 text-left font-bold">Rank</th>
                        <th className="px-4 py-3 text-left font-bold">Student ID</th>
                        <th className="px-4 py-3 text-left font-bold">Name</th>
                        <th className="px-4 py-3 text-left font-bold">Class</th>
                        <th className="px-4 py-3 text-center font-bold">Percentage</th>
                        <th className="px-4 py-3 text-center font-bold">Attendance</th>
                        <th className="px-4 py-3 text-center font-bold">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedExam.students.map((student, idx) => (
                        <tr key={student.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                              student.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                              student.rank === 2 ? 'bg-gray-200 text-gray-700' :
                              student.rank === 3 ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {student.rank}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-mono text-sm text-gray-600">{student.id}</td>
                          <td className="px-4 py-3 font-medium text-gray-900">{student.name}</td>
                          <td className="px-4 py-3 text-gray-700">{student.class}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-bold text-lg ${getPercentageColor(student.percentage)}`}>
                              {student.percentage}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`font-medium ${getPercentageColor(student.attendance)}`}>
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(student.grade)}`}>
                              {student.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-3 italic">
                  * Showing sample of 12 students. Full report contains all {selectedExam.overallStats.totalStudents} students.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end border-t border-gray-200 pt-6">
                <button
                  onClick={() => setSelectedExam(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-gray-700 glow-button-subtle"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadExamPDF(selectedExam)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium glow-button"
                >
                  <Download className="w-5 h-5" />
                  Download Complete PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}