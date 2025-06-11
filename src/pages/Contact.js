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
// const react_hook_form_1 = require("react-hook-form");
// const lucide_react_1 = require("lucide-react");
// const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
// const Contact = () => {
//     const [loading, setLoading] = (0, react_1.useState)(false);
//     const { register, handleSubmit, reset, formState: { errors }, } = (0, react_hook_form_1.useForm)();
//     const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
//         setLoading(true);
//         try {
//             // Simulate form submission
//             yield new Promise(resolve => setTimeout(resolve, 1000));
//             react_hot_toast_1.default.success('Message sent successfully! We\'ll get back to you soon.');
//             reset();
//         }
//         catch (error) {
//             react_hot_toast_1.default.error('Failed to send message. Please try again.');
//         }
//         finally {
//             setLoading(false);
//         }
//     });
//     const contactInfo = [
//         {
//             icon: lucide_react_1.Mail,
//             title: 'Email Us',
//             content: 'hello@Boundless Horizons.com',
//             description: 'Send us an email anytime',
//         },
//         {
//             icon: lucide_react_1.Phone,
//             title: 'Call Us',
//             content: '+1 (555) 123-4567',
//             description: 'Mon-Fri 9AM-6PM EST',
//         },
//         {
//             icon: lucide_react_1.MapPin,
//             title: 'Visit Us',
//             content: 'San Francisco, CA',
//             description: 'Remote-first company',
//         },
//     ];
//     const faqs = [
//         {
//             question: 'How can I contribute to Boundless Horizons?',
//             answer: 'Simply create an account and start sharing your travel stories! We welcome all types of travel experiences, from budget backpacking to luxury getaways.',
//         },
//         {
//             question: 'Can I monetize my travel blog posts?',
//             answer: 'Currently, Boundless Horizons is a community-driven platform focused on sharing experiences. We\'re exploring monetization options for our contributors.',
//         },
//         {
//             question: 'How do I get featured on the homepage?',
//             answer: 'High-quality posts with engaging content, great photos, and helpful information have the best chance of being featured. Keep writing and engaging with the community!',
//         },
//         {
//             question: 'Can I edit or delete my posts?',
//             answer: 'Yes! You have full control over your posts. You can edit, unpublish, or delete them anytime from your dashboard.',
//         },
//     ];
//     return (<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Hero Section */}
//       <section className="text-center mb-16">
//         <div className="relative rounded-2xl overflow-hidden mb-8">
//           <img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Contact us" className="w-full h-64 md:h-80 object-cover"/>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
//           <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
//             <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
//               Get in Touch
//             </h1>
//             <p className="text-xl opacity-90 max-w-2xl">
//               Have questions, suggestions, or just want to say hello? We'd love to hear from you!
//             </p>
//           </div>
//         </div>
//       </section>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
//         {/* Contact Form */}
//         <div className="lg:col-span-2">
//           <div className="card p-8">
//             <div className="flex items-center mb-6">
//               <lucide_react_1.MessageCircle size={32} className="text-primary-600 mr-3"/>
//               <h2 className="text-3xl font-display font-bold text-gray-900">
//                 Send us a Message
//               </h2>
//             </div>
            
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Full Name *
//                   </label>
//                   <input {...register('name', { required: 'Name is required' })} type="text" className="input-field" placeholder="Your full name"/>
//                   {errors.name && (<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>)}
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                     Email Address *
//                   </label>
//                   <input {...register('email', {
//         required: 'Email is required',
//         pattern: {
//             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//             message: 'Invalid email address',
//         },
//     })} type="email" className="input-field" placeholder="your@email.com"/>
//                   {errors.email && (<p className="mt-1 text-sm text-red-600">{errors.email.message}</p>)}
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
//                   Subject *
//                 </label>
//                 <input {...register('subject', { required: 'Subject is required' })} type="text" className="input-field" placeholder="What's this about?"/>
//                 {errors.subject && (<p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>)}
//               </div>

//               <div>
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
//                   Message *
//                 </label>
//                 <textarea {...register('message', { required: 'Message is required' })} rows={6} className="input-field" placeholder="Tell us more about your inquiry..."/>
//                 {errors.message && (<p className="mt-1 text-sm text-red-600">{errors.message.message}</p>)}
//               </div>

//               <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
//                 {loading ? ('Sending...') : (<>
//                     <lucide_react_1.Send size={20} className="mr-2"/>
//                     Send Message
//                   </>)}
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Contact Info & FAQ */}
//         <div className="space-y-8">
//           {/* Contact Information */}
//           <div className="card p-6">
//             <h3 className="text-xl font-display font-bold text-gray-900 mb-6">
//               Contact Information
//             </h3>
//             <div className="space-y-4">
//               {contactInfo.map((info, index) => {
//             const Icon = info.icon;
//             return (<div key={index} className="flex items-start space-x-3">
//                     <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <Icon size={20} className="text-primary-600"/>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-gray-900">{info.title}</h4>
//                       <p className="text-primary-600 font-medium">{info.content}</p>
//                       <p className="text-sm text-gray-600">{info.description}</p>
//                     </div>
//                   </div>);
//         })}
//             </div>
//           </div>

//           {/* Response Time */}
//           <div className="card p-6">
//             <div className="flex items-center mb-4">
//               <lucide_react_1.Clock size={24} className="text-primary-600 mr-2"/>
//               <h3 className="text-xl font-display font-bold text-gray-900">
//                 Response Time
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               We typically respond to all inquiries within 24-48 hours during business days.
//             </p>
//             <div className="bg-primary-50 p-4 rounded-lg">
//               <p className="text-sm text-primary-700">
//                 <strong>Business Hours:</strong><br />
//                 Monday - Friday: 9:00 AM - 6:00 PM (EST)<br />
//                 Weekend: Limited support
//               </p>
//             </div>
//           </div>

//           {/* Global Community */}
//           <div className="card p-6">
//             <div className="flex items-center mb-4">
//               <lucide_react_1.Globe size={24} className="text-primary-600 mr-2"/>
//               <h3 className="text-xl font-display font-bold text-gray-900">
//                 Global Community
//               </h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Join our community of travelers from around the world and get instant help from fellow adventurers.
//             </p>
//             <div className="space-y-2">
//               <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">
//                 → Join our Discord Community
//               </a>
//               <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">
//                 → Follow us on Social Media
//               </a>
//               <a href="#" className="block text-primary-600 hover:text-primary-700 text-sm">
//                 → Browse Help Center
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <section className="mt-16">
//         <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
//           Frequently Asked Questions
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {faqs.map((faq, index) => (<div key={index} className="card p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                 {faq.question}
//               </h3>
//               <p className="text-gray-600 leading-relaxed">
//                 {faq.answer}
//               </p>
//             </div>))}
//         </div>
//       </section>
//     </div>);
// };
// exports.default = Contact;
