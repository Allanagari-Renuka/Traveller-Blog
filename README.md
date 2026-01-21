# 🌍 Traveller Blog

A modern, full-featured travel blogging platform built with React, TypeScript, and Vite. Share your adventures, inspire wanderlust, and connect with fellow travelers around the globe.

![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 📝 **Rich Content Creation** - Create and publish engaging travel stories with multimedia support
- 🎨 **Modern UI/UX** - Beautiful, responsive design powered by Tailwind CSS
- ⚡ **Lightning Fast** - Built with Vite for optimal performance and development experience
- 🔒 **Type-Safe** - TypeScript ensures robust and maintainable code
- 📱 **Fully Responsive** - Seamless experience across all devices
- 🚀 **Easy Deployment** - Configured for Google App Engine deployment

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.6.2
- **Build Tool:** Vite 6.0.1
- **Styling:** Tailwind CSS 3.4.17
- **Linting:** ESLint 9.17.0
- **Deployment:** Google App Engine

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** or **pnpm**
- A modern web browser

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Allanagari-Renuka/Traveller-Blog.git
cd Traveller-Blog
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```env
# Add your environment variables here
VITE_API_URL=your_api_url
VITE_APP_NAME=Traveller Blog
# Add other necessary variables
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production-ready application |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run type-check` | Run TypeScript compiler check |

## 🏗️ Project Structure

```
Traveller-Blog/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main App component
│   └── main.tsx        # Application entry point
├── .env                # Environment variables (not committed)
├── .env.example        # Example environment variables
├── app.yaml            # Google App Engine configuration
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── vite.config.js      # Vite configuration
```

## 🎨 Customization

### Styling

This project uses Tailwind CSS for styling. You can customize the design system by editing `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        // Add your custom colors
      },
      fontFamily: {
        // Add your custom fonts
      },
    },
  },
}
```

### Configuration

Main configuration files:
- **Vite Config:** `vite.config.js` - Build and dev server settings
- **TypeScript Config:** `tsconfig.json` - TypeScript compiler options
- **ESLint Config:** `eslint.config.js` - Code quality rules
- **PostCSS Config:** `postcss.config.js` - CSS processing

## 🚀 Deployment

### Google App Engine

This project is configured for deployment on Google App Engine. The `app.yaml` file contains the deployment configuration.

#### Deploy to GAE

```bash
# Install Google Cloud SDK if not already installed
# https://cloud.google.com/sdk/docs/install

# Build the project
npm run build

# Deploy to App Engine
gcloud app deploy
```

### Other Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Docker:**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run e2e tests
npm run test:e2e
```

## 🔒 Environment Variables

Create a `.env` file based on `.env.example`. Never commit your `.env` file to version control.

Required variables:
- `VITE_API_URL` - Backend API endpoint
- `VITE_APP_NAME` - Application name
- Additional variables as needed for your setup

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Run `npm run lint` before committing
- Write meaningful commit messages
- Add comments for complex logic

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Renuka Allanagari** - [@Allanagari-Renuka](https://github.com/Allanagari-Renuka)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 📞 Support

If you encounter any issues or have questions:

- Open an [issue](https://github.com/Allanagari-Renuka/Traveller-Blog/issues)
- Check existing issues for solutions
- Contact the maintainers

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Comment system for blog posts
- [ ] Social media integration
- [ ] Advanced search and filtering
- [ ] Map integration for travel locations
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA) features

---

⭐ Star this repository if you find it helpful!
