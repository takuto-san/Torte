import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/stores/store";
import { setSearchValue } from "@/stores/input/searchSlice";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

export function InputForm() {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useDispatch();

  return (
    <Box display="flex" justifyContent="center" mt={3}>
      <TextField
        label="Search input"
        type="search"
        value={searchValue}
        onChange={(e) => dispatch(setSearchValue(e.target.value))}
        sx={{ width: 400 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 1 }}>
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
      <Box ml={2}>
        <IconButton>
          <PhotoCameraIcon fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
}
