import { Box, IconButton, Typography } from '@mui/material';
import { getTodayDate, getWeekdayJa } from '@/utils/dateUtils';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/stores/store';
import { incrementDay, decrementDay } from '@/lib/stores/utils/date/dateSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function DateSelector() {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.date.selectedDate);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
      <IconButton onClick={() => dispatch(decrementDay())}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Typography variant="h6">{selectedDate.month}/{selectedDate.day} ({getWeekdayJa(selectedDate)})</Typography>
      <IconButton onClick={() => dispatch(incrementDay())}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}