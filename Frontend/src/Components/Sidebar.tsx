// Sidebar.tsx - Desktop-first filter sidebar with status, category, and due date filters
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
  categories?: string[]; // Available categories from tasks
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

  // Handle status filter change
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedStatus(value);
    // Pass null for 'all', otherwise pass the status value
    onStatusChange(value === 'all' ? null : value);
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    const newCategory = category === selectedCategory ? 'all' : category;
    setSelectedCategory(newCategory);
    onCategoryChange(newCategory === 'all' ? null : newCategory);
  };

  // Handle due date filter change
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedDate(value);
    onDueDateChange(value || null);
  };

  // Clear all filters
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
      {/* Desktop permanent drawer - shows by default */}
      <Drawer
        variant="permanent"
        sx={{
          width: 280,
          flexShrink: 0,
          display: { xs: 'none', md: 'block' }, // Hide on mobile, show on desktop
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            top: 64, // Below navbar
            height: 'calc(100% - 64px)',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' }, // Show on mobile, hide on desktop
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default Sidebar;