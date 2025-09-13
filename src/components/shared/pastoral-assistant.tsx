
'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Loader2, Users, HandHeart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { pastoralAssistant } from '@/ai/flows/ai-pastoral-assistant';
import { Separator } from '@/components/ui/separator';
import { useLayoutContext } from '@/contexts/layout-context';

interface Message {
    role: 'user' | 'assistant';
    text: string;
}

export function PastoralAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isAiResponding, setIsAiResponding] = useState(false);
    const { isCompanionOpen, isOnBiblePage } = useLayoutContext();

    const welcomeMessage = "Welcome. I'm a ministry assistant trained on Pastor Evelyn's teachings. Whatever is on your heart, you're in a safe place to share.";

    useEffect(() => {
        if (isOpen) {
            setMessages([]);
            setIsTyping(true);
            let index = 0;
            const interval = setInterval(() => {
                const partialMessage = welcomeMessage.slice(0, index + 1);
                setMessages([{ role: 'assistant', text: partialMessage }]);
                index++;
                if (index === welcomeMessage.length) {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 30);
            return () => clearInterval(interval);
        }
    }, [isOpen]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isAiResponding) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsAiResponding(true);

        try {
            const result = await pastoralAssistant({ message: currentInput });
            const assistantMessage: Message = { role: 'assistant', text: result.response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("AI Assistant Error:", error);
            const errorMessage: Message = { role: 'assistant', text: "I'm sorry, I seem to be having trouble connecting right now. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsAiResponding(false);
        }
    };

    return (
        <>
            {/* The Icon */}
            <div className={cn(
                "fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out",
                isCompanionOpen ? "right-[calc(24rem+1.5rem)]" : 
                isOnBiblePage ? "right-[4.5rem]" : "right-6"
            )}>
                <Button
                    size="icon"
                    className="rounded-full w-16 h-16 bg-primary/80 backdrop-blur-sm hover:bg-primary shadow-2xl group"
                    onClick={() => setIsOpen(true)}
                >
                    <Sparkles className="w-8 h-8 text-primary-foreground transition-transform duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 rounded-full bg-primary/50 animate-ping -z-10"></span>
                </Button>
            </div>

            {/* The Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="relative w-full h-full max-w-2xl max-h-[90vh] md:max-h-[700px] bg-background rounded-2xl shadow-2xl flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src="https://placehold.co/100x100" alt="Dr. Evelyn Reed" />
                                        <AvatarFallback>ER</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-primary">Pastoral Assistant</h3>
                                        <p className="text-sm text-muted-foreground">Trained on Pastor Evelyn's Teachings</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-grow p-6 overflow-y-auto space-y-6">
                                {messages.map((msg, index) => (
                                    <div key={index} className={cn("flex items-end gap-3", msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                                        {msg.role === 'assistant' && (
                                            <Avatar className="w-8 h-8">
                                                <AvatarFallback>AI</AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div className={cn(
                                            "max-w-[80%] p-3 rounded-2xl",
                                            msg.role === 'assistant' ? 'bg-muted rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none'
                                        )}>
                                            <p className="whitespace-pre-wrap">{msg.text}{isTyping && index === messages.length - 1 ? '...' : ''}</p>
                                        </div>
                                    </div>
                                ))}
                                {isAiResponding && (
                                     <div className={cn("flex items-end gap-3 justify-start")}>
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>AI</AvatarFallback>
                                        </Avatar>
                                        <div className="max-w-[80%] p-3 rounded-2xl bg-muted rounded-bl-none flex items-center gap-2">
                                           <Loader2 className="w-5 h-5 animate-spin"/>
                                           <p className="text-sm text-muted-foreground">Thinking...</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 border-t bg-background">
                                <form onSubmit={handleSubmit} className="relative">
                                    <Textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Tell me what's on your mind..."
                                        className="pr-16 resize-none"
                                        rows={2}
                                        disabled={isTyping || isAiResponding}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSubmit(e);
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="absolute right-3 top-1/2 -translate-y-1/2"
                                        disabled={!input.trim() || isTyping || isAiResponding}
                                    >
                                        <Send className="w-5 h-5" />
                                    </Button>
                                </form>
                            </div>
                            
                            {/* Footer Actions */}
                            <div className="p-4 border-t bg-muted/50">
  <p className="text-sm text-center text-muted-foreground mb-3">
    For a more personal connection:
  </p>

  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
    <Button variant="outline" className="w-full">
      <Users className="mr-2 h-4 w-4" />
      Find a Community Group
    </Button>

    <Button variant="outline" className="w-full">
      <HandHeart className="mr-2 h-4 w-4" />
      Submit a Prayer Request
    </Button>
  </div>
</div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
