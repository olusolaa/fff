"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MinistryHub {
  slug: string;
  title: string;
  subtitle: string;
  heroContent: React.ReactNode;
  theme: "light" | "dark";
  link: string;
}

const hubs: MinistryHub[] = [
  {
    slug: "marriage",
    title: "Building a Love That Lasts",
    subtitle:
      "Guidance and community for every stage of your journey together.",
    heroContent: (
      <Image
        src="/images/couples.jpg"
        alt="Couples laughing together"
        layout="fill"
        objectFit="cover"
        className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
        data-ai-hint="happy couples community"
      />
    ),
    theme: "dark",
    link: "/programs/marriage",
  },
  {
    slug: "youth",
    title: "Find Your Crew. Find Your Purpose.",
    subtitle: "A place to belong, grow, and make a difference.",
    heroContent: (
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/youth.jpg"
          alt="Youth group"
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
          data-ai-hint="energetic youth group"
        />
      </div>
    ),
    theme: "dark",
    link: "/programs/youth",
  }
];
const hubs2: MinistryHub[] = [

  {
    slug: "singles",
    title: "Wholehearted & Seen",
    subtitle: "Navigating life and faith as a single adult.",
    heroContent: (
      <Image
        src="/images/single.jpg"
        alt="Single person looking content"
        layout="fill"
        objectFit="cover"
        className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
        data-ai-hint="content person alone"
      />
    ),
    theme: "light",
    link: "/archive?category=Singles%20Club",
  },
  {
    slug: "family",
    title: "Raising a Generation of Faith",
    subtitle: "Resources and support for thriving families.",
    heroContent: (
      <Image
        src="/images/family.jpg"
        alt="Family playing together"
        layout="fill"
        objectFit="cover"
        className="group-hover:scale-105 transition-transform duration-700 ease-in-out"
        data-ai-hint="happy family playing"
      />
    ),
    theme: "light",
    link: "/archive?category=Family%20Life",
  },
];

const MinistryHubCard = ({ hub }: { hub: MinistryHub }) => {
  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative aspect-[4/3] md:aspect-video lg:aspect-[3/2] overflow-hidden rounded-xl group cursor-pointer w-[80vw] max-w-md flex-shrink-0 lg:w-full lg:max-w-none"
    >
      <Link href={hub.link} passHref>
        <div className="w-full h-full">
          {hub.heroContent}
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-end p-8 md:p-12",
              hub.theme === "dark"
                ? "bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white"
                : "bg-gradient-to-t from-background/70 via-background/40 to-transparent text-foreground"
            )}
          >
            <div className="max-w-xl">
              <h2 className="font-headline text-2xl md:text-3xl lg:text-3xl font-bold drop-shadow-md">
                {hub.title}
              </h2>
              <p className="mt-2 text-sm md:text-sm drop-shadow">
                {hub.subtitle}
              </p>
              <Button
                variant={hub.theme === "dark" ? "secondary" : "default"}
                className="mt-6"
              >
                Enter the Hub <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function MinistryHubsPage() {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main>
        <header className="text-center py-20 md:py-32 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-headline text-3xl mt-20 md:text-5xl font-bold text-primary"
          >
            Find Your Place in the Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-4 text-sm text-foreground/80 max-w-2xl mx-auto"
          >
            Our church is a home with many rooms. Each ministry is a unique
            space, designed to meet you where you are and help you grow. Explore
            our hubs and find the community that's waiting for you.
          </motion.p>
        </header>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 pb-20 flex overflow-x-auto gap-8 lg:grid lg:grid-cols-2 lg:gap-12 scrollbar-hide"
        >
          {" "}
          {hubs.map((hub) => (
            <MinistryHubCard key={hub.slug} hub={hub} />
          ))}{" "}
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="container mx-auto px-4 pb-20 flex overflow-x-auto gap-8 lg:grid lg:grid-cols-2 lg:gap-12 scrollbar-hide"
        >
          {" "}
          {hubs2.map((hub) => (
            <MinistryHubCard key={hub.slug} hub={hub} />
          ))}{" "}
        </motion.div>
      </main>
    </div>
  );
}
