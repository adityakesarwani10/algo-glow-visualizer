import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Algorithm } from './AlgorithmVisualizer';

interface ControlPanelProps {
  arraySize: number;
  speed: number;
  isRunning: boolean;
  stepMode: boolean;
  canStep: boolean;
  selectedAlgorithm: Algorithm;
  onArraySizeChange: (size: number) => void;
  onSpeedChange: (speed: number) => void;
  onStart: () => void;
  onStop: () => void;
  onShuffle: () => void;
  onSelectAlgorithm: (algorithm: Algorithm) => void;
  onToggleStepMode: (enabled: boolean) => void;
  onNextStep: () => void;
}

const algorithms: { value: Algorithm; label: string }[] = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'merge', label: 'Merge Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'heap', label: 'Heap Sort' },
];

export const ControlPanel = ({
  arraySize,
  speed,
  isRunning,
  stepMode,
  canStep,
  selectedAlgorithm,
  onArraySizeChange,
  onSpeedChange,
  onStart,
  onStop,
  onShuffle,
  onSelectAlgorithm,
  onToggleStepMode,
  onNextStep,
}: ControlPanelProps) => {
  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        {/* Main Controls Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Button
            onClick={onShuffle}
            disabled={isRunning}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New Array
          </Button>

          <Select
            value={selectedAlgorithm}
            onValueChange={(value) => onSelectAlgorithm(value as Algorithm)}
            disabled={isRunning}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Choose Sorting Algo" />
            </SelectTrigger>
            <SelectContent>
              {algorithms.map((algo) => (
                <SelectItem key={algo.value} value={algo.value}>
                  {algo.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={onStart}
            disabled={isRunning}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start
          </Button>

          <Button
            onClick={onStop}
            disabled={!isRunning}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Stop
          </Button>

          <Button
            onClick={() => onToggleStepMode(!stepMode)}
            disabled={isRunning}
            variant={stepMode ? "default" : "outline"}
            className={stepMode ? "bg-accent text-accent-foreground" : ""}
          >
            Enable Step Mode
          </Button>

          <Button
            onClick={onNextStep}
            disabled={!canStep}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Next Step
          </Button>
        </div>

        {/* Sliders Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              Speed:
            </label>
            <Slider
              value={[speed]}
              onValueChange={([value]) => onSpeedChange(value)}
              min={1}
              max={100}
              step={1}
              disabled={isRunning}
              className="flex-1"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              Size:
            </label>
            <Slider
              value={[arraySize]}
              onValueChange={([value]) => onArraySizeChange(value)}
              min={5}
              max={50}
              step={1}
              disabled={isRunning}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
