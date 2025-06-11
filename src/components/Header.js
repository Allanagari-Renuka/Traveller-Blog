"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const lucide_react_1 = require("lucide-react");
const AuthContext_1 = require("../contexts/AuthContext");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = (0, react_1.useState)(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = (0, react_1.useState)(false);
    const [searchQuery, setSearchQuery] = (0, react_1.useState)('');
    const { user, signOut } = (0, AuthContext_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const location = (0, react_router_dom_1.useLocation)();
    const handleSignOut = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield signOut();
            react_hot_toast_1.default.success('Logged out successfully');
            navigate('/');
            setIsUserMenuOpen(false);
        }
        catch (error) {
            react_hot_toast_1.default.error('Error logging out');
        }
    });
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/blogs?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
            setIsMenuOpen(false);
        }
    };
    const isActive = (path) => {
        return location.pathname === path;
    };
    const navigationItems = [
        { path: '/', label: 'Home', icon: lucide_react_1.Home },
        { path: '/about', label: 'About', icon: lucide_react_1.Info },
        { path: '/destinations', label: 'Destinations', icon: lucide_react_1.MapPin },
        { path: '/experiences', label: 'Experiences', icon: lucide_react_1.Compass },
        { path: '/blogs', label: 'Blog', icon: lucide_react_1.BookOpen },
        { path: '/contact', label: 'Contact', icon: lucide_react_1.Mail },
    ];
    return (<header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <react_router_dom_1.Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="text-xl font-display font-bold text-gray-900">Boundless Horizons</span>
          </react_router_dom_1.Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
            const Icon = item.icon;
            return (<react_router_dom_1.Link key={item.path} to={item.path} className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}>
                  <Icon size={16}/>
                  <span>{item.label}</span>
                </react_router_dom_1.Link>);
        })}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <lucide_react_1.Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
              <input type="text" placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"/>
            </form>

            {user ? (<div className="relative">
                <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors px-3 py-2 rounded-md">
                  <lucide_react_1.User size={20}/>
                  <span className="hidden xl:inline">Account</span>
                </button>
                
                {isUserMenuOpen && (<div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <react_router_dom_1.Link to="/dashboard" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}>
                      <lucide_react_1.Home size={16} className="mr-2"/>
                      My Blogs
                    </react_router_dom_1.Link>
                    <react_router_dom_1.Link to="/create-post" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsUserMenuOpen(false)}>
                      <lucide_react_1.PenTool size={16} className="mr-2"/>
                      Write a Blog
                    </react_router_dom_1.Link>
                    <hr className="my-1"/>
                    <button onClick={handleSignOut} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <lucide_react_1.LogOut size={16} className="mr-2"/>
                      Sign Out
                    </button>
                  </div>)}
              </div>) : (<div className="flex items-center space-x-3">
                <react_router_dom_1.Link to="/login" className="btn-primary">
                  Login
                </react_router_dom_1.Link>
                <react_router_dom_1.Link to="/register" className="btn-primary">
                  SignUp
                </react_router_dom_1.Link>
              </div>)}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 rounded-md hover:bg-gray-100">
            {isMenuOpen ? <lucide_react_1.X size={24}/> : <lucide_react_1.Menu size={24}/>}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (<div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-4">
                <lucide_react_1.Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                <input type="text" placeholder="Search destinations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"/>
              </form>

              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (<react_router_dom_1.Link key={item.path} to={item.path} className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${isActive(item.path)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`} onClick={() => setIsMenuOpen(false)}>
                    <Icon size={18}/>
                    <span>{item.label}</span>
                  </react_router_dom_1.Link>);
            })}

              {user ? (<>
                  <hr className="my-2"/>
                  <react_router_dom_1.Link to="/dashboard" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <lucide_react_1.Home size={18}/>
                    <span>My Blogs</span>
                  </react_router_dom_1.Link>
                  <react_router_dom_1.Link to="/create-post" className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    <lucide_react_1.PenTool size={18}/>
                    <span>Write a Blog</span>
                  </react_router_dom_1.Link>
                  <button onClick={handleSignOut} className="flex items-center space-x-2 px-3 py-2 text-left text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors w-full">
                    <lucide_react_1.LogOut size={18}/>
                    <span>Sign Out</span>
                  </button>
                </>) : (<>
                  <hr className="my-2"/>
                  <react_router_dom_1.Link to="/login" className="btn-primary text-center mx-3" onClick={() => setIsMenuOpen(false)}>
                    <lucide_react_1.User size={18}/>
                    <span>Login</span>
                  </react_router_dom_1.Link>
                  <react_router_dom_1.Link to="/register" className="btn-primary text-center mx-3" onClick={() => setIsMenuOpen(false)}>
                    SignUp
                  </react_router_dom_1.Link>
                </>)}
            </div>
          </div>)}
      </div>
    </header>);
};
exports.default = Header;
