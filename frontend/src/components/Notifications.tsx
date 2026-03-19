import { useState } from 'react';
import { Bell, Trash2, BellOff } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Screen } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './common/ImageWithFallback';

interface NotificationsProps {
  notifications: any[];
  onNavigate: (screen: Screen) => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export function Notifications({
  notifications,
  onNavigate,
  onMarkAsRead,
  onClearAll,
}: NotificationsProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'new') return !notif.read;
    if (activeTab === 'read') return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-blue-600 mb-1">Мої сповіщення</h1>
              <p className="text-gray-600">
                {unreadCount > 0
                  ? `${unreadCount} непрочитаних`
                  : 'Всі прочитано'}
              </p>
            </div>
            <div className="flex gap-2">
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClearAll}
                  title="Очистити всі"
                >
                  <Trash2 className="w-5 h-5 text-gray-600" />
                </Button>
              )}
            </div>
          </div>

          {/* Tabs */}
          {notifications.length > 0 && (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">
                  Усі ({notifications.length})
                </TabsTrigger>
                <TabsTrigger value="new" className="flex-1">
                  Нові ({unreadCount})
                </TabsTrigger>
                <TabsTrigger value="read" className="flex-1">
                  Переглянуті ({notifications.length - unreadCount})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {filteredNotifications.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <BellOff className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-gray-900 mb-2">
              {activeTab === 'new'
                ? 'Немає нових сповіщень'
                : 'Немає сповіщень'}
            </h2>
            <p className="text-gray-600 max-w-md">
              {activeTab === 'new'
                ? 'Ми повідомимо вас про нові знижки та зміни цін на товари з вашого списку'
                : 'Додайте товари у список відстеження, щоб отримувати сповіщення про знижки'}
            </p>
            {activeTab !== 'new' && (
              <Button
                onClick={() => onNavigate('home')}
                className="bg-blue-600 hover:bg-blue-700 mt-6"
              >
                Переглянути акції
              </Button>
            )}
          </div>
        ) : (
          // Notifications List
          <div className="space-y-3">
            {filteredNotifications.map(notification => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.read ? 'border-l-4 border-l-blue-600' : ''
                }`}
                onClick={() => {
                  onMarkAsRead(notification.id);
                  onNavigate('product');
                }}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <ImageWithFallback
                      src={notification.productImage}
                      alt={notification.productName}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="line-clamp-1">
                        {notification.productName}
                      </h3>
                      {!notification.read && (
                        <Badge className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
                          Нове
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-2">{notification.message}</p>

                    <div className="flex items-center gap-2 text-gray-500">
                      <Bell className="w-4 h-4" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
