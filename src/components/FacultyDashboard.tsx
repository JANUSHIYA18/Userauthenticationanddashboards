import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, Eye, X, Calendar, DollarSign, FileX, Phone, User, BarChart3, CheckCircle, XCircle, Download } from 'lucide-react';
import { Navigation } from './Navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getStudentsByClassAndSection, getTeacherForClassSection, Student as StudentData } from '../data/studentsData';

export function FacultyDashboard() {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedSection, setSelectedSection] = useState<'A' | 'B'>('A');
  const [selectedExam, setSelectedExam] = useState('Exam 1');
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  const students = getStudentsByClassAndSection(selectedClass, selectedSection);
  const teacher = getTeacherForClassSection(selectedClass, selectedSection);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleSaveMarks = () => {
    alert(`Marks for Class ${selectedClass} - Section ${selectedSection} - ${selectedExam} saved successfully!`);
  };

  const handleDownloadReportPDF = (student: StudentData) => {
    alert(`Downloading Report Card PDF for ${student.name}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      <Navigation role="Faculty" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 animate-slideUp">
        {/* Teacher Profile Section */}
        {teacher && (
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white card-hover">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{teacher.name}</h2>
                <p className="text-indigo-100 mb-3">
                  Class {teacher.class} - Section {teacher.section} | {teacher.subject} Teacher
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{teacher.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-200">Email:</span>
                    <span>{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-200">Experience:</span>
                    <span>{teacher.experience} Years</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Dashboard</h1>
          <p className="text-gray-600">Faculty enter marks and attendance through this interface.</p>
        </div>

        {/* Selection Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 card-hover">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Class Details</h3>
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
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
              >
                <option value="Exam 1">Exam 1</option>
                <option value="Exam 2">Exam 2</option>
                <option value="Exam 3">Exam 3</option>
                <option value="Exam 4">Exam 4</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Final Exam">Final Exam</option>
              </select>
            </div>
          </div>

          <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-sm text-indigo-900">
              <strong>Selected:</strong> Class {selectedClass} - Section {selectedSection} - {selectedExam} 
              <span className="ml-2 text-indigo-600">({students.length} students)</span>
            </p>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 card-hover overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Student List</h2>
            <p className="text-sm text-gray-600 mt-1">Click "View Details" to see comprehensive student information</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Attendance</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Avg Marks</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => {
                  const avgMarks = student.subjects.reduce((sum, s) => sum + s.marks, 0) / student.subjects.length;
                  const attendancePercentage = (student.presentDays / student.totalDays) * 100;
                  const status = avgMarks >= 75 ? 'Good' : avgMarks >= 60 ? 'Average' : 'Weak';
                  
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{student.rollNo}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{student.name}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          attendancePercentage >= 75 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {attendancePercentage.toFixed(0)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">{avgMarks.toFixed(1)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          status === 'Good' ? 'bg-green-100 text-green-700' :
                          status === 'Average' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 text-sm font-medium glow-button"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleSaveMarks}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button"
            >
              <Save className="w-4 h-4" />
              Save All Data
            </button>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn" onClick={() => setSelectedStudent(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selectedStudent.name}</h2>
                  <p className="text-indigo-100">
                    Class {selectedStudent.class} - Section {selectedStudent.section} | Roll No: {selectedStudent.rollNo}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Date of Birth</p>
                  <p className="font-medium text-gray-900">{selectedStudent.dob}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Blood Group</p>
                  <p className="font-medium text-gray-900">{selectedStudent.bloodGroup}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Student ID</p>
                  <p className="font-medium text-gray-900">{selectedStudent.id}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Drawbacks</p>
                  <p className="font-medium text-red-600">{selectedStudent.drawbacks}</p>
                </div>
              </div>

              {/* Performance Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-blue-600">Avg Marks</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-700">
                    {(selectedStudent.subjects.reduce((sum, s) => sum + s.marks, 0) / selectedStudent.subjects.length).toFixed(1)}%
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-600">Attendance</p>
                  </div>
                  <p className="text-2xl font-bold text-green-700">
                    {((selectedStudent.presentDays / selectedStudent.totalDays) * 100).toFixed(0)}%
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {selectedStudent.presentDays}/{selectedStudent.totalDays} days
                  </p>
                </div>
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-amber-600" />
                    <p className="text-sm text-amber-600">Fees Pending</p>
                  </div>
                  <p className="text-2xl font-bold text-amber-700">₹{selectedStudent.feesPending}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <p className="text-sm text-purple-600">Assignments</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-700">
                    {selectedStudent.assignmentsCompleted}/{selectedStudent.assignmentsTotal}
                  </p>
                </div>
              </div>

              {/* Subject-wise Marks Chart */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Subject-wise Performance</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={selectedStudent.subjects}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="marks" fill="#4f46e5" name="Marks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Attendance Details */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Attendance Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium text-green-900">Present Days</span>
                      <span className="text-lg font-bold text-green-700">{selectedStudent.presentDays}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <span className="text-sm font-medium text-red-900">Absent Days</span>
                      <span className="text-lg font-bold text-red-700">{selectedStudent.absentDays}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium text-blue-900">Total Days</span>
                      <span className="text-lg font-bold text-blue-700">{selectedStudent.totalDays}</span>
                    </div>
                  </div>
                </div>

                {/* Assignments Status */}
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Assignment Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Completed</span>
                      </div>
                      <span className="text-lg font-bold text-green-700">{selectedStudent.assignmentsCompleted}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <XCircle className="w-5 h-5 text-amber-600" />
                        <span className="text-sm font-medium text-amber-900">Not Completed</span>
                      </div>
                      <span className="text-lg font-bold text-amber-700">
                        {selectedStudent.assignmentsTotal - selectedStudent.assignmentsCompleted}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Parent/Guardian Information</h3>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Parent/Guardian Name</p>
                        <p className="font-medium text-gray-900">{selectedStudent.parentName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600">Contact Number</p>
                        <p className="font-medium text-gray-900">{selectedStudent.parentContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Required */}
              <div className={`p-4 rounded-xl border ${
                selectedStudent.actionRequired.includes('immediate') 
                  ? 'bg-red-50 border-red-200' 
                  : selectedStudent.actionRequired.includes('additional')
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-green-50 border-green-200'
              } mb-6`}>
                <h3 className={`font-bold mb-2 ${
                  selectedStudent.actionRequired.includes('immediate')
                    ? 'text-red-900'
                    : selectedStudent.actionRequired.includes('additional')
                    ? 'text-amber-900'
                    : 'text-green-900'
                }`}>
                  Action Required
                </h3>
                <p className={`text-sm ${
                  selectedStudent.actionRequired.includes('immediate')
                    ? 'text-red-700'
                    : selectedStudent.actionRequired.includes('additional')
                    ? 'text-amber-700'
                    : 'text-green-700'
                }`}>
                  {selectedStudent.actionRequired}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 justify-end border-t border-gray-200 pt-4">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium text-gray-700 glow-button-subtle"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadReportPDF(selectedStudent)}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button"
                >
                  <Download className="w-4 h-4" />
                  Download Report Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
