# Algo Visualizer

An interactive web application for visualizing sorting algorithms. Learn how algorithms work through beautiful animations and step-by-step explanations.

## Features

- **Interactive Visualizations**: Watch sorting algorithms in action with animated bars representing array elements.
- **Multiple Algorithms**: Supports Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort.
- **Real-time Controls**: Adjust animation speed, pause/resume, and reset the visualization.
- **Step-by-Step Explanations**: Detailed messages explaining each operation during the sorting process.
- **Theme Toggle**: Switch between light and dark themes for comfortable viewing.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityakesarwani10.git
   cd algo-glow-visualizer
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

   Navigate to `http://localhost:5173` to view the application.

## Usage

1. **Select an Algorithm**: Choose from the available sorting algorithms in the control panel.
2. **Generate Array**: Click "Generate New Array" to create a random array of bars.
3. **Adjust Speed**: Use the speed slider to control the animation pace.
4. **Start Visualization**: Click "Start" to begin the sorting animation.
5. **Control Playback**: Use pause, resume, or reset buttons as needed.
6. **Learn**: Read the operation messages to understand each step of the algorithm.

## Project Structure

```
src/
├── components/
│   ├── AlgorithmVisualizer.jsx    # Main visualization component
│   ├── ControlPanel.jsx           # User controls
│   ├── ThemeToggle.jsx            # Theme switcher
│   └── VisualizerBars.jsx         # Animated bars component
├── lib/
│   ├── sortingAlgorithms.js       # Algorithm implementations
│   └── utils.js                   # Utility functions
├── contexts/
│   └── ThemeContext.jsx           # Theme management
└── pages/
    ├── Index.jsx                  # Main page
    └── NotFound.jsx               # 404 page
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Deployment

This project can be deployed using various platforms:

- **Vercel**: Connect your GitHub repo and deploy automatically.
- **Netlify**: Drag and drop the build folder or connect via Git.
- **GitHub Pages**: Use GitHub Actions for automated deployment.

To build for production:

```bash
npm run build
```

The built files will be in the `dist` directory.
