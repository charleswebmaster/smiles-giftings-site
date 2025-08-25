
'use client';

import { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Text, Type, Palette, Trash2, Move, Image as ImageIcon, Bold, Italic, Underline, Shirt, ChevronsUp, ChevronsDown, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useCart } from '@/hooks/use-cart';
import type { Product as ProductType } from '@/lib/types';
import { cn } from '@/lib/utils';


let nextId = 1;

interface DesignElement {
  id: number;
  position: { x: number; y: number };
  rotation: number;
}

interface TextElement extends DesignElement {
  type: 'text';
  text: string;
  color: string;
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

interface ImageElement extends DesignElement {
  type: 'image';
  src: string;
  width: number;
  height: number;
}

type DesignCanvasElement = TextElement | ImageElement;

interface ProductVariant {
    color: string;
    image: string;
    className: string;
}

interface Product {
    name: string;
    variants: ProductVariant[];
    hint: string;
}

const productOptions: Record<string, Product> = {
    tshirt: {
        name: 'Men’s Premium T-Shirt',
        hint: 'premium t-shirt',
        variants: [
            { color: 'White', image: 'https://smilesgiftings.com/wp-content/uploads/2024/01/sku-1@2x-300x300.png', className: 'bg-white' },
            { color: 'Black', image: 'https://smilesgiftings.com/wp-content/uploads/2024/07/black-tshirt-1.png', className: 'bg-black' },
            { color: 'Heather Grey', image: 'https://smilesgiftings.com/wp-content/uploads/2024/07/grey-tshirt.png', className: 'bg-gray-400' },
        ],
    },
    hoodie: {
        name: 'Hoodie Sweatshirt',
        hint: 'hoodie sweatshirt',
        variants: [
            { color: 'Gray', image: 'https://smilesgiftings.com/wp-content/uploads/2024/01/Image-7@2x-300x300.png', className: 'bg-gray-500' },
            { color: 'Navy', image: 'https://smilesgiftings.com/wp-content/uploads/2024/07/navy-hoodie.png', className: 'bg-blue-900' },
            { color: 'Red', image: 'https://smilesgiftings.com/wp-content/uploads/2024/07/red-hoodie.png', className: 'bg-red-600' },
        ],
    },
};

export default function CreatePage() {
  const [elements, setElements] = useState<DesignCanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(null);
  const [currentProductKey, setCurrentProductKey] = useState('tshirt');
  const [selectedColor, setSelectedColor] = useState<Record<string, string>>({
    tshirt: 'White',
    hoodie: 'Gray',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  const selectedElement = elements.find(el => el.id === selectedElementId);
  const currentProduct = productOptions[currentProductKey];
  const currentVariant = currentProduct.variants.find(v => v.color === selectedColor[currentProductKey]) || currentProduct.variants[0];

  const addText = () => {
    const newTextElement: TextElement = {
      id: nextId++,
      type: 'text',
      text: 'Hello World',
      color: '#000000',
      font: 'Arial',
      size: 48,
      bold: false,
      italic: false,
      underline: false,
      position: { x: 150, y: 200 },
      rotation: 0,
    };
    setElements([...elements, newTextElement]);
    setSelectedElementId(newTextElement.id);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target?.result as string;
        img.onload = () => {
            const newImageElement: ImageElement = {
                id: nextId++,
                type: 'image',
                src: event.target?.result as string,
                width: img.width > 200 ? 200 : img.width, // Set a max initial width
                height: img.height * (200 / img.width),
                position: { x: 150, y: 150 },
                rotation: 0,
            };
            setElements(prev => [...prev, newImageElement]);
            setSelectedElementId(newImageElement.id);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const updateSelectedElement = (updates: Partial<DesignCanvasElement>) => {
    if (selectedElementId === null) return;
    setElements(
      elements.map(el =>
        el.id === selectedElementId ? { ...el, ...updates } : el
      )
    );
  };

  const deleteSelectedElement = () => {
    if (selectedElementId === null) return;
    setElements(elements.filter(el => el.id !== selectedElementId));
    setSelectedElementId(null);
  }

  const moveElement = (direction: 'forward' | 'backward') => {
    if (selectedElementId === null) return;
    const index = elements.findIndex(el => el.id === selectedElementId);
    if (index === -1) return;

    const newElements = [...elements];
    const [element] = newElements.splice(index, 1);

    if (direction === 'forward') {
        newElements.splice(index + 1, 0, element);
    } else if (direction === 'backward') {
        newElements.splice(index - 1, 0, element);
    }
    
    setElements(newElements);
  };


  const handleAddToCart = () => {
    const customProduct: ProductType = {
        id: `custom-${currentProductKey}-${selectedColor[currentProductKey]}-${Date.now()}`,
        name: `Custom ${currentVariant.color} ${currentProduct.name}`,
        description: `Custom design on a ${currentVariant.color.toLowerCase()} ${currentProduct.name.toLowerCase()}.`,
        price: 65.00,
        image: currentVariant.image,
        category: 'Custom Apparel',
        rating: { rate: 5, count: 1 },
        hint: `custom ${currentProduct.name.toLowerCase()}`,
    };
    addToCart(customProduct, 1);
  };


  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({x: 0, y: 0});

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedElementId(id);
    const element = elements.find(el => el.id === id);
    if(element) {
        setDragStart({
            x: e.clientX - element.position.x,
            y: e.clientY - element.position.y
        });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedElementId === null) return;
    e.preventDefault();
    updateSelectedElement({
        position: {
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y
        }
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-4xl font-bold mb-8 text-center">Product Designer</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Controls Sidebar */}
        <aside className="lg:col-span-1 h-full">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline"><Palette className="h-6 w-6" /> Design Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                
                <div className='space-y-2'>
                  <Label>1. Select Product</Label>
                  <ToggleGroup type="single" value={currentProductKey} onValueChange={(value) => value && setCurrentProductKey(value)} className="w-full">
                    <ToggleGroupItem value="tshirt" aria-label="T-Shirt" className="w-1/2">
                      <Shirt className="mr-2 h-5 w-5"/> T-Shirt
                    </ToggleGroupItem>
                    <ToggleGroupItem value="hoodie" aria-label="Hoodie" className="w-1/2">
                      <Shirt className="mr-2 h-5 w-5"/> Hoodie
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className='space-y-2'>
                    <Label>2. Choose Color</Label>
                    <div className="flex flex-wrap gap-2">
                        {currentProduct.variants.map((variant) => (
                            <button
                                key={variant.color}
                                onClick={() => setSelectedColor(prev => ({...prev, [currentProductKey]: variant.color}))}
                                className={cn(
                                    "h-8 w-8 rounded-full border-2 transition-transform",
                                    selectedColor[currentProductKey] === variant.color ? 'border-primary scale-110' : 'border-gray-200',
                                    variant.className
                                )}
                                title={variant.color}
                                aria-label={`Select ${variant.color}`}
                            />
                        ))}
                    </div>
                </div>

                <Separator />
                
                <div className='space-y-2'>
                    <Label>3. Add Your Design</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <Button onClick={addText} className="w-full">
                            <Type className="mr-2 h-5 w-5" />
                            Add Text
                        </Button>
                        <Button onClick={() => fileInputRef.current?.click()} className="w-full" variant="outline">
                            <ImageIcon className="mr-2 h-5 w-5" />
                            Add Image
                        </Button>
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </div>
                </div>
              
                <Separator />

                {selectedElement ? (
                    <div className="space-y-4 animate-in fade-in-50">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-lg">Edit Element</h3>
                            <Button variant="ghost" size="icon" onClick={deleteSelectedElement}>
                                <Trash2 className="h-5 w-5 text-destructive"/>
                                <span className="sr-only">Delete Element</span>
                            </Button>
                        </div>

                        {/* Text Specific Controls */}
                        {selectedElement.type === 'text' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="text-input">Text Content</Label>
                                    <Input
                                    id="text-input"
                                    value={selectedElement.text}
                                    onChange={(e) => updateSelectedElement({ text: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="font-select">Font Family</Label>
                                    <Select
                                    value={selectedElement.font}
                                    onValueChange={(value) => updateSelectedElement({ font: value })}
                                    >
                                    <SelectTrigger id="font-select">
                                        <SelectValue placeholder="Select a font" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Arial">Arial</SelectItem>
                                        <SelectItem value="Verdana">Verdana</SelectItem>
                                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                                        <SelectItem value="Courier New">Courier New</SelectItem>
                                        <SelectItem value="Georgia">Georgia</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Font Style</Label>
                                    <ToggleGroup type="multiple" value={[...(selectedElement.bold ? ['bold'] : []), ...(selectedElement.italic ? ['italic'] : []), ...(selectedElement.underline ? ['underline'] : [])]} 
                                    onValueChange={(value) => {
                                        updateSelectedElement({
                                            bold: value.includes('bold'),
                                            italic: value.includes('italic'),
                                            underline: value.includes('underline'),
                                        })
                                    }}>
                                        <ToggleGroupItem value="bold" aria-label="Toggle bold"><Bold className="h-4 w-4"/></ToggleGroupItem>
                                        <ToggleGroupItem value="italic" aria-label="Toggle italic"><Italic className="h-4 w-4"/></ToggleGroupItem>
                                        <ToggleGroupItem value="underline" aria-label="Toggle underline"><Underline className="h-4 w-4"/></ToggleGroupItem>
                                    </ToggleGroup>
                                </div>
                                <div className="space-y-2">
                                    <Label>Font Size: {selectedElement.size}px</Label>
                                    <Slider
                                    value={[selectedElement.size]}
                                    onValueChange={([value]) => updateSelectedElement({ size: value })}
                                    min={12}
                                    max={128}
                                    step={1}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Color</Label>
                                    <div className="flex items-center gap-2">
                                    <Input
                                        type="color"
                                        value={selectedElement.color}
                                        onChange={(e) => updateSelectedElement({ color: e.target.value })}
                                        className="w-12 h-10 p-1"
                                    />
                                    <Input
                                        type="text"
                                        value={selectedElement.color}
                                        onChange={(e) => updateSelectedElement({ color: e.target.value })}
                                        className="flex-1"
                                    />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Image Specific Controls */}
                        {selectedElement.type === 'image' && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Width: {Math.round(selectedElement.width)}px</Label>
                                    <Slider
                                    value={[selectedElement.width]}
                                    onValueChange={([value]) => {
                                        const oldWidth = selectedElement.width;
                                        const newHeight = selectedElement.height * (value / oldWidth);
                                        updateSelectedElement({ width: value, height: newHeight })
                                    }}
                                    min={20}
                                    max={500}
                                    step={1}
                                    />
                                </div>
                            </div>
                        )}
                        
                        {/* Common Controls for all elements */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2"><RotateCw className="h-4 w-4" /> Rotation: {selectedElement.rotation}°</Label>
                                <Slider
                                    value={[selectedElement.rotation]}
                                    onValueChange={([value]) => updateSelectedElement({ rotation: value })}
                                    min={0}
                                    max={360}
                                    step={1}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Layering</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button variant="outline" onClick={() => moveElement('backward')}>
                                        <ChevronsDown className="mr-2 h-4 w-4"/> Send Backward
                                    </Button>
                                    <Button variant="outline" onClick={() => moveElement('forward')}>
                                        <ChevronsUp className="mr-2 h-4 w-4"/> Bring Forward
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground pt-2 border-t mt-4 flex items-center gap-2">
                            <Move className="h-4 w-4"/>
                            Click and drag to move the selected element.
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground p-8">
                    <p>Add text or an image to start designing your {currentProduct.name.toLowerCase()}.</p>
                    </div>
                )}
                
                <Separator />
                
                <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={elements.length === 0}>
                    Add to Cart
                </Button>

            </CardContent>
          </Card>
        </aside>

        {/* Designer Canvas */}
        <main className="lg:col-span-2 lg:sticky lg:top-24 bg-secondary/50 rounded-lg p-4 flex items-center justify-center relative aspect-square lg:aspect-auto" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <div className="relative w-[500px] h-[600px]">
                <Image
                    src={currentVariant.image}
                    alt={`${currentVariant.color} ${currentProduct.name}`}
                    width={500}
                    height={600}
                    className="pointer-events-none object-contain"
                    data-ai-hint={currentProduct.hint}
                    key={currentVariant.image}
                />
                {elements.map(el => (
                    <div
                        key={el.id}
                        onMouseDown={(e) => handleMouseDown(e, el.id)}
                        className={`absolute cursor-move select-none p-1 border border-dashed
                        ${selectedElementId === el.id ? 'border-blue-500' : 'border-transparent hover:border-blue-300'}
                        `}
                        style={{
                            left: `${el.position.x}px`,
                            top: `${el.position.y}px`,
                            transform: `rotate(${el.rotation}deg)`,
                        }}
                    >
                        {el.type === 'text' ? (
                            <div
                                style={{
                                    color: el.color,
                                    fontFamily: el.font,
                                    fontSize: `${el.size}px`,
                                    fontWeight: el.bold ? 'bold' : 'normal',
                                    fontStyle: el.italic ? 'italic' : 'normal',
                                    textDecoration: el.underline ? 'underline' : 'none',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {el.text}
                            </div>
                        ) : (
                            <Image 
                                src={el.src} 
                                alt="User upload" 
                                width={el.width}
                                height={el.height}
                                className="pointer-events-none"
                            />
                        )}
                    </div>
                ))}
            </div>
        </main>

      </div>
    </div>
  );
}
