// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const react_1 = __importDefault(require("react"));
// const react_router_dom_1 = require("react-router-dom");
// const lucide_react_1 = require("lucide-react");
// const date_fns_1 = require("date-fns");
// const BlogCard = ({ post }) => {
//     var _a;
//     const defaultImage = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800';
//     return (<article className="card group hover:shadow-lg transition-all duration-300">
//       <div className="relative overflow-hidden">
//         <img src={post.featured_image || defaultImage} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
//         <div className="absolute top-4 left-4">
//           <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
//             {post.country}
//           </span>
//         </div>
//       </div>
      
//       <div className="p-6">
//         <div className="flex items-center text-sm text-gray-500 mb-3">
//           <lucide_react_1.MapPin size={16} className="mr-1"/>
//           <span className="mr-4">{post.destination}</span>
//           <lucide_react_1.Calendar size={16} className="mr-1"/>
//           <span>{(0, date_fns_1.format)(new Date(post.created_at), 'MMM dd, yyyy')}</span>
//         </div>
        
//         <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
//           <react_router_dom_1.Link to={`/blog/${post.id}`}>
//             {post.title}
//           </react_router_dom_1.Link>
//         </h3>
        
//         <p className="text-gray-600 mb-4 line-clamp-3">
//           {post.excerpt}
//         </p>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center text-sm text-gray-500">
//             <lucide_react_1.User size={16} className="mr-1"/>
//             <span>{((_a = post.profiles) === null || _a === void 0 ? void 0 : _a.full_name) || 'Anonymous Traveler'}</span>
//           </div>
          
//           <react_router_dom_1.Link to={`/blog/${post.id}`} className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
//             Read More →
//           </react_router_dom_1.Link>
//         </div>
//       </div>
//     </article>);
// };
// exports.default = BlogCard;


import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

const BlogCard = ({ post }) => {
  const defaultImage = 'https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <article className="card group hover:shadow-lg transition-all duration-300">
      <div className="relative overflow-hidden">
        <img 
          src={post.featured_image || defaultImage} 
          alt={post.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.country}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="mr-4">{post.destination}</span>
          <Calendar size={16} className="mr-1" />
          <span>{format(new Date(post.created_at), 'MMM dd, yyyy')}</span>
        </div>
        
        <h3 className="text-xl font-display font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          <Link to={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <User size={16} className="mr-1" />
            <span>{post.profiles?.full_name || 'Anonymous Traveler'}</span>
          </div>
          
          <Link 
            to={`/blog/${post.id}`} 
            className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;