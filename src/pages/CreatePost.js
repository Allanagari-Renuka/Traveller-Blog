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
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const react_1 = __importStar(require("react"));
// const react_router_dom_1 = require("react-router-dom");
// const react_hook_form_1 = require("react-hook-form");
// const react_quill_1 = __importDefault(require("react-quill"));
// require("react-quill/dist/quill.snow.css");
// const supabase_1 = require("../lib/supabase");
// const AuthContext_1 = require("../contexts/AuthContext");
// const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
// const CreatePost = () => {
//     const { user } = (0, AuthContext_1.useAuth)();
//     const navigate = (0, react_router_dom_1.useNavigate)();
//     const [loading, setLoading] = (0, react_1.useState)(false);
//     const { register, handleSubmit, control, formState: { errors }, } = (0, react_hook_form_1.useForm)({
//         defaultValues: {
//             published: false,
//         },
//     });
//     const generateSlug = (title) => {
//         return title
//             .toLowerCase()
//             .replace(/[^a-z0-9 -]/g, '')
//             .replace(/\s+/g, '-')
//             .replace(/-+/g, '-')
//             .trim();
//     };
//     const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
//         if (!user)
//             return;
//         setLoading(true);
//         try {
//             const slug = generateSlug(data.title);
//             const tags = data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];
//             const { error } = yield supabase_1.supabase
//                 .from('posts')
//                 .insert([
//                 {
//                     title: data.title,
//                     slug,
//                     content: data.content,
//                     excerpt: data.excerpt,
//                     destination: data.destination,
//                     country: data.country,
//                     featured_image: data.featured_image || null,
//                     tags,
//                     published: data.published,
//                     author_id: user.id,
//                 },
//             ]);
//             if (error)
//                 throw error;
//             react_hot_toast_1.default.success(`Post ${data.published ? 'published' : 'saved as draft'} successfully!`);
//             navigate('/dashboard');
//         }
//         catch (error) {
//             console.error('Error creating post:', error);
//             react_hot_toast_1.default.error(error.message || 'Failed to create post');
//         }
//         finally {
//             setLoading(false);
//         }
//     });
//     const quillModules = {
//         toolbar: [
//             [{ 'header': [1, 2, 3, false] }],
//             ['bold', 'italic', 'underline', 'strike'],
//             [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//             ['blockquote', 'code-block'],
//             ['link'],
//             ['clean']
//         ],
//     };
//     return (<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
//           Write Your Travel Story
//         </h1>
//         <p className="text-gray-600">Share your adventures and inspire fellow travelers</p>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Title */}
//             <div className="lg:col-span-2">
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
//                 Story Title *
//               </label>
//               <input {...register('title', { required: 'Title is required' })} type="text" className="input-field" placeholder="Enter your story title"/>
//               {errors.title && (<p className="mt-1 text-sm text-red-600">{errors.title.message}</p>)}
//             </div>

//             {/* Destination */}
//             <div>
//               <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
//                 Destination *
//               </label>
//               <input {...register('destination', { required: 'Destination is required' })} type="text" className="input-field" placeholder="e.g., Bali, Tokyo, Paris"/>
//               {errors.destination && (<p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>)}
//             </div>

//             {/* Country */}
//             <div>
//               <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
//                 Country *
//               </label>
//               <input {...register('country', { required: 'Country is required' })} type="text" className="input-field" placeholder="e.g., Indonesia, Japan, France"/>
//               {errors.country && (<p className="mt-1 text-sm text-red-600">{errors.country.message}</p>)}
//             </div>

//             {/* Featured Image */}
//             <div className="lg:col-span-2">
//               <label htmlFor="featured_image" className="block text-sm font-medium text-gray-700 mb-2">
//                 Featured Image URL
//               </label>
//               <input {...register('featured_image')} type="url" className="input-field" placeholder="https://example.com/image.jpg"/>
//               <p className="mt-1 text-sm text-gray-500">
//                 Optional: Add an image URL from Pexels, Unsplash, or any other source
//               </p>
//             </div>

//             {/* Tags */}
//             <div className="lg:col-span-2">
//               <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
//                 Tags
//               </label>
//               <input {...register('tags')} type="text" className="input-field" placeholder="adventure, culture, food, photography (comma-separated)"/>
//               <p className="mt-1 text-sm text-gray-500">
//                 Separate tags with commas to help others discover your story
//               </p>
//             </div>

//             {/* Excerpt */}
//             <div className="lg:col-span-2">
//               <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
//                 Story Preview *
//               </label>
//               <textarea {...register('excerpt', { required: 'Story preview is required' })} rows={3} className="input-field" placeholder="Write a brief summary of your travel story (2-3 sentences)"/>
//               {errors.excerpt && (<p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>)}
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Your Story *
//           </label>
//           <react_hook_form_1.Controller name="content" control={control} rules={{ required: 'Story content is required' }} render={({ field }) => (<react_quill_1.default theme="snow" modules={quillModules} placeholder="Tell your travel story... Share the details, experiences, and memories that made your journey special." {...field}/>)}/>
//           {errors.content && (<p className="mt-2 text-sm text-red-600">{errors.content.message}</p>)}
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <input {...register('published')} type="checkbox" id="published" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"/>
//             <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
//               Publish immediately (uncheck to save as draft)
//             </label>
//           </div>
          
//           <div className="flex space-x-4">
//             <button type="button" onClick={() => navigate('/dashboard')} className="btn-secondary">
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
//               {loading ? 'Saving...' : 'Save Story'}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>);
// };
// exports.default = CreatePost;
