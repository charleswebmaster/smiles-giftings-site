import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container mx-auto px-4 pt-12">
        {/* Newsletter Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 bg-background p-6 rounded-lg shadow-md -mt-24 relative z-10">
            <div className="flex items-center gap-4">
                <span className="font-bold text-xl text-primary">Smiles & Giftings</span>
            </div>
            <div className="flex-grow md:max-w-xl">
                <p className="mb-2 text-center md:text-left">Subscribe to our newsletter to get updates on our latest offers!</p>
                <form className="flex flex-col sm:flex-row gap-2">
                    <Input type="email" placeholder="Enter your email" className="bg-white" />
                    <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90 uppercase font-bold">Subscribe</Button>
                </form>
            </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Menu Links */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Here to Help</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Help & contact us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Our stores</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Our services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Track your order</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Delivery & collection</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Returns & refunds</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shopping</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Wish List</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Buying guides</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Gift Cards</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-bold mb-4">About Us</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Company information</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Investor relations</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Our blog</Link></li>
              </ul>
            </div>
          </div>
          
          {/* Contact and Apps */}
          <div className="md:text-right">
              <h4 className="font-bold mb-4">Contact Us</h4>
              <p className="font-semibold text-lg">+234 802 354 2845</p>
              <div className="flex gap-2 mt-4 justify-start md:justify-end">
                  <img src="https://placehold.co/120x40" alt="Google Play" className="h-10" data-ai-hint="google play" />
                  <img src="https://placehold.co/120x40" alt="App Store" className="h-10" data-ai-hint="app store" />
              </div>
          </div>
        </div>

        {/* Payment and Copyright */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-4">
            <p className="font-semibold">Payment Methods:</p>
            <div className="flex gap-2">
                <img src="https://placehold.co/40x25" alt="Visa" data-ai-hint="visa logo" />
                <img src="https://placehold.co/40x25" alt="Mastercard" data-ai-hint="mastercard logo" />
                <img src="https://placehold.co/40x25" alt="Verve" data-ai-hint="verve logo" />
                <img src="https://placehold.co/40x25" alt="PayPal" data-ai-hint="paypal logo" />
            </div>
          </div>
          <div className="flex gap-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="YouTube"><Youtube className="h-5 w-5 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-5 w-5 hover:text-primary transition-colors" /></Link>
          </div>
        </div>
         <div className="border-t border-border mt-6 pt-6 text-center text-xs text-muted-foreground">
          <p>© Copyright 2024, Aesthetics Studios</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="#" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
            <Link href="#" className="hover:text-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
