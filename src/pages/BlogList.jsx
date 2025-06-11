// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { Search, Filter, BookOpen } from 'lucide-react';
// import BlogCard from '../components/BlogCard.jsx';
// import Pagination from '../components/Pagination.jsx';

// const BlogList = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
//   const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [countries, setCountries] = useState([]);
  
//   const postsPerPage = 9;
//   const navigate = useNavigate();

//   useEffect(() => {
//     setSearchTerm(searchParams.get('search') || '');
//     setSelectedCountry(searchParams.get('country') || '');
//     setCurrentPage(1);
//   }, [searchParams]);

//   useEffect(() => {
//     fetchPosts();
//     fetchCountries();
//   }, [currentPage, searchTerm, selectedCountry]);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       // Fetch posts from backend or API here
//       // For demo, using empty array
//       setPosts([]);
//       setTotalPages(1);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCountries = async () => {
//     // Fetch countries list from backend or API here
//     // For demo, using static list
//     setCountries(['India', 'Italy', 'USA', 'Japan', 'Peru', 'Indonesia']);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     // If search term is entered, stay on blog list and filter posts
//     if (searchTerm.trim() !== '') {
//       setSearchParams({ search: searchTerm, country: selectedCountry });
//     } else if (selectedCountry) {
//       // Navigate to Destinations page with country filter if selected and no search term
//       navigate(`/destinations?country=${encodeURIComponent(selectedCountry)}`);
//     } else {
//       // Clear filters and stay on blog list
//       setSearchParams({});
//     }
//   };

//   // Filter destinations based on country query param
//   const filteredDestinations = (country) => {
//     if (!country) return [];
//     return sampleDestinations.filter(dest => dest.name.toLowerCase().includes(country.toLowerCase()) || dest.tags.some(tag => tag.toLowerCase() === country.toLowerCase()));
//   };

//   const handleCountryChange = (country) => {
//     setSelectedCountry(country);
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setSelectedCountry('');
//     setSearchParams({});
//     setCurrentPage(1);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Hero Section */}
//       <div className="text-center mb-12">
//         <div className="flex items-center justify-center mb-4">
//           <BookOpen size={48} className="text-primary-600 mr-3" />
//           <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900">
//             Travel Stories
//           </h1>
//         </div>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           Discover amazing destinations through the eyes of fellow travelers. From hidden gems to popular hotspots, 
//           find inspiration for your next adventure.
//         </p>
//       </div>

//       {/* Search and Filter */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-8">
//         <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
//           <div className="flex-1 relative">
//             <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search destinations, stories, or places..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             />
//           </div>
          
//           <div className="relative">
//             <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <select
//               value={selectedCountry}
//               onChange={(e) => handleCountryChange(e.target.value)}
//               className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
//             >
//               <option value="">All Countries</option>
//               {countries.map((country) => (
//                 <option key={country} value={country}>
//                   {country}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <div className="flex gap-2">
//             <button
//               type="submit"
//               className="btn-primary whitespace-nowrap"
//             >
//               Search
//             </button>
//             {selectedCountry && (
//               <button
//                 type="button"
//                 onClick={clearFilters}
//                 className="btn-secondary whitespace-nowrap"
//               >
//                 Clear
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Results */}
//       <div className="text-center text-gray-600">
//         {loading ? (
//           <p>Loading posts...</p>
//         ) : posts.length === 0 ? (
//           <p>No posts found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {posts.map((post) => (
//               <BlogCard key={post.id} post={post} />
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       )}
//     </div>
//   );
// };

// export default BlogList;

import React, { useEffect, useState } from 'react';
import { Search, Filter, BookOpen, Calendar, User, MapPin, Clock, ArrowRight } from 'lucide-react';

