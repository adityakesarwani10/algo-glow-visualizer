import { useState, useEffect, useRef } from 'react';
import { ControlPanel } from './ControlPanel';
import { VisualizerBars } from './VisualizerBars';
import { AlgorithmSelector } from './AlgorithmSelector';
import { AlgorithmInfo } from './AlgorithmInfo';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort } from '@/lib/sortingAlgorithms';

export type Algorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

export interface BarState {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export const AlgorithmVisualizer = () => {
  const [array, setArray] = useState<BarState[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>('bubble');
  const [showInfo, setShowInfo] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const animationRef = useRef<boolean>(false);

  const generateRandomArray = (size: number) => {
    const newArray: BarState[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 400) + 20,
        state: 'default',
      });
    }
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
  };

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const resetArrayStates = () => {
    setArray((prev) =>
      prev.map((bar) => ({ ...bar, state: 'default' as const }))
    );
  };

  const handleStart = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    animationRef.current = true;
    resetArrayStates();
    setComparisons(0);
    setSwaps(0);

    const delay = 1000 / speed;

    const algorithms = {
      bubble: bubbleSort,
      selection: selectionSort,
      insertion: insertionSort,
      merge: mergeSort,
      quick: quickSort,
      heap: heapSort,
    };

    await algorithms[selectedAlgorithm](
      array,
      setArray,
      sleep,
      delay,
      animationRef,
      setComparisons,
      setSwaps
    );

    if (animationRef.current) {
      // Mark all as sorted
      setArray((prev) =>
        prev.map((bar) => ({ ...bar, state: 'sorted' as const }))
      );
    }

    setIsRunning(false);
  };

  const handleStop = () => {
    animationRef.current = false;
    setIsRunning(false);
    resetArrayStates();
  };

  const handleShuffle = () => {
    if (!isRunning) {
      generateRandomArray(arraySize);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-b from-card to-background">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-20" />
        <div className="container mx-auto px-4 py-16 relative">
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 bg-gradient-primary bg-clip-text text-transparent animate-slide-up">
            Algo Visualizer
          </h1>
          <p className="text-xl md:text-2xl text-center text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Understand Sorting Algorithms Visually
          </p>
          <div className="mt-8 flex justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
              disabled={isRunning}
            />
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="px-6 py-3 rounded-lg bg-secondary/20 border border-secondary hover:bg-secondary/30 transition-all duration-300 hover:glow-secondary"
            >
              {showInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      {showInfo && (
        <AlgorithmInfo algorithm={selectedAlgorithm} />
      )}

      {/* Stats */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Comparisons:</span>
            <span className="text-primary font-mono font-semibold">{comparisons}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Swaps:</span>
            <span className="text-secondary font-mono font-semibold">{swaps}</span>
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="flex-1 container mx-auto px-4 py-8">
        <VisualizerBars array={array} algorithm={selectedAlgorithm} />
      </div>

      {/* Control Panel */}
      <div className="sticky bottom-0 border-t border-border bg-card/95 backdrop-blur-sm">
        <ControlPanel
          arraySize={arraySize}
          speed={speed}
          isRunning={isRunning}
          onArraySizeChange={setArraySize}
          onSpeedChange={setSpeed}
          onStart={handleStart}
          onStop={handleStop}
          onShuffle={handleShuffle}
        />
      </div>
    </div>
  );
};
