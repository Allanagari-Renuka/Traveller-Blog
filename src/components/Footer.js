"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const Footer = () => {
    return (<footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-display font-bold">Boundless Horizons</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Share your travel adventures, discover hidden gems, and connect with fellow wanderers. 
              Every journey has a story worth telling.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                <lucide_react_1.Instagram size={20}/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                <lucide_react_1.Twitter size={20}/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                <lucide_react_1.Facebook size={20}/>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800">
                <lucide_react_1.Mail size={20}/>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <lucide_react_1.Compass size={20} className="mr-2"/>
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <react_router_dom_1.Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.Home size={16} className="mr-2"/>
                  Home
                </react_router_dom_1.Link>
              </li>
              <li>
                <react_router_dom_1.Link to="/destinations" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.MapPin size={16} className="mr-2"/>
                  Destinations
                </react_router_dom_1.Link>
              </li>
              <li>
                <react_router_dom_1.Link to="/experiences" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.Compass size={16} className="mr-2"/>
                  Experiences
                </react_router_dom_1.Link>
              </li>
              <li>
                <react_router_dom_1.Link to="/blogs" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.BookOpen size={16} className="mr-2"/>
                  All Blogs
                </react_router_dom_1.Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <lucide_react_1.User size={20} className="mr-2"/>
              Community
            </h3>
            <ul className="space-y-3">
              <li>
                <react_router_dom_1.Link to="/register" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.User size={16} className="mr-2"/>
                  Join Community
                </react_router_dom_1.Link>
              </li>
              <li>
                <react_router_dom_1.Link to="/create-post" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.PenTool size={16} className="mr-2"/>
                  Write a Blog
                </react_router_dom_1.Link>
              </li>
              <li>
                <react_router_dom_1.Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.Info size={16} className="mr-2"/>
                  About Us
                </react_router_dom_1.Link>
              </li>
              <li>
                <react_router_dom_1.Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <lucide_react_1.Phone size={16} className="mr-2"/>
                  Contact
                </react_router_dom_1.Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Travel Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Travel Tips & Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Photography Tips
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Safety Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Packing Essentials
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Budget Planning
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center mb-8">
            <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Get the latest travel stories and tips delivered to your inbox</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"/>
              <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 mb-4">
            © 2024 Boundless Horizons. All rights reserved. Built with passion for travel enthusiasts.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>);
};
exports.default = Footer;
