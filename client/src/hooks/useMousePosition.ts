import { useEffect, useState } from 'react';

interface MousePositionState {
  x: number;
  y: number;
}

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<MousePositionState>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const update = (e: MouseEvent) =>
      setMousePosition({
        x: e.pageX,
        y: e.pageY,
      });

    document.body.addEventListener('mousemove', update);

    return () => {
      document.body.removeEventListener('mousemove', update);
    };
  }, []);

  return mousePosition;
};
