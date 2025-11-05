export const VisualizerBars = ({ array }) => {
  const getBarColor = (state) => {
    switch (state) {
      case 'comparing':
        return 'bg-[hsl(var(--bar-comparing))] shadow-lg shadow-yellow-500/20 animate-pulse';
      case 'swapping':
        return 'bg-[hsl(var(--bar-swapping))] shadow-lg shadow-red-500/20 animate-bounce';
      case 'sorted':
        return 'bg-[hsl(var(--bar-sorted))] shadow-lg shadow-green-500/20';
      case 'pivot':
        return 'bg-[hsl(var(--bar-pivot))] shadow-lg shadow-purple-500/20';
      default:
        return 'bg-[hsl(var(--bar-default))] hover:shadow-md transition-shadow duration-300';
    }
  };

  const maxValue = Math.max(...array.map((bar) => bar.value), 1);

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* Bars */}
      <div className="w-full flex items-end justify-center gap-1 min-h-[300px] p-4 bg-gradient-to-b from-transparent to-muted/20 rounded-lg">
        {array.map((bar, index) => {
          const heightPercentage = (bar.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center group"
              style={{
                width: `${Math.max(100 / array.length, 3)}%`,
                maxWidth: '80px',
              }}
            >
              {/* Value on top */}
              <div className="text-xs font-medium text-foreground mb-1 text-center opacity-75 group-hover:opacity-100 transition-opacity">
                {bar.value}
              </div>
              {/* Bar */}
              <div
                className={`w-full transition-all duration-300 rounded-t-lg ${getBarColor(bar.state)} hover:scale-105 transform`}
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
