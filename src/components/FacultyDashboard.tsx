import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Save, Upload, UserCheck, X, Calendar, AlertCircle, DollarSign, FileX, Phone, Mail, MapPin, User, TrendingUp, TrendingDown } from 'lucide-react';
import { Navigation } from './Navigation';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Student {
  id: string;
  name: string;
  rollNo: string;
  marks: string;
  attendance: string;
  email: string;
  phone: string;
  address: string;
  photoUrl?: string;
  totalAttendanceDays: number;
  lastAttendanceDays: number;
  totalAbsentDays: number;
  overallAttendance: number;
  subjectGrades: { 
    subject: string; 
    lastGrade: string; 
    avgGrade: string; 
    improvement: 'Improved' | 'Stable' | 'Declined';
    marks: number;
    total: number;
  }[];
  assignments: {
    subject: string;
    task: string;
    dueDate: string;
    status: 'Completed' | 'Pending' | 'Overdue';
  }[];
  upcomingPlans: string[];
  arrearCount: number;
  feesPending: number;
  parentInfo: {
    motherName: string;
    motherPhone: string;
    fatherName: string;
    fatherPhone: string;
  };
}

const initialStudents: Student[] = [
  { 
    id: '1', 
    name: 'Mithun Ray', 
    rollNo: 'UNI-2456826', 
    marks: '85', 
    attendance: '90',
    email: 'mithunray@gmail.com',
    phone: '+91 01243254125',
    address: '245 Dhb Street',
    totalAttendanceDays: 25,
    lastAttendanceDays: 10,
    totalAbsentDays: 2,
    overallAttendance: 92,
    subjectGrades: [
      { subject: 'Mathematics', lastGrade: 'A', avgGrade: 'B+', improvement: 'Improved', marks: 85, total: 100 },
      { subject: 'English', lastGrade: 'B+', avgGrade: 'B', improvement: 'Stable', marks: 78, total: 100 },
      { subject: 'Science', lastGrade: 'C', avgGrade: 'A', improvement: 'Improved', marks: 92, total: 100 },
      { subject: 'Sports', lastGrade: 'A', avgGrade: 'A', improvement: 'Improved', marks: 88, total: 100 },
    ],
    assignments: [
      { subject: 'Mathematics', task: 'Geometry Builders', dueDate: 'Oct 31', status: 'Completed' },
      { subject: 'English', task: 'Character Profile', dueDate: 'Nov 05', status: 'Pending' },
    ],
    upcomingPlans: [
      'Mathematics Assignment - Due Feb 15',
      'Physics Lab Report - Due Feb 18',
      'Mid-term Exams - Feb 25-28',
    ],
    arrearCount: 0,
    feesPending: 0,
    parentInfo: {
      motherName: 'Florine Lopez',
      motherPhone: '+91 98765 43210',
      fatherName: 'Lauren Barker',
      fatherPhone: '+91 98765 43211',
    }
  },
  { 
    id: '2', 
    name: 'Alice Johnson', 
    rollNo: 'CS001', 
    marks: '72', 
    attendance: '85',
    email: 'alice.j@student.edu',
    phone: '+1 234-567-8902',
    address: '123 Main Street',
    totalAttendanceDays: 22,
    lastAttendanceDays: 8,
    totalAbsentDays: 4,
    overallAttendance: 85,
    subjectGrades: [
      { subject: 'Mathematics', lastGrade: 'B', avgGrade: 'B', improvement: 'Stable', marks: 72, total: 100 },
      { subject: 'English', lastGrade: 'A', avgGrade: 'A', improvement: 'Improved', marks: 88, total: 100 },
      { subject: 'Science', lastGrade: 'C', avgGrade: 'B', improvement: 'Declined', marks: 68, total: 100 },
      { subject: 'Sports', lastGrade: 'B+', avgGrade: 'B', improvement: 'Stable', marks: 75, total: 100 },
    ],
    assignments: [
      { subject: 'Science', task: 'Lab Experiment Report', dueDate: 'Nov 10', status: 'Pending' },
      { subject: 'Mathematics', task: 'Algebra Quiz', dueDate: 'Nov 03', status: 'Completed' },
    ],
    upcomingPlans: [
      'Chemistry Project - Due Feb 14',
      'English Essay - Due Feb 20',
    ],
    arrearCount: 1,
    feesPending: 1500,
    parentInfo: {
      motherName: 'Maria Johnson',
      motherPhone: '+1 234-567-8910',
      fatherName: 'Robert Johnson',
      fatherPhone: '+1 234-567-8911',
    }
  },
  { 
    id: '3', 
    name: 'Bob Smith', 
    rollNo: 'CS002', 
    marks: '68', 
    attendance: '75',
    email: 'bob.s@student.edu',
    phone: '+1 234-567-8903',
    address: '456 Oak Avenue',
    totalAttendanceDays: 20,
    lastAttendanceDays: 6,
    totalAbsentDays: 7,
    overallAttendance: 74,
    subjectGrades: [
      { subject: 'Mathematics', lastGrade: 'C', avgGrade: 'C', improvement: 'Stable', marks: 68, total: 100 },
      { subject: 'English', lastGrade: 'B', avgGrade: 'B-', improvement: 'Improved', marks: 72, total: 100 },
      { subject: 'Science', lastGrade: 'C', avgGrade: 'C', improvement: 'Stable', marks: 65, total: 100 },
      { subject: 'Sports', lastGrade: 'B', avgGrade: 'B', improvement: 'Stable', marks: 78, total: 100 },
    ],
    assignments: [
      { subject: 'Mathematics', task: 'Homework Assignment', dueDate: 'Oct 28', status: 'Overdue' },
      { subject: 'English', task: 'Book Report', dueDate: 'Nov 12', status: 'Pending' },
    ],
    upcomingPlans: [
      'Mathematics Re-test - Feb 16',
      'Attendance Improvement Plan',
    ],
    arrearCount: 2,
    feesPending: 3000,
    parentInfo: {
      motherName: 'Sarah Smith',
      motherPhone: '+1 234-567-8912',
      fatherName: 'David Smith',
      fatherPhone: '+1 234-567-8913',
    }
  },
];

