// import { useState, useEffect } from 'react';
// import { Box, Paper, Typography, Avatar, Snackbar, Alert } from '@mui/material';
// import { motion } from 'framer-motion';
// import PhoneIcon from '@mui/icons-material/Phone';
// import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
// import { useDraggable, useDroppable } from '@dnd-kit/core';
// import { Tree, TreeNode } from 'react-organizational-chart';

// const EmployeeNode = ({ employee, isOver }) => {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: `draggable-${employee.id}`,
//     data: employee,
//   });

//   const { setNodeRef: setDropRef, isOver: dropIsOver } = useDroppable({
//     id: `droppable-${employee.id}`,
//     data: {
//       employeeId: employee.id,
//     },
//   });

//   const style = transform ? {
//     transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//   } : undefined;

//   return (
//     <motion.div
//       ref={setDropRef}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.3 }}
//       className={`relative ${dropIsOver ? 'ring-2 ring-primary-light dark:ring-primary-dark' : ''}`}
//     >
//       <Paper
//         ref={setNodeRef}
//         style={style}
//         {...listeners}
//         {...attributes}
//         className={`p-3 mx-auto w-[180px] cursor-grab hover:shadow-lg bg-white dark:bg-background-paper-dark 
//           border-2 border-primary-light dark:border-primary-dark rounded-lg transition-all duration-200 
//           ${isOver ? 'ring-2 ring-green-500' : ''} hover:scale-105`}
//         elevation={3}
//       >
//         <div className="flex flex-col items-center text-center gap-2">
//           <motion.div
//             whileHover={{ scale: 1.1 }}
//             transition={{ type: 'spring', stiffness: 300 }}
//           >
//             <Avatar
//               src={`https://i.pravatar.cc/150?u=${employee.id}`}
//               alt={employee.name}
//               className="w-12 h-12 border-3 border-primary-light dark:border-primary-dark mb-2 shadow-lg"
//             />
//           </motion.div>
//           <Typography variant="h6" className="font-bold text-gray-900 dark:text-gray-100 text-sm">
//             {employee.name}
//           </Typography>
//           <Typography variant="subtitle1" className="text-gray-600 dark:text-gray-400 font-medium text-xs">
//             {employee.designation}
//           </Typography>
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="flex items-center gap-1 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
//             <PhoneIcon sx={{ fontSize: 14 }} />
//             <Typography variant="body2" className="text-xs">+1 213 123 134</Typography>
//           </motion.div>
//         </div>
//       </Paper>
//     </motion.div>
//   );
// };

// const OrgChart = ({ employees, onManagerUpdate }) => {
//   const [scale, setScale] = useState(1);
//   const sensors = useSensors(useSensor(PointerSensor));
//   const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

//   useEffect(() => {
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleResize = () => {
//     const width = window.innerWidth;
//     if (width < 640) {
//       setScale(0.4);
//     } else if (width < 1024) {
//       setScale(0.5);
//     } else {
//       setScale(0.7);
//     }
//   };

//   const renderTree = (rootEmployee) => {
//     const children = employees.filter(child => child.manager === rootEmployee.id);
//     return (
//       <TreeNode label={<EmployeeNode employee={rootEmployee} />}>
//         {children.map(child => renderTree(child))}
//       </TreeNode>
//     );
//   };

//   const handleDragEnd = (event) => {
//     const { active, over } = event;
//     if (!active || !over) return;

//     const sourceId = parseInt(active.id.split('-')[1]);
//     const destinationId = parseInt(over.id.split('-')[1]);

//     if (sourceId === destinationId) return;

//     const updatedEmployee = employees.find(emp => emp.id === sourceId);
//     const destinationEmployee = employees.find(emp => emp.id === destinationId);

//     if (updatedEmployee) {
//       let current = destinationEmployee;
//       while (current) {
//         if (current.id === sourceId) {
//           setFeedback({
//             open: true,
//             message: 'Cannot move an employee to their own subordinate',
//             severity: 'error'
//           });
//           return;
//         }
//         current = employees.find(emp => emp.id === current.manager);
//       }

//       onManagerUpdate(sourceId, destinationId);
//       setFeedback({
//         open: true,
//         message: `${updatedEmployee.name} is now reporting to ${destinationEmployee.name}`,
//         severity: 'success'
//       });
//     }
//   };

//   if (!employees.length) return null;

//   return (
//     <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
//       <Box className="p-4 sm:p-6 overflow-auto min-h-[400px] max-h-[80vh] w-full bg-gray-100 dark:bg-gray-900 rounded-xl shadow-xl">
//         <div 
//           className="w-full flex justify-center items-start" 
//           style={{
//             transform: `scale(${scale})`,
//             transformOrigin: 'top center',
//             transition: 'transform 0.3s ease',
//             padding: '32px',
//             maxWidth: '100%',
//             minWidth: 'fit-content'
//           }}
//         >
//           <Tree 
//             lineWidth="2px"
//             lineColor="#90caf9"
//             lineBorderRadius="8px"
//             nodePadding="20px"
//             label={<EmployeeNode employee={employees.find(emp => !emp.manager)} />}
//           >
//             {renderTree(employees.find(emp => !emp.manager))}
//           </Tree>
//         </div>
//       </Box>
//       <Snackbar
//         open={feedback.open}
//         autoHideDuration={4000}
//         onClose={() => setFeedback({ ...feedback, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert
//           onClose={() => setFeedback({ ...feedback, open: false })}
//           severity={feedback.severity}
//           variant="filled"
//           className="shadow-lg"
//         >
//           {feedback.message}
//         </Alert>
//       </Snackbar>
//     </DndContext>
//   );
// };

// export default OrgChart;

import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Avatar, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Tree, TreeNode } from 'react-organizational-chart';

