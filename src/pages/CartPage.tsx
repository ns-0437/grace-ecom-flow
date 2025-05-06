
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Layout from '@/components/layout/Layout';
import { toast } from '@/components/ui/use-toast';
import { products } from '@/data/products'; // For recommended products

const CartPage = () => {
  const { items, updateItemQuantity, removeItem, subtotal, totalItems } = useCart();
  const navigate = useNavigate();
  
  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "This is where the checkout process would begin.",
    });
    // In a real app, navigate to checkout page
  };
  
  // Get recommended products (just showing different ones than in cart)
  const recommendedProducts = products
    .filter(p => !items.some(item => item.product.id === p.id))
    .slice(0, 4);
  
  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border overflow-hidden">
                <div className="hidden md:grid md:grid-cols-6 bg-muted/40 p-4">
                  <div className="md:col-span-3">
                    <span>Product</span>
                  </div>
                  <div className="text-center">
                    <span>Price</span>
                  </div>
                  <div className="text-center">
                    <span>Quantity</span>
                  </div>
                  <div className="text-right">
                    <span>Total</span>
                  </div>
                </div>
                
                {items.map((item) => (
                  <div key={item.product.id} className="border-t first:border-t-0">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4">
                      {/* Product image and name */}
                      <div className="md:col-span-3 flex space-x-4">
                        <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Link 
                            to={`/product/${item.product.id}`} 
                            className="font-medium hover:underline"
                          >
                            {item.product.name}
                          </Link>
                          {item.product.colors && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Color: {item.product.colors[0]}
                            </p>
                          )}
                          {item.product.sizes && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Size: {item.product.sizes[0]}
                            </p>
                          )}
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="mt-2 flex items-center text-sm text-red-500 md:hidden"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-end md:justify-center">
                        <span className="md:hidden font-medium mr-2">Price:</span>
                        {item.product.sale ? (
                          <span className="text-destructive font-medium">
                            ${item.product.salePrice?.toFixed(2)}
                          </span>
                        ) : (
                          <span className="font-medium">${item.product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      {/* Quantity */}
                      <div className="flex items-center justify-end md:justify-center">
                        <span className="md:hidden font-medium mr-2">Qty:</span>
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateItemQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateItemQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="flex items-center justify-end">
                        <span className="md:hidden font-medium mr-2">Total:</span>
                        <span className="font-semibold">
                          $
                          {(
                            (item.product.sale ? item.product.salePrice! : item.product.price) * 
                            item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                      
                      {/* Remove button (desktop) */}
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="hidden md:flex md:items-center text-sm text-red-500 absolute right-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Continue shopping */}
              <div className="mt-6">
                <Button 
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="rounded-lg border p-6 space-y-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <Button 
                  size="lg"
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              {/* Promo code input would go here */}
            </div>
          </div>
        )}
        
        {/* Recommended Products */}
        {items.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">You might also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <Link to={`/product/${product.id}`} className="overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product-card-image"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-foreground line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="mt-1">
                      {product.sale ? (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium line-through text-muted-foreground">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="font-medium text-destructive">
                            ${product.salePrice?.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
