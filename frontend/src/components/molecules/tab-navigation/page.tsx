import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/stores/store';
import { setCurrentTab } from '@/lib/stores/tab/tabSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from '@mui/material';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckIcon from '@mui/icons-material/Check';

export const TabNavigation = () => {
  const value = useSelector((state: RootState) => state.tab.currentTab);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, tabIndex: number) => {
    dispatch(setCurrentTab(tabIndex));
  };

  return (
    <Box>
      <Tabs 
        value={value} 
        onChange={handleChange} 
        aria-label="icon label tabs" 
        centered
        sx={{ mt: 3 }}
        >

        <Tab 
          icon={
            <Badge
              color="primary"
              badgeContent={3}
              sx={{ 
                '& .MuiBadge-badge': {
                right: -3, 
                top: 3, 
                }
              }}
            >
              <CheckIcon />
            </Badge>
            }
            label="SELECT" 
            sx={{ mx: 4 }} 
        />
        <Tab icon={<DescriptionIcon />} label="HISTORY" sx={{ mx: 4 }} />
        <Tab icon={<SearchIcon />} label="SEARCH" sx={{ mx: 4 }} />
      </Tabs>
    </Box>
  );
}