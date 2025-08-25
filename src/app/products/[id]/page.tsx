
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Star, StarHalf } from 'lucide-react';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { AddToCartForm } from '@/components/add-to-cart-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Helper function to get product data. In a real app, this would fetch from a database.
async function getProduct(id: string): Promise<Product | undefined> {
  return products.find(p => p.id === id);
}

// Helper to render star ratings
const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-5 w-5 fill-accent text-accent" />
      ))}
      {halfStar && <StarHalf className="h-5 w-5 fill-accent text-accent" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-muted-foreground/50" />
      ))}
    </div>
  );
};


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="w-full">
           <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg bg-secondary">
             <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.hint}
            />
           </div>
        </div>
        <div>
          <h1 className="font-headline text-4xl lg:text-5xl font-bold">{product.name}</h1>
          <div className="mt-4 flex items-center gap-4">
            <p className="text-3xl font-bold text-primary">₦{product.price.toLocaleString('en-US')}</p>
            <div className="flex items-center gap-2">
              {renderStars(product.rating.rate)}
              <span className="text-sm text-muted-foreground">({product.rating.count} reviews)</span>
            </div>
          </div>
          
          <p className="mt-6 text-base text-foreground/80 leading-relaxed">
            {product.description}
          </p>

          <AddToCartForm product={product} />

          <div className="mt-8 border-t pt-6">
            <Accordion type="single" collapsible defaultValue="description">
              <AccordionItem value="description">
                <AccordionTrigger className="font-headline text-lg">Product Details</AccordionTrigger>
                <AccordionContent>
                  More detailed information about the fabric, fit, and care instructions. Made with the highest quality materials to ensure longevity and comfort.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="font-headline text-lg">Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  Free shipping on all orders over $50. Easy returns within 30 days of purchase. Please see our policy page for more details.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </div>
  );
}
