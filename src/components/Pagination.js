// "use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const react_1 = __importDefault(require("react"));
// const lucide_react_1 = require("lucide-react");
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//     const getPageNumbers = () => {
//         const pages = [];
//         const showPages = 5;
//         let start = Math.max(1, currentPage - Math.floor(showPages / 2));
//         let end = Math.min(totalPages, start + showPages - 1);
//         if (end - start + 1 < showPages) {
//             start = Math.max(1, end - showPages + 1);
//         }
//         for (let i = start; i <= end; i++) {
//             pages.push(i);
//         }
//         return pages;
//     };
//     if (totalPages <= 1)
//         return null;
//     return (<div className="flex items-center justify-center space-x-2 mt-8">
//       <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
//         <lucide_react_1.ChevronLeft size={16} className="mr-1"/>
//         Previous
//       </button>
      
//       {getPageNumbers().map((page) => (<button key={page} onClick={() => onPageChange(page)} className={`px-3 py-2 text-sm font-medium rounded-lg ${page === currentPage
//                 ? 'bg-primary-600 text-white'
//                 : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}>
//           {page}
//         </button>))}
      
//       <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
//         Next
//         <lucide_react_1.ChevronRight size={16} className="ml-1"/>
//       </button>
//     </div>);
// };
// exports.default = Pagination;
