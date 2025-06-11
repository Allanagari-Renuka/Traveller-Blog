import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Calendar, Edit2, Save, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: user?.user_metadata?.full_name || user?.user_metadata?.display_name || '',
      email: user?.email || '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile({
        full_name: data.fullName,
        display_name: data.fullName,
      });
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      fullName: user?.user_metadata?.full_name || user?.user_metadata?.display_name || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h2>
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex items-center -mt-16 mb-6">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <User className="h-12 w-12 text-gray-400" />
              </div>
              <div className="ml-6 mt-16">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.user_metadata?.full_name || user.user_metadata?.display_name || 'User'}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('fullName', {
                        required: 'Full name is required',
                        minLength: {
                          value: 2,
                          message: 'Name must be at least 2 characters',
                        },
                      })}
                      type="text"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('email')}
                      type="email"
                      disabled
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <p className="mt-1 text-sm text-gray-500">Email cannot be changed from this page</p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {user.user_metadata?.full_name || user.user_metadata?.display_name || 'Not provided'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Member Since
                    </label>
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-900">
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Status
                    </label>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-400 rounded-full mr-3"></div>
                      <span className="text-gray-900">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
