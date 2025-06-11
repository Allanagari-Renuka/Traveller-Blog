
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext.jsx';
// import toast from 'react-hot-toast';

// const Register = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const { signUp, user, signOut } = useAuth();
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const password = watch('password');

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       await signUp(data.email, data.password, data.fullName);
//       toast.success('Account created successfully! Welcome to Boundless Horizons!');
//       navigate('/dashboard');
//     } catch (error) {
//       toast.error(error.message || 'Failed to create account');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex items-center justify-center space-x-2 mb-6">
//           <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-sm">W</span>
//           </div>
//           <span className="text-2xl font-display font-bold text-gray-900">Boundless Horizons</span>
//         </div>
//         <h2 className="text-center text-3xl font-display font-bold text-gray-900">
//           Join our community
//         </h2>
//         <p className="mt-2 text-center text-sm text-gray-600">
//           Already have an account?{' '}
//           <Link
//             to="/login"
//             className="font-medium text-primary-600 hover:text-primary-500"
//           >
//             Sign in here
//           </Link>
//         </p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
//                 Full name
//               </label>
//               <div className="mt-1 relative">
//                 <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register('fullName', {
//                     required: 'Full name is required',
//                     minLength: {
//                       value: 2,
//                       message: 'Name must be at least 2 characters',
//                     },
//                   })}
//                   type="text"
//                   className="pl-10 input-field"
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               {errors.fullName && (
//                 <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
//               )}
//             </div>

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
//                   className="pl-10 input-field"
//                   placeholder="Enter your email"
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
//                   className="pl-10 pr-10 input-field"
//                   placeholder="Create a password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//               )}
//             </div>

//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm password
//               </label>
//               <div className="mt-1 relative">
//                 <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                 <input
//                   {...register('confirmPassword', {
//                     required: 'Please confirm your password',
//                     validate: (value) =>
//                       value === password || 'Passwords do not match',
//                   })}
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   className="pl-10 pr-10 input-field"
//                   placeholder="Confirm your password"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
//               )}
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Creating account...' : 'Create account'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       {user && (
//         <div className="fixed top-4 right-4">
//           <div className="relative inline-block text-left">
//             <button
//               type="button"
//               className="flex items-center space-x-2 focus:outline-none"
//               onClick={() => setShowDropdown((prev) => !prev)}
//             >
//               <User className="h-8 w-8 text-gray-700" />
//               <span className="text-gray-700">{user.email}</span>
//             </button>
//             {showDropdown && (
//               <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//                 <div className="py-1">
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => navigate('/profile')}
//                   >
//                     Profile
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => navigate('/settings')}
//                   >
//                     Settings
//                   </button>
//                   <button
//                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     onClick={() => {
//                       signOut();
//                       navigate('/');
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import toast from 'react-hot-toast';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const result = await signUp(data.email, data.password, data.fullName);
      
  //     if (result.user) {
  //       toast.success('Account created successfully! Please check your email to verify your account.');
  //       navigate('/dashboard');
  //     }
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     let errorMessage = 'Failed to create account';
      
  //     if (error.message.includes('User already registered')) {
  //       errorMessage = 'An account with this email already exists';
  //     } else if (error.message.includes('Password should be at least 6 characters')) {
  //       errorMessage = 'Password must be at least 6 characters long';
  //     } else if (error.message.includes('Invalid email')) {
  //       errorMessage = 'Please enter a valid email address';
  //     } else if (error.message) {
  //       errorMessage = error.message;
  //     }
      
  //     toast.error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // ...existing code...
const onSubmit = async (data) => {
  setLoading(true);
  try {
    const result = await signUp(data.email, data.password, data.fullName);
    if (result.user) {
      toast.success('Account created successfully! You can now log in.');
      navigate('/login');
    }
  } catch (error) {
    console.error('Registration error:', error);
    let errorMessage = 'Failed to create account';
    if (error.message.includes('User already registered')) {
      errorMessage = 'An account with this email already exists';
    } else if (error.message.includes('Password should be at least 6 characters')) {
      errorMessage = 'Password must be at least 6 characters long';
    } else if (error.message.includes('Invalid email')) {
      errorMessage = 'Please enter a valid email address';
    } else if (error.message) {
      errorMessage = error.message;
    }
    toast.error(errorMessage);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Boundless Horizons</span>
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Join our community
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <div className="mt-1 relative">
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
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm password
              </label>
              <div className="mt-1 relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
