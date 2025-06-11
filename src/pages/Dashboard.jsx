import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Eye, Edit, Plus, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });

  useEffect(() => {
    fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPosts(data || []);
      const totalPosts = data?.length || 0;
      const publishedPosts = data?.filter(post => post.published).length || 0;
      const draftPosts = totalPosts - publishedPosts;
      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch your posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);
      if (error) throw error;
      toast.success('Post deleted successfully');
      fetchUserPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleTogglePublish = async (postId, currentStatus) => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ published: !currentStatus })
        .eq('id', postId);
      if (error) throw error;
      toast.success(`Post ${!currentStatus ? 'published' : 'unpublished'} successfully`);
      fetchUserPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Welcome back, {user?.user_metadata?.full_name || 'Traveler'}!
        </h1>
        <p className="text-gray-600">Manage your travel stories and inspire others</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <PenTool className="text-primary-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
              <p className="text-gray-600">Total Stories</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="text-green-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.publishedPosts}</p>
              <p className="text-gray-600">Published</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Edit className="text-yellow-600" size={24} />
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{stats.draftPosts}</p>
              <p className="text-gray-600">Drafts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display font-bold text-gray-900">Your Stories</h2>
        <Link to="/create-post" className="btn-primary flex items-center">
          <Plus size={20} className="mr-2" />
          Write New Story
        </Link>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-12 text-center">
          <PenTool size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No stories yet</h3>
          <p className="text-gray-600 mb-6">Start sharing your travel adventures with the world!</p>
          <Link to="/create-post" className="btn-primary">
            Write Your First Story
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Story
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={post.featured_image || 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=100'}
                          alt={post.title}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {post.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{post.destination}</div>
                      <div className="text-sm text-gray-500">{post.country}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {format(new Date(post.created_at), 'MMM dd, yyyy')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {post.published && (
                          <Link
                            to={`/blog/${post.id}`}
                            className="text-primary-600 hover:text-primary-900 p-1 rounded-md hover:bg-primary-50"
                            title="View post"
                          >
                            <Eye size={16} />
                          </Link>
                        )}
                        <Link
                          to={`/edit-post/${post.id}`}
                          className="text-gray-600 hover:text-gray-900 p-1 rounded-md hover:bg-gray-50"
                          title="Edit post"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleTogglePublish(post.id, post.published)}
                          className={`p-1 rounded-md transition-colors ${
                            post.published
                              ? 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50'
                              : 'text-green-600 hover:text-green-900 hover:bg-green-50'
                          }`}
                          title={post.published ? 'Unpublish' : 'Publish'}
                        >
                          {post.published ? '📝' : '✓'}
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                          title="Delete post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
