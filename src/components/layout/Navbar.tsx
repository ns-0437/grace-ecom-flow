
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const categories = [
    { name: 'All', path: '/' },
    { name: 'Electronics', path: '/?category=electronics' },
    { name: 'Clothing', path: '/?category=clothing' },
    { name: 'Home', path: '/?category=home' },
    { name: 'Sports', path: '/?category=sports' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand">ShopEase</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {categories.map((category) => (
            <Link 
              key={category.name}
              to={category.path}
              className="nav-link"
            >
              {category.name}
            </Link>
          ))}
        </nav>
        
        {/* Right Side Icons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User className="h-5 w-5" />
          </Button>
          
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="container md:hidden pb-4 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={category.path}
                className="py-2 px-3 hover:bg-muted rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 py-2 px-3">
              <Search className="h-5 w-5 text-muted-foreground" />
              <span>Search</span>
            </div>
            <div className="flex items-center space-x-2 py-2 px-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <span>Account</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
