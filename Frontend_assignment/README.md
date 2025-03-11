A modern React-based employee management system featuring an interactive organizational chart, employee list management, and theme customization. Built with React, Material-UI, Framer Motion, and TailwindCSS.

## Features

- **Interactive Organizational Chart**
  - Drag-and-drop functionality for manager reassignment
  - Visual representation of reporting relationships
  - Smooth animations and transitions
  - Responsive design with automatic scaling

- **Employee List Management**
  - View all employees in a list format
  - Delete employees with confirmation
  - Search and filter employees
  - Team-based filtering

- **Theme Customization**
  - Light/Dark mode toggle
  - Smooth theme transitions
  - Custom cursor effects

- **Modern UI/UX**
  - Material Design components
  - Responsive layout
  - Animated transitions
  - Custom scrollbar styling

## Tech Stack

- React
- TailwindCSS
- PretenderJS (for API mocking)
- Jest & React Testing Library

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SSHareesh/Frontend_assignment.git
   cd Frontend_assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install required packages:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   npm install @mui/icons-material
   npm install framer-motion
   npm install @dnd-kit/core
   npm install react-organizational-chart
   npm install -D tailwindcss postcss autoprefixer
   npm install -D @testing-library/react @testing-library/jest-dom
   npm install pretender --save-dev
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage Guide

### Employee List

1. **View Employees**
   - All employees are listed in the left sidebar
   - Each employee card shows name, designation, and team

2. **Search and Filter**
   - Use the search bar to find employees by name, designation, or team
   - Use the team filter dropdown to view employees from specific teams

3. **Delete Employee**
   - Click the delete icon on an employee card
   - Confirm deletion in the popup dialog

### Organizational Chart

1. **View Hierarchy**
   - The organizational chart displays the reporting structure
   - Each employee node shows profile picture, name, designation, and contact

2. **Manager Reassignment**
   - Drag an employee node to a new manager
   - Release to update the reporting relationship
   - System prevents invalid reassignments (e.g., to subordinates)

3. **Responsive View**
   - Chart automatically scales based on screen size
   - Use mouse/touch to pan and view different parts of the chart

### Theme Customization

1. Toggle Theme
   - Click the theme toggle button in the navbar
   - Switch between light and dark modes
   - Theme preference persists across sessions

## Development

### Project Structure
```
src/
  ├── components/
  │   ├── employee-list/
  │   ├── navbar/
  │   └── org-chart/
  ├── utils/
  │   └── api.js
  ├── App.jsx
  └── index.css
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
