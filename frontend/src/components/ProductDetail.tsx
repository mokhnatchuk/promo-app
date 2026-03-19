import {
  ArrowLeft,
  Heart,
  BarChart3,
  Store,
  Calendar,
  TrendingDown,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Product, Screen } from '../App';
import { ImageWithFallback } from './common/ImageWithFallback';

interface ProductDetailProps {
  product: Product;
  onNavigate: (screen: Screen) => void;
  isInWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
}

export function ProductDetail({
  product,
  onNavigate,
  isInWatchlist,
  onToggleWatchlist,
}: ProductDetailProps) {
  const maxPrice = Math.max(...product.priceHistory.map(p => p.price));
  const minPrice = Math.min(...product.priceHistory.map(p => p.price));

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate('home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="flex-1">Деталі товару</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleWatchlist(product.id)}
        >
          <Heart
            className={`w-5 h-5 ${isInWatchlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </Button>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left - Image */}
          <div>
            <div className="relative bg-white rounded-lg border p-4">
              <ImageWithFallback
                src={product.image}
                alt={product.name}
                className="w-full h-auto"
              />
              <Badge className="absolute top-8 left-8 bg-orange-500 hover:bg-orange-600">
                -{product.discount}%
              </Badge>
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            <div>
              <p className="text-gray-500 mb-2">{product.brand}</p>
              <h1 className="mb-4">{product.name}</h1>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-blue-600">
                  {product.currentPrice.toLocaleString('uk-UA')} ₴
                </span>
                <span className="text-gray-400 line-through">
                  {product.oldPrice.toLocaleString('uk-UA')} ₴
                </span>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  Економія{' '}
                  {(product.oldPrice - product.currentPrice).toLocaleString(
                    'uk-UA',
                  )}{' '}
                  ₴
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Акція дійсна до{' '}
                  {new Date(product.validUntil).toLocaleDateString('uk-UA', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Price History Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-green-600" />
                  Історія цін
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.priceHistory.map((item, index) => {
                    const percentage =
                      ((item.price - minPrice) / (maxPrice - minPrice)) * 100;
                    const isLowest = item.price === minPrice;

                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-gray-600">
                          <span>
                            {new Date(item.date).toLocaleDateString('uk-UA', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          <span className={isLowest ? 'text-green-600' : ''}>
                            {item.price.toLocaleString('uk-UA')} ₴
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${isLowest ? 'bg-green-600' : 'bg-blue-600'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Best Stores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-blue-600" />
                  Магазини з найкращою ціною
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {product.stores.map((store, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {index === 0 && (
                          <Badge className="bg-green-600 hover:bg-green-700">
                            Краща ціна
                          </Badge>
                        )}
                        <span>{store.name}</span>
                      </div>
                      <span className="text-blue-600">
                        {store.price.toLocaleString('uk-UA')} ₴
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => onToggleWatchlist(product.id)}
              >
                <Heart
                  className={`w-4 h-4 mr-2 ${isInWatchlist ? 'fill-current' : ''}`}
                />
                {isInWatchlist ? 'У списку відстеження' : 'Додати у список'}
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Порівняти
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
