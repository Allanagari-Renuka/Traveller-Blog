import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Search, MapPin, Calendar, User, Filter, PenLine } from 'lucide-react';

const BlogList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  // Popular destinations for filter
  const popularDestinations = [
    'All Destinations',
    'Tamil Nadu, India',
    'Paris, France',
    'Bali, Indonesia',
    'Tokyo, Japan',
    'New York, USA',
    'Rome, Italy',
    'London, UK',
    'Dubai, UAE',
    'Bangkok, Thailand'
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Fetch only dynamic posts from Supabase
        const { data: userPosts, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.log('Error fetching posts:', error);
          setPosts([]);
        } else {
          setPosts(userPosts || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.destination?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDestination = selectedDestination === '' || 
                              selectedDestination === 'All Destinations' || 
                              post.destination === selectedDestination;
    return matchesSearch && matchesDestination;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
          Travel <span className="text-primary-600">Blog</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover amazing travel stories from around the world
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search destinations, titles, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Destination Filter */}
          <div className="relative">
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="appearance-none w-full md:w-64 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm pr-10 bg-white"
            >
              {popularDestinations.map(dest => (
                <option key={dest} value={dest === 'All Destinations' ? '' : dest}>
                  {dest}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-gray-500 mb-6">
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
      </p>

      {/* Blog Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image_url || 'https://placehold.co/800x400?text=Travel+Blog'}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/800x400?text=Travel+Blog';
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Destination Tag */}
                {post.destination && (
                  <div className="flex items-center text-primary-600 text-sm font-medium mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {post.destination}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {post.created_at ? new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <User className="h-4 w-4 mr-1" />
                    {post.author_name || 'Anonymous'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <PenLine className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-6">Be the first to share your travel story!</p>
          
          {user ? (
            <Link to="/create-post" className="btn-primary inline-block">
              Create Your First Post
            </Link>
          ) : (
            <div>
              <Link to="/register" className="btn-primary inline-block mr-4">
                Sign Up to Post
              </Link>
              <Link to="/login" className="btn-secondary inline-block">
                Log In
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Create Post CTA */}
      {user && (
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Share Your Travel Story</h2>
          <p className="text-primary-100 mb-6">Inspire others with your travel experiences!</p>
          <Link
            to="/create-post"
            className="inline-flex items-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Create New Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogList;
