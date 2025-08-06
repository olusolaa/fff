

'use client';

import React, { useState, useRef, useEffect, useMemo, FormEvent, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import {
  Share2,
  Download,
  PlayCircle,
  PauseCircle,
  Search,
  ArrowRight,
  X,
  BookOpen,
  Video,
  AudioLines,
  Headphones,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { bibleStudyCompanion } from '@/ai/flows/ai-bible-study-companion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollPaperTextarea } from '@/components/ui/neumorphic';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import { SermonCard } from '@/components/shared/sermon-card';
import { AudioVisualizer } from '@/components/ui/audio-visualizer';


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
  hint?: string;
  seriesId: number;
  seriesPart: number;
}

interface SermonSeries {
  id: number;
  title: string;
  description: string;
  graphic: string;
  sermons: Sermon[];
  topic: string;
}

interface BlogPost {
  id: number;
  title: string;
  image: string;
  readTime: string;
}

interface PodcastEpisode {
    id: number;
    title: string;
    coverArt: string;
    duration: string;
}

interface Book {
    id: number;
    title: string;
    coverImage: string;
    chapter?: string;
}

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


const sermonData: Sermon[] = [
    {
        id: 1,
        title: 'The Echo of Grace',
        speaker: 'Dr. Evelyn Reed',
        date: 'October 26, 2023',
        thumbnail: 'https://placehold.co/1280x720/1a2a1a/f5f5f0',
        duration: 2714,
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
        ],
        seriesId: 1,
        seriesPart: 1,
    },
    {
        id: 2,
        title: 'The Unfailing Compass',
        speaker: 'Dr. Evelyn Reed',
        date: 'November 2, 2023',
        thumbnail: 'https://placehold.co/1280x720/1a2a1a/f5f5f0',
        duration: 2650,
        notes: 'Exploring how grace acts as our guide in life\'s most confusing seasons.',
        transcript: [{ time: 0, text: "Last week we talked about the echo of grace, and today we ask: how does that echo guide us?" }],
        seriesId: 1,
        seriesPart: 2,
        hint: 'grace compass'
    },
    {
        id: 3,
        title: 'The Lavish Banquet',
        speaker: 'Dr. Evelyn Reed',
        date: 'November 9, 2023',
        thumbnail: 'https://placehold.co/1280x720/1a2a1a/f5f5f0',
        duration: 2800,
        notes: 'Understanding the sheer abundance and generosity of God\'s grace.',
        transcript: [{ time: 0, text: "There is a seat for you at the table of grace, and it is a lavish banquet." }],
        seriesId: 1,
        seriesPart: 3,
        hint: 'grace banquet'
    },
    { id: 10, title: 'Beyond Deserving', speaker: 'Rev. Michael Chen', date: 'May 14, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 2500, notes: '', transcript: [], seriesId: 2, seriesPart: 1, hint: 'grace abstract' },
    { id: 11, title: 'The Currency of Heaven', speaker: 'Pastor Sarah Jones', date: 'June 1, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 2900, notes: '', transcript: [], seriesId: 3, seriesPart: 1, hint: 'heavenly light' },
    { id: 12, title: 'Held, Not Perfect', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 2600, notes: '', transcript: [], seriesId: 4, seriesPart: 1, hint: 'gentle hands' },
    { id: 13, title: 'The Scandal of Mercy', speaker: 'Rev. Michael Chen', date: 'August 5, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 3100, notes: '', transcript: [], seriesId: 2, seriesPart: 2, hint: 'mercy justice' },
    { id: 14, title: 'Freely Given, Freely Give', speaker: 'Pastor Sarah Jones', date: 'September 10, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 2400, notes: '', transcript: [], seriesId: 3, seriesPart: 2, hint: 'giving hands' },
    { id: 15, title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 2750, notes: '', transcript: [], seriesId: 4, seriesPart: 2, hint: 'strength hope' },
    { id: 16, title: 'Grace in the Ruins', speaker: 'Rev. Michael Chen', date: 'October 15, 2023', thumbnail: 'https://placehold.co/1280x720/a7d1ab/1a2a1a', duration: 2850, notes: '', transcript: [], seriesId: 2, seriesPart: 3, hint: 'ruins hope' },
];

const relatedPulpitData: Sermon[] = [
  { id: 10, title: 'Beyond Deserving', speaker: 'Rev. Michael Chen', date: 'May 14, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2500, notes: '', transcript: [], seriesId: 2, seriesPart: 1, hint: 'grace abstract' },
  { id: 11, title: 'The Currency of Heaven', speaker: 'Pastor Sarah Jones', date: 'June 1, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2900, notes: '', transcript: [], seriesId: 3, seriesPart: 1, hint: 'heavenly light' },
  { id: 12, title: 'Held, Not Perfect', speaker: 'Dr. Evelyn Reed', date: 'July 22, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2600, notes: '', transcript: [], seriesId: 4, seriesPart: 1, hint: 'gentle hands' },
  { id: 13, title: 'The Scandal of Mercy', speaker: 'Rev. Michael Chen', date: 'August 5, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 3100, notes: '', transcript: [], seriesId: 2, seriesPart: 2, hint: 'mercy justice' },
  { id: 14, title: 'Freely Given, Freely Give', speaker: 'Pastor Sarah Jones', date: 'September 10, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2400, notes: '', transcript: [], seriesId: 3, seriesPart: 2, hint: 'giving hands' },
  { id: 15, title: 'The Strongest Weakness', speaker: 'Dr. Evelyn Reed', date: 'October 1, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2750, notes: '', transcript: [], seriesId: 4, seriesPart: 2, hint: 'strength hope' },
  { id: 16, title: 'Grace in the Ruins', speaker: 'Rev. Michael Chen', date: 'October 15, 2023', thumbnail: 'https://placehold.co/600x400/a7d1ab/1a2a1a', duration: 2850, notes: '', transcript: [], seriesId: 2, seriesPart: 3, hint: 'ruins hope' },
];

const allSermons = [...sermonData];


const seriesData: SermonSeries[] = [
    {
        id: 1,
        title: 'The Echo of Grace',
        description: 'This series explores the profound and persistent nature of God\'s grace. It\'s not just a single act, but a continuous, resonant echo that shapes our past, present, and future. We will journey through scripture to understand how this amazing grace saves us, sustains us, and sends us out to be echoes of that same love in the world.',
        graphic: 'https://placehold.co/1600x900/1a2a1a/f5f5f0',
        sermons: allSermons.filter(s => s.seriesId === 1),
        topic: 'the Nature of Grace',
    },
    {
        id: 2,
        title: 'Foundations',
        description: 'What are the unshakable pillars of our faith? This series goes back to the basics, exploring the foundational truths that anchor us in a shifting world. From the nature of God to the authority of Scripture, these messages are designed to build a solid foundation for a lasting faith.',
        graphic: 'https://placehold.co/1600x900/a7d1ab/1a2a1a',
        sermons: allSermons.filter(s => s.seriesId === 2),
        topic: 'Core Christian Beliefs',
    },
    {
        id: 3,
        title: 'Kingdom Economics',
        description: 'Jesus had a lot to say about money and possessions. This series confronts our modern assumptions about wealth and generosity, exploring the radical, upside-down economy of the Kingdom of God. It\'s a call to view our resources not as our own, but as tools for a greater purpose.',
        graphic: 'https://placehold.co/1600x900/a7d1ab/1a2a1a',
        sermons: allSermons.filter(s => s.seriesId === 3),
        topic: 'Generosity and Stewardship',
    },
    {
        id: 4,
        title: 'Paradox',
        description: 'The way of Jesus is often a paradox: the first shall be last, the weak are strong, and we find our life by losing it. This series dives into the beautiful and challenging paradoxes of the Christian faith, finding profound truth in apparent contradictions.',
        graphic: 'https://placehold.co/1600x900/a7d1ab/1a2a1a',
        sermons: allSermons.filter(s => s.seriesId === 4),
        topic: 'the Paradoxes of Faith',
    }
];

const blogData: BlogPost[] = [
  { id: 1, title: 'Grace Isn\'t Fair, and That\'s the Point', image: 'https://placehold.co/800x600/2D5A3D/f5f5f0?text=Grace', readTime: '5 min read', },
  { id: 2, title: 'When You Don\'t Feel Forgiven: A Practical Guide', image: 'https://placehold.co/800x600/4A6FA5/f5f5f0?text=Forgiveness', readTime: '7 min read', },
  { id: 3, title: 'The Three Words that Change Everything', image: 'https://placehold.co/800x600/7B4397/f5f5f0?text=Hope', readTime: '4 min read', },
  { id: 4, title: 'A Theology of Second Chances', image: 'https://placehold.co/800x600/C97B84/f5f5f0?text=Renewal', readTime: '6 min read', },
];

const podcastData: PodcastEpisode[] = [
    { id: 1, title: 'Evelyn Reed on the Weight of Grace', coverArt: 'https://placehold.co/400x400/1A535C/f5f5f0?text=Podcast', duration: '28 min listen' },
    { id: 2, title: 'How to Parent with Grace (and Not Lose Your Mind)', coverArt: 'https://placehold.co/400x400/4ECDC4/1a2a1a?text=Family', duration: '45 min listen' },
    { id: 3, title: 'Roundtable: Grace, Justice, and the Modern Church', coverArt: 'https://placehold.co/400x400/F7FFF7/1a2a1a?text=Discussion', duration: '52 min listen' },
    { id: 4, title: 'A Story of Radical Forgiveness', coverArt: 'https://placehold.co/400x400/FF6B6B/f5f5f0?text=Stories', duration: '18 min listen' },
];

const bookData: Book[] = [
    { id: 1, title: 'The Echo of Grace', coverImage: 'https://placehold.co/400x600/22577A/f5f5f0?text=GRACE', chapter: 'Chapter 1: The First Sound' },
    { id: 2, title: 'Hope in the Ruins', coverImage: 'https://placehold.co/400x600/38A3A5/f5f5f0?text=HOPE' },
    { id: 3, title: 'A Faith That Lasts', coverImage: 'https://placehold.co/400x600/57CC99/1a2a1a?text=FAITH', chapter: 'Chapter 5: Everyday Mercy' },
];

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

function SanctuaryMediaHubContent() {
  const searchParams = useSearchParams();
  const sermonId = searchParams.get('sermonId');

  const initialSermon = useMemo(() => {
    if (sermonId) {
      const selectedSermon = allSermons.find(s => s.id === parseInt(sermonId));
      return selectedSermon || sermonData[0];
    }
    return sermonData[0];
  }, [sermonId]);

  const [currentSermon, setCurrentSermon] = useState<Sermon>(initialSermon);
  const [activeTab, setActiveTab] = useState<Tab>('notes');
  const [isPlayerHovered, setPlayerHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioOnly, setIsAudioOnly] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDocked, setIsDocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [notesContent, setNotesContent] = useState(currentSermon.notes || '');
  const [waveformData, setWaveformData] = useState<number[]>([]);

  const currentSeries = useMemo(() => seriesData.find(s => s.id === currentSermon.seriesId), [currentSermon]);
  
  const videoRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setWaveformData(Array.from({ length: 150 }, () => Math.random() * 0.8 + 0.2));
  }, [currentSermon.id]);


  const activeTranscriptIndex = useMemo(() => {
    const reversedIndex = currentSermon.transcript.slice().reverse().findIndex(item => item.time <= currentTime);
    if (reversedIndex === -1) return -1;
    return currentSermon.transcript.length - 1 - reversedIndex;
  }, [currentTime, currentSermon.transcript]);

  useEffect(() => {
    const handleScroll = () => {
        if (videoRef.current) {
            const { bottom } = videoRef.current.getBoundingClientRect();
            setIsDocked(bottom < 0);
        }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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
  
  useEffect(() => {
    setNotesContent('');
    if (activeTab === 'notes') {
      if (!currentSermon.notes || currentSermon.notes.trim() === '') {
        setNotesContent('No notes available for this sermon.');
        return;
      }
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
  }, [activeTab, currentSermon.id, currentSermon.notes]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages])
  
  useEffect(() => {
    const newSermon = sermonId ? allSermons.find(s => s.id === parseInt(sermonId)) || sermonData[0] : sermonData[0];
    setCurrentSermon(newSermon);
    setNotesContent(newSermon.notes || '');
  }, [sermonId]);


  const handleSermonClick = (sermon: Sermon) => {
    setCurrentSermon(sermon);
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveTab('notes'); 
    setMessages([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleTranscriptClick = (time: number) => {
    setCurrentTime(time);
    if (!isPlaying) setIsPlaying(true);
  };

  const handleAskAI = async (e: FormEvent) => {
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
    <div className={cn("bg-background text-foreground min-h-screen transition-all duration-700 ease-in-out", { 'pb-28 md:pb-24': isDocked })}>
      <main className="mt-20 container mx-auto px-4 py-8">
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
                
                <AnimatePresence>
                  {isPlayerHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? <PauseCircle size={80} className="text-white/80 drop-shadow-lg" /> : <PlayCircle size={80} className="text-white/80 drop-shadow-lg" />}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                    {(isPlayerHovered) && (
                        <PlayerControls 
                            isAudioOnly={isAudioOnly} 
                            onToggleAudio={() => setIsAudioOnly(p => !p)} 
                        />
                    )}
                </AnimatePresence>
                
                <AnimatePresence>
                    {isPlayerHovered && (
                        <motion.div 
                            className="absolute bottom-0 left-0 w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
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
                    )}
                </AnimatePresence>
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
                          className="h-full prose-h1:font-handwriting prose-h1:text-4xl prose-p:font-handwriting prose-p:text-2xl prose-ul:font-handwriting prose-ul:text-2xl prose-strong:font-handwriting prose-em:font-handwriting prose-blockquote:font-handwriting font-handwriting text-2xl resize-none leading-[2.5rem] overflow-y-auto"
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

        {/* Section 3: The Library Map */}
        {currentSeries && (
        <section className="mt-24 container mx-auto px-4">
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-xl">
                <Image src={currentSeries.graphic} alt={`${currentSeries.title} series graphic`} layout="fill" objectFit="cover" data-ai-hint="abstract spiritual" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-8">
                    <div className="max-w-4xl">
                        <h2 className="font-headline text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{currentSeries.title}</h2>
                        <p className="mt-4 text-lg text-white/90 drop-shadow-md">{currentSeries.description}</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <div className="space-y-2">
                    {currentSeries.sermons.sort((a, b) => a.seriesPart - b.seriesPart).map(sermon => (
                        <div
                            key={sermon.id}
                            onClick={() => handleSermonClick(sermon)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200",
                                sermon.id === currentSermon.id ? "bg-primary/10" : "hover:bg-primary/5"
                            )}
                        >
                            <div className='flex-grow flex items-center gap-4'>
                                <span className="font-mono text-muted-foreground w-[60px] text-left">Part {sermon.seriesPart}</span>
                                <div className="flex-grow">
                                    <h3 className={cn("font-bold", sermon.id === currentSermon.id ? 'text-primary' : 'text-foreground hover:underline')}>{sermon.title}</h3>
                                    <p className="text-sm text-muted-foreground">{sermon.date}</p>
                                </div>
                            </div>
                            {sermon.id === currentSermon.id && (
                                <AudioLines className="text-accent h-6 w-6 animate-pulse" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
        )}

        {/* Section 4: The Discovery Library */}
        <section className="mt-24 py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="font-headline text-4xl font-bold text-primary mb-16 text-center">
                    Explore More on {currentSeries?.topic || "Faith"}
                </h2>

                {/* Shelf 1: More from the Pulpit */}
                <div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">More from the Pulpit</h3>
                    <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
                        {relatedPulpitData.map((item) => (
                            <div key={item.id} className="flex-shrink-0 w-80 md:w-1/3 lg:w-1/4">
                               <SermonCard sermon={item} onSermonClick={handleSermonClick} />
                            </div>
                        ))}
                    </div>
                </div>

                 {/* Shelf 2: Deeper Readings */}
                 <div className="mt-32">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Deeper Readings</h3>
                    <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
                        {blogData.map((post) => (
                            <motion.div 
                                key={post.id} 
                                className="flex-shrink-0 w-96 lg:w-[480px]"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative overflow-hidden rounded-lg cursor-pointer h-full shadow-md hover:shadow-xl transition-all duration-300 group">
                                    <div className="aspect-[8/6] relative">
                                        <Image 
                                            src={post.image} 
                                            alt={post.title} 
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                            data-ai-hint="reading book"
                                        />
                                        
                                        {/* Hover Gradient Overlay */}
                                        <motion.div 
                                            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        />
                                        
                                        {/* Title and Read Time - Hidden by default, shown on hover */}
                                        <motion.div 
                                            className="absolute bottom-0 left-0 p-6 text-white"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileHover={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            <h3 className="font-bold text-xl">{post.title}</h3>
                                            <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                                                <BookOpen size={16}/>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Shelf 3: Continue the Conversation */}
                <div className="mt-32">
                    <h3 className="text-2xl font-bold text-foreground mb-6">Continue the Conversation</h3>
                     <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 scrollbar-hide">
                        {podcastData.map((episode) => (
                            <motion.div 
                                key={episode.id} 
                                className="flex-shrink-0 w-72"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative aspect-square overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 group">
                                    <Image 
                                        src={episode.coverArt} 
                                        alt={episode.title} 
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                        data-ai-hint="podcast microphone"
                                    />
                                    
                                    {/* Dark Overlay on Hover */}
                                    <motion.div 
                                        className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    />
                                    
                                    {/* Play Icon - Hidden by default, shown on hover */}
                                    <motion.div 
                                        className="absolute inset-0 flex flex-col items-center justify-center text-white"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        <div className="bg-accent rounded-full p-4 mb-4">
                                            <Play size={32} fill="white" className="ml-1" />
                                        </div>
                                        <h3 className="font-bold text-lg text-center px-4 line-clamp-2">{episode.title}</h3>
                                        <div className="flex items-center gap-2 mt-2 text-sm opacity-90">
                                            <Headphones size={16} />
                                            <span>{episode.duration}</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                 {/* Shelf 4: From Our Library */}
                <div className="mt-32 mb-8">
                    <h3 className="text-2xl font-bold text-foreground mb-6">From Our Library</h3>
                    <div className="flex overflow-x-auto space-x-8 pb-4 -mx-4 px-4 scrollbar-hide">
                        {bookData.map((book) => (
                            <motion.div 
                                key={book.id} 
                                className="flex-shrink-0 w-56"
                                whileHover={{ scale: 1.05, z: 10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="relative cursor-pointer group">
                                    <div className="book-3d-container relative">
                                        <Image 
                                            src={book.coverImage} 
                                            alt={book.title} 
                                            width={400} 
                                            height={600} 
                                            className="w-full h-auto object-contain rounded-r-sm shadow-2xl" 
                                            data-ai-hint="book cover"
                                        />
                                        
                                        {/* Dark Overlay with Book Info on Hover */}
                                        <motion.div 
                                            className="absolute inset-0 bg-black/80 rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <h3 className="font-bold text-xl text-white mb-2">{book.title}</h3>
                                            <p className="text-white/80 text-sm mb-3">by Dr. Evelyn Reed</p>
                                            <p className="text-white/70 text-xs line-clamp-3">
                                                A profound exploration of grace that echoes through every aspect of our lives, 
                                                revealing how God's unmerited favor transforms our past, present, and future.
                                            </p>
                                            {book.chapter && <p className="text-accent text-sm mt-3 font-medium">{book.chapter}</p>}
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>

        {/* Section 5: The Crossroads */}
        <section className="py-20 bg-primary">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-headline text-3xl font-bold text-primary-foreground">
                    How can we help you walk this out?
                </h2>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="secondary" size="lg" className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30">
                        Discuss This in Community
                    </Button>
                    <Button variant="outline" size="lg" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Talk About This Confidentially
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

export default function SanctuaryMediaHub() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SanctuaryMediaHubContent />
        </Suspense>
    )
}