const EmployeeNode = ({ employee, isOver }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${employee.id}`,
    data: employee,
  });

  const { setNodeRef: setDropRef, isOver: dropIsOver } = useDroppable({
    id: `droppable-${employee.id}`,
    data: {
      employeeId: employee.id,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <motion.div
      ref={setDropRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative ${dropIsOver ? 'ring-2 ring-blue-500' : ''}`}
    >
      <Paper
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={`p-3 mx-auto w-[140px] cursor-grab bg-white dark:bg-gray-800 
          border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-200 
          ${isOver ? 'ring-2 ring-green-500' : ''} hover:scale-102`}
        elevation={1}
      >
        <div className="flex flex-col items-center text-center gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Avatar
              src={`https://i.pravatar.cc/150?u=${employee.id}`}
              alt={employee.name}
              className="w-10 h-10 border-2 border-gray-200 dark:border-gray-700 shadow-sm"
            />
          </motion.div>
          <Typography variant="subtitle2" className="font-medium text-gray-900 dark:text-gray-100">
            {employee.name}
          </Typography>
          <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
            {employee.designation}
          </Typography>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-2 py-0.5 rounded-full text-xs">
            <PhoneIcon sx={{ fontSize: 12 }} />
            <span>+1 213 123 134</span>
          </div>
        </div>
      </Paper>
    </motion.div>
  );
};

const OrgChart = ({ employees, onManagerUpdate }) => {
  const [scale, setScale] = useState(1);
  const sensors = useSensors(useSensor(PointerSensor));
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setScale(0.6);
    } else if (width < 1024) {
      setScale(0.8);
    } else {
      setScale(1);
    }
  };

  const renderTree = (rootEmployee) => {
    const children = employees.filter(child => child.manager === rootEmployee.id);
    return (
      <TreeNode label={<EmployeeNode employee={rootEmployee} />}>
        {children.map(child => renderTree(child))}
      </TreeNode>
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!active || !over) return;

    const sourceId = parseInt(active.id.split('-')[1]);
    const destinationId = parseInt(over.id.split('-')[1]);

    if (sourceId === destinationId) return;

    const updatedEmployee = employees.find(emp => emp.id === sourceId);
    const destinationEmployee = employees.find(emp => emp.id === destinationId);

    if (updatedEmployee) {
      let current = destinationEmployee;
      while (current) {
        if (current.id === sourceId) {
          setFeedback({
            open: true,
            message: 'Cannot move an employee to their own subordinate',
            severity: 'error'
          });
          return;
        }
        current = employees.find(emp => emp.id === current.manager);
      }

      onManagerUpdate(sourceId, destinationId);
      setFeedback({
        open: true,
        message: `${updatedEmployee.name} is now reporting to ${destinationEmployee.name}`,
        severity: 'success'
      });
    }
  };

  if (!employees.length) return null;

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Box className="p-4 sm:p-6 overflow-hidden min-h-[600px] h-full w-full bg-gray-100 dark:bg-gray-900 rounded-xl shadow-xl">
        <div 
          className="w-full h-full flex justify-center items-center overflow-auto" 
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease',
            padding: '48px',
            maxWidth: '100%',
            minWidth: 'fit-content'
          }}
        >
          <Tree 
            lineWidth="1px"
            lineColor="rgb(209 213 219)"
            lineBorderRadius="6px"
            label={<EmployeeNode employee={employees.find(emp => !emp.manager)} />}
          >
            {employees
              .filter(child => child.manager === employees.find(emp => !emp.manager)?.id)
              .map(child => renderTree(child))}
          </Tree>
        </div>
      </Box>
      <Snackbar
        open={feedback.open}
        autoHideDuration={4000}
        onClose={() => setFeedback({ ...feedback, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setFeedback({ ...feedback, open: false })}
          severity={feedback.severity}
          variant="filled"
          className="shadow-sm"
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </DndContext>
  );
};

export default OrgChart;