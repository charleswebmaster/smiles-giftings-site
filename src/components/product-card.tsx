'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card className="group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <Link href={`/products/${product.id}`} className="flex-grow">
        <CardContent className="p-0">
          <div className="relative aspect-[4/5] w-full bg-secondary">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.hint}
            />
            {product.onSale && (
              <Badge variant="destructive" className="absolute top-2 left-2 bg-accent text-accent-foreground">
                SALE
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex flex-col items-start bg-card">
        <div className="w-full">
            <h3 className="font-semibold text-base truncate">
                <Link href={`/products/${product.id}`}>{product.name}</Link>
            </h3>
        </div>
        <div className="w-full flex justify-between items-center mt-3">
          <div className="flex flex-col">
             {product.onSale && product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">₦{product.originalPrice.toFixed(2)}</p>
             )}
             <p className="font-bold text-lg text-primary">₦{product.price.toFixed(2)}</p>
          </div>
          <Button size="sm" onClick={handleAddToCart} variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
