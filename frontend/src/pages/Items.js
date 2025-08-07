import React, { useEffect, useState, useRef } from "react";
import { useData } from "../state/DataContext";
import { FixedSizeList as List } from "react-window";
import { Link } from "react-router-dom";
import styles from "./Items.module.css";

const ITEM_HEIGHT = 35;
const DELAY = 500;
function Items() {
  const { items, fetchItems, error, totalCount, limit } = useData();
  const [q, setQ] = useState("");
  const debounceTimeout = useRef(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let active = true;

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setLoading(true);
      fetchItems({ active, q, offset })
        .then(() => {
          if (!active) return;

          if (items.length + limit >= totalCount) {
            setHasMore(false);
          }
        })
        .finally(() => {
          if (active) setLoading(false);
        });
    }, DELAY);

    return () => {
      clearTimeout(debounceTimeout.current);
      active = false;
    };
  }, [q, offset]);

  if (error) return <p>Error loading items. Try again</p>;

  if (!items.length) return <p>Loading...</p>;

  const Row = ({ index, style }) => {
    const item = items[index];
    return (
      <div className={styles.itemRow} style={style}>
        <Link to={`/items/${item.id}`} className={styles.itemLink}>
          {item.name}
        </Link>
      </div>
    );
  };

  return (
    <>
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOffset(0);
          setHasMore(true);
        }}
        placeholder="Search items"
        className={styles.searchInput}
        type="text"
      />
      <div className={styles.container}>
        <List
          height={500}
          itemCount={items.length}
          itemSize={ITEM_HEIGHT}
          width="100%"
          onItemsRendered={({ visibleStopIndex }) => {
            if (visibleStopIndex >= items.length - 1 && !loading && hasMore) {
              setLoading(true);

              //trigger a render, updating the UI through offset changes
              setOffset((prev) => prev + limit);
            }
          }}
        >
          {Row}
        </List>
      </div>
    </>
  );
}

export default Items;
