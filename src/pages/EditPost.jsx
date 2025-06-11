import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data.author_id !== user?.id) {
        toast.error('You can only edit your own posts');
        navigate('/dashboard');
        return;
      }

      reset({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        destination: data.destination,
        country: data.country,
        featured_image: data.featured_image || '',
        tags: data.tags ? data.tags.join(', ') : '',
        published: data.published,
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Post not found');
      navigate('/dashboard');
    } finally {
      setInitialLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const onSubmit = async (data) => {
    if (!user || !id) return;

    setLoading(true);
    try {
      const slug = generateSlug(data.title);
      const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

      const { error } = await supabase
        .from('posts')
        .update({
          title: data.title,
          slug,
          content: data.content,
          excerpt: data.excerpt,
          destination: data.destination,
          country: data.country,
          featured_image: data.featured_image || null,
          tags,
          published: data.published,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Post updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error(error.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      ['clean']
    ],
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Edit Your Travel Story
        </h1>
        <p className="text-gray-600">Update your adventure and keep inspiring fellow travelers</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Title */}
            <div className="lg:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Story Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                className="input-field"
                placeholder="Enter your story title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                {...register('destination', { required: 'Destination is required' })}
                type="text"
                className="input-field"
                placeholder="e.g., Bali, Tokyo, Paris"
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <input
                {...register('country', { required: 'Country is required' })}
                type="text"
                className="input-field"
                placeholder="e.g., Indonesia, Japan, France"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-2">
              <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                {...register('featured_image')}
                type="url"
                className="input-field"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">
                Optional: Add an image URL from Pexels, Unsplash, or any other source
              </p>
            </div>

            {/* Tags */}
            <div className="lg:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                {...register('tags')}
                type="text"
                className="input-field"
                placeholder="adventure, culture, food, photography (comma-separated)"
              />
              <p className="mt-1 text-sm text-gray-500">
                Separate tags with commas to help others discover your story
              </p>
            </div>

            {/* Excerpt */}
            <div className="lg:col-span-2">
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                Story Preview *
              </label>
              <textarea
                {...register('excerpt', { required: 'Story preview is required' })}
                rows={3}
                className="input-field"
                placeholder="Write a brief summary of your travel story (2-3 sentences)"
              />
              {errors.excerpt && (
                <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Story *
          </label>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Story content is required' }}
            render={({ field }) => (
              <ReactQuill
                theme="snow"
                modules={quillModules}
                placeholder="Tell your travel story... Share the details, experiences, and memories that made your journey special."
                {...field}
              />
            )}
          />
          {errors.content && (
            <p className="mt-2 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              {...register('published')}
              type="checkbox"
              id="published"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
              Published (uncheck to save as draft)
            </label>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Story'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
