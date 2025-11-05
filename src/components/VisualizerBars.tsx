import { BarState, Algorithm } from './AlgorithmVisualizer';

interface VisualizerBarsProps {
  array: BarState[];
  algorithm: Algorithm;
}

const algorithmColors = {
  bubble: 'from-primary to-primary/60',
  selection: 'from-secondary to-secondary/60',
  insertion: 'from-accent to-accent/60',
  merge: 'from-primary to-secondary',
  quick: 'from-secondary to-accent',
  heap: 'from-accent to-primary',
};

export const VisualizerBars = ({ array, algorithm }: VisualizerBarsProps) => {
  const getBarColor = (state: BarState['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-gradient-to-t from-yellow-400 to-yellow-600 glow-pulse';
      case 'swapping':
        return 'bg-gradient-to-t from-red-400 to-red-600 animate-bar-swap';
      case 'sorted':
        return 'bg-gradient-to-t from-green-400 to-green-600';
      case 'pivot':
        return 'bg-gradient-to-t from-purple-400 to-purple-600';
      default:
        return `bg-gradient-to-t ${algorithmColors[algorithm]}`;
    }
  };

  const maxValue = Math.max(...array.map((bar) => bar.value), 1);

  return (
    <div className="w-full h-full flex items-end justify-center gap-[2px] px-4 min-h-[400px]">
      {array.map((bar, index) => {
        const heightPercentage = (bar.value / maxValue) * 100;
        return (
          <div
            key={index}
            className={`transition-all duration-200 rounded-t-sm ${getBarColor(bar.state)}`}
            style={{
              height: `${heightPercentage}%`,
              width: `${100 / array.length}%`,
              minWidth: '2px',
              maxWidth: '20px',
            }}
          />
        );
      })}
    </div>
  );
};
