
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  return (
    <div className="product-card group">
      {/* Sale or New Badge */}
      {product.sale && (
        <Badge variant="destructive" className="product-badge">
          Sale
        </Badge>
      )}
      {product.new && (
        <Badge className="product-badge bg-brand">
          New
        </Badge>
      )}
      
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
        />
      </Link>
      
      {/* Product Details */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
        </Link>
        
        {/* Rating */}
        <div className="mt-1 flex items-center">
          <Star className="h-4 w-4 fill-current text-yellow-400" />
          <span className="ml-1 text-sm text-muted-foreground">
            {product.rating} ({product.reviews})
          </span>
        </div>
        
        {/* Price */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            {product.sale ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium line-through text-muted-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg font-semibold text-destructive">
                  ${product.salePrice?.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-semibold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <Button 
            size="sm" 
            variant="outline"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => addItem(product, 1)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
