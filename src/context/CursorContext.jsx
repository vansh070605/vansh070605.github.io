import { createContext, useContext, useState, useCallback } from "react";

const CursorContext = createContext({
  isHovered:    false,
  setIsHovered: () => {},
});

export function CursorProvider({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  const enter  = useCallback(() => setIsHovered(true),  []);
  const leave  = useCallback(() => setIsHovered(false), []);

  return (
    <CursorContext.Provider value={{ isHovered, setIsHovered, enter, leave }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}
