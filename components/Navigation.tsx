import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, FileText, Trophy, MessageCircle } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: '行程', icon: Calendar },
    { path: '/docs', label: '資訊', icon: FileText },
    { path: '/marathon', label: '賽事', icon: Trophy },
    { path: '/guide', label: '導遊', icon: MessageCircle },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-white/95 backdrop-blur border-t border-stone-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
                isActive ? 'text-red-700' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${isActive ? 'scale-105' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;