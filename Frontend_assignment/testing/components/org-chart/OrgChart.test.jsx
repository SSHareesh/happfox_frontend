import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../setup/test-utils';
import OrgChart from '../../../src/components/org-chart/OrgChart';

describe('OrgChart Component', () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', designation: 'CEO', team: 'Executive' },
    { id: 2, name: 'Jane Smith', designation: 'CTO', team: 'Technology', manager: 1 },
    { id: 3, name: 'Bob Johnson', designation: 'Developer', team: 'Technology', manager: 2 }
  ];

  const mockProps = {
    employees: mockEmployees,
    onManagerUpdate: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders organizational chart correctly', () => {
    render(<OrgChart {...mockProps} />);
    
    mockEmployees.forEach(employee => {
      expect(screen.getByText(employee.name)).toBeInTheDocument();
      expect(screen.getByText(employee.designation)).toBeInTheDocument();
    });
  });

  it('handles drag and drop to update manager', async () => {
    render(<OrgChart {...mockProps} />);
    
    const draggedEmployee = screen.getByText('Bob Johnson').closest('[role="button"]');
    const newManager = screen.getByText('John Doe').closest('[role="button"]');
    
    fireEvent.dragStart(draggedEmployee);
    fireEvent.drop(newManager);
    
    expect(mockProps.onManagerUpdate).toHaveBeenCalledWith(3, 1);
  });

  it('prevents dragging employee to their own subordinate', async () => {
    render(<OrgChart {...mockProps} />);
    
    const draggedEmployee = screen.getByText('John Doe').closest('[role="button"]');
    const invalidManager = screen.getByText('Bob Johnson').closest('[role="button"]');
    
    fireEvent.dragStart(draggedEmployee);
    fireEvent.drop(invalidManager);
    
    expect(mockProps.onManagerUpdate).not.toHaveBeenCalled();
    expect(screen.getByText('Cannot move an employee to their own subordinate')).toBeInTheDocument();
  });

  it('shows success message after successful manager update', async () => {
    render(<OrgChart {...mockProps} />);
    
    const draggedEmployee = screen.getByText('Bob Johnson').closest('[role="button"]');
    const newManager = screen.getByText('John Doe').closest('[role="button"]');
    
    fireEvent.dragStart(draggedEmployee);
    fireEvent.drop(newManager);
    
    await waitFor(() => {
      expect(screen.getByText('Bob Johnson is now reporting to John Doe')).toBeInTheDocument();
    });
  });

  it('adjusts scale based on window size', () => {
    const originalInnerWidth = window.innerWidth;
    
    window.innerWidth = 500;
    window.dispatchEvent(new Event('resize'));
    render(<OrgChart {...mockProps} />);
    
    const chart = screen.getByRole('tree');
    expect(chart).toHaveStyle({ transform: 'scale(0.4)' });
    
    window.innerWidth = originalInnerWidth;
    window.dispatchEvent(new Event('resize'));
  });

  it('renders employee nodes with correct styling', () => {
    render(<OrgChart {...mockProps} />);
    
    const employeeNodes = screen.getAllByRole('button');
    employeeNodes.forEach(node => {
      expect(node).toHaveClass('cursor-grab');
      expect(node).toHaveClass('hover:shadow-lg');
    });
  });
});