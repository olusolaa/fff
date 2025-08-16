
'use client';

import { Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";;

export function NewsletterSignup() {
    return (
        <Card className="shadow-lg">
            <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline text-3xl text-primary">Join the Reading Room</CardTitle>
                <CardDescription className="text-lg text-foreground/80">
                    Receive a single, thoughtful post each week. A moment of peace in your inbox.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form className="flex flex-col sm:flex-row gap-2">
                    <Input 
                        type="email" 
                        placeholder="your.email@example.com"
                        className="h-12 text-base flex-grow"
                    />
                    <Button type="submit" size="lg" className="h-12">
                        Subscribe
                    </Button>
                </form>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </CardContent>
        </Card>
    );
}
