import { useNavigate } from 'react-router';
import { BookOpen, Calendar, TrendingDown, Award, AlertCircle, User, DollarSign, FileX } from 'lucide-react';
import { Navigation } from './Navigation';

const subjects = [
  { name: 'Mathematics', marks: 68, totalMarks: 100, status: 'weak' },
  { name: 'Physics', marks: 72, totalMarks: 100, status: 'average' },
  { name: 'Chemistry', marks: 85, totalMarks: 100, status: 'good' },
  { name: 'English', marks: 88, totalMarks: 100, status: 'good' },
  { name: 'Computer Science', marks: 92, totalMarks: 100, status: 'good' },
];

const upcomingEvents = [
  { title: 'Mathematics Assignment', date: 'Feb 15, 2026', type: 'Assignment' },
  { title: 'Physics Lab Report', date: 'Feb 18, 2026', type: 'Lab' },
  { title: 'Mid-term Exams', date: 'Feb 25-28, 2026', type: 'Exam' },
];

const facultyPlannedActions = [
  { faculty: 'Dr. Sarah Johnson', action: 'Remedial class for Mathematics', date: 'Feb 14, 2026' },
  { faculty: 'Dr. Michael Chen', action: 'Project presentation guidelines', date: 'Feb 16, 2026' },
];

export function StudentDashboard() {
  const navigate = useNavigate();
  const attendance = 82;
  const overallPerformance = 'Average';
  const weakSubjects = subjects.filter(s => s.status === 'weak');
  const cgpa = 8.2;
  const feesPending = 1500;
  const arrearCount = 1;

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const getStatusColor = (status: string) => {
    if (status === 'good') return 'text-green-600 bg-green-100';
    if (status === 'average') return 'text-amber-600 bg-amber-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role="Student" onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Progress Dashboard</h1>
          <p className="text-gray-600">Students can track their academic progress and weak areas.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">CGPA</p>
            <p className="text-2xl font-bold text-gray-900">{cgpa}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Attendance</p>
            <p className="text-2xl font-bold text-gray-900">{attendance}%</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileX className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Arrears</p>
            <p className="text-2xl font-bold text-gray-900">{arrearCount}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">Fees Pending</p>
            <p className="text-2xl font-bold text-gray-900">${feesPending}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Subject-wise Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Subject-wise Marks</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div key={subject.name} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{subject.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subject.status)}`}>
                        {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              subject.status === 'good' ? 'bg-green-500' :
                              subject.status === 'average' ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(subject.marks / subject.totalMarks) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        {subject.marks}/{subject.totalMarks}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Events & Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Events & Deadlines</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.date}</p>
                      <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Planned Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Planned Actions by Faculty</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {facultyPlannedActions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{action.action}</h3>
                    <p className="text-sm text-gray-600 mt-1">By {action.faculty}</p>
                    <p className="text-xs text-gray-500 mt-1">{action.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weak Subjects Alert */}
        {weakSubjects.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <TrendingDown className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-red-900 mb-2">Subjects Need Attention</h3>
                <p className="text-red-700 text-sm">
                  You are performing below average in: {weakSubjects.map(s => s.name).join(', ')}. 
                  Check the Recommendations page for improvement suggestions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}