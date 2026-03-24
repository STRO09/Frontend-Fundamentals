import { useState, useMemo } from "react";

export default function VirtualizedPage() {
  const ITEM_HEIGHT = 100;
  const TOTAL_ITEMS = 10000;
  const CONTAINER_HEIGHT = 700;

  const [scrollTop, setScrollTop] = useState(0);

  const { visibleItems, offsetY, totalHeight } = useMemo(() => {
    const totalHeight = TOTAL_ITEMS * ITEM_HEIGHT;

    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT);
    const visibleCount = Math.ceil(CONTAINER_HEIGHT / ITEM_HEIGHT);

    const endIndex = Math.min(TOTAL_ITEMS, startIndex + visibleCount);

    const visibleItems = Array.from(
      { length: endIndex - startIndex },
      (_, i) => startIndex + i
    );

    return {
      visibleItems,
      offsetY: startIndex * ITEM_HEIGHT,
      totalHeight,
    };
  }, [scrollTop]);

  return (
    <div
      style={{ height: CONTAINER_HEIGHT, overflowY: "auto" }}
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: offsetY,
            width: "100%",
          }}
        >
          {visibleItems.map((i) => (
            <div
              key={i}
              style={{
                height: ITEM_HEIGHT,
                borderBottom: "1px solid #ccc",
              }}
            >
              Item {i}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}