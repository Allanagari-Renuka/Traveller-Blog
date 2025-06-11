// "use strict";
// var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     var desc = Object.getOwnPropertyDescriptor(m, k);
//     if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
//       desc = { enumerable: true, get: function() { return m[k]; } };
//     }
//     Object.defineProperty(o, k2, desc);
// }) : (function(o, m, k, k2) {
//     if (k2 === undefined) k2 = k;
//     o[k2] = m[k];
// }));
// var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
//     Object.defineProperty(o, "default", { enumerable: true, value: v });
// }) : function(o, v) {
//     o["default"] = v;
// });
// var __importStar = (this && this.__importStar) || (function () {
//     var ownKeys = function(o) {
//         ownKeys = Object.getOwnPropertyNames || function (o) {
//             var ar = [];
//             for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
//             return ar;
//         };
//         return ownKeys(o);
//     };
//     return function (mod) {
//         if (mod && mod.__esModule) return mod;
//         var result = {};
//         if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
//         __setModuleDefault(result, mod);
//         return result;
//     };
// })();
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.AuthProvider = exports.useAuth = void 0;
// const react_1 = __importStar(require("react"));
// const supabase_1 = require("../lib/supabase");
// const AuthContext = (0, react_1.createContext)(undefined);
// const useAuth = () => {
//     const context = (0, react_1.useContext)(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };
// exports.useAuth = useAuth;
// const AuthProvider = ({ children }) => {
//     const [user, setUser] = (0, react_1.useState)(null);
//     const [session, setSession] = (0, react_1.useState)(null);
//     const [loading, setLoading] = (0, react_1.useState)(true);
//     (0, react_1.useEffect)(() => {
//         // Get initial session
//         supabase_1.supabase.auth.getSession().then(({ data: { session } }) => {
//             var _a;
//             setSession(session);
//             setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
//             setLoading(false);
//         });
//         // Listen for auth changes
//         const { data: { subscription }, } = supabase_1.supabase.auth.onAuthStateChange((event, session) => __awaiter(void 0, void 0, void 0, function* () {
//             var _a;
//             setSession(session);
//             setUser((_a = session === null || session === void 0 ? void 0 : session.user) !== null && _a !== void 0 ? _a : null);
//             setLoading(false);
//         }));
//         return () => subscription.unsubscribe();
//     }, []);
//     const signUp = (email, password, fullName) => __awaiter(void 0, void 0, void 0, function* () {
//         const { data, error } = yield supabase_1.supabase.auth.signUp({
//             email,
//             password,
//             options: {
//                 data: {
//                     full_name: fullName,
//                 },
//             },
//         });
//         if (error)
//             throw error;
//         // Create profile
//         if (data.user) {
//             const { error: profileError } = yield supabase_1.supabase
//                 .from('profiles')
//                 .insert([
//                 {
//                     id: data.user.id,
//                     full_name: fullName,
//                 },
//             ]);
//             if (profileError)
//                 throw profileError;
//         }
//         return data;
//     });
//     const signIn = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
//         const { data, error } = yield supabase_1.supabase.auth.signInWithPassword({
//             email,
//             password,
//         });
//         if (error)
//             throw error;
//         return data;
//     });
//     const signOut = () => __awaiter(void 0, void 0, void 0, function* () {
//         const { error } = yield supabase_1.supabase.auth.signOut();
//         if (error)
//             throw error;
//     });
//     const value = {
//         user,
//         session,
//         loading,
//         signUp,
//         signIn,
//         signOut,
//     };
//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
// exports.AuthProvider = AuthProvider;
