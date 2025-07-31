'use client';

import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { Input } from '@/components/ui/input';

const topNavLinks = [
  { href: '#', label: 'Start Selling' },
  { href: '#', label: 'Jobs' },
  { href: '#', label: 'Contact Us' },
  { href: '#', label: 'Help' },
];

const mainNavLinks = [
  { href: '#', label: 'Create' },
  { href: '/products', label: 'Shop' },
];

export function Header() {
  const { cartCount, totalPrice } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      {/* Top bar */}
      <div className="hidden md:block bg-background/10 text-xs">
          <div className="container mx-auto flex h-8 items-center justify-end px-4">
            <div className="flex items-center gap-4">
                {topNavLinks.map(link => (
                    <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
                        {link.label}
                    </Link>
                ))}
                 <div className="flex gap-3">
                    <Link href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-white transition-colors" /></Link>
                    <Link href="#" aria-label="Facebook"><Facebook className="h-4 w-4 hover:text-white transition-colors" /></Link>
                    <Link href="#" aria-label="Instagram"><Instagram className="h-4 w-4 hover:text-white transition-colors" /></Link>
                    <Link href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4 hover:text-white transition-colors" /></Link>
                </div>
            </div>
          </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold" style={{color: '#FFD700'}}>
              Smiles & Giftings
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-lg">
          <div className="relative w-full">
            <Input 
                type="search"
                placeholder="Find products and design templates"
                className="bg-white/90 text-black placeholder:text-gray-500 rounded-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex hover:bg-background/20">
            <User className="h-6 w-6" />
            <span className="sr-only">Account</span>
          </Button>
          <Link href="/cart" passHref>
            <Button variant="ghost" className="relative hover:bg-background/20 px-2">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0 text-xs bg-accent text-black">
                  {cartCount}
                </Badge>
              )}
              <span className="hidden md:inline ml-2 font-semibold">₦{totalPrice.toFixed(2)}</span>
            </Button>
          </Link>
        
            <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-background/20">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-primary text-primary-foreground">
                <div className="flex flex-col gap-6 p-6">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold" style={{color: '#FFD700'}}>
                            Smiles & Giftings
                        </span>
                    </Link>
                    <nav className="flex flex-col gap-4">
                    {[...mainNavLinks, ...topNavLinks].map((link) => (
                        <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium transition-colors hover:text-white"
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                     <div className="relative w-full mt-4">
                        <Input 
                            type="search"
                            placeholder="Find products..."
                            className="bg-white/90 text-black placeholder:text-gray-500 rounded-full pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                </div>
                </SheetContent>
            </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}
