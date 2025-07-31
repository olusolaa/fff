
'use client';

import React, from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  Share2,
  Download,
  PlayCircle,
  PauseCircle,
  Search,
  MessageSquare,
  ArrowRight,
  X,
  BookOpen,
  FileText,
  Video,
  AudioLines,
  Facebook,
  Twitter,
  Instagram,
  Headphones,
  BookMarked,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { bibleStudyCompanion } from '@/ai/flows/ai-bible-study-companion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollPaperTextarea } from '@/components/ui/neumorphic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

type Tab = 'notes' | 'transcript' | 'discuss';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

interface TranscriptItem {
  time: number;
  text: string;
}

interface Sermon {
  id: number;
  title: string;
  speaker: string;
  date: string;
  thumbnail: string;
  duration: number;
  notes: string;
  transcript: TranscriptItem[];
  series: string;
  part: number;
  hint?: string;
}

const initialSermon: Sermon = {
  id: 1,
  title: 'The Echo of Grace',
  speaker: 'Dr. Evelyn Reed',
  date: 'October 26, 2023',
  thumbnail: 'https://placehold.co/1280x720/1a2a1a/f5f5f0',
  duration: 2714,
  series: 'The Echo of Grace',
  part: 2,
  notes: `This week's message explores the pervasive and persistent nature of grace. It's not a fleeting moment, a continuous echo in our lives.

Key Themes:
- Understanding Grace as a Constant Presence
- Recognizing Grace in Times of Hardship
- Extending the Grace We Receive to Others

"For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God." - Ephesians 2:8

We are called not just to be recipients of grace, but conduits. How can you be an echo of grace in your community this week?

"But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me." - 2 Corinthians 12:9`,
  transcript: [
    { time: 0, text: "Welcome, everyone. It is so good to be with you today." },
    { time: 5, text: "Today, we're diving into a topic that sits at the very heart of our faith: The Echo of Grace." },
    { time: 12, text: "What do I mean by 'echo'? An echo is a sound that repeats, that returns to us long after the initial event." },
    { time: 20, text: "I believe grace operates in the same way. It's not a one-time transaction." },
    { time: 27, text: "It's a continuous, resonant force in our lives, shaping us, guiding us, and calling us back home." },
    { time: 35, text: "Let's start with a foundational scripture, one that many of us know well. Ephesians 2:8." },
    { time: 42, text: "'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.'" },
    { time: 51, text: "Notice the word 'gift'. A gift isn't earned. It's freely given. That's the first characteristic of this grace." },
    { time: 60, text: "But the echo... the echo is what happens *after* we receive the gift." },
    { time: 2700, text: "Go in peace, and let the echo of grace resound in your lives." },
  ]
};

const seriesSermons: Sermon[] = [
    { id: 6, title: 'The First Word', speaker: 'Dr. Evelyn Reed', date: 'October 19, 2023', thumbnail: '', duration: 2600, series: 'The Echo of Grace', part: 1, notes: '', transcript: [] },
    initialSermon,
    { id: 7, title: 'Living the Reply', speaker: 'Dr. Evelyn Reed', date: 'November 2, 2023', thumbnail: '', duration: 2800, series: 'The Echo of Grace', part: 3, notes: '', transcript: [] },
    { id: 8, title: 'A Resonant Community', speaker: 'Dr. Evelyn Reed', date: 'November 9, 2023', thumbnail: '', duration: 2750, series: 'The Echo of Grace', part: 4, notes: '', transcript: [] },
];

