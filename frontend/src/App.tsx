import { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ProductDetail } from './components/ProductDetail';
import { Watchlist } from './components/Watchlist';
import { Notifications } from './components/Notifications';
import { Profile } from './components/Profile';
import { BottomNav } from './components/BottomNav';
export type Screen =
  | 'login'
  | 'home'
  | 'product'
  | 'watchlist'
  | 'notifications'
  | 'profile';

export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  currentPrice: number;
  oldPrice: number;
  discount: number;
  category: string;
  validUntil: string;
  priceHistory: { date: string; price: number }[];
  stores: { name: string; price: number }[];
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: '1',
      productId: '1',
      productName: 'iPhone 14 Pro',
      productImage:
        'https://images.unsplash.com/photo-1678652197950-32c428e880b8?w=300&h=300&fit=crop',
      message: 'Ціна знизилася на 15%',
      time: '2 години тому',
      read: false,
    },
    {
      id: '2',
      productId: '2',
      productName: 'Nike Air Max',
      productImage:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      message: 'Нова знижка 30%',
      time: '5 годин тому',
      read: false,
    },
  ]);

  useEffect(() => {
    if (isLoggedIn && currentScreen === 'login') {
      setCurrentScreen('home');
    }
  }, [isLoggedIn, currentScreen]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleNavigate = (screen: Screen, product?: Product) => {
    setCurrentScreen(screen);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const toggleWatchlist = (productId: string) => {
    setWatchlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId],
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
    setWatchlist([]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1440px] mx-auto">
        {currentScreen === 'home' && (
          <Home
            onNavigate={handleNavigate}
            watchlist={watchlist}
            onToggleWatchlist={toggleWatchlist}
          />
        )}

        {currentScreen === 'product' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onNavigate={handleNavigate}
            isInWatchlist={watchlist.includes(selectedProduct.id)}
            onToggleWatchlist={toggleWatchlist}
          />
        )}

        {currentScreen === 'watchlist' && (
          <Watchlist
            onNavigate={handleNavigate}
            watchlist={watchlist}
            onToggleWatchlist={toggleWatchlist}
          />
        )}

        {currentScreen === 'notifications' && (
          <Notifications
            notifications={notifications}
            onNavigate={handleNavigate}
            onMarkAsRead={markNotificationAsRead}
            onClearAll={clearAllNotifications}
          />
        )}

        {currentScreen === 'profile' && (
          <Profile onNavigate={handleNavigate} onLogout={handleLogout} />
        )}
      </div>

      <BottomNav
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        unreadCount={notifications.filter(n => !n.read).length}
      />
    </div>
  );
}
