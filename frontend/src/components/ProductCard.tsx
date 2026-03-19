import { Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Product } from '../App';
import { ImageWithFallback } from './common/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  isInWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
  onClick: () => void;
}

export function ProductCard({
  product,
  isInWatchlist,
  onToggleWatchlist,
  onClick,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative" onClick={onClick}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
          -{product.discount}%
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
          onClick={e => {
            e.stopPropagation();
            onToggleWatchlist(product.id);
          }}
        >
          <Heart
            className={`w-5 h-5 ${isInWatchlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </Button>
      </div>

      <div className="p-4" onClick={onClick}>
        <p className="text-gray-500 mb-1">{product.brand}</p>
        <h3 className="mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-blue-600">
            {product.currentPrice.toLocaleString('uk-UA')} ₴
          </span>
          <span className="text-gray-400 line-through">
            {product.oldPrice.toLocaleString('uk-UA')} ₴
          </span>
        </div>

        <p className="text-gray-500">
          До {new Date(product.validUntil).toLocaleDateString('uk-UA')}
        </p>
      </div>
    </div>
  );
}
