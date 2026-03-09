import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, MapPin, Compass, Camera, PenLine } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const destinations = [
    { id: 'paris', name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800', description: 'The City of Light' },
    { id: 'bali', name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', description: 'Island of the Gods' },
    { id: 'tokyo', name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', description: 'Where Tradition Meets Future' },
  ];

  const features = [
    { icon: Compass, title: 'Expert Guides', description: 'Local experts sharing insider knowledge' },
    { icon: MapPin, title: 'Hidden Gems', description: 'Discover off-the-beaten-path destinations' },
    { icon: Camera, title: 'Travel Stories', description: 'Real experiences from fellow travelers' },
  ];

  const userName = user?.email?.split('@')[0] || user?.user_metadata?.full_name || 'Traveler';

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600)' }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Explore the World with Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover extraordinary destinations, share travel stories, and connect with fellow adventurers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <>
                <Link to="/blogs" className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center">
                  Browse Blogs <ArrowRight className="ml-2" />
                </Link>
                <Link to="/create-post" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                  <PenLine className="mr-2 h-5 w-5" /> Write a Post
                </Link>
              </>
            ) : (
              <>
                <Link to="/blogs" className="btn-primary text-lg px-8 py-3 inline-flex items-center justify-center">
                  Start Exploring <ArrowRight className="ml-2" />
                </Link>
                <Link to="/register" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                  Join Community
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-gray-600 text-center mb-12">Explore our most loved destinations</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  <p className="text-gray-600">{destination.description}</p>
                  <Link to={`/destinations`} className="text-primary-600 font-medium mt-4 inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {user ? (
            <>
              <h2 className="text-3xl font-display font-bold mb-4">Welcome back, {userName}!</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Continue sharing your travel experiences with the world.
              </p>
              <Link to="/create-post" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                <PenLine className="mr-2 h-5 w-5" /> Write a New Post
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-display font-bold mb-4">Ready to Start Your Adventure?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join our community of travelers and share your experiences with the world.
              </p>
              <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
                Get Started Today
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
