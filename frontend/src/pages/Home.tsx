import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { Product, Screen } from '../App';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface HomeProps {
  onNavigate: (screen: Screen, product?: Product) => void;
  watchlist: string[];
  onToggleWatchlist: (id: string) => void;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro 256GB',
    brand: 'Apple',
    image:
      'https://images.unsplash.com/photo-1678652197950-32c428e880b8?w=400&h=400&fit=crop',
    currentPrice: 32999,
    oldPrice: 45999,
    discount: 28,
    category: 'Електроніка',
    validUntil: '2025-11-20',
    priceHistory: [
      { date: '2025-10-01', price: 45999 },
      { date: '2025-10-15', price: 42999 },
      { date: '2025-11-01', price: 38999 },
      { date: '2025-11-12', price: 32999 },
    ],
    stores: [
      { name: 'Rozetka', price: 32999 },
      { name: 'Comfy', price: 33999 },
      { name: 'Citrus', price: 34499 },
    ],
  },
  {
    id: '2',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    currentPrice: 2799,
    oldPrice: 3999,
    discount: 30,
    category: 'Взуття',
    validUntil: '2025-11-18',
    priceHistory: [
      { date: '2025-10-01', price: 3999 },
      { date: '2025-10-20', price: 3499 },
      { date: '2025-11-10', price: 2799 },
    ],
    stores: [
      { name: 'Nike Store', price: 2799 },
      { name: 'Sport Life', price: 2899 },
      { name: 'Intertop', price: 2999 },
    ],
  },
  {
    id: '3',
    name: 'Samsung Galaxy Buds Pro',
    brand: 'Samsung',
    image:
      'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400&h=400&fit=crop',
    currentPrice: 3499,
    oldPrice: 5999,
    discount: 42,
    category: 'Електроніка',
    validUntil: '2025-11-15',
    priceHistory: [
      { date: '2025-09-15', price: 5999 },
      { date: '2025-10-01', price: 4999 },
      { date: '2025-11-01', price: 3499 },
    ],
    stores: [
      { name: 'Samsung Store', price: 3499 },
      { name: 'Rozetka', price: 3599 },
      { name: 'Allo', price: 3699 },
    ],
  },
  {
    id: '4',
    name: 'PlayStation 5',
    brand: 'Sony',
    image:
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=400&fit=crop',
    currentPrice: 17999,
    oldPrice: 22999,
    discount: 22,
    category: 'Електроніка',
    validUntil: '2025-11-25',
    priceHistory: [
      { date: '2025-09-01', price: 22999 },
      { date: '2025-10-01', price: 20999 },
      { date: '2025-11-05', price: 17999 },
    ],
    stores: [
      { name: 'Rozetka', price: 17999 },
      { name: 'Allo', price: 18499 },
      { name: 'Comfy', price: 18999 },
    ],
  },
  {
    id: '5',
    name: "Levi's 501 Jeans",
    brand: "Levi's",
    image:
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    currentPrice: 1899,
    oldPrice: 2999,
    discount: 37,
    category: 'Одяг',
    validUntil: '2025-11-22',
    priceHistory: [
      { date: '2025-10-01', price: 2999 },
      { date: '2025-10-20', price: 2499 },
      { date: '2025-11-10', price: 1899 },
    ],
    stores: [
      { name: "Levi's Store", price: 1899 },
      { name: 'Answear', price: 1999 },
      { name: 'Intertop', price: 2099 },
    ],
  },
  {
    id: '6',
    name: 'Apple Watch Series 8',
    brand: 'Apple',
    image:
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
    currentPrice: 12999,
    oldPrice: 17999,
    discount: 28,
    category: 'Електроніка',
    validUntil: '2025-11-19',
    priceHistory: [
      { date: '2025-09-15', price: 17999 },
      { date: '2025-10-15', price: 15999 },
      { date: '2025-11-08', price: 12999 },
    ],
    stores: [
      { name: 'iStore', price: 12999 },
      { name: 'Rozetka', price: 13499 },
      { name: 'Citrus', price: 13999 },
    ],
  },
];

export function Home({ onNavigate, watchlist, onToggleWatchlist }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('discount');

  const filteredProducts = mockProducts
    .filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'price-low') return a.currentPrice - b.currentPrice;
      if (sortBy === 'price-high') return b.currentPrice - a.currentPrice;
      return 0;
    });

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="p-4">
          <h1 className="text-blue-600 mb-1">Топ знижки сьогодні</h1>
          <p className="text-gray-600">
            Знайдено {filteredProducts.length} товарів
          </p>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Пошук товарів, брендів, категорій"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-4 flex gap-3 overflow-x-auto">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Категорія" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Всі категорії</SelectItem>
              <SelectItem value="Електроніка">Електроніка</SelectItem>
              <SelectItem value="Одяг">Одяг</SelectItem>
              <SelectItem value="Взуття">Взуття</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Сортування" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">За знижкою</SelectItem>
              <SelectItem value="price-low">Ціна: низька</SelectItem>
              <SelectItem value="price-high">Ціна: висока</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isInWatchlist={watchlist.includes(product.id)}
              onToggleWatchlist={onToggleWatchlist}
              onClick={() => onNavigate('product', product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
