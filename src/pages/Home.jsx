import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, PenTool } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BlogCard from '../components/BlogCard.jsx';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPosts();
  }, []);

  const fetchFeaturedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            full_name
          )
        `)
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedPosts(data || []);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-accent-600 text-white py-20 lg:py-32">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
            Share Your Travel Adventures
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Connect with fellow travelers, discover hidden gems, and inspire others with your unique journeys around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Start Your Journey
              <ArrowRight size={20} className="ml-2" />
            </Link>
            <Link
              to="/blogs"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Explore Stories
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Why Choose Boundless Horizons?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of passionate travelers and share your experiences with the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe size={32} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">Global Community</h3>
            <p className="text-gray-600">
              Connect with travelers from around the world and discover diverse perspectives on destinations.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <PenTool size={32} className="text-accent-600" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">Rich Storytelling</h3>
            <p className="text-gray-600">
              Use our powerful editor to craft compelling travel stories with photos and detailed insights.
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-primary-600" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3">Inspiring Content</h3>
            <p className="text-gray-600">
              Get inspired by authentic travel experiences and practical tips from fellow adventurers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Latest Adventures
          </h2>
          <Link
            to="/blogs"
            className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
          >
            View All Stories
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have already shared their adventures and inspired others to explore.
          </p>
          <Link
            to="/register"
            className="btn-primary text-lg px-8 py-3 inline-flex items-center"
          >
            Get Started Today
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
