import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Calendar, MapPin, Share2, Heart, Facebook, Twitter, Link as LinkIcon, PenLine } from 'lucide-react';
import toast from 'react-hot-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 10);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      // Fetch post from Supabase by ID
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          console.log('Post not found:', error);
          setPost(null);
        } else {
          setPost(data);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleLike = () => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    toast.success(liked ? 'Removed from likes' : 'Added to likes!');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    let shareUrl = '';
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
      setShowShareModal(false);
      return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    setShowShareModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If no post found
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p className="text-gray-600 mb-6">This post may have been deleted or doesn't exist.</p>
        <Link to="/blogs" className="btn-primary inline-flex items-center">
          Browse All Posts
        </Link>
        
        {!user && (
          <div className="mt-8">
            <p className="text-gray-600 mb-4">Want to share your travel story?</p>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link 
        to="/blogs" 
        className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to blogs
      </Link>
      
      {/* Cover Image */}
      {post.image_url && (
        <div className="mb-8">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            onError={(e) => {
              e.target.src = 'https://placehold.co/1200x600?text=Travel+Blog';
            }}
          />
        </div>
      )}
      
      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {post.destination && (
          <span className="inline-flex items-center bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <MapPin className="mr-1.5 h-4 w-4" />
            {post.destination}
          </span>
        )}
        {post.created_at && (
          <span className="inline-flex items-center text-gray-500 text-sm">
            <Calendar className="mr-1.5 h-4 w-4" />
            {new Date(post.created_at).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        )}
      </div>
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
        {post.title}
      </h1>
      
      {/* Author */}
      {post.author_name && (
        <p className="text-gray-600 mb-6">
          By <span className="font-medium text-primary-600">{post.author_name}</span>
        </p>
      )}
      
      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-xl text-gray-600 mb-8 italic leading-relaxed border-l-4 border-primary-500 pl-4">
          {post.excerpt}
        </p>
      )}
      
      {/* Content */}
      <div className="prose max-w-none mb-12">
        <p className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
          {post.content}
        </p>
      </div>

      {/* Share Section */}
      <div className="border-t border-gray-200 pt-8 mb-8">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Enjoyed this story?</span>
          <div className="flex gap-3">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                liked ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
              {likeCount}
            </button>
            <button 
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Share this post</h3>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => handleShare('facebook')}
                className="flex flex-col items-center gap-2 p-4 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Facebook className="h-8 w-8" />
                <span className="text-sm">Facebook</span>
              </button>
              <button 
                onClick={() => handleShare('twitter')}
                className="flex flex-col items-center gap-2 p-4 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors"
              >
                <Twitter className="h-8 w-8" />
                <span className="text-sm">Twitter</span>
              </button>
              <button 
                onClick={() => handleShare('copy')}
                className="flex flex-col items-center gap-2 p-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LinkIcon className="h-8 w-8" />
                <span className="text-sm">Copy Link</span>
              </button>
            </div>
            <button 
              onClick={() => setShowShareModal(false)}
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* CTA for non-logged in users */}
      {!user && (
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Want to share your travel story?</h3>
          <p className="text-gray-600 mb-4">Join our community and start writing about your adventures!</p>
          <Link 
            to="/register" 
            className="btn-primary inline-flex items-center"
          >
            Get Started Free
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
