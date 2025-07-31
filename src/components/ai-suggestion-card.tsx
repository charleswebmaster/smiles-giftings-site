'use client';

import { useState } from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import { getAiDesignSuggestions } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function AiSuggestionCard() {
  const [suggestions, setSuggestions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSuggestClick = async () => {
    setIsLoading(true);
    setError('');
    setSuggestions('');
    const result = await getAiDesignSuggestions();
    setIsLoading(false);
    if (result.success) {
      setSuggestions(result.suggestions || '');
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-secondary via-background to-secondary">
      <CardHeader className="items-center text-center">
        <Sparkles className="h-10 w-10 text-accent mb-2" />
        <CardTitle className="font-headline text-3xl">Need Some Inspiration?</CardTitle>
        <CardDescription className="max-w-md">
          Let our AI expert suggest the latest design trends to help you craft the perfect look.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        {!suggestions && !isLoading && !error && (
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleSuggestClick}>
                <Wand2 className="mr-2 h-5 w-5" />
                Get Design Suggestions
            </Button>
        )}
        {isLoading && (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {suggestions && (
          <div className="text-left p-4 bg-background/50 rounded-lg">
            <p className="whitespace-pre-line">{suggestions}</p>
             <Button size="sm" variant="link" onClick={handleSuggestClick} className="mt-4 p-0 h-auto">
                <Wand2 className="mr-2 h-4 w-4" />
                Generate new suggestions
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
