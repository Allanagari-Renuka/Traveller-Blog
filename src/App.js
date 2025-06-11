// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const react_1 = __importDefault(require("react"));
// const react_router_dom_1 = require("react-router-dom");
// const react_hot_toast_1 = require("react-hot-toast");
// const AuthContext_1 = require("./contexts/AuthContext");
// const Layout_1 = __importDefault(require("./components/Layout"));
// const Home_1 = __importDefault(require("./pages/Home"));
// const Destinations_1 = __importDefault(require("./pages/Destinations"));
// const Experiences_1 = __importDefault(require("./pages/Experiences"));
// const BlogList_1 = __importDefault(require("./pages/BlogList"));
// const BlogDetail_1 = __importDefault(require("./pages/BlogDetail"));
// const About_1 = __importDefault(require("./pages/About"));
// const Contact_1 = __importDefault(require("./pages/Contact"));
// const Login_1 = __importDefault(require("./pages/Login"));
// const Register_1 = __importDefault(require("./pages/Register"));
// const Dashboard_1 = __importDefault(require("./pages/Dashboard"));
// const CreatePost_1 = __importDefault(require("./pages/CreatePost"));
// const EditPost_1 = __importDefault(require("./pages/EditPost"));
// const ProtectedRoute_1 = __importDefault(require("./components/ProtectedRoute"));
// function App() {
//     return (<AuthContext_1.AuthProvider>
//       <react_router_dom_1.BrowserRouter>
//         <div className="App">
//           <Layout_1.default>
//             <react_router_dom_1.Routes>
//               <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
//               <react_router_dom_1.Route path="/destinations" element={<Destinations_1.default />}/>
//               <react_router_dom_1.Route path="/experiences" element={<Experiences_1.default />}/>
//               <react_router_dom_1.Route path="/blogs" element={<BlogList_1.default />}/>
//               <react_router_dom_1.Route path="/blog/:id" element={<BlogDetail_1.default />}/>
//               <react_router_dom_1.Route path="/about" element={<About_1.default />}/>
//               <react_router_dom_1.Route path="/contact" element={<Contact_1.default />}/>
//               <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
//               <react_router_dom_1.Route path="/register" element={<Register_1.default />}/>
//               <react_router_dom_1.Route path="/dashboard" element={<ProtectedRoute_1.default>
//                     <Dashboard_1.default />
//                   </ProtectedRoute_1.default>}/>
//               <react_router_dom_1.Route path="/create-post" element={<ProtectedRoute_1.default>
//                     <CreatePost_1.default />
//                   </ProtectedRoute_1.default>}/>
//               <react_router_dom_1.Route path="/edit-post/:id" element={<ProtectedRoute_1.default>
//                     <EditPost_1.default />
//                   </ProtectedRoute_1.default>}/>
//             </react_router_dom_1.Routes>
//           </Layout_1.default>
//           <react_hot_toast_1.Toaster position="top-right" toastOptions={{
//             duration: 4000,
//             style: {
//                 background: '#363636',
//                 color: '#fff',
//             },
//         }}/>
//         </div>
//       </react_router_dom_1.BrowserRouter>
//     </AuthContext_1.AuthProvider>);
// }
// exports.default = App;
