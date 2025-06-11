import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Map, ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const sampleDestinations = [
  {
    id: "india",
    name: "Delhi, India",
    description: "The city of lights, love, and iconic landmarks. Explore charming streets, world-class museums, and exquisite cuisine.",
    image: "../src/images/d1.jpg",
    aiHint: "Paris Eiffel Tower",
    tags: ["India", "City Break", "Culture"],
  },
  {
    id: "bali",
    name: "Bali, Indonesia",
    description: "An island paradise known for its volcanic mountains, coral reefs, iconic rice paddies, and spiritual retreats.",
    image: "../src/images/d2.jpg",
    aiHint: "Bali temple",
    tags: ["Asia", "Beach", "Nature", "Spirituality", "Surfing"],
  },
  {
    id: "rome",
    name: "Rome, Italy",
    description: "A city steeped in history, from the Colosseum to the Vatican. Indulge in pasta, gelato, and ancient wonders.",
    image: "../src/images/d3.jpg",
    aiHint: "Rome Colosseum",
    tags: ["Europe", "History", "Culture", "Food"],
  },
  {
    id: "new-york",
    name: "New York City, USA",
    description: "The city that never sleeps. Experience Broadway, Central Park, diverse neighborhoods, and endless energy.",
    image: "../src/images/d4.jpg",
    aiHint: "NewYork skyline",
    tags: ["North America", "City Break", "Entertainment", "Culture"],
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu, Peru",
    description: "An ancient Incan citadel set high in the Andes Mountains, offering breathtaking views and mystical history.",
    image: "../src/images/d5.jpg",
    aiHint: "MachuPicchu mountains",
    tags: ["South America", "Adventure", "History", "Nature", "Hiking"],
  },
  {
    id: "tokyo",
    name: "Tokyo, Japan",
    description: "A dazzling metropolis where modern skyscrapers meet traditional temples. Experience unique culture, food, and technology.",
    image: "../src/images/d6.jpg",
    aiHint: "Tokyo crossing",
    tags: ["Asia", "City Break", "Culture", "Food", "Technology"],
  },
];

export default function DestinationsPage() {
  return (
    <div className="space-y-10 py-8">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link to="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
         <h1 className="text-4xl font-headline text-primary-foreground/90 flex items-center justify-center">
            <Map className="mr-3 h-10 w-10 text-accent" /> Explore Destinations
        </h1>
        {/* Placeholder for potential future filter/search */}
        <div></div>
      </div>
      
      <p className="text-center text-lg text-muted-foreground font-body max-w-2xl mx-auto">
        Journey through our curated list of destinations. Click on any location to (eventually) see related travel stories, tips, and guides from our community.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sampleDestinations.map((destination) => (
          <Card key={destination.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <CardHeader className="p-0 relative">
            <img
                src={destination.image}
                alt={destination.name}
                data-ai-hint={destination.aiHint}
                width={600}
                height={400}
                className="object-cover aspect-[16/10] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent w-full p-4">
                <CardTitle className="text-2xl font-headline text-white flex items-center">
                  <MapPin className="mr-2 h-6 w-6" /> {destination.name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardDescription className="font-body text-foreground/80 mb-3 h-20 overflow-hidden">
                {destination.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 mb-4">
                {destination.tags.slice(0,3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">{tag}</span>
                ))}
              </div>
              <Button variant="outline" className="w-full" disabled>
                View Stories (Coming Soon)
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
