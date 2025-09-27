import React from "react";
import { FoodCard } from "@/components/molecules/food-card/page";
import type { TabsContentProps } from "@/types/propsTypes";

export const TabContent: React.FC<TabsContentProps> = ({
  id,
  items,
  searchQuery,
  onToggle,
  isSelectedFn,
}) => (
  <>
    <div className="flex-1 overflow-y-auto">
      {searchQuery !== undefined ? (
        !searchQuery ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            Enter a search term to find food items
          </div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            No results found for "{searchQuery}"
          </div>
        ) : (
          items.map((item) => (
            <FoodCard
              key={item.id}
              meal={item}
              isSelected={isSelectedFn(item.id)}
              onToggle={() => onToggle(item.id)}
            />
          ))
        )
      ) : items.length === 0 ? (
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No items available in this category
        </div>
      ) : (
        items.map((item) => (
          <FoodCard
            key={item.id}
            meal={item}
            isSelected={isSelectedFn(item.id)}
            onToggle={() => onToggle(item.id)}
          />
        ))
      )}
    </div>
  </>
);