import { useNavigate } from 'react-router';
import { LayoutDashboard, BarChart3, Lightbulb, FileText, Activity, LogOut } from 'lucide-react';

interface NavigationProps {
  role: 'Admin' | 'Faculty' | 'Student';
  onLogout: () => void;
}

export function Navigation({ role, onLogout }: NavigationProps) {
  const navigate = useNavigate();

  const getLinks = () => {
    if (role === 'Admin') {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
        { label: 'Graphs', icon: BarChart3, path: '/graphs' },
        { label: 'Activity Log', icon: Activity, path: '/activity-log' },
        { label: 'Reports', icon: FileText, path: '/reports' },
      ];
    } else if (role === 'Faculty') {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/faculty' },
        { label: 'Graphs', icon: BarChart3, path: '/graphs' },
        { label: 'Reports', icon: FileText, path: '/reports' },
      ];
    } else {
      return [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/student' },
        { label: 'Graphs', icon: BarChart3, path: '/graphs' },
        { label: 'Recommendations', icon: Lightbulb, path: '/recommendations' },
        { label: 'Reports', icon: FileText, path: '/reports' },
      ];
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="font-bold text-xl text-indigo-600">{role} Portal</div>
            <div className="flex gap-4">
              {getLinks().map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
