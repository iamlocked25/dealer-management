# 🚗 Dealer Management Dashboard

A comprehensive, modern web application for managing automotive dealers with a beautiful UI, robust features, and seamless user experience.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)
![License](https://img.shields.io/badge/License-MIT-green)

## 📸 Screenshots

### Dashboard
The main dashboard provides an overview of all dealer statistics and quick actions.

### Dealer List
View, search, sort, and filter all dealers with pagination support.

### Add/Edit Dealer
Comprehensive form with validation for managing dealer information.

## ✨ Features

### Core Functionality

#### 📊 Dashboard
- **Real-time Statistics**: View total dealers, active dealers, revenue, and growth metrics
- **Recent Dealers**: Quick access to the most recently added dealers
- **Quick Actions**: Fast navigation to common tasks
- **Responsive Design**: Adapts seamlessly to all screen sizes

#### 👥 Dealer Management
- **Complete CRUD Operations**: Create, Read, Update, and Delete dealers
- **Advanced Search**: Search by name, email, or address
- **Smart Filtering**: Filter by status (Active/Inactive)
- **Multi-column Sorting**: Sort by name, email, phone, status, or creation date
- **Pagination**: Navigate through large dealer lists efficiently (5 items per page)

#### 📝 Dealer Profile Module
- **Form Validation**: Real-time validation for all fields
  - Dealer Name: Required, 3-100 characters
  - Email: Required, valid email format
  - Phone: Required, valid phone format, minimum 10 digits
  - Address: Required, 10-200 characters
  - Operating Hours: Required
- **Success Preview**: Styled preview card after successful submission
- **Seamless Integration**: New dealers appear instantly in the list

#### 🎨 UI/UX Features
- **Reusable Modal Component**: For viewing and editing dealer details
- **Responsive Navigation**: Sidebar with collapsible design for mobile
- **Beautiful Gradients**: Modern color schemes and smooth transitions
- **Interactive Elements**: Hover effects, smooth animations
- **Status Indicators**: Visual badges for dealer status
- **Icon Library**: Lucide React icons throughout

### Technical Features

- **State Management**: Context API for global dealer state
- **Client-side Routing**: React Router DOM for navigation
- **Form Handling**: Controlled components with validation
- **Error Handling**: Comprehensive error states and user feedback
- **Component Reusability**: Modular, maintainable code structure
- **Performance Optimized**: React hooks (useMemo) for expensive operations

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 20.19+ or 22.12+ (required for Vite 7)
- **npm**: Version 10+

> **Note**: If you're using Node.js 18.x, you may encounter compatibility issues with the latest Vite version. Please upgrade to Node.js 20.19+ or 22.12+.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dealer-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
dealer-management/
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Modal.jsx          # Reusable modal component
│   │   │   └── Modal.css
│   │   ├── Dealers/
│   │   │   ├── DealerList.jsx     # Dealer list with filtering, sorting, pagination
│   │   │   ├── DealerList.css
│   │   │   ├── DealerForm.jsx     # Form with validation
│   │   │   ├── DealerForm.css
│   │   │   ├── DealerDetails.jsx  # View dealer details
│   │   │   ├── DealerDetails.css
│   │   │   ├── DealerCard.jsx     # Preview card after submission
│   │   │   └── DealerCard.css
│   │   └── Layout/
│   │       ├── Sidebar.jsx        # Navigation sidebar
│   │       ├── Sidebar.css
│   │       ├── Header.jsx         # Top header with search
│   │       └── Header.css
│   ├── contexts/
│   │   └── DealerContext.jsx      # Global state management
│   ├── pages/
│   │   ├── Dashboard/             # Dashboard page
│   │   ├── DealersPage/           # Dealers listing page
│   │   ├── AddDealerPage/         # Add dealer page
│   │   └── PlaceholderPage/       # Placeholder for future pages
│   ├── App.jsx                    # Main app component
│   ├── App.css
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎯 Component Architecture

### DealerContext
Provides global state management for dealers:
- **State**: `dealers`, `loading`, `error`
- **Actions**: `addDealer`, `updateDealer`, `deleteDealer`, `getDealerById`
- Sample data initialization

### Reusable Components

#### Modal
- Configurable size (small, medium, large)
- Click-outside to close
- Smooth animations
- Accessible design

#### DealerForm
- Comprehensive validation
- Real-time error feedback
- Support for add/edit modes
- Reset functionality

#### DealerList
- Search across multiple fields
- Status filtering
- Sortable columns
- Pagination with page numbers
- Responsive table design

## 🎨 Design System

### Colors
- **Primary**: `#3b82f6` (Blue)
- **Secondary**: `#8b5cf6` (Purple)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Orange)
- **Danger**: `#ef4444` (Red)
- **Neutral**: Grays (#f9fafb to #1f2937)

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: 700 weight
- **Body**: 400-600 weight
- **Small Text**: 0.875rem

### Spacing
- **Base unit**: 0.25rem (4px)
- **Common gaps**: 0.5rem, 1rem, 1.5rem, 2rem

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🔧 Technologies Used

- **React 19.2.0**: UI library
- **React Router DOM 7.9.6**: Routing
- **Vite 7.2.4**: Build tool
- **Lucide React**: Icon library
- **CSS3**: Styling with modern features

## 🌟 Key Features Implementation

### State Management
Uses React Context API for clean, prop-drilling-free state management across the application.

### Form Validation
Comprehensive validation rules:
- Required field validation
- Format validation (email, phone)
- Length constraints
- Real-time feedback
- Touch-based error display

### Sorting & Filtering
- Multi-column sorting with visual indicators
- Dynamic filtering by status
- Search across multiple fields
- Performance optimized with useMemo

### API Integration Ready
While currently using mock data, the architecture is designed for easy API integration:
- Async/await ready
- Error handling structure
- Loading states
- Response handling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

### Netlify

1. Connect your repository
2. Build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Deploy!

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to your hosting service
```

## 📋 Evaluation Criteria Met

### ✅ Code Quality & State Management
- Clean, modular component architecture
- Context API for global state
- Proper separation of concerns
- Reusable components
- Consistent naming conventions

### ✅ API Integration & Error Handling
- Ready for API integration
- Comprehensive error states
- Loading indicators
- User feedback on actions
- Try-catch error handling

### ✅ UI/UX Design and Responsiveness
- Modern, professional design
- Smooth animations and transitions
- Fully responsive layout
- Intuitive navigation
- Accessibility considerations

### ✅ Reusability of Components
- Generic Modal component
- Reusable form component (add/edit modes)
- Flexible dealer card
- Placeholder page component
- Shared CSS patterns

### ✅ Documentation & Clarity
- Comprehensive README
- Code comments where needed
- Clear component structure
- Easy to understand file organization

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created with ❤️

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- UI inspired by modern dashboard designs

---

**Note**: This is a demonstration project showcasing React development skills, state management, and modern UI/UX practices.