const relatedContent = {
    messages: [
        { id: 2, title: 'The Architect of Hope', speaker: 'Rev. Michael Chen' },
        { id: 3, title: 'Whispers of the Divine', speaker: 'Dr. Evelyn Reed' },
        { id: 4, title: 'A Tapestry of Faith', speaker: 'Pastor Sarah Jones' },
        { id: 5, title: 'The Courage to Begin Again', speaker: 'Dr. Evelyn Reed' },
    ],
    articles: [
        { id: 1, title: 'Grace is More Than a Get-Out-of-Jail-Free Card', image: 'https://placehold.co/800x600.png', hint: 'writing journal', readTime: '5 min read' },
        { id: 2, title: 'The Weight of Mercy', image: 'https://placehold.co/800x600.png', hint: 'feather balance', readTime: '7 min read' },
        { id: 3, title: 'How to Respond When You Don\'t Feel Forgiven', image: 'https://placehold.co/800x600.png', hint: 'person reflection', readTime: '4 min read' },
    ],
    podcasts: [
        { id: 1, title: 'Evelyn Reed on the Practice of Grace', image: 'https://placehold.co/400x400.png', hint: 'podcast interview', listenTime: '18 min listen' },
        { id: 2, title: 'Unmerited: A Roundtable Discussion', image: 'https://placehold.co/400x400.png', hint: 'group discussion', listenTime: '25 min listen' },
        { id: 3, title: 'Daily Grace: A 5-Minute Reflection', image: 'https://placehold.co/400x400.png', hint: 'morning sunrise', listenTime: '5 min listen' },
    ],
    books: [
        { id: 1, title: 'The Echo of Grace', image: 'https://placehold.co/400x600.png', hint: 'book cover grace' },
        { id: 2, title: 'What is the Gospel?', image: 'https://placehold.co/400x600.png', hint: 'book cover gospel' },
    ]
};


const TabContent = ({ isVisible, children }: { isVisible: boolean; children: React.ReactNode }) => (
    <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 h-full"
    >
        {children}
    </motion.div>
);

