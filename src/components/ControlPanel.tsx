import { Play, Pause, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface ControlPanelProps {
  arraySize: number;
  speed: number;
  isRunning: boolean;
  onArraySizeChange: (size: number) => void;
  onSpeedChange: (speed: number) => void;
  onStart: () => void;
  onStop: () => void;
  onShuffle: () => void;
}

export const ControlPanel = ({
  arraySize,
  speed,
  isRunning,
  onArraySizeChange,
  onSpeedChange,
  onStart,
  onStop,
  onShuffle,
}: ControlPanelProps) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Array Size Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center justify-between">
            <span>Array Size</span>
            <span className="text-primary font-mono">{arraySize}</span>
          </label>
          <Slider
            value={[arraySize]}
            onValueChange={([value]) => onArraySizeChange(value)}
            min={10}
            max={100}
            step={5}
            disabled={isRunning}
            className="w-full"
          />
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center justify-between">
            <span>Animation Speed</span>
            <span className="text-secondary font-mono">{speed}</span>
          </label>
          <Slider
            value={[speed]}
            onValueChange={([value]) => onSpeedChange(value)}
            min={1}
            max={100}
            step={1}
            disabled={isRunning}
            className="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center md:justify-end">
          <button
            onClick={isRunning ? onStop : onStart}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:glow-primary transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </button>

          <button
            onClick={onShuffle}
            disabled={isRunning}
            className="px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold hover:glow-accent transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
          >
            <Shuffle className="w-5 h-5" />
            Shuffle
          </button>
        </div>
      </div>
    </div>
  );
};
