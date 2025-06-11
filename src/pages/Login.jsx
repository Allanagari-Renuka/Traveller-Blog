
// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useForm } from 'react-hook-form';
// // import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
// // import { useAuth } from '../contexts/AuthContext.jsx';
// // import toast from 'react-hot-toast';

// // const Login = () => {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const { signIn, user, signOut } = useAuth();
// //   const navigate = useNavigate();

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm();

// //   const onSubmit = async (data) => {
// //     setLoading(true);
// //     try {
// //       await signIn(data.email, data.password);
// //       toast.success('Welcome back!');
// //       navigate('/dashboard');
// //     } catch (error) {
// //       toast.error(error.message || 'Failed to sign in');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
// //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="flex items-center justify-center space-x-2 mb-6">
// //           <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
// //             <span className="text-white font-bold text-sm">B</span>
// //           </div>
// //           <span className="text-2xl font-display font-bold text-gray-900">Boundless Horizons</span>
// //         </div>
// //         <h2 className="text-center text-3xl font-display font-bold text-gray-900">
// //           Welcome back
// //         </h2>
// //         <p className="mt-2 text-center text-sm text-gray-600">
// //           Don't have an account?{' '}
// //           <Link
// //             to="/register"
// //             className="font-medium text-primary-600 hover:text-primary-500"
// //           >
// //             Sign up for free
// //           </Link>
// //         </p>
// //       </div>

// //       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
// //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
// //           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
// //             <div>
// //               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
// //                 Email address
// //               </label>
// //               <div className="mt-1 relative">
// //                 <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   {...register('email', {
// //                     required: 'Email is required',
// //                     pattern: {
// //                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                       message: 'Invalid email address',
// //                     },
// //                   })}
// //                   type="email"
// //                   className="pl-10 input-field"
// //                   placeholder="Enter your email"
// //                 />
// //               </div>
// //               {errors.email && (
// //                 <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
// //               )}
// //             </div>

// //             <div>
// //               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
// //                 Password
// //               </label>
// //               <div className="mt-1 relative">
// //                 <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   {...register('password', {
// //                     required: 'Password is required',
// //                   })}
// //                   type={showPassword ? 'text' : 'password'}
// //                   className="pl-10 pr-10 input-field"
// //                   placeholder="Enter your password"
// //                 />
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowPassword(!showPassword)}
// //                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
// //                 >
// //                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //                 </button>
// //               </div>
// //               {errors.password && (
// //                 <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
// //               )}
// //             </div>

// //             <div>
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
// //               >
// //                 {loading ? 'Signing in...' : 'Sign in'}
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </div>

// //       {user && (
// //         <div className="fixed top-4 right-4">
// //           <div className="relative inline-block text-left">
// //             <button
// //               type="button"
// //               className="flex items-center space-x-2 focus:outline-none"
// //               onClick={() => setShowDropdown((prev) => !prev)}
// //             >
// //               <User className="h-8 w-8 text-gray-700" />
// //               <span className="text-gray-700">{user.email}</span>
// //             </button>
// //             {showDropdown && (
// //               <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
// //                 <div className="py-1">
// //                   <button
// //                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //                     onClick={() => navigate('/profile')}
// //                   >
// //                     Profile
// //                   </button>
// //                   <button
// //                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //                     onClick={() => navigate('/settings')}
// //                   >
// //                     Settings
// //                   </button>
// //                   <button
// //                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //                     onClick={() => {
// //                       signOut();
// //                       navigate('/');
// //                     }}
// //                   >
// //                     Logout
// //                   </button>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Login;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { Mail, Lock, Eye, EyeOff, User, ChevronDown } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import toast from 'react-hot-toast';

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { signIn, signOut, user, session } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm();

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (showDropdown && !event.target.closest('.user-dropdown')) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [showDropdown]);

//   // Redirect if already logged in
//   useEffect(() => {
//     if (user && session) {
//       navigate('/dashboard');
//     }
//   }, [user, session, navigate]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const result = await signIn(data.email, data.password);
      
//       // Check if sign in was successful
//       if (result && result.user) {
//         toast.success('Welcome back!');
//         reset(); // Clear form
//         navigate('/dashboard');
//       } else {
//         toast.error('Sign in failed. Please check your credentials.');
//       }
//     } catch (error) {
//       console.error('Sign in error:', error);
      
//       // Handle different types of errors
//       let errorMessage = 'Failed to sign in';
      
//       if (error.message) {
//         if (error.message.includes('Invalid login credentials')) {
//           errorMessage = 'Invalid email or password';
//         } else if (error.message.includes('Email not confirmed')) {
//           errorMessage = 'Please check your email and confirm your account';
//         } else if (error.message.includes('Invalid API key')) {
//           errorMessage = 'Configuration error. Please contact support.';
//         } else if (error.message.includes('Too many requests')) {
//           errorMessage = 'Too many attempts. Please try again later.';
//         } else {
//           errorMessage = error.message;
//         }
//       }
      
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       toast.success('Signed out successfully');
//       setShowDropdown(false);
//       navigate('/');
//     } catch (error) {
//       toast.error('Error signing out');
//       console.error('Sign out error:', error);
//     }
//   };

