import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    destination: '',
    image_url: '',
  });

  // Default temple image for Arunachalam/Tamil Nadu
  const ARUNACHALAM_TEMPLE_IMAGE = 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800';

  // Function to get image from Unsplash based on destination
  const fetchDestinationImage = async (destination) => {
    if (!destination) return '';
    
    // Convert to lowercase for matching
    const dest = destination.toLowerCase().trim();
    
    // Check for Arunachalam first - use the temple image user provided
    if (dest.includes('arunachalam') || dest.includes('thiruvannamalai')) {
      return ARUNACHALAM_TEMPLE_IMAGE;
    }
    
    // Check for Tamil Nadu / India temple destinations
    if (dest.includes('tamil') || dest.includes('india') || dest.includes('south india')) {
      return ARUNACHALAM_TEMPLE_IMAGE;
    }
    
    // Destination images from Unsplash
    const destinationImages = {
      'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      'indonesia': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
      'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      'uk': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      'usa': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      'italy': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      'santorini': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      'greece': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      'uae': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      'singapore': 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
      'maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
      'thailand': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
      'bangkok': 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
      'switzerland': 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800',
      'australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
      'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    };
    
    // Check if we have a matching destination
    if (destinationImages[dest]) {
      return destinationImages[dest];
    }
    
    // Check for partial matches
    for (const [key, url] of Object.entries(destinationImages)) {
      if (dest.includes(key)) {
        return url;
      }
    }
    
    // If no match, use picsum random image with a seed based on destination
    const seed = destination.replace(/\s/g, '');
    return `https://picsum.photos/seed/${seed}/800/400`;
  };

  // Handle image upload to Supabase Storage
  const handleImageUpload = async (file) => {
    if (!file) return null;
    
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('post-images')
        .getPublicUrl(filePath);
      
      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Error uploading image');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const imageUrl = await handleImageUpload(file);
    if (imageUrl) {
      setFormData({ ...formData, image_url: imageUrl });
      toast.success('Image uploaded successfully!');
    }
  };

  // Auto generate image based on destination
  const handleAutoImage = async () => {
    if (!formData.destination) {
      toast.error('Please enter a destination first');
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await fetchDestinationImage(formData.destination);
      setFormData({ ...formData, image_url: imageUrl });
      toast.success('Image generated for ' + formData.destination);
    } catch (error) {
      toast.error('Could not generate image');
    } finally {
      setUploading(false);
    }
  };

  // Quick button for Arunachalam
  const handleArunachalamQuickImage = () => {
    setFormData({ 
      ...formData, 
      destination: 'Arunachalam, Tamil Nadu',
      image_url: ARUNACHALAM_TEMPLE_IMAGE 
    });
    toast.success('Arunachalam temple image set!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Get image based on destination if not already set
      let imageUrl = formData.image_url;
      if (!imageUrl && formData.destination) {
        imageUrl = await fetchDestinationImage(formData.destination);
      }

      // Get author name from user metadata
      const authorName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Anonymous';

      // Create post object with only the fields that exist
      const postData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
        destination: formData.destination,
        image_url: imageUrl,
        author_id: user.id,
        author_name: authorName,
        published: true,
      };

      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select();

      if (error) {
        console.error('Supabase error details:', JSON.stringify(error));
        throw new Error(error.message || 'Failed to create post');
      }
      
      toast.success('Post created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Create New Post</h1>
      
      {/* Quick Templates */}
      <div className="mb-6 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
        <p className="text-sm font-medium text-gray-700 mb-3">Quick Templates:</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleArunachalamQuickImage}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-primary-200 text-primary-700 rounded-lg hover:bg-primary-50 transition-colors text-sm"
          >
            <ImageIcon className="h-4 w-4" />
            Arunachalam Temple
          </button>
        </div>
      </div>
      
      {/* Image Preview */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          {formData.image_url ? (
            <div className="relative">
              <img 
                src={formData.image_url} 
                alt="Cover" 
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image_url: '' })}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">No image selected</p>
            </div>
          )}
        </div>
        
        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          
          <button
            type="button"
            onClick={handleAutoImage}
            disabled={uploading || !formData.destination}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="animate-spin h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
            Auto Generate Image
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input-field"
            placeholder="Enter post title"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            className="input-field"
            placeholder="e.g., Paris, Bali, Tokyo, Arunachalam, Tamil Nadu"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="input-field"
            placeholder="Brief description of your post"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="input-field"
            placeholder="Write your travel story..."
            rows={10}
            required
          />
        </div>
        
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? 'Creating...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
