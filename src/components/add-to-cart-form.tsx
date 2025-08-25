
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Brush } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
              className="w-16 h-10 text-center border-0 focus-visible:ring-0"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
           <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
        <Button size="lg" variant="outline" className="w-full" asChild>
            <Link href="/create">
                <Brush className="mr-2 h-5 w-5" />
                Customize
            </Link>
        </Button>
    </div>
  );
}
