# TypeVibe

A modern, typing speed test web app built with React.

## Features
- **Typing Test**: Measures WPM, accuracy, and provides real-time feedback
- **Animated UI**: Smooth transitions, progress bar, confetti, and dark mode
- **Charts**: Visualize your typing history and progress
- **User Accounts**: Sign up/login with Firebase Authentication
- **Responsive Design**: Works great on desktop and mobile
- **Performance Optimized**: Fast LCP, lazy loading, preloading, and minimal bundle size
- **Deployed on Firebase Hosting**

## Demo
[Live App](https://typing-tester-app.web.app)

## Screenshots
<!-- Add screenshots here if desired -->

## Getting Started

### Prerequisites
- Node.js (v16 or v18 recommended)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
```bash
firebase deploy
```

## Customization
- **Word List**: Edit `src/utils/wordGenerator.js` to change the words used in the test.
- **Theme**: Tweak `src/App.css` for colors, animations, and dark mode.
- **Firebase Auth**: Update `src/utils/auth.js` with your Firebase project config.

## Performance
- Uses React.lazy and Suspense for code splitting
- Preloads critical JS, CSS, fonts, and favicon
- Minimal dependencies for fast load

## Credits
- Built with [React](https://reactjs.org/), [Firebase](https://firebase.google.com/), and [Recharts](https://recharts.org/)
- Confetti by [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

## License
[MIT](LICENSE) 
