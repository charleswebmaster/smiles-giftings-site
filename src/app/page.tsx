import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Award, Shirt, Gift, Droplet, Gem, Brush } from 'lucide-react';


const categories = [
  { name: 'Create Now', href: '#' },
  { name: 'Group Wear', href: '#' },
  { name: 'T-Shirt', href: '#' },
  { name: 'Hoodies & Sweatshirts', href: '#' },
  { name: 'Tank Top', href: '#' },
  { name: 'Baby Clothing', href: '#' },
  { name: 'Accessories', href: '#' },
];

const designThemes = [
    { name: 'Award Prints', image: 'https://placehold.co/600x400', hint: 'award print design' },
    { name: 'Sign Out Shirts', image: 'https://placehold.co/600x400', hint: 'funny office shirt' },
    { name: 'Independence Day Shirts', image: 'https://placehold.co/600x400', hint: 'patriotic shirt design' },
    { name: 'Weido Shirts', image: 'https://placehold.co/600x400', hint: 'weird quirky shirt' },
    { name: 'Couples Gifts', image: 'https://placehold.co/600x400', hint: 'matching couple gift' },
    { name: 'Christmas Gifts', image: 'https://placehold.co/600x400', hint: 'christmas gift idea' },
];

const services = [
    { icon: Award, title: 'Embroidery', description: 'High-quality custom embroidery for a professional and durable finish on your apparel.' },
    { icon: Shirt, title: 'Direct to Garment', description: 'Vibrant, full-color prints directly on your garments with a soft-hand feel.' },
    { icon: Gift, title: 'Screen Printing', description: 'Perfect for bulk orders, providing a classic and long-lasting print result.' },
];

export default function Home() {
  const newArrivals = products.slice(0, 4).map(p => ({...p, originalPrice: p.price + 10, onSale: true}));

  return (
    <div className="space-y-12 md:space-y-20 lg:space-y-24">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-end text-black">
        <Image
          src="https://smilesgiftings.com/wp-content/uploads/2024/01/banner-1.png"
          alt="Two smiling people wearing printed shirts"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
          data-ai-hint="smiling couple shirts"
          priority
        />
        <div className="absolute inset-0 bg-yellow-400/30"></div>
        <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-2xl ml-auto text-center">
                <h1 className="text-6xl md:text-8xl font-bold uppercase" style={{ color: '#650B1D' }}>
                    CREATE
                </h1>
                <p className="text-xl md:text-2xl font-semibold mt-2 text-black">Personalized</p>
                <p className="text-xl md:text-2xl font-semibold text-black">Product for any</p>
                <p className="text-xl md:text-2xl font-semibold text-black">Event/Occasion</p>

                <Button size="lg" className="mt-8 uppercase font-bold" style={{ backgroundColor: '#650B1D' }}>
                    START DESIGNING NOW
                    <Brush className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-12 md:-mt-16 lg:-mt-20 relative z-20">
        <ScrollArea className="w-full whitespace-nowrap rounded-full bg-background p-2 shadow-md">
            <div className="flex w-max space-x-2">
            {categories.map((category, index) => (
                <Button
                key={category.name}
                asChild
                variant={index === 0 ? "secondary" : "ghost"}
                className={`rounded-full px-6 py-2 text-base ${index === 0 ? 'bg-gray-200 text-black font-semibold' : 'text-gray-600'}`}
                >
                <Link href={category.href}>{category.name}</Link>
                </Button>
            ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {newArrivals.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Design Like You Give A Damn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {designThemes.map((theme) => (
            <Link href="#" key={theme.name} className="group relative block aspect-[3/2] w-full overflow-hidden rounded-lg">
                <Image
                    src={theme.image}
                    alt={theme.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={theme.hint}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Button variant="secondary" className="bg-black text-white hover:bg-gray-800 transition-colors">
                        {theme.name}
                    </Button>
                </div>
            </Link>
          ))}
        </div>
      </section>

       <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {services.map((service) => (
            <div key={service.title} className="flex flex-col items-center">
                <div className="p-4 bg-accent/20 rounded-full mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4 max-w-xs">{service.description}</p>
                <Button asChild variant="destructive" className="bg-primary hover:bg-primary/90 mt-auto uppercase">
                    <Link href="#">Learn More</Link>
                </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
