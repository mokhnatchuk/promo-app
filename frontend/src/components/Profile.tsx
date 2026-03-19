import {
  User,
  Mail,
  Bell,
  Moon,
  Tag,
  LogOut,
  Shield,
  HelpCircle,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import Footer from './ui/Footer';
import { Screen } from '../App';

interface ProfileProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function Profile({ onNavigate, onLogout }: ProfileProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [categories, setCategories] = useState({
    electronics: true,
    clothing: true,
    shoes: false,
    beauty: false,
    home: false,
  });

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="p-4">
          <h1 className="text-blue-600">Профіль</h1>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* User Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" />
                <AvatarFallback>ОМ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="mb-1">Олександр Мельник</h2>
                <p className="text-gray-600">oleksandr.melnyk@email.com</p>
              </div>
              <Button variant="outline" size="sm">
                Редагувати
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-blue-600 mb-1">12</div>
                <p className="text-gray-600">Товарів</p>
              </div>
              <div className="text-center">
                <div className="text-blue-600 mb-1">1,234 ₴</div>
                <p className="text-gray-600">Заощаджено</p>
              </div>
              <div className="text-center">
                <div className="text-blue-600 mb-1">23</div>
                <p className="text-gray-600">Сповіщень</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4">Налаштування</h3>

            <div className="space-y-4">
              {/* Push Notifications */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Push-сповіщення</p>
                    <p className="text-gray-500">
                      Отримувати сповіщення про знижки
                    </p>
                  </div>
                </div>
                <Switch
                  checked={pushEnabled}
                  onCheckedChange={setPushEnabled}
                />
              </div>

              <Separator />

              {/* Dark Mode */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-gray-900">Темна тема</p>
                    <p className="text-gray-500">Увімкнути темний режим</p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interested Categories */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-gray-600" />
              <h3>Категорії, що цікавлять</h3>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Електроніка</span>
                <Switch
                  checked={categories.electronics}
                  onCheckedChange={val =>
                    setCategories({ ...categories, electronics: val })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Одяг</span>
                <Switch
                  checked={categories.clothing}
                  onCheckedChange={val =>
                    setCategories({ ...categories, clothing: val })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Взуття</span>
                <Switch
                  checked={categories.shoes}
                  onCheckedChange={val =>
                    setCategories({ ...categories, shoes: val })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Краса</span>
                <Switch
                  checked={categories.beauty}
                  onCheckedChange={val =>
                    setCategories({ ...categories, beauty: val })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-900">Дім і побут</span>
                <Switch
                  checked={categories.home}
                  onCheckedChange={val =>
                    setCategories({ ...categories, home: val })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Other Options */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">
                    Політика конфіденційності
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Допомога та підтримка</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full text-red-600 border-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Вийти
        </Button>

        {/* Version */}
        <div className="text-center text-gray-500 py-4">
          <p>Версія 1.0.0</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
