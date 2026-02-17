import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, Calendar, FileText, MessageSquare, Search, Download, Upload, CheckCircle, XCircle } from 'lucide-react';
import { Navigation } from './Navigation';
import { getStudentsByClassAndSection, getTeacherForClassSection } from '../data/studentsData';
import { toast } from 'sonner@2.0.3';

type TabType = 'marks' | 'attendance' | 'assignments' | 'announcements';

export function ClassManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('marks');
  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedSection, setSelectedSection] = useState<'A' | 'B'>('A');
  const [selectedExam, setSelectedExam] = useState('Exam 1');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const students = getStudentsByClassAndSection(selectedClass, selectedSection);
  const teacher = getTeacherForClassSection(selectedClass, selectedSection);

  // Initialize marks state
  const [marks, setMarks] = useState<Record<string, string>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: '' }), {})
  );

  // Initialize attendance state
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent' | 'late'>>(
    students.reduce((acc, student) => ({ ...acc, [student.id]: 'present' }), {})
  );

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleSaveMarks = () => {
    const enteredMarks = Object.entries(marks).filter(([_, mark]) => mark !== '');
    if (enteredMarks.length === 0) {
      toast.error('Please enter marks for at least one student');
      return;
    }
    toast.success(`Marks saved for ${enteredMarks.length} students in ${selectedSubject}`);
    // Reset marks
    setMarks(students.reduce((acc, student) => ({ ...acc, [student.id]: '' }), {}));
  };

  const handleSaveAttendance = () => {
    const presentCount = Object.values(attendance).filter(a => a === 'present').length;
    const absentCount = Object.values(attendance).filter(a => a === 'absent').length;
    const lateCount = Object.values(attendance).filter(a => a === 'late').length;
    
    toast.success(`Attendance saved: ${presentCount} Present, ${absentCount} Absent, ${lateCount} Late`);
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    setAttendance(students.reduce((acc, student) => ({ ...acc, [student.id]: status }), {}));
  };

  const handleBulkMarkEntry = () => {
    toast.info('Bulk mark entry from CSV feature coming soon!');
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get subjects based on class level
  const getSubjects = () => {
    if (selectedClass <= 5) {
      return ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi'];
    } else if (selectedClass <= 8) {
      return ['English', 'Mathematics', 'Science', 'Social Studies', 'Hindi', 'Computer'];
    } else {
      return ['English', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
    }
  };

  const subjects = getSubjects();

  // Set default subject if not selected
  if (!selectedSubject && subjects.length > 0) {
    setSelectedSubject(subjects[0]);
  }

  const exams = ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Mid Term', 'Final Exam'];

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      <Navigation role="Faculty" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 animate-slideUp">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class Management</h1>
          <p className="text-gray-600">Manage marks, attendance, assignments, and more for your class.</p>
        </div>

        {/* Class Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 card-hover">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Select Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {teacher && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <p className="text-sm text-indigo-900">
                <span className="font-semibold">Class Teacher:</span> {teacher.name} | {teacher.subject} | 
                <span className="ml-2">{students.length} Students</span>
              </p>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden card-hover">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('marks')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === 'marks'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                Mark Entry
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === 'attendance'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                Attendance
              </button>
              <button
                onClick={() => setActiveTab('assignments')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === 'assignments'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                Assignments
              </button>
              <button
                onClick={() => setActiveTab('announcements')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                  activeTab === 'announcements'
                    ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                Announcements
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Mark Entry Tab */}
            {activeTab === 'marks' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                      {exams.map((exam) => (
                        <option key={exam} value={exam}>{exam}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
                    >
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleBulkMarkEntry}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium glow-button-subtle"
                    >
                      <Upload className="w-4 h-4" />
                      Bulk Upload
                    </button>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search by name or roll number..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Marks (Out of 100)</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStudents.map((student) => {
                        const mark = parseInt(marks[student.id]) || 0;
                        const grade = mark >= 90 ? 'A+' : mark >= 80 ? 'A' : mark >= 70 ? 'B+' : mark >= 60 ? 'B' : mark >= 50 ? 'C' : mark > 0 ? 'D' : '-';
                        
                        return (
                          <tr key={student.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.rollNo}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={marks[student.id]}
                                onChange={(e) => setMarks({ ...marks, [student.id]: e.target.value })}
                                className="w-24 mx-auto block px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-center"
                                placeholder="0-100"
                              />
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                grade === 'A+' || grade === 'A' ? 'bg-green-100 text-green-700' :
                                grade === 'B+' || grade === 'B' ? 'bg-blue-100 text-blue-700' :
                                grade === 'C' ? 'bg-amber-100 text-amber-700' :
                                grade === 'D' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setMarks(students.reduce((acc, student) => ({ ...acc, [student.id]: '' }), {}))}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium glow-button-subtle"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleSaveMarks}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button"
                  >
                    <Save className="w-4 h-4" />
                    Save Marks
                  </button>
                </div>
              </div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>

                  <div className="flex items-end gap-2">
                    <button
                      onClick={() => handleMarkAll('present')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 font-medium glow-button"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark All Present
                    </button>
                    <button
                      onClick={() => handleMarkAll('absent')}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium glow-button"
                    >
                      <XCircle className="w-4 h-4" />
                      Mark All Absent
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name or roll number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{student.rollNo}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{student.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => setAttendance({ ...attendance, [student.id]: 'present' })}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                  attendance[student.id] === 'present'
                                    ? 'bg-green-600 text-white glow-button'
                                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                                }`}
                              >
                                Present
                              </button>
                              <button
                                onClick={() => setAttendance({ ...attendance, [student.id]: 'absent' })}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                  attendance[student.id] === 'absent'
                                    ? 'bg-red-600 text-white glow-button'
                                    : 'bg-gray-100 text-gray-700 hover:bg-red-100 hover:text-red-700'
                                }`}
                              >
                                Absent
                              </button>
                              <button
                                onClick={() => setAttendance({ ...attendance, [student.id]: 'late' })}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                  attendance[student.id] === 'late'
                                    ? 'bg-amber-600 text-white glow-button'
                                    : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                                }`}
                              >
                                Late
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-blue-600 mb-1">Present</p>
                      <p className="text-2xl font-bold text-green-700">
                        {Object.values(attendance).filter(a => a === 'present').length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 mb-1">Absent</p>
                      <p className="text-2xl font-bold text-red-700">
                        {Object.values(attendance).filter(a => a === 'absent').length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 mb-1">Late</p>
                      <p className="text-2xl font-bold text-amber-700">
                        {Object.values(attendance).filter(a => a === 'late').length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setAttendance(students.reduce((acc, student) => ({ ...acc, [student.id]: 'present' }), {}))}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium glow-button-subtle"
                  >
                    Reset
                  </button>
                  <button
                    onClick={handleSaveAttendance}
                    className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button"
                  >
                    <Save className="w-4 h-4" />
                    Save Attendance
                  </button>
                </div>
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === 'assignments' && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Assignment Management</h3>
                <p className="text-gray-600 mb-6">Create, distribute, and grade assignments for your class.</p>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button">
                  Create New Assignment
                </button>
              </div>
            )}

            {/* Announcements Tab */}
            {activeTab === 'announcements' && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Class Announcements</h3>
                <p className="text-gray-600 mb-6">Send important messages and updates to your class.</p>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium glow-button">
                  Create New Announcement
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
