import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/stores/store";
import { setSelectedCategory } from "@/stores/meal/mealCategorySlice";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MealCategory } from "@/types/foodTypes";
import { getCurrentTime } from "@/utils/date";

// 時間帯から食事カテゴリを取得
export function getMealCategory(): MealCategory {
  const { hour } = getCurrentTime();
  if (hour >= 5 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 15) return "lunch";
  if (hour >= 17 && hour < 22) return "dinner";
  return "snack";
}

function getCategoryIcon(category: MealCategory) {
  switch (category) {
    case "breakfast":
      return <WbTwilightIcon />;
    case "lunch":
      return <SunnyIcon />;
    case "dinner":
      return <BedtimeIcon />;
    case "snack":
      return <CoffeeIcon />;
    default:
      return null;
  }
}

const mealCategories: MealCategory[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
];
const mealCategoryJa = {
  breakfast: "朝食",
  lunch: "昼食",
  dinner: "夕食",
  snack: "間食",
};

export const MealTypeSelector = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.mealCategory.selectedCategory,
  );

  // 初期値設定
  React.useEffect(() => {
    if (!selectedCategory) {
      dispatch(setSelectedCategory(getMealCategory()));
    }
  }, [dispatch, selectedCategory]);

  // クリックで切り替え
  const handleClick = () => {
    const currentIndex = mealCategories.indexOf(
      selectedCategory as MealCategory,
    );
    const nextIndex = (currentIndex + 1) % mealCategories.length;
    dispatch(setSelectedCategory(mealCategories[nextIndex]));
  };

  if (!selectedCategory) return null;

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      <Button
        variant="outlined"
        onClick={handleClick}
        startIcon={getCategoryIcon(selectedCategory)}
        sx={{
          borderColor: "#BDBDBD",
          color: "#333",
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#ffffff",
            borderColor: "#BDBDBD",
          },
        }}
      >
        {mealCategoryJa[selectedCategory]}
        <ArrowDropDownIcon sx={{ marginLeft: 1, marginRight: -1 }} />
      </Button>
    </Box>
  );
};
