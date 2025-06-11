// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import { supabase } from '../lib/supabase';

// // const AuthContext = createContext(undefined);

// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (context === undefined) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [session, setSession] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Get initial session
// //     supabase.auth.getSession().then(({ data: { session } }) => {
// //       setSession(session);
// //       setUser(session?.user ?? null);
// //       setLoading(false);
// //     });

// //     // Listen for auth changes
// //     const {
// //       data: { subscription },
// //     } = supabase.auth.onAuthStateChange(async (event, session) => {
// //       setSession(session);
// //       setUser(session?.user ?? null);
// //       setLoading(false);
// //     });

// //     return () => subscription.unsubscribe();
// //   }, []);

// //   const signUp = async (email, password, fullName) => {
// //     const { data, error } = await supabase.auth.signUp({
// //       email,
// //       password,
// //       options: {
// //         data: {
// //           full_name: fullName,
// //         },
// //       },
// //     });

// //     if (error) throw error;

// //     // Create profile
// //     if (data.user) {
// //       const { error: profileError } = await supabase
// //         .from('profiles')
// //         .insert([
// //           {
// //             id: data.user.id,
// //             full_name: fullName,
// //           },
// //         ]);

// //       if (profileError) throw profileError;
// //     }

// //     return data;
// //   };

// //   const signIn = async (email, password) => {
// //     const { data, error } = await supabase.auth.signInWithPassword({
// //       email,
// //       password,
// //     });

// //     if (error) throw error;
// //     return data;
// //   };

// //   const signOut = async () => {
// //     const { error } = await supabase.auth.signOut();
// //     if (error) throw error;
// //   };

// //   const value = {
// //     user,
// //     session,
// //     loading,
// //     signUp,
// //     signIn,
// //     signOut,
// //   };

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { supabase } from '../lib/supabase';

// const AuthContext = createContext(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null); // Added for consistency
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get initial session
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//       setCurrentUser(session?.user ?? null); // Keep both states in sync
//       setLoading(false);
//     });

//     // Listen for auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(async (event, session) => {
//       setSession(session);
//       setUser(session?.user ?? null);
//       setCurrentUser(session?.user ?? null); // Keep both states in sync
//       setLoading(false);
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   const signUp = async (email, password, fullName) => {
//     const { data, error } = await supabase.auth.signUp({
//       email,
//       password,
//       options: {
//         data: {
//           full_name: fullName,
//         },
//       },
//     });

//     if (error) throw error;

//     // Create profile
//     if (data.user) {
//       const { error: profileError } = await supabase
//         .from('profiles')
//         .insert([
//           {
//             id: data.user.id,
//             full_name: fullName,
//           },
//         ]);

//       if (profileError) throw profileError;
//     }

//     return data;
//   };

//   const signIn = async (email, password) => {
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) throw error;
    
//     // Update both user states
//     setUser(data.user);
//     setCurrentUser(data.user);
    
//     return data;
//   };

//   const signOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) throw error;
    
//     // Clear both user states
//     setUser(null);
//     setCurrentUser(null);
//   };

//   const value = {
//     user,
//     currentUser, // Added for consistency with your requested structure
//     session,
//     loading,
//     signUp,
//     signIn,
//     signOut,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



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
// const API_BASE_URL = 'http://localhost:5000';

const API_BASE_URL = 'http://localhost:5000';

const signUp = async (email, password, fullName) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    setUser({ email, full_name: fullName });
    setSession({ token: data.token || null });
    return { user: { email, full_name: fullName }, token: data.token || null };
  } finally {
    setLoading(false);
  }
};

const signIn = async (email, password) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    setUser({ email });
    setSession({ token: data.token });
    return { user: { email }, token: data.token };
  } finally {
    setLoading(false);
  }
};

const signOut = async () => {
  setUser(null);
  setSession(null);
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
};

return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
}
export default AuthProvider;