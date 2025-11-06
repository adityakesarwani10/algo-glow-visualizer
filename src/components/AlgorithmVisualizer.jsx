import { useState, useEffect, useRef } from 'react';
import { ControlPanel } from './ControlPanel.jsx';
import { VisualizerBars } from './VisualizerBars.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort } from '@/lib/sortingAlgorithms.js';

export const AlgorithmVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(15);
  const [speed, setSpeed] = useState(50);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble');
  const [statusMessage, setStatusMessage] = useState('New array generated.');
  const [operationMessage, setOperationMessage] = useState('');
  const [stepMode, setStepMode] = useState(false);
  const [canStep, setCanStep] = useState(false);
  const animationRef = useRef(false);
  const stepResolveRef = useRef(null);

  const generateRandomArray = (size) => {
    const newArray = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 180) + 20,
        state: 'default',
      });
    }
    setArray(newArray);
    setStatusMessage('New array generated.');
    setOperationMessage('');
  };

  useEffect(() => {
    generateRandomArray(arraySize);
  }, [arraySize]);

  const sleep = (ms) => {
    if (stepMode) {
      setCanStep(true);
      return new Promise((resolve) => {
        stepResolveRef.current = () => {
          setCanStep(false);
          resolve();
        };
      });
    }
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const resetArrayStates = () => {
    setArray((prev) =>
      prev.map((bar) => ({ ...bar, state: 'default' }))
    );
  };

  const handleStart = async () => {
    if (isRunning) return;

    setIsRunning(true);
    animationRef.current = true;
    resetArrayStates();
    setStatusMessage(`Sorting using ${getAlgorithmName(selectedAlgorithm)}...`);

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
      setOperationMessage
    );

    if (animationRef.current) {
      setArray((prev) =>
        prev.map((bar) => ({ ...bar, state: 'sorted' }))
      );
      setStatusMessage('Sorting complete!');
      setOperationMessage('All elements are now sorted!');
    } else {
      setStatusMessage('Sorting stopped.');
      setOperationMessage('');
    }

    setIsRunning(false);
    setCanStep(false);
  };

  const handleStop = () => {
    animationRef.current = false;
    if (stepResolveRef.current) {
      stepResolveRef.current();
      stepResolveRef.current = null;
    }
    setIsRunning(false);
    setCanStep(false);
    resetArrayStates();
    setStatusMessage('Sorting stopped.');
    setOperationMessage('');
  };

  const handleShuffle = () => {
    if (!isRunning) {
      generateRandomArray(arraySize);
    }
  };

  const handleNextStep = () => {
    if (canStep && stepResolveRef.current) {
      stepResolveRef.current();
      stepResolveRef.current = null;
    }
  };

  const getAlgorithmName = (algo) => {
    const names = {
      bubble: 'Bubble Sort',
      selection: 'Selection Sort',
      insertion: 'Insertion Sort',
      merge: 'Merge Sort',
      quick: 'Quick Sort',
      heap: 'Heap Sort',
    };
    return names[algo];
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="py-8 border-b border-border relative">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-center text-foreground">
          Sorting Visualizer with Step Mode
        </h1>
      </div>

      {/* Control Panel */}
      <ControlPanel
        arraySize={arraySize}
        speed={speed}
        isRunning={isRunning}
        stepMode={stepMode}
        canStep={canStep}
        selectedAlgorithm={selectedAlgorithm}
        onArraySizeChange={setArraySize}
        onSpeedChange={setSpeed}
        onStart={handleStart}
        onStop={handleStop}
        onShuffle={handleShuffle}
        onSelectAlgorithm={setSelectedAlgorithm}
        onToggleStepMode={setStepMode}
        onNextStep={handleNextStep}
      />

      {/* Visualizer */}
      <div className="flex-1 container mx-auto px-4 py-12">
        <VisualizerBars array={array} />
      </div>

      {/* Status and Operation Messages */}
      <div className="pb-8 space-y-2">
        <p className="text-center text-foreground font-medium">{statusMessage}</p>
        {operationMessage && (
          <p className="text-center text-primary font-semibold text-lg">
            {operationMessage}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-muted-foreground font-extrabold">
              Copyright reserved © 2025 by Aditya kesarwani
          </p>
        </div>
      </footer>
    </div>
  );
};
