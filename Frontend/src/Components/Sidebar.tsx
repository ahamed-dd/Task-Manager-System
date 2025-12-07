// Sidebar.tsx - Fixed filter sidebar with proper mobile drawer positioning
import { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Divider,
  Chip,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

type SidebarProps = {
  onStatusChange: (status: string | null) => void;
  onCategoryChange: (category: string | null) => void;
  onDueDateChange: (date: string | null) => void;
  categories?: string[];
  open: boolean;
  onClose: () => void;
};

function Sidebar({
  onStatusChange,
  onCategoryChange,
  onDueDateChange,
  categories = [],
  open,
  onClose,
}: SidebarProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
    onStatusChange(value === 'all' ? null : value);
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? 'all' : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory === 'all' ? null : newCategory);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedDate(value);
    onDueDateChange(value || null);
  };

  const handleClearFilters = () => {
    setSelectedStatus('all');
    setSelectedCategory('all');
    setSelectedDate('');
    onStatusChange(null);
    onCategoryChange(null);
    onDueDateChange(null);
  };

  const sidebarContent = (
    <Box sx={{ width: 280, p: 3 }}>
      {/* Header with close button for mobile */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterListIcon color="primary" />
          <Typography variant="h6">Filters</Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Status Filter */}
      <FormControl component="fieldset" fullWidth sx={{ mb: 3 }}>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
          Status
        </FormLabel>
        <RadioGroup value={selectedStatus} onChange={handleStatusChange}>
          <FormControlLabel value="all" control={<Radio />} label="All Tasks" />
          <FormControlLabel value="pending" control={<Radio />} label="Pending" />
          <FormControlLabel value="completed" control={<Radio />} label="Completed" />
          <FormControlLabel value="overdue" control={<Radio />} label="Overdue" />
        </RadioGroup>
      </FormControl>

      <Divider sx={{ mb: 3 }} />

      {/* Category Filter */}
      <Box sx={{ mb: 3 }}>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
          Category
        </FormLabel>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            label="All"
            onClick={() => handleCategoryChange('all')}
            color={selectedCategory === 'all' ? 'primary' : 'default'}
            sx={{ mb: 1 }}
          />
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => handleCategoryChange(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              sx={{ mb: 1 }}
            />
          ))}
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Due Date Filter */}
      <Box sx={{ mb: 3 }}>
        <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
          Due Date
        </FormLabel>
        <TextField
          type="date"
          fullWidth
          size="small"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            style: { cursor: 'pointer' }
          }}
          onClick={(e) => {
            // On desktop, trigger the native date picker
            if (!isMobile) {
              (e.target as HTMLInputElement).showPicker?.();
            }
          }}
        />
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Clear Filters Button */}
      <Box
        sx={{
          textAlign: 'center',
          color: 'primary.main',
          cursor: 'pointer',
          '&:hover': { textDecoration: 'underline' },
        }}
        onClick={handleClearFilters}
      >
        <Typography variant="body2" fontWeight={600}>
          Clear All Filters
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop permanent drawer - positioned relative to viewport */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            top: 64,
            height: 'calc(100% - 64px)',
            position: 'fixed', // Fixed positioning
            left: 0,
            zIndex: theme.zIndex.drawer,
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Mobile temporary drawer - FIXED: Proper z-index below navbar */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            top: 64, // Start below the navbar
            height: 'calc(100% - 64px)', // Full height minus navbar
            // z-index below navbar (appBar default is 1100)
            zIndex: theme.zIndex.drawer, // 1200, but modal backdrop handles layering
          },
          // Ensure modal backdrop is below navbar
          '& .MuiBackdrop-root': {
            top: 64,
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default Sidebar;