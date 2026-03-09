import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // const signUp = async (email, password, fullName) => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,
  //       options: {
  //         data: {
  //           full_name: fullName,
  //           display_name: fullName
  //         }
  //       }
  //     });

  //     if (error) {
  //       throw error;
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error('Sign up error:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const signIn = async (email, password) => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await supabase.auth.signInWithPassword({
  //       email,
  //       password
  //     });

  //     if (error) {
  //       throw error;
  //     }

  //     return data;
  //   } catch (error) {
  //     console.error('Sign in error:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const signOut = async () => {
  //   try {
  //     setLoading(true);
  //     const { error } = await supabase.auth.signOut();
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     console.error('Sign out error:', error);
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

// const API_BASE_URL = 'http://localhost:5000';

// const signUp = async (email, password, fullName) => {
//   try {
//     setLoading(true);
//     const res = await fetch(`${API_BASE_URL}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: email, password }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || 'Registration failed');
//     // Optionally, auto-login after registration
//     return { user: { email, full_name: fullName }, token: data.token || null };
//   } catch (error) {
//     console.error('Sign up error:', error);
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };

// const signIn = async (email, password) => {
//   try {
//     setLoading(true);
//     const res = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ username: email, password }),
//     });
//     const data = await res.json();
//     if (!res.ok) throw new Error(data.message || 'Login failed');
//     setUser({ email });
//     setSession({ token: data.token });
//     return { user: { email }, token: data.token };
//   } catch (error) {
//     console.error('Sign in error:', error);
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };

// ...existing code...

const signUp = async (email, password, fullName) => {
  setLoading(true);
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

const signIn = async (email, password) => {
  setLoading(true);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    setUser(data.user);
    setSession(data.session);
    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    setUser(null);
    setSession(null);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

  const updateProfile = async (updates) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    updatePassword,
  };

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
}
export default AuthProvider;