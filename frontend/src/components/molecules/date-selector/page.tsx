import { Box, IconButton, Typography } from "@mui/material";
import { getWeekdayJa } from "@/utils/date";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/stores/store";
import { incrementDay, decrementDay } from "@/stores/utils/dateSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const DateSelector = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: RootState) => state.date.selectedDate,
  );

  if (!selectedDate) {
    return (
      <div className="py-2">
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <IconButton disabled>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h6">--/-- (--)</Typography>
          <IconButton disabled>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </div>
    );
  }
  return (
    <div className="py-2">
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <IconButton onClick={() => dispatch(decrementDay())}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6">
          {selectedDate.month}/{selectedDate.day} ({getWeekdayJa(selectedDate)})
        </Typography>
        <IconButton onClick={() => dispatch(incrementDay())}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </div>
  );
};
