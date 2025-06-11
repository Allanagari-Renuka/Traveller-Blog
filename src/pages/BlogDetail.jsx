import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, MapPin, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            full_name,
            bio
          )
        `)
        .eq('id', id)
        .eq('published', true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Post not found');
      navigate('/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      toast.success('Post deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h2>
          <Link to="/blogs" className="btn-primary">
            Back to Stories
          </Link>
        </div>
      </div>
    );
  }

  const defaultImage = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1200';
  const isAuthor = user?.id === post.author_id;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/blogs"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Stories
      </Link>

      {/* Hero Image */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <img
          src={post.featured_image || defaultImage}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.country}
          </span>
        </div>
        {isAuthor && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <Link
              to={`/edit-post/${post.id}`}
              className="bg-white text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <Edit size={20} />
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white hover:bg-red-700 p-2 rounded-full transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin size={16} className="mr-1" />
          <span className="mr-4">{post.destination}</span>
          <Calendar size={16} className="mr-1" />
          <span>{format(new Date(post.created_at), 'MMMM dd, yyyy')}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center">
          <User size={20} className="text-gray-400 mr-2" />
          <div>
            <p className="font-medium text-gray-900">
              {post.profiles?.full_name || 'Anonymous Traveler'}
            </p>
            {post.profiles?.bio && (
              <p className="text-sm text-gray-600">{post.profiles.bio}</p>
            )}
          </div>
        </div>
      </header>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      <div 
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-600">
              Written by{' '}
              <span className="font-medium text-gray-900">
                {post.profiles?.full_name || 'Anonymous Traveler'}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Published on {format(new Date(post.created_at), 'MMMM dd, yyyy')}
            </p>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/blogs"
              className="btn-secondary"
            >
              More Stories
            </Link>
            {!isAuthor && user && (
              <Link
                to="/create-post"
                className="btn-primary"
              >
                Share Your Story
              </Link>
            )}
          </div>
        </div>
      </footer>
    </article>
  );
};

export default BlogDetail;
