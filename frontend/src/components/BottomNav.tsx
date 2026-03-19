import { Home, Heart, Bell, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Screen } from '../App';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  unreadCount: number;
}

export function BottomNav({ currentScreen, onNavigate, unreadCount }: BottomNavProps) {
  const navItems = [
    { id: 'home' as Screen, icon: Home, label: 'Головна' },
    { id: 'watchlist' as Screen, icon: Heart, label: 'Список' },
    { id: 'notifications' as Screen, icon: Bell, label: 'Сповіщення', badge: unreadCount },
    { id: 'profile' as Screen, icon: User, label: 'Профіль' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-20">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-4 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-3 transition-colors relative ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="relative">
                  <Icon className="w-6 h-6" fill={isActive ? 'currentColor' : 'none'} />
                  {item.badge && item.badge > 0 && (
                    <Badge 
                      className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 px-1 bg-orange-500 hover:bg-orange-600"
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
