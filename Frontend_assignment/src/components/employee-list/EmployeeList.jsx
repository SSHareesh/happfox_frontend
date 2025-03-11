// import { useState } from 'react';
// import { List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { motion } from 'framer-motion';

// const MotionListItem = motion.create(ListItem);

// const EmployeeList = ({ employees, onDelete }) => {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   const handleDeleteClick = (employee) => {
//     setSelectedEmployee(employee);
//     setDeleteDialogOpen(true);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedEmployee) {
//       onDelete(selectedEmployee.id);
//       setSnackbar({ open: true, message: `${selectedEmployee.name} has been deleted successfully`, severity: 'success' });
//     }
//     setDeleteDialogOpen(false);
//   };

//   const handleCancelDelete = () => {
//     setDeleteDialogOpen(false);
//     setSelectedEmployee(null);
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const getTeamColor = (team) => {
//     const teamColors = {
//       Executive: 'bg-blue-100 dark:bg-blue-900',
//       Technology: 'bg-green-100 dark:bg-green-900',
//       Business: 'bg-purple-100 dark:bg-purple-900',
//       Accounting: 'bg-amber-100 dark:bg-amber-900'
//     };
//     return teamColors[team] || 'bg-gray-100 dark:bg-gray-900';
//   };

//   return (
//     <>
//       <Paper className="m-4 overflow-hidden border-2 border-primary-light dark:border-primary-dark rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl" elevation={0}>
//         <List className="py-2">
//           {employees.map((employee) => (
//             <MotionListItem
//               key={employee.id}
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: 20 }}
//               transition={{ duration: 0.3, ease: 'easeOut' }}
//               className={`${getTeamColor(employee.team)} border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200`}
//               secondaryAction={
//                 <IconButton 
//                   edge="end" 
//                   onClick={() => handleDeleteClick(employee)}
//                   className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200 hover:scale-110"
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               }
//             >
//               <ListItemText
//                 primary={
//                   <Typography variant="subtitle1" className="font-semibold text-gray-900 dark:text-gray-100">
//                     {employee.name}
//                   </Typography>
//                 }
//                 secondary={
//                   <>
//                     <Typography component="span" variant="body2" className="text-gray-700 dark:text-gray-300">
//                       {employee.designation}
//                     </Typography>
//                     <span className="text-gray-500 dark:text-gray-400"> — {employee.team}</span>
//                   </>
//                 }
//               />
//             </MotionListItem>
//           ))}
//         </List>
//       </Paper>

//       <Dialog 
//         open={deleteDialogOpen} 
//         onClose={handleCancelDelete}
//         PaperProps={{
//           className: 'rounded-lg shadow-xl'
//         }}
//       >
//         <DialogTitle className="bg-primary-light dark:bg-primary-dark text-white">
//           Confirm Delete
//         </DialogTitle>
//         <DialogContent className="mt-4">
//           <Typography>
//             Are you sure you want to delete {selectedEmployee?.name}?
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions className="p-4">
//           <Button 
//             onClick={handleCancelDelete}
//             className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleConfirmDelete} 
//             color="error" 
//             variant="contained"
//             className="hover:bg-red-600 transition-colors duration-200"
//             autoFocus
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar 
//         open={snackbar.open} 
//         autoHideDuration={6000} 
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity} 
//           variant="filled"
//           className="shadow-lg"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default EmployeeList;



import { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Paper, Snackbar, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion, AnimatePresence } from 'framer-motion';

const MotionListItem = motion(ListItem);

const EmployeeList = ({ employees, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      onDelete(selectedEmployee.id);
      setSnackbar({ open: true, message: `${selectedEmployee.name} has been deleted successfully`, severity: 'success' });
    }
    setDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedEmployee(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getTeamColor = (team) => {
    const teamColors = {
      Executive: 'bg-blue-100/80 dark:bg-blue-900/30',
      Technology: 'bg-green-100/80 dark:bg-green-900/30',
      Business: 'bg-purple-100/80 dark:bg-purple-900/30',
      Accounting: 'bg-amber-100/80 dark:bg-amber-900/30'
    };
    return teamColors[team] || 'bg-gray-100/80 dark:bg-gray-900/30';
  };

  return (
    <>
      <Paper className="my-8 overflow-hidden rounded-xl shadow-xl bg-white/70 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20 dark:border-gray-800/50">
        <List className="py-2">
          <AnimatePresence>
            {employees.map((employee) => (
              <MotionListItem
                key={employee.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`${getTeamColor(employee.team)} border-b border-gray-200/50 dark:border-gray-700/50 
                  hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-200`}
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    onClick={() => handleDeleteClick(employee)}
                    className="text-red-500/70 hover:text-red-600 dark:text-red-400/70 dark:hover:text-red-300 
                      transition-all duration-200 hover:scale-110"
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="font-semibold text-gray-900 dark:text-gray-100">
                      {employee.name}
                    </Typography>
                  }
                  secondary={
                    <div className="flex flex-col gap-1">
                      <Typography variant="body2" className="text-gray-700 dark:text-gray-300">
                        {employee.designation}
                      </Typography>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {employee.team}
                      </span>
                    </div>
                  }
                />
              </MotionListItem>
            ))}
          </AnimatePresence>
        </List>
      </Paper>

      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleCancelDelete}
        PaperProps={{
          className: 'rounded-xl backdrop-blur-lg bg-white/90 dark:bg-gray-900/90'
        }}
      >
        <DialogTitle className="bg-red-500 text-white">
          Confirm Delete
        </DialogTitle>
        <DialogContent className="mt-4">
          <Typography>
            Are you sure you want to delete {selectedEmployee?.name}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button 
            onClick={handleCancelDelete}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            color="error" 
            variant="contained"
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          className="backdrop-blur-sm shadow-xl"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EmployeeList;