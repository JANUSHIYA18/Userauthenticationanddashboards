import { useState } from 'react';
import { useNavigate } from 'react-router';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, BarChart3, FileText, Activity, GraduationCap, BookOpen, UserPlus, Settings, X, Edit, Trash2, Save, Plus } from 'lucide-react';
import { Navigation } from './Navigation';
import { toast } from 'sonner@2.0.3';

const performanceData = [
  { name: 'Good', value: 45, color: '#10b981' },
  { name: 'Average', value: 35, color: '#f59e0b' },
  { name: 'Weak', value: 20, color: '#ef4444' },
];

const classPerformanceData = [
  { class: 'Class 1', good: 42, average: 33, weak: 25 },
  { class: 'Class 2', good: 44, average: 34, weak: 22 },
  { class: 'Class 3', good: 46, average: 32, weak: 22 },
  { class: 'Class 4', good: 48, average: 31, weak: 21 },
  { class: 'Class 5', good: 50, average: 30, weak: 20 },
  { class: 'Class 6', good: 45, average: 30, weak: 25 },
  { class: 'Class 7', good: 50, average: 35, weak: 15 },
  { class: 'Class 8', good: 40, average: 40, weak: 20 },
  { class: 'Class 9', good: 55, average: 30, weak: 15 },
  { class: 'Class 10', good: 60, average: 25, weak: 15 },
  { class: 'Class 11', good: 58, average: 27, weak: 15 },
  { class: 'Class 12', good: 62, average: 24, weak: 14 },
];

const recentActivities = [
  { id: 1, user: 'Mr. John Smith (Teacher)', action: 'Entered marks for Class 10 - Mathematics', time: '2 hours ago', type: 'update', details: 'Updated marks for 40 students in Mathematics final exam' },
  { id: 2, user: 'Ms. Sarah Johnson (Teacher)', action: 'Updated attendance for Class 8 - Section A', time: '3 hours ago', type: 'attendance', details: 'Marked attendance for 20 students, 18 present, 2 absent' },
  { id: 3, user: 'Admin', action: 'Added new student: Alice Brown (Class 7)', time: '5 hours ago', type: 'create', details: 'Student ID: STU2026007A, Parent: Mr. Robert Brown, Contact: +1234567890' },
  { id: 4, user: 'Mr. David Chen (Teacher)', action: 'Generated report for Class 9 - Science', time: '1 day ago', type: 'report', details: 'Generated comprehensive report with 45 students performance analysis' },
  { id: 5, user: 'Admin', action: 'Created new class section: Class 6 - Section C', time: '2 days ago', type: 'create', details: 'Assigned class teacher: Ms. Emily White, Capacity: 20 students' },
  { id: 6, user: 'Mr. James Wilson (Teacher)', action: 'Updated marks for Class 12 - Physics', time: '2 days ago', type: 'update', details: 'Updated practical exam marks for 35 students' },
  { id: 7, user: 'Ms. Maria Garcia (Teacher)', action: 'Submitted assignment grades for Class 5', time: '3 days ago', type: 'update', details: 'Graded 30 assignments in English Literature' },
  { id: 8, user: 'Admin', action: 'Added new teacher: Dr. Michael Anderson', time: '3 days ago', type: 'create', details: 'Subject: Chemistry, Qualification: PhD, Experience: 8 years' },
];