// Sample blog data - expanded from your original
const sampleBlogs = [
  {
    id: 1,
    title: "Exploring the Mountains",
    author: "John Doe",
    author_id: "user1",
    destination: "Swiss Alps",
    country: "Switzerland",
    content: "Mountains offer breathtaking views and challenging hikes that test both your physical endurance and mental fortitude. The Swiss Alps, in particular, provide some of the most spectacular mountain experiences in the world.",
    featured_image: "https://images.pexels.com/photos/1743165/pexels-photo-1743165.jpeg?auto=compress&cs=tinysrgb&w=1200",
    created_at: "2025-06-10T10:00:00Z",
    published: true,
    tags: ["mountains", "hiking", "adventure", "nature", "switzerland"],
    profiles: {
      full_name: "John Doe",
      bio: "Adventure photographer and mountain enthusiast"
    }
  },
  {
    id: 2,
    title: "Beachside Relaxation Tips",
    author: "Jane Smith",
    author_id: "user2",
    destination: "Maldives",
    country: "Maldives",
    content: "To enjoy the beach fully, always bring sunscreen, water, and a good book. The perfect beach day is a combination of preparation, relaxation, and mindful enjoyment of your surroundings.",
    featured_image: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    created_at: "2025-06-09T14:30:00Z",
    published: true,
    tags: ["beach", "relaxation", "maldives", "travel", "wellness"],
    profiles: {
      full_name: "Jane Smith",
      bio: "Travel blogger and wellness enthusiast"
    }
  },
  {
    id: 3,
    title: "Urban Adventures in Tokyo",
    author: "Alex Chen",
    author_id: "user3",
    destination: "Tokyo",
    country: "Japan",
    content: "Tokyo is a city where ancient traditions seamlessly blend with cutting-edge technology, creating an urban landscape unlike anywhere else in the world.",
    featured_image: "https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=1200",
    created_at: "2025-06-08T09:15:00Z",
    published: true,
    tags: ["tokyo", "urban", "culture", "food", "japan", "city"],
    profiles: {
      full_name: "Alex Chen",
      bio: "Urban explorer and cultural enthusiast"
    }
  },
  {
    id: 4,
    title: "Safari Adventures in Kenya",
    author: "Sarah Wilson",
    author_id: "user4",
    destination: "Maasai Mara",
    country: "Kenya",
    content: "The African savanna comes alive during the great migration, offering one of nature's most spectacular displays of wildlife in their natural habitat.",
    featured_image: "https://images.pexels.com/photos/631317/pexels-photo-631317.jpeg?auto=compress&cs=tinysrgb&w=1200",
    created_at: "2025-06-07T16:45:00Z",
    published: true,
    tags: ["safari", "wildlife", "kenya", "africa", "adventure"],
    profiles: {
      full_name: "Sarah Wilson",
      bio: "Wildlife photographer and conservationist"
    }
  },
  {
    id: 5,
    title: "Culinary Journey Through Italy",
    author: "Marco Rossi",
    author_id: "user5",
    destination: "Tuscany",
    country: "Italy",
    content: "From handmade pasta in small trattorias to world-class wines in rolling vineyards, Italy offers a culinary adventure that engages all the senses.",
    featured_image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200",
    created_at: "2025-06-06T12:20:00Z",
    published: true,
    tags: ["italy", "food", "wine", "culture", "tuscany"],
    profiles: {
      full_name: "Marco Rossi",
      bio: "Food writer and culinary explorer"
    }
  },
  {
    id: 6,
    title: "Northern Lights in Iceland",
    author: "Emma Anderson",
    author_id: "user6",
    destination: "Reykjavik",
    country: "Iceland",
    content: "The aurora borealis paints the Icelandic sky in ethereal greens and purples, creating a magical experience that connects you with the raw power of nature.",
    featured_image: "https://images.pexels.com/photos/1434608/pexels-photo-1434608.jpeg?auto=compress&cs=tinysrgb&w=1200",
    created_at: "2025-06-05T20:30:00Z",
    published: true,
    tags: ["iceland", "northern-lights", "aurora", "nature", "photography"],
    profiles: {
      full_name: "Emma Anderson",
      bio: "Landscape photographer and travel writer"
    }
  }
];

// BlogCard Component
const BlogCard = ({ post, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article 
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={() => onClick(post)}
    >
      <div className="relative">
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.country}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="mr-4">{post.destination}</span>
          <Calendar size={14} className="mr-1" />
          <span>{formatDate(post.created_at)}</span>
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {post.content}
        </p>
        
        <div className="flex items-center mb-4">
          <User size={16} className="text-gray-400 mr-2" />
          <span className="text-sm text-gray-600">
            {post.profiles?.full_name || post.author}
          </span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium text-sm hover:text-blue-700 flex items-center">
            Read More <ArrowRight size={14} className="ml-1" />
          </span>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock size={14} className="mr-1" />
            <span>5 min read</span>
          </div>
        </div>
      </div>
    </article>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-1 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === page
              ? 'text-white bg-blue-600 border border-blue-600'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

// Main BlogList Component
const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [countries, setCountries] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  
  const postsPerPage = 6;

  useEffect(() => {
    fetchPosts();
    fetchCountries();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, selectedCountry, currentPage]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(sampleBlogs);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = () => {
    const uniqueCountries = [...new Set(sampleBlogs.map(post => post.country))];
    setCountries(uniqueCountries.sort());
  };

  const filterPosts = () => {
    let filtered = posts;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply country filter
    if (selectedCountry) {
      filtered = filtered.filter(post => post.country === selectedCountry);
    }

    // Calculate pagination
    const total = Math.ceil(filtered.length / postsPerPage);
    setTotalPages(total);

    // Apply pagination
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setFilteredPosts(filtered.slice(startIndex, endIndex));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    filterPosts();
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCountry('');
    setCurrentPage(1);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowDetail(true);
  };

  const handleBackToList = () => {
    setShowDetail(false);
    setSelectedPost(null);
  };

  // Blog Detail View
  if (showDetail && selectedPost) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={handleBackToList}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowRight size={20} className="mr-2 transform rotate-180" />
          Back to Stories
        </button>

        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative">
            <img
              src={selectedPost.featured_image}
              alt={selectedPost.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {selectedPost.country}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <MapPin size={16} className="mr-1" />
              <span className="mr-4">{selectedPost.destination}</span>
              <Calendar size={16} className="mr-1" />
              <span>{new Date(selectedPost.created_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {selectedPost.title}
            </h1>
            
            <div className="flex items-center mb-6">
              <User size={20} className="text-gray-400 mr-2" />
              <div>
                <p className="font-medium text-gray-900">
                  {selectedPost.profiles?.full_name || selectedPost.author}
                </p>
                {selectedPost.profiles?.bio && (
                  <p className="text-sm text-gray-600">{selectedPost.profiles.bio}</p>
                )}
              </div>
            </div>

            {selectedPost.tags && selectedPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <p>{selectedPost.content}</p>
            </div>
          </div>
        </article>
      </div>
    );
  }

  // Blog List View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <BookOpen size={48} className="text-blue-600 mr-3" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
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
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, stories, or places..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
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
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              Search
            </button>
            {(searchTerm || selectedCountry) && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          {loading ? 'Loading...' : `Showing ${filteredPosts.length} of ${posts.length} stories`}
          {searchTerm && ` for "${searchTerm}"`}
          {selectedCountry && ` in ${selectedCountry}`}
        </p>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500 mb-2">No stories found</p>
          <p className="text-gray-400">Try adjusting your search terms or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} onClick={handlePostClick} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && !loading && (
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