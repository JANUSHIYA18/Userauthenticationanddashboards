import { useNavigate } from 'react-router';
import { FileDown, FileText, Download } from 'lucide-react';
import { Navigation } from './Navigation';

const semesterReports = [
  {
    semester: 'Semester 6',
    year: '2025-26',
    average: 85,
    attendance: 88,
    status: 'Good',
  },
  {
    semester: 'Semester 5',
    year: '2025-26',
    average: 83,
    attendance: 85,
    status: 'Good',
  },
  {
    semester: 'Semester 4',
    year: '2024-25',
    average: 81,
    attendance: 82,
    status: 'Average',
  },
  {
    semester: 'Semester 3',
    year: '2024-25',
    average: 78,
    attendance: 80,
    status: 'Average',
  },
];

export function Reports() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  const handleDownloadPDF = (semester: string) => {
    alert(`Downloading PDF report for ${semester}...`);
  };

  const handleDownloadCSV = (semester: string) => {
    alert(`Downloading CSV report for ${semester}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role={user.role || 'Student'} onLogout={handleLogout} />

      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academic Reports</h1>
          <p className="text-gray-600">Reports provide downloadable academic summaries.</p>
        </div>

        {/* Download All Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
          <h2 className="text-xl font-bold mb-4">Download Complete Academic Record</h2>
          <div className="flex gap-4">
            <button
              onClick={() => alert('Downloading complete PDF report...')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <FileText className="w-5 h-5" />
              Download PDF
            </button>
            <button
              onClick={() => alert('Downloading complete CSV report...')}
              className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur text-white border border-white/30 rounded-lg hover:bg-white/20 transition-colors font-medium"
            >
              <FileDown className="w-5 h-5" />
              Download CSV
            </button>
          </div>
        </div>

        {/* Semester-wise Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Semester-wise Summary</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {semesterReports.map((report, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{report.semester}</h3>
                    <p className="text-sm text-gray-600">Academic Year: {report.year}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === 'Good' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {report.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-600 mb-1">Average Marks</p>
                    <p className="text-2xl font-bold text-blue-700">{report.average}%</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-600 mb-1">Attendance</p>
                    <p className="text-2xl font-bold text-green-700">{report.attendance}%</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleDownloadPDF(report.semester)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownloadCSV(report.semester)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                  >
                    <FileDown className="w-4 h-4" />
                    CSV
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="font-medium text-blue-900 mb-2">About Reports</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• PDF reports include detailed subject-wise breakdown and graphs</li>
            <li>• CSV files can be opened in Excel for custom analysis</li>
            <li>• Reports are generated based on the latest data from faculty</li>
            <li>• Historical reports are archived and available for download anytime</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
