# 🚀 CryptoTracker - Real-Time Cryptocurrency Price Tracker

A modern, responsive React application that tracks cryptocurrency prices in real-time, built with React, Redux Toolkit, and TypeScript.

![CryptoTracker Demo](Video.mp4)
## ✨ Features

- **Real-time Price Updates**: Simulated WebSocket updates every 1.5 seconds
- **Interactive Data Table**: Sort by any column, search functionality, and favorites system
- **Dark Mode Support**: Automatic system preference detection with manual toggle
- **Responsive Design**: Mobile-friendly layout with smooth transitions
- **Favorites System**: Star your favorite cryptocurrencies with localStorage persistence
- **Price Change Indicators**: Visual feedback for price movements with color coding
- **7-Day Price Charts**: Sparkline charts showing price trends
- **Search & Filter**: Instant search by name or symbol

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Type Safety**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/sudheer72/crypto-tracker.git
   ```

2. Install dependencies:
   ```bash
   cd crypto-tracker
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Project Structure

```
src/
├── components/          # React components
├── store/              # Redux store and slices
├── services/           # WebSocket simulation
├── types/              # TypeScript interfaces
├── utils/              # Helper functions
└── data/              # Mock data
```

## 🔄 State Management

The application uses Redux Toolkit for state management with the following features:

- Centralized crypto asset data
- Favorites system with localStorage persistence
- Search and sort state
- Dark mode preferences

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible table layout
- Adaptive typography
- Touch-friendly controls

## 🎨 UI/UX Features

- Smooth transitions and animations
- Visual feedback for price changes
- Intuitive favorites system
- Clean and modern design
- System-aware dark mode

## 🔍 Search and Filter

- Real-time search functionality
- Filter by name or symbol
- Sort by any column
- Favorites prioritization

## 📊 Data Visualization

- Real-time price updates
- 7-day price trend charts
- Color-coded price changes
- Market cap and volume formatting

## 🔒 Performance Optimizations

- Memoized components
- Efficient Redux selectors
- Debounced search
- Optimized re-renders

## 📝 Future Improvements

- [ ] Real WebSocket integration
- [ ] Additional cryptocurrency data
- [ ] Price alerts system
- [ ] Portfolio tracking
- [ ] Historical data charts
- [ ] Multiple currency support
- [ ] News integration
- [ ] Mobile app version


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.