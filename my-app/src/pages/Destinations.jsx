import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 'paris',
    name: 'Paris, France',
    description: 'The City of Light beckons with its iconic landmarks, world-class cuisine, and romantic atmosphere.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    tags: ['Europe', 'City Break', 'Romance', 'Culture']
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    description: 'An island paradise known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
    tags: ['Asia', 'Beach', 'Nature', 'Spirituality']
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    description: 'A dazzling blend of traditional culture and cutting-edge technology, Tokyo offers endless discoveries.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    tags: ['Asia', 'Culture', 'Food', 'Technology']
  },
  {
    id: 'new-york',
    name: 'New York City, USA',
    description: 'The city that never sleeps offers iconic landmarks, world-famous entertainment, and diverse neighborhoods.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    tags: ['North America', 'City Break', 'Culture', 'Entertainment']
  },
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    description: 'Famous for its stunning sunsets, whitewashed buildings with blue domes, and volcanic beaches.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    tags: ['Europe', 'Beach', 'Romance', 'Nature']
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    description: 'A futuristic city rising from the desert, featuring stunning architecture and luxury experiences.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    tags: ['Middle East', 'Luxury', 'Shopping', 'Adventure']
  }
];

const Destinations = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-display font-bold mb-4">Popular Destinations</h1>
      <p className="text-gray-600 mb-12">Explore our curated list of amazing travel destinations</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((destination) => (
          <div key={destination.id} className="card group">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
              <p className="text-gray-600 mb-4">{destination.description}</p>
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