//   const handleNavigation = (path) => {
//     setShowDropdown(false);
//     navigate(path);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       {/* User Profile Dropdown - Show only when logged in */}
//       {user && (
//         <div className="fixed top-4 right-4 z-50">
//           <div className="relative inline-block text-left user-dropdown">
//             <button
//               type="button"
//               className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-500"
//               onClick={() => setShowDropdown((prev) => !prev)}
//             >
//               <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
//                 <User className="h-4 w-4 text-white" />
//               </div>
//               <span className="text-gray-700 font-medium max-w-32 truncate">
//                 {user.email || 'User'}
//               </span>
//               <ChevronDown 
//                 className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
//                   showDropdown ? 'rotate-180' : ''
//                 }`} 
//               />
//             </button>
            
//             {showDropdown && (
//               <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//                 <div className="py-1">
//                   <div className="px-4 py-2 border-b border-gray-100">
//                     <p className="text-sm font-medium text-gray-900">Signed in as</p>
//                     <p className="text-sm text-gray-600 truncate">{user.email}</p>
//                   </div>
                  
//                   <button
//                     className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                     onClick={() => handleNavigation('/profile')}
//                   >
//                     <User className="h-4 w-4 mr-3" />
//                     Profile
//                   </button>
                  
//                   <button
//                     className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
//                     onClick={() => handleNavigation('/settings')}
//                   >
//                     <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     Settings
//                   </button>
                  
//                   <div className="border-t border-gray-100">
//                     <button
//                       className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                       onClick={handleSignOut}
//                     >
//                       <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                       </svg>
//                       Sign out
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Main Login Form */}
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex items-center justify-center space-x-2 mb-6">
//           <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-sm">B</span>
//           </div>
//           <span className="text-2xl font-display font-bold text-gray-900">Boundless Horizons</span>
//         </div>
//         <h2 className="text-center text-3xl font-display font-bold text-gray-900">
//           Welcome back
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link
//             to="/register"
//             className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
//           >
//             Sign up for free
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email address
//               </label>
//               <div className="mt-1 relative">
//                 <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: 'Invalid email address',
//                     },
//                   })}
//                   type="email"
//                   className="pl-10 input-field w-full"
//                   placeholder="Enter your email"
//                   disabled={loading}
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <div className="mt-1 relative">
//                 <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register('password', {
//                     required: 'Password is required',
//                     minLength: {
//                       value: 6,
//                       message: 'Password must be at least 6 characters',
//                     },
//                   })}
//                   type={showPassword ? 'text' : 'password'}
//                   className="pl-10 pr-10 input-field w-full"
//                   placeholder="Enter your password"
//                   disabled={loading}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                   disabled={loading}
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//               )}
//             </div>

//             <div className="flex items-center justify-between">
//               <Link
//                 to="/forgot-password"
//                 className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
//               >
//                 Forgot your password?
//               </Link>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Signing in...
//                   </span>
//                 ) : (
//                   'Sign in'
//                 )}
//               </button>
//             </div>
//           </form>

//           {/* Development/Debug Info - Remove in production */}
//           {process.env.NODE_ENV === 'development' && (
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
//               <p className="text-xs text-yellow-800">
//                 <strong>Debug Info:</strong> If you're getting "Invalid API" errors, check your Supabase configuration in `lib/supabase.js`
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signOut, user, session } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-dropdown')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && session) {
      navigate('/dashboard');
    }
  }, [user, session, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      
      if (result && result.user) {
        toast.success('Welcome back!');
        reset();
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'Failed to sign in';
      
      if (error.message) {
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many attempts. Please try again later.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      toast.error('Error signing out');
      console.error('Sign out error:', error);
    }
  };

  const handleNavigation = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* User Profile Dropdown - Show only when logged in */}
      {/* {user && (
        <div className="fixed top-4 right-4 z-50">
          <div className="relative inline-block text-left user-dropdown">
            <button
              type="button"
              className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700 font-medium max-w-32 truncate">
                {user.email || 'User'}
              </span>
              <ChevronDown 
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                  showDropdown ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {showDropdown && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">Signed in as</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                  
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => handleNavigation('/profile')}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </button>
                  
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => handleNavigation('/settings')}
                  >
                    <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </button>
                  
                  <div className="border-t border-gray-100">
                    <button
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={handleSignOut}
                    >
                      <svg className="h-4 w-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )} */}
      // ...existing code...
{user && (
  <div className="fixed top-4 right-4 z-50">
    <div className="relative inline-block text-left user-dropdown">
      <button
        type="button"
        className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">{user.email[0].toUpperCase()}</span>
        </div>
        <span className="font-medium text-gray-900">{user.email}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/profile')}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate('/settings')}
          >
            Settings
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  </div>
)}

      {/* Main Login Form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Boundless Horizons</span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
          >
            Sign up for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
