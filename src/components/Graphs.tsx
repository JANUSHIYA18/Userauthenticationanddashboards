import { useNavigate } from 'react-router';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Navigation } from './Navigation';

const semesterData = [
  { semester: 'Sem 1', average: 72 },
  { semester: 'Sem 2', average: 75 },
  { semester: 'Sem 3', average: 78 },
  { semester: 'Sem 4', average: 81 },
  { semester: 'Sem 5', average: 83 },
  { semester: 'Sem 6', average: 85 },
];

const subjectData = [
  { subject: 'Math', marks: 68 },
  { subject: 'Physics', marks: 72 },
  { subject: 'Chemistry', marks: 85 },
  { subject: 'English', marks: 88 },
  { subject: 'Comp Sci', marks: 92 },
];

const performanceData = [
  { name: 'Good', value: 45, color: '#10b981' },
  { name: 'Average', value: 35, color: '#f59e0b' },
  { name: 'Weak', value: 20, color: '#ef4444' },
];

export function Graphs() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role={user.role || 'Student'} onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Graphs & Visualization</h1>
          <p className="text-gray-600">Graphs help visualize performance trends over semesters.</p>
        </div>

        {/* Semester-wise Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Semester-wise Performance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={semesterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="semester" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#4f46e5" 
                strokeWidth={3}
                name="Average Marks"
                dot={{ fill: '#4f46e5', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subject-wise Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Marks</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="marks" fill="#4f46e5" name="Marks" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
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
          </div>
        </div>
      </div>
    </div>
  );
}
