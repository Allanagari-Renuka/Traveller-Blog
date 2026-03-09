import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;
      
      try {
        setError(null);
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('author_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          // If table doesn't exist, show empty state
          if (error.code === '42P01') {
            console.log('Posts table does not exist yet');
            setPosts([]);
          } else {
            throw error;
          }
        } else {
          setPosts(data || []);
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err.message);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
      
      setPosts(posts.filter(p => p.id !== postId));
      toast.success('Post deleted successfully');
    } catch (error) {
      toast.error('Error deleting post: ' + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <Link to="/create-post" className="btn-primary flex items-center">
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p className="font-medium">Error loading posts: {error}</p>
          <p className="text-sm mt-1">Make sure the posts table exists in your Supabase database.</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">Welcome, {user?.email?.split('@')[0]}!</h2>
          <p className="text-gray-600">Manage your travel blog posts here.</p>
        </div>
        
        <div className="border-t">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">You haven't created any posts yet.</p>
              <Link to="/create-post" className="btn-primary inline-block">
                Create Your First Post
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {posts.map((post) => (
                <div key={post.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    {post.image_url && (
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <p className="text-gray-600 text-sm">
                        {post.destination && <span className="mr-3">📍 {post.destination}</span>}
                        {post.created_at && new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link to={`/blog/${post.id}`} className="text-primary-600 hover:text-primary-800 flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                    <Link to={`/edit-post/${post.id}`} className="text-blue-600 hover:text-blue-800">
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
