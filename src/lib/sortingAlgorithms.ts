import { BarState } from '@/components/AlgorithmVisualizer';

type SetArray = React.Dispatch<React.SetStateAction<BarState[]>>;
type SetStat = React.Dispatch<React.SetStateAction<number>>;

export const bubbleSort = async (
  array: BarState[],
  setArray: SetArray,
  sleep: (ms: number) => Promise<void>,
  delay: number,
  animationRef: React.MutableRefObject<boolean>,
  setComparisons: SetStat,
  setSwaps: SetStat
) => {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (!animationRef.current) return;

      // Highlight comparing bars
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      setArray([...arr]);
      setComparisons((prev) => prev + 1);
      await sleep(delay);

      if (arr[j].value > arr[j + 1].value) {
        // Swap
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';
        setArray([...arr]);
        setSwaps((prev) => prev + 1);
        await sleep(delay);

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }

      arr[j].state = 'default';
      arr[j + 1].state = 'default';
      setArray([...arr]);
    }
    arr[n - i - 1].state = 'sorted';
    setArray([...arr]);
  }
  arr[0].state = 'sorted';
  setArray([...arr]);
};

export const selectionSort = async (
  array: BarState[],
  setArray: SetArray,
  sleep: (ms: number) => Promise<void>,
  delay: number,
  animationRef: React.MutableRefObject<boolean>,
  setComparisons: SetStat,
  setSwaps: SetStat
) => {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    if (!animationRef.current) return;

    let minIdx = i;
    arr[minIdx].state = 'pivot';
    setArray([...arr]);

    for (let j = i + 1; j < n; j++) {
      if (!animationRef.current) return;

      arr[j].state = 'comparing';
      setArray([...arr]);
      setComparisons((prev) => prev + 1);
      await sleep(delay);

      if (arr[j].value < arr[minIdx].value) {
        arr[minIdx].state = 'default';
        minIdx = j;
        arr[minIdx].state = 'pivot';
        setArray([...arr]);
      } else {
        arr[j].state = 'default';
        setArray([...arr]);
      }
    }

    if (minIdx !== i) {
      arr[i].state = 'swapping';
      arr[minIdx].state = 'swapping';
      setArray([...arr]);
      setSwaps((prev) => prev + 1);
      await sleep(delay);

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }

    arr[i].state = 'sorted';
    setArray([...arr]);
  }
  arr[n - 1].state = 'sorted';
  setArray([...arr]);
};

export const insertionSort = async (
  array: BarState[],
  setArray: SetArray,
  sleep: (ms: number) => Promise<void>,
  delay: number,
  animationRef: React.MutableRefObject<boolean>,
  setComparisons: SetStat,
  setSwaps: SetStat
) => {
  const arr = [...array];
  const n = arr.length;

  arr[0].state = 'sorted';
  setArray([...arr]);

  for (let i = 1; i < n; i++) {
    if (!animationRef.current) return;

    const key = arr[i];
    key.state = 'comparing';
    setArray([...arr]);
    await sleep(delay);

    let j = i - 1;
    while (j >= 0 && arr[j].value > key.value) {
      if (!animationRef.current) return;

      setComparisons((prev) => prev + 1);
      arr[j].state = 'swapping';
      arr[j + 1].state = 'swapping';
      setArray([...arr]);
      setSwaps((prev) => prev + 1);
      await sleep(delay);

      arr[j + 1] = arr[j];
      arr[j].state = 'sorted';
      setArray([...arr]);
      j--;
    }

    arr[j + 1] = key;
    arr[j + 1].state = 'sorted';
    setArray([...arr]);
  }
};