const AudioVisualizer = ({ data, progress, isPlaying }: { data: number[], progress: number, isPlaying: boolean }) => {
    const controls = useAnimation();

    React.useEffect(() => {
        if (isPlaying) {
            controls.start("playing");
        } else {
            controls.stop();
            controls.set("paused");
        }
    }, [isPlaying, controls]);

    return (
        <div className="w-full h-full flex items-center justify-center p-8 bg-primary/10">
            <div className="w-full h-full flex items-center justify-center gap-px">
                {data.map((amplitude, index) => {
                    const barProgress = index / data.length;
                    const hasBeenPlayed = progress >= barProgress;
                    
                    return (
                        <motion.div
                            key={index}
                            className={cn(
                                "w-full rounded-full transition-colors duration-300",
                                hasBeenPlayed ? "bg-accent" : "bg-primary/30"
                            )}
                            style={{ 
                                height: `${amplitude * 100}%`,
                            }}
                            variants={{
                                playing: {
                                    scaleY: [1, 1.15, 0.85, 1],
                                    opacity: [0.6, 0.8, 0.7, 0.6],
                                    transition: {
                                        duration: 1 + Math.random(),
                                        repeat: Infinity,
                                        repeatType: 'mirror',
                                        ease: 'easeInOut',
                                        delay: index * 0.01,
                                    },
                                },
                                paused: {
                                    scaleY: 1,
                                    opacity: 0.6,
                                },
                            }}
                            animate={controls}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const PlayerControls = React.memo(({ isAudioOnly, onToggleAudio }: { isAudioOnly: boolean, onToggleAudio: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="absolute bottom-12 right-4 z-10 flex flex-col items-end space-y-2"
  >
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full">
            <Share2 size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left"><p>Share</p></TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full">
            <Download size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left"><p>Download</p></TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggleAudio}
            className="text-white/80 hover:text-white bg-black/30 hover:bg-black/50 rounded-full"
          >
            {isAudioOnly ? <Video size={18} /> : <AudioLines size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left"><p>{isAudioOnly ? 'Show Video' : 'Audio Only'}</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </motion.div>
));
PlayerControls.displayName = 'PlayerControls';


export default function SanctuaryMediaHub() {
  const [activeTab, setActiveTab] = React.useState<Tab>('notes');
  const [isPlayerHovered, setPlayerHovered] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isAudioOnly, setIsAudioOnly] = React.useState(true);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [isDocked, setIsDocked] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [userInput, setUserInput] = React.useState('');
  const [isAiResponding, setIsAiResponding] = React.useState(false);
  const [notesContent, setNotesContent] = React.useState('');
  const [currentSermon, setCurrentSermon] = React.useState<Sermon>(initialSermon);
  
  const videoRef = React.useRef<HTMLDivElement>(null);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const waveformData = React.useMemo(() => Array.from({ length: 150 }, () => Math.random() * 0.8 + 0.2), [currentSermon.id]);

  const activeTranscriptIndex = React.useMemo(() => {
    const reversedIndex = currentSermon.transcript.slice().reverse().findIndex(item => item.time <= currentTime);
    if (reversedIndex === -1) return -1;
    return currentSermon.transcript.length - 1 - reversedIndex;
  }, [currentTime, currentSermon.transcript]);

  React.useEffect(() => {
    const handleScroll = () => {
        if (videoRef.current) {
            const { bottom } = videoRef.current.getBoundingClientRect();
            setIsDocked(bottom < 0);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= currentSermon.duration) {
            setIsPlaying(false);
            return currentSermon.duration;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSermon.duration]);
  
  React.useEffect(() => {
      setNotesContent('');
      if (activeTab === 'notes') {
        let index = 0;
        const words = currentSermon.notes.split(' ');
        const interval = setInterval(() => {
          if (index < words.length) {
            setNotesContent(prev => prev + (prev ? ' ' : '') + words[index]);
            index++;
          } else {
            clearInterval(interval);
          }
        }, 50); 
        return () => clearInterval(interval);
      }
    }, [activeTab, currentSermon.id]);

  React.useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages])

  const handleSermonClick = (sermon: Sermon) => {
    // In a real app, you would fetch the full sermon data here.
    // For this prototype, we'll just switch to it.
    const fullSermonData = seriesSermons.find(s => s.id === sermon.id) || initialSermon;

    // Simulate AJAX-style update without page reload
    setCurrentSermon(fullSermonData);
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveTab('notes');
    window.history.pushState({}, '', `/sermons?id=${sermon.id}`);
    
    // Animate new content into the media hub
    const mediaHub = document.getElementById('media-hub-content');
    if (mediaHub) {
        mediaHub.classList.add('cross-fade-exit');
        setTimeout(() => {
            mediaHub.classList.remove('cross-fade-exit');
            mediaHub.classList.add('cross-fade-enter');
            setTimeout(() => mediaHub.classList.remove('cross-fade-enter'), 500);
        }, 500);
    }
  };


  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTranscriptClick = (time: number) => {
    setCurrentTime(time);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isAiResponding) return;
    
    setIsAiResponding(true);
    const newMessages: Message[] = [...messages, { id: Date.now(), role: 'user', text: userInput }];
    setMessages(newMessages);
    const question = userInput;
    setUserInput('');
    

    try {
      const result = await bibleStudyCompanion({ question });
      
      let streamedText = "";
      const assistantResponse: Message = { id: Date.now() + 1, role: 'assistant', text: "" };
      setMessages(prev => [...prev, assistantResponse]);

      const stream = new Promise<void>(resolve => {
        let index = 0;
        const interval = setInterval(() => {
          streamedText += result.response[index];
          setMessages(prev => prev.map(msg => msg.id === assistantResponse.id ? {...msg, text: streamedText} : msg));
          index++;
          if (index === result.response.length) {
            clearInterval(interval);
            resolve();
          }
        }, 20);
      });
      await stream;

    } catch (error) {
      console.error("AI companion error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "The AI companion is currently unavailable. Please try again later.",
      });
       setMessages(prev => prev.filter(msg => msg.role !== 'assistant'));
    } finally {
      setIsAiResponding(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  return (
    <div className={cn("bg-background text-foreground pt-20 min-h-screen transition-all duration-700 ease-in-out", { 'pb-28 md:pb-24': isDocked })}>
      <div id="media-hub-content">
        <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left Column: Video Player and Info */}
            <div className="lg:col-span-3 space-y-4 mt-8">
                <div 
                onMouseEnter={() => setPlayerHovered(true)}
                onMouseLeave={() => setPlayerHovered(false)}
                ref={videoRef}
                className="relative"
                >
                <div className={cn("aspect-video w-full cursor-pointer overflow-hidden rounded-xl shadow-2xl group", { 'ring-4 ring-primary/50': isPlaying })}>
                    {isAudioOnly ? (
                    <AudioVisualizer 
                        data={waveformData} 
                        progress={currentTime / currentSermon.duration}
                        isPlaying={isPlaying}
                    />
                    ) : (
                    <Image 
                        src={currentSermon.thumbnail} 
                        alt={`Sermon thumbnail for ${currentSermon.title}`} 
                        width={1280} 
                        height={720}
                        className={cn("w-full h-full object-cover transition-transform duration-500 ease-in-out", { 'scale-105': isPlaying })}
                        data-ai-hint="sermon church"
                        priority
                    />
                    )}
                    <div 
                    onClick={handlePlayPause} 
                    className={cn("absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300", 
                        isPlayerHovered || !isPlaying ? "opacity-100" : "opacity-0"
                    )}
                    >
                        <AnimatePresence>
                        {(isPlayerHovered || !isPlaying) && (
                            isPlaying ? <PauseCircle size={80} className="text-white/80 drop-shadow-lg" /> : <PlayCircle size={80} className="text-white/80 drop-shadow-lg" />
                        )}
                        </AnimatePresence>
                    </div>
                    
                    <AnimatePresence>
                        {isPlayerHovered && (
                            <PlayerControls 
                                isAudioOnly={isAudioOnly} 
                                onToggleAudio={() => setIsAudioOnly(p => !p)} 
                            />
                        )}
                    </AnimatePresence>
                    
                    <motion.div 
                        className="absolute bottom-0 left-0 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isPlayerHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 right-4 text-white text-sm font-mono bg-black/50 px-2 py-1 rounded-md">
                        {formatTime(currentTime)} / {formatTime(currentSermon.duration)}
                        </div>
                        <div className="absolute bottom-0 left-0 h-1.5 bg-primary/30 w-full">
                        <div className="h-full bg-accent" style={{ width: `${(currentTime / currentSermon.duration) * 100}%` }}></div>
                        </div>
                    </motion.div>

                </div>
                </div>
                
                <div className='pt-4'>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">{currentSermon.title}</h1>
                    <p className="mt-2 text-lg text-foreground/80">{currentSermon.speaker}</p>
                    <p className="text-sm text-foreground/60">{currentSermon.date}</p>
                </div>

            </div>

            {/* Right Column: Content */}
            <div className="lg:col-span-2">
                <div className="mt-8">
                <div className="flex space-x-6 border-b-2 border-primary/20">
                    {(['notes', 'transcript', 'discuss'] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                        "pb-2 -mb-0.5 capitalize text-lg font-medium transition-colors",
                        activeTab === tab ? "text-primary" : "text-foreground/50 hover:text-primary/80"
                        )}
                    >
                        <div className="relative">
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                            className="absolute bottom-[-10px] left-0 right-0 h-1 bg-accent"
                            layoutId="underline"
                            />
                        )}
                        </div>
                    </button>
                    ))}
                </div>
                </div>
                
                <div className="mt-6 relative h-[500px]">
                    <AnimatePresence mode="wait">
                        <TabContent key={activeTab} isVisible={activeTab === 'notes'}>
                            <ScrollPaperTextarea
                            readOnly
                            className="h-full prose-h1:font-handwriting prose-h1:text-2xl prose-p:font-handwriting prose-p:text-2xl prose-ul:font-handwriting prose-ul:text-2xl prose-strong:font-handwriting prose-em:font-handwriting prose-blockquote:font-handwriting font-handwriting text-2xl resize-none leading-[2.5rem] overflow-y-auto"
                            value={notesContent}
                            />
                        </TabContent>
                        
                        <TabContent key={`${activeTab}-transcript`} isVisible={activeTab === 'transcript'}>
                            <div className="flex flex-col h-full">
                                <div className="relative mb-4">
                                    <Input placeholder="Search transcript..." className="pl-10" />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                </div>
                                <ScrollArea className="h-full pr-4">
                                    <div className="space-y-4">
                                        {currentSermon.transcript.map((item, index) => (
                                            <div 
                                                key={index} 
                                                onClick={() => handleTranscriptClick(item.time)}
                                                className={cn(
                                                    "flex gap-4 cursor-pointer p-2 rounded-md transition-all duration-300",
                                                    activeTranscriptIndex === index ? "bg-accent/20" : "hover:bg-primary/5"
                                                )}
                                            >
                                                <div className="font-mono text-sm text-accent font-semibold">{formatTime(item.time)}</div>
                                                <p className="text-foreground/90">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </TabContent>

                        <TabContent key={`${activeTab}-discuss`} isVisible={activeTab === 'discuss'}>
                            <div className="flex flex-col h-full bg-primary/5 rounded-lg p-4">
                                <ScrollArea className="flex-grow pr-4 -mr-4 mb-4" ref={chatContainerRef}>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <Avatar>
                                                <AvatarFallback>AI</AvatarFallback>
                                            </Avatar>
                                            <div className="bg-background rounded-lg p-3 max-w-[80%]">
                                                <p className="font-bold text-primary">AI Companion</p>
                                                <p className="text-sm text-foreground/90">Let's explore the themes from this message together. What's on your mind?</p>
                                            </div>
                                        </div>
                                        {messages.map((message) => (
                                            <div key={message.id} className={cn("flex items-start gap-4", message.role === 'user' && 'justify-end')}>
                                                {message.role === 'assistant' && (
                                                    <Avatar>
                                                        <AvatarFallback>AI</AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className={cn("rounded-lg p-3 max-w-[80%]", message.role === 'user' ? 'bg-accent text-accent-foreground' : 'bg-background')}>
                                                    {message.role === 'assistant' && <p className="font-bold text-primary">AI Companion</p>}
                                                    <p className="text-sm whitespace-pre-wrap">{message.text}{isAiResponding && message.id === messages[messages.length-1].id ? '...' : ''}</p>
                                                </div>
                                                {message.role === 'user' && (
                                                    <Avatar>
                                                        <AvatarFallback>U</AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                                <form onSubmit={handleAskAI} className="flex items-center gap-2 border-t pt-4 border-primary/20">
                                    <Input 
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        placeholder="Ask a question..."
                                        disabled={isAiResponding}
                                        className="flex-grow"
                                    />
                                    <Button type="submit" size="icon" disabled={isAiResponding || !userInput.trim()}>
                                        <ArrowRight />
                                    </Button>
                                </form>
                            </div>
                        </TabContent>
                    </AnimatePresence>
                </div>
            </div>
            </div>
        </main>
      </div>

      <Separator className="my-12" />

      {/* Section 2: The Speaker's Study */}
      <section className="speaker-study-section">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="speaker-portrait">
                    <Image
                        src="https://placehold.co/800x1000.png"
                        alt="Portrait of Dr. Evelyn Reed"
                        width={800}
                        height={1000}
                        className="rounded-lg object-cover"
                        data-ai-hint="pastor portrait warm"
                    />
                </div>
                <div className="speaker-info">
                    <h2 className="speaker-name">{currentSermon.speaker}</h2>
                    <p className="speaker-title">Lead Pastor</p>
                    <p className="speaker-bio">
                        Evelyn has served The Family Tent for over a decade, with a deep passion for unpacking God's grace in everyday life. She and her husband, David, love exploring Austin's hiking trails with their golden retriever, Charlie.
                    </p>
                    <div className="speaker-socials">
                        <a href="#" aria-label="Facebook"><Facebook /></a>
                        <a href="#" aria-label="Twitter"><Twitter /></a>
                        <a href="#" aria-label="Instagram"><Instagram /></a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Section 3: The Library Map (Sermon Series Context) */}
      <section className="series-context-section">
        <div className="container mx-auto px-4">
            <div className="series-header">
                <Image
                    src="https://placehold.co/1600x900.png"
                    alt="The Echo of Grace Series Graphic"
                    width={1600}
                    height={900}
                    className="series-graphic"
                    data-ai-hint="grace series art"
                />
            </div>
            <div className="series-info">
                <h2 className="series-title">The Echo of Grace</h2>
                <p className="series-description">
                    This series explores the profound and persistent nature of God's grace. It's not a one-time event, but a continuous, resonant echo that shapes our past, present, and future, inviting us into a deeper relationship with Him and with each other.
                </p>
            </div>
            <div className="series-message-list">
                <ul>
                    {seriesSermons.map((sermon) => (
                        <li key={sermon.id}>
                             <a
                                href={`/sermons?id=${sermon.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSermonClick(sermon);
                                }}
                                className={cn('series-message-item', { 'is-current': sermon.id === currentSermon.id })}
                            >
                                <span className="message-part">Part {sermon.part}</span>
                                <span className="message-title">{sermon.title}</span>
                                <span className="message-date">{sermon.date}</span>
                                <span className="message-status-dot"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </section>

      {/* Section 4: The Discovery Library */}
       <section className="discovery-library-section">
          <div className="container mx-auto">
              <h2 className="discovery-headline">Explore More on the Heart of Grace</h2>
              
              {/* Shelf 1: More from the Pulpit */}
              <div className="discovery-shelf">
                  <h3 className="shelf-title">More from the Pulpit</h3>
                  <div className="shelf-scroll-container">
                      <div className="sermon-shelf">
                          {relatedContent.messages.map(item => (
                              <div key={item.id} className="sermon-card">
                                  <div className="sermon-card-waveform">
                                      {/* Placeholder for AI Waveform */}
                                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                        <AudioLines className="w-16 h-16 text-primary/20"/>
                                      </div>
                                  </div>
                                  <div className="sermon-card-content">
                                      <h4 className="sermon-card-title">{item.title}</h4>
                                      <p className="sermon-card-speaker">{item.speaker}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Shelf 2: Deeper Readings */}
              <div className="discovery-shelf">
                  <h3 className="shelf-title">Deeper Readings</h3>
                  <div className="shelf-scroll-container">
                      <div className="article-shelf">
                          {relatedContent.articles.map(item => (
                              <div key={item.id} className="article-card">
                                  <Image src={item.image} alt={item.title} data-ai-hint={item.hint} fill className="article-card-image"/>
                                  <div className="article-card-overlay"/>
                                  <div className="article-card-content">
                                      <FileText className="article-card-icon"/>
                                      <h4 className="article-card-title">{item.title}</h4>
                                      <p className="article-card-read-time">{item.readTime}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Shelf 3: Continue the Conversation */}
              <div className="discovery-shelf">
                  <h3 className="shelf-title">Continue the Conversation</h3>
                  <div className="shelf-scroll-container">
                      <div className="podcast-shelf">
                          {relatedContent.podcasts.map(item => (
                              <div key={item.id} className="podcast-card">
                                  <div className="podcast-card-image-container">
                                    <Image src={item.image} alt={item.title} data-ai-hint={item.hint} fill className="podcast-card-image"/>
                                    <Headphones className="podcast-card-icon"/>
                                  </div>
                                  <div className="podcast-card-content">
                                      <h4 className="podcast-card-title">{item.title}</h4>
                                      <p className="podcast-card-listen-time">{item.listenTime}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Shelf 4: From Our Library */}
              <div className="discovery-shelf">
                  <h3 className="shelf-title">From Our Library</h3>
                  <div className="shelf-scroll-container">
                      <div className="book-shelf">
                          {relatedContent.books.map(item => (
                              <div key={item.id} className="book-card-container">
                                  <div className="book-card">
                                    <Image src={item.image} alt={item.title} data-ai-hint={item.hint} fill className="book-card-image"/>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
       </section>
      
      {/* Section 5: The Crossroads */}
      <section className="crossroads-section">
          <div className="container mx-auto px-4">
              <h2 className="crossroads-headline">How can we help you walk this out?</h2>
              <div className="crossroads-actions">
                  <Button asChild size="lg" variant="outline" className="crossroads-button">
                      <Link href="/connect/groups?topic=grace">Discuss This in Community</Link>
                  </Button>
                  <Button asChild size="lg" className="bg-accent hover:bg-accent/90 crossroads-button">
                      <Link href="/contact?subject=prayer">Talk About This Confidentially</Link>
                  </Button>
              </div>
          </div>
      </section>

      {/* Persistent Player */}
      <AnimatePresence>
        {isDocked && (
             <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "110%" }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed bottom-4 right-4 z-50 w-[350px] rounded-lg bg-background/80 backdrop-blur-md border border-border shadow-2xl overflow-hidden"
             >
                <div className="absolute top-1 right-1 z-10">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsDocked(false)}>
                        <X size={16} />
                    </Button>
                </div>

                <div className="p-2">
                  <div className="flex items-center gap-3">
                      <Image src={currentSermon.thumbnail} alt={currentSermon.title} width={64} height={64} className="rounded-md aspect-square object-cover" data-ai-hint="sermon church" />
                      <div className="flex-grow min-w-0">
                          <p className="font-bold text-foreground truncate">{currentSermon.title}</p>
                          <p className="text-sm text-muted-foreground truncate">{currentSermon.speaker}</p>
                      </div>
                      <button onClick={handlePlayPause}>
                          {isPlaying ? <PauseCircle size={32} className="text-primary"/> : <PlayCircle size={32} className="text-primary"/>}
                      </button>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full">
                  <div className="h-full bg-accent" style={{width: `${(currentTime/currentSermon.duration)*100}%`}}></div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

    