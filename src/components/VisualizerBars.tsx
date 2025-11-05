import { BarState } from './AlgorithmVisualizer';

interface VisualizerBarsProps {
  array: BarState[];
}

export const VisualizerBars = ({ array }: VisualizerBarsProps) => {
  const getBarColor = (state: BarState['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-[hsl(var(--bar-comparing))]';
      case 'swapping':
        return 'bg-[hsl(var(--bar-swapping))]';
      case 'sorted':
        return 'bg-[hsl(var(--bar-sorted))]';
      case 'pivot':
        return 'bg-[hsl(var(--bar-pivot))]';
      default:
        return 'bg-[hsl(var(--bar-default))]';
    }
  };

  const maxValue = Math.max(...array.map((bar) => bar.value), 1);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Bars */}
      <div className="w-full flex items-end justify-center gap-1 min-h-[300px]">
        {array.map((bar, index) => {
          const heightPercentage = (bar.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center"
              style={{
                width: `${Math.max(100 / array.length, 3)}%`,
                maxWidth: '80px',
              }}
            >
              {/* Value on top */}
              <div className="text-xs font-medium text-foreground mb-1 text-center">
                {bar.value}
              </div>
              {/* Bar */}
              <div
                className={`w-full transition-all duration-200 rounded-t-sm ${getBarColor(bar.state)}`}
                style={{
                  height: `${Math.max(heightPercentage * 2, 20)}px`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