export const mergeSort = async (
  array: BarState[],
  setArray: SetArray,
  sleep: (ms: number) => Promise<void>,
  delay: number,
  animationRef: React.MutableRefObject<boolean>,
  setComparisons: SetStat,
  setSwaps: SetStat
) => {
  const arr = [...array];

  async function merge(left: number, mid: number, right: number) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (!animationRef.current) return;

      arr[k].state = 'comparing';
      setArray([...arr]);
      setComparisons((prev) => prev + 1);
      await sleep(delay);

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i], state: 'swapping' };
        i++;
      } else {
        arr[k] = { ...rightArr[j], state: 'swapping' };
        j++;
      }
      setSwaps((prev) => prev + 1);
      setArray([...arr]);
      await sleep(delay);
      arr[k].state = 'default';
      k++;
    }

    while (i < leftArr.length) {
      if (!animationRef.current) return;
      arr[k] = { ...leftArr[i], state: 'default' };
      setArray([...arr]);
      await sleep(delay);
      i++;
      k++;
    }

    while (j < rightArr.length) {
      if (!animationRef.current) return;
      arr[k] = { ...rightArr[j], state: 'default' };
      setArray([...arr]);
      await sleep(delay);
      j++;
      k++;
    }
  }

  async function mergeSortHelper(left: number, right: number) {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  }

  await mergeSortHelper(0, arr.length - 1);
  setArray([...arr]);
};

export const quickSort = async (
  array: BarState[],
  setArray: SetArray,
  sleep: (ms: number) => Promise<void>,
  delay: number,
  animationRef: React.MutableRefObject<boolean>,
  setComparisons: SetStat,
  setSwaps: SetStat
) => {
  const arr = [...array];

  async function partition(low: number, high: number): Promise<number> {
    const pivot = arr[high];
    pivot.state = 'pivot';
    setArray([...arr]);
    await sleep(delay);

    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (!animationRef.current) return -1;

      arr[j].state = 'comparing';
      setArray([...arr]);
      setComparisons((prev) => prev + 1);
      await sleep(delay);

      if (arr[j].value < pivot.value) {
        i++;
        arr[i].state = 'swapping';
        arr[j].state = 'swapping';
        setArray([...arr]);
        setSwaps((prev) => prev + 1);
        await sleep(delay);

        [arr[i], arr[j]] = [arr[j], arr[i]];
        arr[i].state = 'default';
        arr[j].state = 'default';
      } else {
        arr[j].state = 'default';
      }
      setArray([...arr]);
    }

    arr[i + 1].state = 'swapping';
    arr[high].state = 'swapping';
    setArray([...arr]);
    setSwaps((prev) => prev + 1);
    await sleep(delay);

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    arr[i + 1].state = 'sorted';
    arr[high].state = 'default';
    setArray([...arr]);

    return i + 1;
  }

  async function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = await partition(low, high);
      if (pi === -1) return;
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    } else if (low === high) {
      arr[low].state = 'sorted';
      setArray([...arr]);
    }
  }

  await quickSortHelper(0, arr.length - 1);
  setArray([...arr]);
};

export const heapSort = async (
  array: BarState[],
  setArray: SetArray,
  sleep: (ms: number) => Promise<void>,
  delay: number,
  animationRef: React.MutableRefObject<boolean>,
  setComparisons: SetStat,
  setSwaps: SetStat
) => {
  const arr = [...array];
  const n = arr.length;

  async function heapify(n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      if (!animationRef.current) return;
      arr[left].state = 'comparing';
      setArray([...arr]);
      setComparisons((prev) => prev + 1);
      await sleep(delay);

      if (arr[left].value > arr[largest].value) {
        largest = left;
      }
      arr[left].state = 'default';
      setArray([...arr]);
    }

    if (right < n) {
      if (!animationRef.current) return;
      arr[right].state = 'comparing';
      setArray([...arr]);
      setComparisons((prev) => prev + 1);
      await sleep(delay);

      if (arr[right].value > arr[largest].value) {
        largest = right;
      }
      arr[right].state = 'default';
      setArray([...arr]);
    }

    if (largest !== i) {
      arr[i].state = 'swapping';
      arr[largest].state = 'swapping';
      setArray([...arr]);
      setSwaps((prev) => prev + 1);
      await sleep(delay);

      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      arr[i].state = 'default';
      arr[largest].state = 'default';
      setArray([...arr]);

      await heapify(n, largest);
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    if (!animationRef.current) return;

    arr[0].state = 'swapping';
    arr[i].state = 'swapping';
    setArray([...arr]);
    setSwaps((prev) => prev + 1);
    await sleep(delay);

    [arr[0], arr[i]] = [arr[i], arr[0]];
    arr[i].state = 'sorted';
    arr[0].state = 'default';
    setArray([...arr]);

    await heapify(i, 0);
  }

  arr[0].state = 'sorted';
  setArray([...arr]);
};
