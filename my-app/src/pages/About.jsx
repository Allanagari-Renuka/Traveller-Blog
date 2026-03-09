import { Link } from 'react-router-dom';
import { MapPin, Users, Globe, Heart, ArrowRight, Star } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: MapPin, value: '500+', label: 'Destinations' },
    { icon: Users, value: '10K+', label: 'Travelers' },
    { icon: Heart, value: '5K+', label: 'Stories Shared' },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
    { name: 'Michael Chen', role: 'Head of Content', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
    { name: 'Emma Williams', role: 'Community Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200' },
  ];

  const testimonials = [
    { name: 'David Kumar', text: 'Best travel blog ever! Found amazing hidden gems through this platform.', rating: 5 },
    { name: 'Lisa Anderson', text: 'The community is so supportive and the content is top-notch!', rating: 5 },
    { name: 'James Wilson', text: 'Got inspired to visit Bali after reading the blog posts. Amazing!', rating: 5 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-600/80"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            About Boundless Horizons
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90">
            Your gateway to extraordinary travel adventures around the world
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Our Mission</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          </div>
          <div className="prose max-w-none text-lg text-gray-600 leading-relaxed">
            <p className="mb-6">
              At <span className="font-semibold text-primary-600">Boundless Horizons</span>, we believe that travel has the 
              power to transform lives, broaden perspectives, and create lasting memories. Our mission is to connect 
              travelers with authentic experiences, hidden gems, and local insights that make every journey meaningful.
            </p>
            <p className="mb-6">
              We curate the finest travel content from a passionate community of explorers, providing you with 
              inspiration, practical advice, and insider knowledge for your next adventure.
            </p>
            <p>
              Whether you're a seasoned traveler or planning your first trip, you'll find everything you need 
              to plan your perfect journey on Boundless Horizons.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">What We Offer</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Curated Guides</h3>
              <p className="text-gray-600">
                Detailed travel guides and destination recommendations from experienced travelers
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Community Stories</h3>
              <p className="text-gray-600">
                Real experiences and tips from our vibrant community of travel enthusiasts
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Inspiration</h3>
              <p className="text-gray-600">
                Discover new destinations and get inspired for your next adventure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Boundless Horizons who work tirelessly to bring you the best travel content
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-4">What Travelers Say</h2>
            <div className="w-20 h-1 bg-primary-600 mx-auto mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90">
            Become part of our growing family of travel enthusiasts. Share your experiences, 
            learn from others, and inspire fellow travelers around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/blogs" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors inline-flex items-center justify-center"
            >
              Read Blogs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
