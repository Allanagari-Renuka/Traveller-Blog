import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Sparkles, ArrowLeft, Mountain, Utensils, Palette, Backpack, Building, Anchor } from "lucide-react";
import { Link } from "react-router-dom";

const sampleExperiences = [
  {
    id: "adventure-travel",
    name: "Adventure Travel",
    description: "Thrilling escapades from mountain treks to jungle expeditions. For the adrenaline seekers.",
    icon: Mountain,
    image: "../images/e1.jpg",
    aiHint: "mountain climbing adventure",
    tags: ["Hiking", "Trekking", "Extreme Sports", "Exploration"],
  },
  {
    id: "culinary-journeys",
    name: "Culinary Journeys",
    description: "Explore the world one bite at a time. Discover local flavors, cooking classes, and food markets.",
    icon: Utensils,
    image: "../images/e2.jpg",
    aiHint: "food market colorful",
    tags: ["Foodie", "Local Cuisine", "Cooking", "Street Food"],
  },
  {
    id: "cultural-immersion",
    name: "Cultural Immersion",
    description: "Dive deep into local traditions, festivals, and heritage sites. Connect with communities.",
    icon: Palette,
    image: "../images/e3.jpg",
    aiHint: "cultural festival dance",
    tags: ["Heritage", "Traditions", "Festivals", "Local Life"],
  },
  {
    id: "solo-expeditions",
    name: "Solo Expeditions",
    description: "Journeys of self-discovery. Tips, guides, and stories for the independent traveler.",
    icon: Backpack,
    image: "../images/e4.jpg",
    aiHint: "solo traveler backpack",
    tags: ["Solo Travel", "Independence", "Backpacking", "Self-Discovery"],
  },
  {
    id: "urban-explorations",
    name: "Urban Explorations",
    description: "Discover the hidden gems and iconic landmarks of the world's most vibrant cities.",
    icon: Building,
    image: "../images/e5.jpg",
    aiHint: "city street art",
    tags: ["City Break", "Architecture", "Nightlife", "Urban Life"],
  },
  {
    id: "coastal-retreats",
    name: "Coastal Retreats",
    description: "Relaxing beach holidays, sailing adventures, and underwater explorations by the sea.",
    icon: Anchor,
    image: "../images/e6.jpg",
    aiHint: "beach tropical relax",
    tags: ["Beach", "Sailing", "Diving", "Relaxation", "Ocean"],
  },
];

export default function ExperiencesPage() {
  return (
    <div className="space-y-10 py-8">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        <h1 className="text-4xl font-headline text-primary-foreground/90 flex items-center justify-center">
            <Sparkles className="mr-3 h-10 w-10 text-accent" /> Travel Experiences
        </h1>
        <div></div> {/* Placeholder for potential future filter/search */}
      </div>

      <p className="text-center text-lg text-muted-foreground font-body max-w-2xl mx-auto">
        Find travel stories and inspiration based on the type of experience you're seeking. From adrenaline-pumping adventures to serene cultural immersions.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleExperiences.map((experience) => (
          <Card key={experience.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <CardHeader className="p-0 relative">
               <img
                src={experience.image}
                alt={experience.name}
                data-ai-hint={experience.aiHint}
                width={600}
                height={400}
                className="object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
                <experience.icon className="h-16 w-16 text-white mb-3 opacity-90 group-hover:opacity-100 transition-opacity" />
                <CardTitle className="text-2xl font-headline text-white">{experience.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="font-body text-foreground/80 mb-3 h-20 overflow-hidden">
                {experience.description}
              </CardDescription>
               <div className="flex flex-wrap gap-2 mb-4">
                {experience.tags.slice(0,3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">{tag}</span>
                ))}
              </div>
              <Button variant="outline" className="w-full" disabled>
                Find Stories (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