export function FacultyDashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const facultyProfile = {
    name: 'Dr. Sarah Johnson',
    designation: 'Associate Professor',
    department: 'Computer Science',
    email: 'sarah.j@university.edu',
    phone: '+1 234-567-8900',
    experience: '12 Years',
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const handleMarksChange = (id: string, value: string) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, marks: value } : s
    ));
  };

  const handleAttendanceChange = (id: string, value: string) => {
    setStudents(students.map(s => 
      s.id === id ? { ...s, attendance: value } : s
    ));
  };

  const handleSave = () => {
    alert('Data saved successfully!');
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const getAcademicPerformanceData = (student: Student) => {
    return student.subjectGrades.map(sg => ({
      subject: sg.subject.substring(0, 3),
      grade: sg.marks,
    }));
  };

  const getAttendanceData = (student: Student) => {
    const present = student.totalAttendanceDays - student.totalAbsentDays;
    const absent = student.totalAbsentDays;
    return [
      { name: 'Present', value: present, color: '#10b981' },
      { name: 'Absent', value: absent, color: '#ef4444' },
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role="Faculty" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">
        {/* Faculty Profile Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-10 h-10 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{facultyProfile.name}</h2>
              <p className="text-indigo-100 mb-3">{facultyProfile.designation} | {facultyProfile.department}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-indigo-200">Email:</span>
                  <span>{facultyProfile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-200">Phone:</span>
                  <span>{facultyProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-200">Experience:</span>
                  <span>{facultyProfile.experience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Faculty Dashboard</h1>
          <p className="text-gray-600">Faculty enter marks and attendance through this interface.</p>
        </div>

        {/* Subject Selector */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Select Subject
          </label>
          <select
            id="subject"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white"
          >
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="English">English</option>
            <option value="Computer Science">Computer Science</option>
          </select>
        </div>

        {/* Student List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Subject-wise Student List</h2>
            <p className="text-sm text-gray-600 mt-1">Click on any student to view complete details</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Marks (out of 100)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Attendance (%)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.rollNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.marks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={student.attendance}
                        onChange={(e) => handleAttendanceChange(student.id, e.target.value)}
                        className="w-24 px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleStudentClick(student)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Data
            </button>
            <button
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload CSV
            </button>
          </div>
        </div>
      </div>

      {/* Student Details Modal - New Design */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-100 rounded-2xl shadow-2xl max-w-7xl w-full my-8">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="text-xl font-bold text-gray-900">{selectedStudent.rollNo}</div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div className="text-sm text-gray-500">Student Unique Identifier</div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* Left Column - Student Info & Stats */}
              <div className="lg:col-span-2 space-y-6">
                {/* Student Profile Card */}
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <span className="text-4xl font-bold text-white">
                        {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedStudent.name}</h2>
                      <p className="text-gray-500 mb-6">{selectedStudent.rollNo}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                            <p className="font-medium text-gray-900 text-sm">{selectedStudent.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Email Address</p>
                            <p className="font-medium text-gray-900 text-sm break-all">{selectedStudent.email}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Address</p>
                            <p className="font-medium text-gray-900 text-sm">{selectedStudent.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-5 border border-cyan-200">
                      <div className="flex items-center justify-between mb-3">
                        <Calendar className="w-6 h-6 text-cyan-600" />
                        <p className="text-2xl font-bold text-cyan-900">{selectedStudent.totalAttendanceDays}</p>
                      </div>
                      <p className="text-sm font-medium text-cyan-700">Total Attendance</p>
                      <p className="text-xs text-cyan-600 mt-1">Days Present</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <p className="text-2xl font-bold text-blue-900">{selectedStudent.lastAttendanceDays}</p>
                      </div>
                      <p className="text-sm font-medium text-blue-700">Last 10 Days</p>
                      <p className="text-xs text-blue-600 mt-1">Recent Attendance</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
                      <div className="flex items-center justify-between mb-3">
                        <TrendingDown className="w-6 h-6 text-red-600" />
                        <p className="text-2xl font-bold text-red-900">{selectedStudent.totalAbsentDays}</p>
                      </div>
                      <p className="text-sm font-medium text-red-700">Total Absent</p>
                      <p className="text-xs text-red-600 mt-1">Days Missed</p>
                    </div>
                  </div>
                </div>

                {/* Academic Performance Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Academic Performance</h3>
                    <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                      Current Semester
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={getAcademicPerformanceData(selectedStudent)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="subject" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                      />
                      <Bar dataKey="grade" fill="url(#colorGrade)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity={1}/>
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Parent's Information */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 shadow-sm border border-pink-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-pink-600" />
                    Parent's Information
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{selectedStudent.parentInfo.motherName}</p>
                        <p className="text-sm text-gray-500">Mother</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-700 text-sm">{selectedStudent.parentInfo.motherPhone}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{selectedStudent.parentInfo.fatherName}</p>
                        <p className="text-sm text-gray-500">Father</p>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-700 text-sm">{selectedStudent.parentInfo.fatherPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance Summary */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-sm border border-purple-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance Summary</h3>
                  <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                    <div className="relative">
                      <ResponsiveContainer width={250} height={250}>
                        <PieChart>
                          <Pie
                            data={getAttendanceData(selectedStudent)}
                            cx="50%"
                            cy="50%"
                            innerRadius={75}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            stroke="none"
                          >
                            {getAttendanceData(selectedStudent).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-purple-700">{selectedStudent.overallAttendance}%</p>
                          <p className="text-sm text-gray-600 mt-1">Overall</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Present:</span>
                        <span className="text-2xl font-bold text-green-700">{selectedStudent.totalAttendanceDays - selectedStudent.totalAbsentDays} days</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">Absent:</span>
                        <span className="text-2xl font-bold text-red-700">{selectedStudent.totalAbsentDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Grades & Assignments */}
              <div className="space-y-6">
                {/* Grades & Assignments Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Grades & Assignments</h3>
                  
                  {/* Grades Table */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-700">Subject Grades</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">4 Subjects</span>
                    </div>
                    <div className="space-y-3">
                      {selectedStudent.subjectGrades.map((grade, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-gray-900">{grade.subject}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              grade.improvement === 'Improved' ? 'bg-emerald-100 text-emerald-700' :
                              grade.improvement === 'Stable' ? 'bg-blue-100 text-blue-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {grade.improvement}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Last Grade</p>
                              <p className="text-xl font-bold text-indigo-600">{grade.lastGrade}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Average</p>
                              <p className="text-xl font-bold text-purple-600">{grade.avgGrade}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  grade.marks >= 85 ? 'bg-green-500' : 
                                  grade.marks >= 70 ? 'bg-blue-500' : 
                                  grade.marks >= 60 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${grade.marks}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 text-right">{grade.marks}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Assignments */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-700">Recent Assignments</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{selectedStudent.assignments.length} Tasks</span>
                    </div>
                    <div className="space-y-3">
                      {selectedStudent.assignments.map((assignment, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 mb-1">{assignment.task}</p>
                              <p className="text-sm text-gray-600">{assignment.subject}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ml-2 ${
                              assignment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                              assignment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {assignment.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            <span>Due: {assignment.dueDate}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Notice */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Notice</h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">Barney Rojas</p>
                          <p className="text-xs text-gray-500">Math Teacher</p>
                        </div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium px-3 py-1 hover:bg-indigo-50 rounded-lg transition-colors">
                          + Comment
                        </button>
                      </div>
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 mb-3 border border-cyan-200">
                        <p className="text-sm font-bold text-cyan-900 mb-2">📚 Book Fair</p>
                        <p className="text-xs text-gray-700 leading-relaxed">Your education path is extensive filled with challenges, opportunities, and growth. Remember to stay focused...</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                            <span className="font-medium">10</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                            <span className="font-medium">9</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">23, Sep 2025</span>
                          <span className="text-indigo-600">24 comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alerts if needed */}
                {(selectedStudent.arrearCount > 0 || selectedStudent.feesPending > 0) && (
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-red-900 mb-2 text-lg">⚠️ Action Required</h4>
                        <ul className="space-y-2">
                          {selectedStudent.arrearCount > 0 && (
                            <li className="flex items-center gap-2 text-sm text-red-700">
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                              <span className="font-medium">{selectedStudent.arrearCount} arrear(s) pending clearance</span>
                            </li>
                          )}
                          {selectedStudent.feesPending > 0 && (
                            <li className="flex items-center gap-2 text-sm text-red-700">
                              <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                              <span className="font-medium">Outstanding fees: ${selectedStudent.feesPending}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}