import { Algorithm } from './AlgorithmVisualizer';

interface AlgorithmInfoProps {
  algorithm: Algorithm;
}

const algorithmDetails = {
  bubble: {
    name: 'Bubble Sort',
    description:
      'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  selection: {
    name: 'Selection Sort',
    description:
      'Selection Sort divides the input into a sorted and unsorted region. It repeatedly selects the smallest (or largest) element from the unsorted region and moves it to the end of the sorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  insertion: {
    name: 'Insertion Sort',
    description:
      'Insertion Sort builds the final sorted array one item at a time. It takes each element and inserts it into its correct position in the already sorted portion of the array.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(1)',
  },
  merge: {
    name: 'Merge Sort',
    description:
      'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the two sorted halves back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
  },
  quick: {
    name: 'Quick Sort',
    description:
      'Quick Sort picks an element as a pivot and partitions the array around it. Elements smaller than the pivot go to the left, larger elements go to the right, then it recursively sorts the sub-arrays.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
    },
    spaceComplexity: 'O(log n)',
  },
  heap: {
    name: 'Heap Sort',
    description:
      'Heap Sort builds a max heap from the input data, then repeatedly extracts the maximum element and rebuilds the heap until all elements are sorted.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
    },
    spaceComplexity: 'O(1)',
  },
};

export const AlgorithmInfo = ({ algorithm }: AlgorithmInfoProps) => {
  const info = algorithmDetails[algorithm];

  return (
    <div className="border-b border-border bg-card/30 animate-slide-up">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-3">{info.name}</h2>
            <p className="text-foreground/90 leading-relaxed">{info.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg p-6 border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Time Complexity
              </h3>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best:</span>
                  <span className="text-accent font-semibold">{info.timeComplexity.best}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average:</span>
                  <span className="text-secondary font-semibold">{info.timeComplexity.average}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Worst:</span>
                  <span className="text-destructive font-semibold">{info.timeComplexity.worst}</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-secondary/20">
              <h3 className="text-lg font-semibold text-secondary mb-4">
                Space Complexity
              </h3>
              <div className="font-mono text-2xl text-accent font-bold">
                {info.spaceComplexity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
