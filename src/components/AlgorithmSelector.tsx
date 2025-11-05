import { Algorithm } from './AlgorithmVisualizer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AlgorithmSelectorProps {
  selectedAlgorithm: Algorithm;
  onSelectAlgorithm: (algorithm: Algorithm) => void;
  disabled?: boolean;
}

const algorithms: { value: Algorithm; label: string }[] = [
  { value: 'bubble', label: 'Bubble Sort' },
  { value: 'selection', label: 'Selection Sort' },
  { value: 'insertion', label: 'Insertion Sort' },
  { value: 'merge', label: 'Merge Sort' },
  { value: 'quick', label: 'Quick Sort' },
  { value: 'heap', label: 'Heap Sort' },
];

export const AlgorithmSelector = ({
  selectedAlgorithm,
  onSelectAlgorithm,
  disabled,
}: AlgorithmSelectorProps) => {
  return (
    <Select
      value={selectedAlgorithm}
      onValueChange={(value) => onSelectAlgorithm(value as Algorithm)}
      disabled={disabled}
    >
      <SelectTrigger className="w-[220px] bg-card/50 border-primary/30 hover:border-primary/50 transition-colors">
        <SelectValue placeholder="Select Algorithm" />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border">
        {algorithms.map((algo) => (
          <SelectItem 
            key={algo.value} 
            value={algo.value}
            className="cursor-pointer hover:bg-primary/10"
          >
            {algo.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