const initialTeachers = [
  { id: 'T001', name: 'Mr. John Smith', subject: 'Mathematics', classes: ['Class 10-A', 'Class 10-B'], email: 'john.smith@school.com', phone: '+1234567890' },
  { id: 'T002', name: 'Ms. Sarah Johnson', subject: 'English', classes: ['Class 8-A', 'Class 8-B'], email: 'sarah.j@school.com', phone: '+1234567891' },
  { id: 'T003', name: 'Mr. David Chen', subject: 'Science', classes: ['Class 9-A', 'Class 9-B'], email: 'david.chen@school.com', phone: '+1234567892' },
  { id: 'T004', name: 'Ms. Emily White', subject: 'History', classes: ['Class 7-A', 'Class 7-B'], email: 'emily.w@school.com', phone: '+1234567893' },
  { id: 'T005', name: 'Mr. James Wilson', subject: 'Physics', classes: ['Class 11-A', 'Class 12-A'], email: 'james.w@school.com', phone: '+1234567894' },
  { id: 'T006', name: 'Ms. Maria Garcia', subject: 'Chemistry', classes: ['Class 11-B', 'Class 12-B'], email: 'maria.g@school.com', phone: '+1234567895' },
];

const initialClasses = [
  { id: 'C001', name: 'Class 1-A', teacher: 'Ms. Lisa Brown', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C002', name: 'Class 1-B', teacher: 'Mr. Tom Davis', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C003', name: 'Class 2-A', teacher: 'Ms. Anna Wilson', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C004', name: 'Class 2-B', teacher: 'Mr. Peter Johnson', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C005', name: 'Class 3-A', teacher: 'Ms. Rachel Green', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C006', name: 'Class 3-B', teacher: 'Mr. Mark Taylor', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C007', name: 'Class 4-A', teacher: 'Ms. Sophie Martin', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C008', name: 'Class 4-B', teacher: 'Mr. Daniel Lee', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C009', name: 'Class 5-A', teacher: 'Ms. Jennifer White', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C010', name: 'Class 5-B', teacher: 'Mr. Chris Anderson', students: 20, subjects: ['English', 'Math', 'Science', 'Social Studies'] },
  { id: 'C011', name: 'Class 6-A', teacher: 'Ms. Laura Thomas', students: 20, subjects: ['English', 'Math', 'Science', 'History', 'Geography'] },
  { id: 'C012', name: 'Class 6-B', teacher: 'Mr. Robert Miller', students: 20, subjects: ['English', 'Math', 'Science', 'History', 'Geography'] },
  { id: 'C013', name: 'Class 7-A', teacher: 'Ms. Emily White', students: 20, subjects: ['English', 'Math', 'Science', 'History', 'Geography'] },
  { id: 'C014', name: 'Class 7-B', teacher: 'Mr. Kevin Brown', students: 20, subjects: ['English', 'Math', 'Science', 'History', 'Geography'] },
  { id: 'C015', name: 'Class 8-A', teacher: 'Ms. Sarah Johnson', students: 20, subjects: ['English', 'Math', 'Science', 'History', 'Geography'] },
  { id: 'C016', name: 'Class 8-B', teacher: 'Mr. Paul Wilson', students: 20, subjects: ['English', 'Math', 'Science', 'History', 'Geography'] },
  { id: 'C017', name: 'Class 9-A', teacher: 'Mr. David Chen', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Biology'] },
  { id: 'C018', name: 'Class 9-B', teacher: 'Ms. Linda Garcia', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Biology'] },
  { id: 'C019', name: 'Class 10-A', teacher: 'Mr. John Smith', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Biology'] },
  { id: 'C020', name: 'Class 10-B', teacher: 'Ms. Karen Davis', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Biology'] },
  { id: 'C021', name: 'Class 11-A', teacher: 'Mr. James Wilson', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Computer Science'] },
  { id: 'C022', name: 'Class 11-B', teacher: 'Ms. Maria Garcia', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Computer Science'] },
  { id: 'C023', name: 'Class 12-A', teacher: 'Mr. James Wilson', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Computer Science'] },
  { id: 'C024', name: 'Class 12-B', teacher: 'Ms. Maria Garcia', students: 20, subjects: ['English', 'Math', 'Physics', 'Chemistry', 'Computer Science'] },
];

export function AdminDashboard() {
  const navigate = useNavigate();
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showManageTeachersModal, setShowManageTeachersModal] = useState(false);
  const [showManageClassesModal, setShowManageClassesModal] = useState(false);
  const [showSystemSettingsModal, setShowSystemSettingsModal] = useState(false);
  const [showActivityLogModal, setShowActivityLogModal] = useState(false);
  const [teachers, setTeachers] = useState(initialTeachers);
  const [classes, setClasses] = useState(initialClasses);
  const [editingTeacher, setEditingTeacher] = useState<string | null>(null);

  // System settings state
  const [systemSettings, setSystemSettings] = useState({
    schoolName: 'ProgressIQ School',
    academicYear: '2025-2026',
    examTerms: 'Quarterly',
    passingPercentage: 40,
    gradeSystem: 'Percentage',
    attendanceThreshold: 75,
    enableNotifications: true,
    enableParentPortal: true,
    enableSMS: false,
  });

  // Add Student Form
  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    dob: '',
    email: '',
    phone: '',
    parentName: '',
    parentContact: '',
    address: '',
  });

  // Add Teacher Form
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    qualification: '',
    experience: '',
  });

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'update':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'attendance':
        return <Users className="w-4 h-4 text-green-600" />;
      case 'create':
        return <UserPlus className="w-4 h-4 text-purple-600" />;
      case 'report':
        return <BarChart3 className="w-4 h-4 text-amber-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleAddStudent = () => {
    // Validate form
    if (!newStudent.name || !newStudent.class || !newStudent.section) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success(`Student ${newStudent.name} added successfully!`);
    setShowAddStudentModal(false);
    setNewStudent({
      name: '',
      class: '',
      section: '',
      rollNumber: '',
      dob: '',
      email: '',
      phone: '',
      parentName: '',
      parentContact: '',
      address: '',
    });
  };

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject || !newTeacher.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    const teacher = {
      id: `T${(teachers.length + 1).toString().padStart(3, '0')}`,
      name: newTeacher.name,
      subject: newTeacher.subject,
      classes: [],
      email: newTeacher.email,
      phone: newTeacher.phone,
    };
    setTeachers([...teachers, teacher]);
    toast.success(`Teacher ${newTeacher.name} added successfully!`);
    setShowAddTeacherModal(false);
    setNewTeacher({
      name: '',
      subject: '',
      email: '',
      phone: '',
      qualification: '',
      experience: '',
    });
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id));
    toast.success('Teacher deleted successfully');
  };

  const handleSaveSettings = () => {
    toast.success('System settings saved successfully!');
    setShowSystemSettingsModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 animate-fadeIn">
      <Navigation role="Admin" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6 animate-slideUp">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Admin can monitor overall academic performance using dashboards and charts.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <button 
            onClick={() => setShowAddStudentModal(true)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-3 card-hover glow-button-subtle"
          >
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Add New</p>
              <p className="font-medium text-gray-900">Student</p>
            </div>
          </button>
          
          <button 
            onClick={() => setShowAddTeacherModal(true)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-3 card-hover glow-button-subtle"
          >
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-teal-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Add New</p>
              <p className="font-medium text-gray-900">Teacher</p>
            </div>
          </button>
          
          <button 
            onClick={() => setShowManageTeachersModal(true)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-3 card-hover glow-button-subtle"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Manage</p>
              <p className="font-medium text-gray-900">Teachers</p>
            </div>
          </button>
          
          <button 
            onClick={() => setShowManageClassesModal(true)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-3 card-hover glow-button-subtle"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">Manage</p>
              <p className="font-medium text-gray-900">Classes</p>
            </div>
          </button>
        </div>

        {/* Second Row Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <button 
            onClick={() => setShowSystemSettingsModal(true)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-3 card-hover glow-button-subtle"
          >
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">System</p>
              <p className="font-medium text-gray-900">Settings</p>
            </div>
          </button>
          
          <button 
            onClick={() => setShowActivityLogModal(true)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex items-center gap-3 card-hover glow-button-subtle"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-600">View All</p>
              <p className="font-medium text-gray-900">Activities</p>
            </div>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Students</p>
                <p className="text-3xl font-bold text-gray-900">480</p>
                <p className="text-xs text-green-600 mt-1">Classes 1-12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Teachers</p>
                <p className="text-3xl font-bold text-gray-900">{teachers.length}</p>
                <p className="text-xs text-green-600 mt-1">Active faculty</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Classes</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-xs text-gray-500 mt-1">12 grades, 2 sections</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Average Performance</p>
                <p className="text-3xl font-bold text-green-600">78%</p>
                <p className="text-xs text-green-600 mt-1">+5% improvement</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Performance Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Good (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Average (35%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Weak (20%)</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 card-hover">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Class-wise Performance (Classes 1-12)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="good" fill="#10b981" name="Good" />
                <Bar dataKey="average" fill="#f59e0b" name="Average" />
                <Bar dataKey="weak" fill="#ef4444" name="Weak" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Log Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 card-hover">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity Log</h2>
            <p className="text-sm text-gray-600 mt-1">Track all system activities and changes</p>
          </div>

          <div className="divide-y divide-gray-200">
            {recentActivities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm text-gray-600">{activity.user}</p>
                      <span className="text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button 
              onClick={() => setShowActivityLogModal(true)}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium glow-button-subtle"
            >
              View All Activities →
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
              <button onClick={() => setShowAddStudentModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                  <input
                    type="text"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                  <input
                    type="text"
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter roll number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class *</label>
                  <select
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Class</option>
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i + 1} value={`Class ${i + 1}`}>Class {i + 1}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section *</label>
                  <select
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({...newStudent, section: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Section</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={(e) => setNewStudent({...newStudent, dob: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="student@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent/Guardian Name</label>
                  <input
                    type="text"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({...newStudent, parentName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter parent name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Parent Contact</label>
                  <input
                    type="tel"
                    value={newStudent.parentContact}
                    onChange={(e) => setNewStudent({...newStudent, parentContact: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1234567890"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({...newStudent, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    rows={3}
                    placeholder="Enter full address"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddStudent}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors glow-button"
                >
                  Add Student
                </button>
                <button
                  onClick={() => setShowAddStudentModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Add New Teacher</h2>
              <button onClick={() => setShowAddTeacherModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher Name *</label>
                  <input
                    type="text"
                    value={newTeacher.name}
                    onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., Mathematics"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({...newTeacher, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="teacher@school.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({...newTeacher, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="+1234567890"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                  <input
                    type="text"
                    value={newTeacher.qualification}
                    onChange={(e) => setNewTeacher({...newTeacher, qualification: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="E.g., M.Sc., B.Ed."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                  <input
                    type="number"
                    value={newTeacher.experience}
                    onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAddTeacher}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors glow-button"
                >
                  Add Teacher
                </button>
                <button
                  onClick={() => setShowAddTeacherModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Teachers Modal */}
      {showManageTeachersModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Teachers</h2>
                <p className="text-sm text-gray-600 mt-1">View, update, or delete teacher records</p>
              </div>
              <button onClick={() => setShowManageTeachersModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {teachers.map((teacher) => (
                  <div key={teacher.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow card-hover">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-indigo-600" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{teacher.name}</h3>
                            <p className="text-sm text-gray-600">{teacher.subject}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                          <div>
                            <p className="text-xs text-gray-500">Teacher ID</p>
                            <p className="text-sm font-medium text-gray-900">{teacher.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">{teacher.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm font-medium text-gray-900">{teacher.phone}</p>
                          </div>
                          <div className="md:col-span-3">
                            <p className="text-xs text-gray-500">Assigned Classes</p>
                            <p className="text-sm font-medium text-gray-900">
                              {teacher.classes.length > 0 ? teacher.classes.join(', ') : 'No classes assigned'}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          onClick={() => toast.info('Edit functionality coming soon')}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors glow-button-subtle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors glow-button-subtle"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Classes Modal */}
      {showManageClassesModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Manage Classes</h2>
                <p className="text-sm text-gray-600 mt-1">View all classes from Class 1 to Class 12</p>
              </div>
              <button onClick={() => setShowManageClassesModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {classes.map((classItem) => (
                  <div key={classItem.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{classItem.name}</h3>
                          <p className="text-sm text-gray-600">{classItem.students} Students</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-gray-500">Class Teacher</p>
                        <p className="text-sm font-medium text-gray-900">{classItem.teacher}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Subjects</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {classItem.subjects.map((subject, idx) => (
                            <span key={idx} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Settings Modal */}
      {showSystemSettingsModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                <p className="text-sm text-gray-600 mt-1">Configure application-wide settings</p>
              </div>
              <button onClick={() => setShowSystemSettingsModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {/* General Settings */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                      <input
                        type="text"
                        value={systemSettings.schoolName}
                        onChange={(e) => setSystemSettings({...systemSettings, schoolName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Academic Year</label>
                      <input
                        type="text"
                        value={systemSettings.academicYear}
                        onChange={(e) => setSystemSettings({...systemSettings, academicYear: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Settings */}
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Academic Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Exam Terms</label>
                      <select
                        value={systemSettings.examTerms}
                        onChange={(e) => setSystemSettings({...systemSettings, examTerms: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Quarterly">Quarterly</option>
                        <option value="Semester">Semester</option>
                        <option value="Trimester">Trimester</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Passing Percentage</label>
                      <input
                        type="number"
                        value={systemSettings.passingPercentage}
                        onChange={(e) => setSystemSettings({...systemSettings, passingPercentage: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Grade System</label>
                      <select
                        value={systemSettings.gradeSystem}
                        onChange={(e) => setSystemSettings({...systemSettings, gradeSystem: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Percentage">Percentage</option>
                        <option value="GPA">GPA</option>
                        <option value="Letter Grade">Letter Grade</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Threshold (%)</label>
                      <input
                        type="number"
                        value={systemSettings.attendanceThreshold}
                        onChange={(e) => setSystemSettings({...systemSettings, attendanceThreshold: parseInt(e.target.value)})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>

                {/* Feature Toggles */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Feature Controls</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">Enable Notifications</p>
                        <p className="text-sm text-gray-600">Send email and in-app notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={systemSettings.enableNotifications}
                        onChange={(e) => setSystemSettings({...systemSettings, enableNotifications: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">Enable Parent Portal</p>
                        <p className="text-sm text-gray-600">Allow parents to view student progress</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={systemSettings.enableParentPortal}
                        onChange={(e) => setSystemSettings({...systemSettings, enableParentPortal: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 rounded"
                      />
                    </label>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-medium text-gray-900">Enable SMS Notifications</p>
                        <p className="text-sm text-gray-600">Send SMS alerts to parents</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={systemSettings.enableSMS}
                        onChange={(e) => setSystemSettings({...systemSettings, enableSMS: e.target.checked})}
                        className="w-5 h-5 text-indigo-600 rounded"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveSettings}
                  className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors glow-button flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Settings
                </button>
                <button
                  onClick={() => setShowSystemSettingsModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Log Modal */}
      {showActivityLogModal && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp shadow-2xl">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Complete Activity Log</h2>
                <p className="text-sm text-gray-600 mt-1">All system activities and changes</p>
              </div>
              <button onClick={() => setShowActivityLogModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow card-hover">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-gray-900">{activity.action}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            activity.type === 'update' ? 'bg-blue-100 text-blue-700' :
                            activity.type === 'attendance' ? 'bg-green-100 text-green-700' :
                            activity.type === 'create' ? 'bg-purple-100 text-purple-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{activity.user}</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg mb-2">{activity.details}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}