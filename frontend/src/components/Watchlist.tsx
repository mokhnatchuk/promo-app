import { useState } from 'react';
import { Heart, ArrowUpDown, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { ProductCard } from './ProductCard';
import { Product, Screen } from '../App';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface WatchlistProps {
  onNavigate: (screen: Screen, product?: Product) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string) => void;
}

// Import mock products (in real app, this would come from props or context)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro 256GB',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1678652197950-32c428e880b8?w=400&h=400&fit=crop',
    currentPrice: 32999,
    oldPrice: 45999,
    discount: 28,
    category: 'Електроніка',
    validUntil: '2025-11-20',
    priceHistory: [],
    stores: []
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    currentPrice: 2799,
    oldPrice: 3999,
    discount: 30,
    category: 'Взуття',
    validUntil: '2025-11-18',
    priceHistory: [],
    stores: []
  },
  {
    id: '3',
    name: 'Samsung Galaxy Buds Pro',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop',
    currentPrice: 3499,
    oldPrice: 5999,
    discount: 42,
    category: 'Електроніка',
    validUntil: '2025-11-15',
    priceHistory: [],
    stores: []
  }
];

export function Watchlist({ onNavigate, watchlist, onToggleWatchlist }: WatchlistProps) {
  const [sortBy, setSortBy] = useState('date');

  const watchlistProducts = mockProducts.filter(p => watchlist.includes(p.id));

  const sortedProducts = [...watchlistProducts].sort((a, b) => {
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'brand') return a.brand.localeCompare(b.brand);
    return 0; // date - keep original order
  });

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-blue-600 mb-1">Мої товари</h1>
              <p className="text-gray-600">{watchlistProducts.length} товарів у списку</p>
            </div>
            <Heart className="w-8 h-8 text-orange-500 fill-orange-500" />
          </div>

          {/* Sort */}
          {watchlistProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <ArrowUpDown className="w-5 h-5 text-gray-400" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Сортувати" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">За датою додавання</SelectItem>
                  <SelectItem value="discount">За знижкою</SelectItem>
                  <SelectItem value="brand">За брендом</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {watchlistProducts.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-gray-900 mb-2">Поки що немає збережених товарів</h2>
            <p className="text-gray-600 mb-6 max-w-md">
              Додавайте товари у список відстеження, щоб слідкувати за змінами цін та отримувати сповіщення про нові знижки
            </p>
            <Button 
              onClick={() => onNavigate('home')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Переглянути акції
            </Button>
          </div>
        ) : (
          // Products Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isInWatchlist={true}
                onToggleWatchlist={onToggleWatchlist}
                onClick={() => onNavigate('product', product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
