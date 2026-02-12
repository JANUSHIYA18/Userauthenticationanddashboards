import { useNavigate } from 'react-router';
import { Lightbulb, BookOpen, Users, Clock, TrendingUp } from 'lucide-react';
import { Navigation } from './Navigation';

const recommendations = [
  {
    subject: 'Mathematics',
    status: 'weak',
    currentMarks: 68,
    suggestions: [
      'Attend remedial classes on Tuesdays and Thursdays',
      'Practice daily problem-solving (minimum 10 problems)',
      'Join study group for calculus and algebra',
      'Watch Khan Academy videos for concept clarity',
      'Solve previous year question papers',
    ],
  },
];

export function Recommendations() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation role="Student" onLogout={handleLogout} />

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Recommendations</h1>
          <p className="text-gray-600">The system generates intelligent recommendations for improvement.</p>
        </div>

        {/* Weak Subjects Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-amber-900 mb-2">Performance Analysis</h3>
              <p className="text-amber-700">
                Based on your current performance, you are weak in <strong>Mathematics</strong> and need to improve in <strong>Physics</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{rec.subject}</h2>
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  Needs Improvement
                </span>
              </div>
              <p className="text-gray-600 mt-2">Current Marks: {rec.currentMarks}/100</p>
            </div>

            <div className="p-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Personalized Suggestions
              </h3>
              
              <div className="space-y-4">
                {rec.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    {idx === 0 && <Users className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />}
                    {idx === 1 && <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />}
                    {idx === 2 && <Users className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />}
                    {idx === 3 && <BookOpen className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />}
                    {idx === 4 && <BookOpen className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />}
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  <strong>Pro Tip:</strong> Consistency is key! Following these recommendations for 4-6 weeks can improve your marks by 15-20%.
                </p>
              </div>
            </div>
          </div>
        ))}

        {/* Additional Resources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-medium text-gray-900 mb-4">Additional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <h4 className="font-medium text-gray-900 mb-1">Free Online Tutorials</h4>
              <p className="text-sm text-gray-600">Access video lectures and practice problems</p>
            </a>
            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <h4 className="font-medium text-gray-900 mb-1">Study Groups</h4>
              <p className="text-sm text-gray-600">Connect with peers for collaborative learning</p>
            </a>
            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <h4 className="font-medium text-gray-900 mb-1">Faculty Office Hours</h4>
              <p className="text-sm text-gray-600">Schedule one-on-one sessions with professors</p>
            </a>
            <a href="#" className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
              <h4 className="font-medium text-gray-900 mb-1">Practice Tests</h4>
              <p className="text-sm text-gray-600">Test your knowledge with mock exams</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
