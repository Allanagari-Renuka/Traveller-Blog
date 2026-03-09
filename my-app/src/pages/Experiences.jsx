import { useState } from 'react';
import { Search, Compass, Utensils, Sparkles, Landmark, MapPin } from 'lucide-react';

const Experiences = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Experiences', icon: Compass },
    { id: 'adventure', name: 'Adventure', icon: MapPin },
    { id: 'culinary', name: 'Culinary', icon: Utensils },
    { id: 'wellness', name: 'Wellness', icon: Sparkles },
    { id: 'cultural', name: 'Cultural', icon: Landmark },
  ];

  const experiences = [
    {
      id: 'adventure',
      category: 'adventure',
      name: 'Adventure Travel',
      description: 'Get your adrenaline pumping with thrilling adventures from mountain treks to jungle expeditions.',
      image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800',
      location: 'Worldwide',
      duration: '3-14 days',
      price: '$500 - $3000',
      tags: ['Hiking', 'Trekking', 'Extreme Sports', 'Exploration']
    },
    {
      id: 'culinary',
      category: 'culinary',
      name: 'Culinary Journeys',
      description: 'Explore the world one bite at a time through local cuisines, cooking classes, and food tours.',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      location: 'Italy, Thailand, Mexico',
      duration: '5-10 days',
      price: '$800 - $2500',
      tags: ['Foodie', 'Local Cuisine', 'Cooking', 'Street Food']
    },
    {
      id: 'wellness',
      category: 'wellness',
      name: 'Wellness Retreats',
      description: 'Rejuvenate your mind, body, and soul with yoga retreats, spa treatments, and meditation.',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
      location: 'Bali, India, Costa Rica',
      duration: '3-14 days',
      price: '$600 - $4000',
      tags: ['Yoga', 'Spa', 'Meditation', 'Relaxation']
    },
    {
      id: 'cultural',
      category: 'cultural',
      name: 'Cultural Immersion',
      description: 'Deep dive into local traditions, festivals, and historical sites around the world.',
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
      location: 'Japan, Peru, Egypt',
      duration: '7-21 days',
      price: '$1000 - $5000',
      tags: ['History', 'Traditions', 'Festivals', 'Heritage']
    },
    {
      id: 'hiking',
      category: 'adventure',
      name: 'Mountain Treks',
      description: 'Conquer breathtaking peaks and discover hidden alpine villages on unforgettable hiking journeys.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      location: 'Swiss Alps, Nepal, Patagonia',
      duration: '7-21 days',
      price: '$1500 - $6000',
      tags: ['Hiking', 'Mountains', 'Nature', 'Camping']
    },
    {
      id: 'safari',
      category: 'adventure',
      name: 'Wildlife Safaris',
      description: 'Witness the Big Five and more in their natural habitat with expert guides.',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
      location: 'Kenya, Tanzania, South Africa',
      duration: '5-12 days',
      price: '$2000 - $8000',
      tags: ['Wildlife', 'Safari', 'Photography', 'Nature']
    },
  ];

  const filteredExperiences = experiences.filter(exp => {
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          exp.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
          Travel <span className="text-primary-600">Experiences</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover extraordinary ways to explore the world
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search experiences..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 border border-gray-200'
            }`}
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </button>
        ))}
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExperiences.map((experience) => (
          <div 
            key={experience.id} 
            className="card group overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img 
                src={experience.image} 
                alt={experience.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {experience.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {experience.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {experience.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {experience.location}
                </span>
                <span>•</span>
                <span>{experience.duration}</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-lg font-bold text-primary-600">
                  {experience.price}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {experience.tags.slice(0, 2).map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredExperiences.length === 0 && (
        <div className="text-center py-16">
          <Compass className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No experiences found</h3>
          <p className="text-gray-600">Try adjusting your search or filter</p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Share Your Experience</h2>
        <p className="text-primary-100 mb-6">Have a travel experience to share? Create a post and inspire others!</p>
        <a 
          href="/create-post" 
          className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
        >
          Share Your Story
        </a>
      </div>
    </div>
  );
};

export default Experiences;
