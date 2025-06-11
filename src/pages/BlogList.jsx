import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import BlogCard from '../components/BlogCard.jsx';
import Pagination from '../components/Pagination.jsx';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countries, setCountries] = useState([]);
  
  const postsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCountry(searchParams.get('country') || '');
    setCurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    fetchPosts();
    fetchCountries();
  }, [currentPage, searchTerm, selectedCountry]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Fetch posts from backend or API here
      // For demo, using empty array
      setPosts([]);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    // Fetch countries list from backend or API here
    // For demo, using static list
    setCountries(['India', 'Italy', 'USA', 'Japan', 'Peru', 'Indonesia']);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // If search term is entered, stay on blog list and filter posts
    if (searchTerm.trim() !== '') {
      setSearchParams({ search: searchTerm, country: selectedCountry });
    } else if (selectedCountry) {
      // Navigate to Destinations page with country filter if selected and no search term
      navigate(`/destinations?country=${encodeURIComponent(selectedCountry)}`);
    } else {
      // Clear filters and stay on blog list
      setSearchParams({});
    }
  };

  // Filter destinations based on country query param
  const filteredDestinations = (country) => {
    if (!country) return [];
    return sampleDestinations.filter(dest => dest.name.toLowerCase().includes(country.toLowerCase()) || dest.tags.some(tag => tag.toLowerCase() === country.toLowerCase()));
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setSearchParams({});
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <BookOpen size={48} className="text-primary-600 mr-3" />
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
            Travel Stories
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover amazing destinations through the eyes of fellow travelers. From hidden gems to popular hotspots, 
          find inspiration for your next adventure.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, stories, or places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
            >
              <option value="">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn-primary whitespace-nowrap"
            >
              Search
            </button>
            {selectedCountry && (
              <button
                type="button"
                onClick={clearFilters}
                className="btn-secondary whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="text-center text-gray-600">
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default BlogList;
