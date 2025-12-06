// Tasks.tsx - Desktop-first task management interface with automatic status handling
import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Search,
  FilterList,
  CheckCircle,
  Schedule,
  Warning,
  Close,
  Pending,
} from '@mui/icons-material';
import { useAuth } from '../Contexts/useAuth';
import { allTasks, writeTasks, updateTasks, deleteTasks } from '../api/taskapi';
import Sidebar from '../Components/Sidebar';
import { Navbar } from '../Components/Navbar';

// Task type definition
type Task = {
  id: number;
  task: string;
  description?: string;
  due_date?: string;
  category?: string;
  status?: 'pending' | 'completed' | 'overdue';
};

export function Tasks() {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [dueDateFilter, setDueDateFilter] = useState<string | null>(null);

  // Selected task for status change
  const [selectedTaskForStatus, setSelectedTaskForStatus] = useState<Task | null>(null);

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    task: '',
    description: '',
    due_date: '',
    category: '',
  });

  // Fetch all tasks on component mount
  useEffect(() => {
    fetchTasks();
    // Check for overdue tasks every time component mounts
    checkAndUpdateOverdueTasks();
    
    // Set interval to check every hour (3600000 ms)
    const interval = setInterval(checkAndUpdateOverdueTasks, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Re-check overdue status after fetching tasks
  useEffect(() => {
    if (tasks.length > 0) {
      checkAndUpdateOverdueTasks();
    }
  }, [tasks.length]);

  // Apply filters whenever tasks or filter criteria change
  useEffect(() => {
    applyFilters();
  }, [tasks, statusFilter, categoryFilter, dueDateFilter, searchQuery]);

  const fetchTasks = async () => {
    try {
      const data = await allTasks();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Automatically update overdue tasks based on due date
  const checkAndUpdateOverdueTasks = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison

    const tasksToUpdate = tasks.filter((task) => {
      if (!task.due_date || task.status === 'completed') return false;
      
      const dueDate = new Date(task.due_date);
      dueDate.setHours(0, 0, 0, 0);
      
      // If due date has passed and status is not overdue
      return dueDate < today && task.status !== 'overdue';
    });

    // Update each overdue task
    for (const task of tasksToUpdate) {
      try {
        const updated = await updateTasks(
          {
            task: task.task,
            description: task.description || '',
            due_date: task.due_date || '',
            category: task.category || '',
            status: 'overdue', // Set status to overdue
          },
          task.id
        );
        // Update local state
        setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
      } catch (err) {
        console.error('Error updating overdue task:', err);
      }
    }
  };

  // Apply all active filters to tasks
  const applyFilters = () => {
    let filtered = [...tasks];

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((t) => t.status === statusFilter);
    }

    // Category filter
    if (categoryFilter) {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    // Due date filter
    if (dueDateFilter) {
      filtered = filtered.filter((t) => t.due_date === dueDateFilter);
    }

    // Search filter (searches in task name and description)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.task.toLowerCase().includes(query) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    setFilteredTasks(filtered);
  };

  // Get unique categories from all tasks
  const categories = useMemo(() => {
    const cats = tasks.map((t) => t.category).filter(Boolean);
    return [...new Set(cats)] as string[];
  }, [tasks]);

  // Calculate task statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const overdue = tasks.filter((t) => t.status === 'overdue').length;
    return { total, completed, pending, overdue };
  }, [tasks]);

  // Handle adding a new task
  const handleAddTask = async () => {
    try {
      const payload = {
        task: formData.task,
        description: formData.description,
        due_date: formData.due_date,
        category: formData.category,
      };
      const newTask = await writeTasks(payload);
      setTasks((prev) => [...prev, newTask]);
      setAddDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  // Handle editing a task
  const handleEditTask = async () => {
    if (!currentTask) return;

    try {
      const payload = {
        task: formData.task,
        description: formData.description,
        due_date: formData.due_date,
        category: formData.category,
      };
      const updated = await updateTasks(payload, currentTask.id);
      setTasks((prev) => prev.map((t) => (t.id === currentTask.id ? updated : t)));
      setEditDialogOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTasks(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  // Change task status (pending <-> completed) - Updated to work directly
  const handleStatusChange = async (newStatus: 'pending' | 'completed') => {
    if (!selectedTaskForStatus) return;

    try {
      const payload = {
        task: selectedTaskForStatus.task,
        description: selectedTaskForStatus.description || '',
        due_date: selectedTaskForStatus.due_date || '',
        category: selectedTaskForStatus.category || '',
        status: newStatus, // Update status
      };
      const updated = await updateTasks(payload, selectedTaskForStatus.id);
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTaskForStatus.id ? updated : t))
      );
      setSelectedTaskForStatus(null); // Reset after update
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  // Open edit dialog with task data
  const openEditDialog = (task: Task) => {
    setCurrentTask(task);
    setFormData({
      task: task.task,
      description: task.description || '',
      due_date: task.due_date || '',
      category: task.category || '',
    });
    setEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ task: '', description: '', due_date: '', category: '' });
    setCurrentTask(null);
  };

  // Get status color for chips
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'overdue':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Get status icon
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle fontSize="small" />;
      case 'overdue':
        return <Warning fontSize="small" />;
      case 'pending':
        return <Schedule fontSize="small" />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 64px)', bgcolor: 'background.default' }}>
        {/* Sidebar for filters - Desktop permanent, Mobile drawer */}
        <Sidebar
          onStatusChange={setStatusFilter}
          onCategoryChange={setCategoryFilter}
          onDueDateChange={setDueDateFilter}
          categories={categories}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content area - Desktop-first layout */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 }, // More padding on desktop
            ml: { xs: 0, md: '280px' }, // Sidebar offset only on desktop
            width: { xs: '100%', md: 'calc(100% - 280px)' }, // Ensure proper width
            minHeight: 'calc(100vh - 64px)',
          }}
        >
          <Container maxWidth="xl">
            {/* Header with user greeting and search */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom fontWeight={600}>
                My Tasks
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Welcome back, {user?.username || 'User'}!
              </Typography>

              {/* Search and filter button */}
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <TextField
                  placeholder="Search tasks..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                {/* Mobile filter button */}
                {isMobile && (
                  <Button
                    variant="outlined"
                    onClick={() => setSidebarOpen(true)}
                    startIcon={<FilterList />}
                  >
                    Filter
                  </Button>
                )}
              </Stack>
            </Box>

            {/* Statistics Cards */}
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Tasks
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main">
                    {stats.completed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main">
                    {stats.pending}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pending
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4" color="error.main">
                    {stats.overdue}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Overdue
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Task List */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'}
              </Typography>
            </Box>

            {filteredTasks.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No tasks found. Click the + button to add a new task!
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {filteredTasks.map((task) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'translateY(-4px)' },
                      }}
                      elevation={2}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {task.task}
                          </Typography>
                          {task.description && (
                            <Typography variant="body2" color="text.secondary">
                              {task.description}
                            </Typography>
                          )}
                        </Box>

                        <Stack spacing={1}>
                          {task.status && (
                            <Chip
                              icon={getStatusIcon(task.status)}
                              label={task.status}
                              color={getStatusColor(task.status)}
                              size="small"
                            />
                          )}
                          {task.category && (
                            <Chip label={task.category} size="small" variant="outlined" />
                          )}
                          {task.due_date && (
                            <Typography variant="caption" color="text.secondary">
                              Due: {new Date(task.due_date).toLocaleDateString()}
                            </Typography>
                          )}
                        </Stack>
                      </CardContent>

                      {/* Action buttons */}
                      <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Tooltip title="Edit">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => openEditDialog(task)}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                        
                        {/* Status change buttons - visible and clear */}
                        {task.status !== 'overdue' && (
                          <>
                            {task.status === 'pending' && (
                              <Button
                                size="small"
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircle />}
                                onClick={() => {
                                  setSelectedTaskForStatus(task);
                                  handleStatusChange('completed');
                                }}
                                sx={{ ml: 'auto' }}
                              >
                                Complete
                              </Button>
                            )}
                            {task.status === 'completed' && (
                              <Button
                                size="small"
                                variant="outlined"
                                color="warning"
                                startIcon={<Pending />}
                                onClick={() => {
                                  setSelectedTaskForStatus(task);
                                  handleStatusChange('pending');
                                }}
                                sx={{ ml: 'auto' }}
                              >
                                Reopen
                              </Button>
                            )}
                          </>
                        )}
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>

          {/* Floating action button to add task */}
          <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            onClick={() => setAddDialogOpen(true)}
            sx={{
              position: 'fixed',
              bottom: { xs: 16, md: 32 },
              right: { xs: 16, md: 32 },
            }}
          >
            Add Task
          </Button>
        </Box>
      </Box>

      {/* Add Task Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Add New Task
          <IconButton
            onClick={() => setAddDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            fullWidth
            margin="normal"
            value={formData.task}
            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddTask}
            variant="contained"
            disabled={!formData.task}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Edit Task
          <IconButton
            onClick={() => setEditDialogOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Task Name"
            fullWidth
            margin="normal"
            value={formData.task}
            onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <TextField
            label="Due Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditTask}
            variant="contained"
            disabled={!formData.task}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}