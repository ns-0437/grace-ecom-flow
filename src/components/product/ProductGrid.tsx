
import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, Grid3x3, List } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid = ({ products, title }: ProductGridProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("popular");

  const sortedProducts = [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-desc":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "newest":
        return b.new ? 1 : -1;
      default: // popular - sort by rating
        return b.rating - a.rating;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header with title and controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {title && <h2 className="text-2xl font-semibold">{title}</h2>}
        
        <div className="flex items-center space-x-3">
          {/* Sort */}
          <div className="flex items-center">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* View toggle */}
          <div className="flex items-center space-x-1">
            <Button
              variant={view === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuItem>On Sale</DropdownMenuItem>
              <DropdownMenuItem>In Stock</DropdownMenuItem>
              <DropdownMenuItem>New Arrivals</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Product Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <div key={product.id} className="flex border rounded-lg overflow-hidden">
              <div className="w-1/3">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </div>
              <div className="w-2/3 p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="mt-2 flex items-center">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  <span className="ml-1 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="mt-2">
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
                  className="mt-4"
                  onClick={() => {}}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
