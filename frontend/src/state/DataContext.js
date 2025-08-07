import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [limit] = useState(50);
  const totalCount = useRef(0);
  const fetchItems = useCallback(
    async ({ active = {}, q = "", offset }) => {
      try {
        const isNewSearch = q !== searchQuery;

        if (isNewSearch) {
          setItems([]);
          setSearchQuery(q);
        }
        const res = await fetch(
          `http://localhost:3001/api/items?limit=${limit}&q=${q}&offset=${
            isNewSearch ? 0 : offset
          }`
        ); // Intentional bug: backend ignores limit
        const json = await res.json();
        if (active === undefined || active) {
          setItems((prev) =>
            isNewSearch ? json.results : [...prev, ...json?.results]
          );
          totalCount.current = json.total;
        }
      } catch (err) {
        console.error("Failed to fetch items:", err);
        setError("Failed to fetch items. Please try again later.");
      }
    },
    [limit, searchQuery]
  );

  return (
    <DataContext.Provider
      value={{ items, fetchItems, error, totalCount, limit }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
