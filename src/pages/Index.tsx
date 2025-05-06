
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductGrid from "@/components/product/ProductGrid";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || "all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Filter products when category changes
  useEffect(() => {
    const category = categoryParam || activeCategory;
    setActiveCategory(category);
    
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === category));
    }
  }, [categoryParam, activeCategory]);
  
  // Featured products - those on sale or new
  const featuredProducts = products.filter(product => product.sale || product.new).slice(0, 4);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-accent py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Find Your Perfect Style
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover our curated collection of premium products for every taste and budget.
              </p>
              <div className="pt-4">
                <Button size="lg" className="mr-4">
                  Shop Now
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand/20 rounded-full blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000" 
                alt="Featured product" 
                className="rounded-lg w-full object-cover h-96"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <Button variant="link" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                {/* Sale or New Badge */}
                {product.sale && (
                  <div className="product-badge bg-destructive">
                    Sale
                  </div>
                )}
                {product.new && (
                  <div className="product-badge bg-brand">
                    New
                  </div>
                )}
                
                {/* Product Image */}
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-card-image"
                  />
                </div>
                
                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="mt-1">
                    {product.sale ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium line-through text-muted-foreground">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="font-semibold text-destructive">
                          ${product.salePrice?.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
          
          <Tabs defaultValue={activeCategory} value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="clothing">Clothing</TabsTrigger>
              <TabsTrigger value="home">Home</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
            </TabsList>
            
            <div className="min-h-[300px]">
              <ProductGrid products={filteredProducts} />
            </div>
          </Tabs>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="rounded-lg bg-brand/10 p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
                  Get 20% off your first purchase
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Subscribe to our newsletter for exclusive deals and updates.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
