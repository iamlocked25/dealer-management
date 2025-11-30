# 🚀 Quick Start

## ⚠️ Important: Node.js Version

This project requires **Node.js 20.19+ or 22.12+** due to Vite 7.

Check your version:
```bash
node --version
```

If you're on an older version, upgrade from [nodejs.org](https://nodejs.org/)

## 🏃 Run the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

## 📖 Full Documentation

- **README.md** - Complete project documentation
- **QUICKSTART.md** - Detailed setup guide
- **DEPLOYMENT.md** - Deployment instructions
- **PROJECT_SUMMARY.md** - Comprehensive project overview
- **SUBMISSION_CHECKLIST.md** - Submission requirements

## ✅ Quick Test

1. View Dashboard (home page)
2. Click "Add Dealer" and create a dealer
3. View the dealer in the list
4. Try search, filter, and sorting
5. Edit and delete dealers

## 🐛 Troubleshooting

**Issue**: "crypto.hash is not a function"
**Fix**: Upgrade to Node.js 20.19+

**Issue**: Dependencies not installing
**Fix**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🚀 Deploy

**Easiest**: Push to GitHub, then deploy on Vercel or Netlify (see DEPLOYMENT.md)

---

Made with ❤️ using React + Vite
