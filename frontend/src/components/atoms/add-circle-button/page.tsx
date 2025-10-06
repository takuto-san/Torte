import React, { useCallback } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import { RootState } from "@/lib/stores/store";
import { useDispatch, useSelector } from "react-redux";
import { selectFood, unselectFood } from "@/stores/food/selectedFoodSlice";
import { AddCircleButtonProps } from "@/types/propsTypes";

export const AddCircleButton: React.FC<AddCircleButtonProps> = ({ id }) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selectedFood.ids.includes(id),
  );

  const handleToggle = useCallback(() => {
    if (isSelected) {
      dispatch(unselectFood(id));
    } else {
      dispatch(selectFood(id));
    }
  }, [dispatch, id, isSelected]);

  return (
    <IconButton
      color={isSelected ? "primary" : "default"}
      aria-label={isSelected ? "unselect" : "select"}
      aria-pressed={isSelected}
      onClick={handleToggle}
      sx={{ width: 48, height: 48 }}
    >
      {isSelected ? (
        <CheckCircleIcon fontSize="large" />
      ) : (
        <AddCircleIcon fontSize="large" />
      )}
    </IconButton>
  );
};
