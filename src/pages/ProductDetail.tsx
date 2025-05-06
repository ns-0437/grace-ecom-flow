
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Star, ShoppingCart, Heart, Share2, ChevronRight, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/components/ui/use-toast';
import ProductGrid from '@/components/product/ProductGrid';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <Button 
            variant="link" 
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Return to shop
          </Button>
        </div>
      </Layout>
    );
  }
  
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link to={`/?category=${product.category}`} className="hover:text-foreground capitalize">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
        </nav>
        
        {/* Back button for mobile */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 md:hidden" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            {(product.sale || product.new) && (
              <Badge 
                variant={product.sale ? 'destructive' : 'default'} 
                className="absolute left-4 top-4 z-10"
              >
                {product.sale ? 'Sale' : 'New'}
              </Badge>
            )}
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img 
                src={product.image} 
                alt={product.name} 
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            
            {/* Rating */}
            <div className="mt-2 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-muted stroke-muted-foreground fill-none'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mt-4">
              {product.sale ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-medium line-through text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-2xl font-bold text-destructive">
                    ${product.salePrice?.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Description */}
            <p className="mt-4 text-muted-foreground">{product.description}</p>
            
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium">Color</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={`flex items-center justify-center rounded-full border px-3 py-1 text-sm transition-colors
                        ${selectedColor === color 
                          ? 'border-primary bg-accent text-accent-foreground' 
                          : 'border-muted bg-transparent text-foreground hover:bg-muted/50'}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Size</h3>
                  <Button variant="link" size="sm" className="text-xs">
                    Size Guide
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`flex h-9 w-12 items-center justify-center rounded-md border text-sm transition-colors
                        ${selectedSize === size 
                          ? 'border-primary bg-accent text-accent-foreground' 
                          : 'border-muted bg-transparent text-foreground hover:bg-muted/50'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity */}
            <div className="mt-6">
              <h3 className="text-sm font-medium">Quantity</h3>
              <div className="mt-2 flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span>{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
                <span className="ml-4 text-sm text-muted-foreground">
                  {product.stock} available
                </span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <Button 
                className="flex-1"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1 sm:flex-none">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Shipping */}
            <div className="mt-6 flex items-center rounded-lg border bg-muted/30 p-4">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div className="ml-3">
                <p className="text-sm font-medium">Free shipping</p>
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over $50
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none h-auto mb-4">
              <TabsTrigger value="details" className="rounded-none py-3">
                Product Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none py-3">
                Reviews
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none py-3">
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <div>
                <h3 className="text-lg font-medium">Features</h3>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-muted-foreground">
                  {product.features?.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                
                <h3 className="mt-6 text-lg font-medium">Full Description</h3>
                <p className="mt-3 text-muted-foreground">
                  {product.description}
                  {/* Extended description would go here */}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-4">
              <p>Customer reviews would be displayed here.</p>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <div>
                <h3 className="text-lg font-medium">Shipping</h3>
                <p className="mt-2 text-muted-foreground">
                  Free standard shipping on orders over $50. Expedited and international shipping options available at checkout.
                </p>
                
                <h3 className="mt-6 text-lg font-medium">Returns</h3>
                <p className="mt-2 text-muted-foreground">
                  We offer a 30-day return policy for most items. See our returns page for more information.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <ProductGrid products={relatedProducts} title="You might also like" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
