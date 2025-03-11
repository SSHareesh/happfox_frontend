import { fireEvent, screen, waitFor } from '@testing-library/react';
import { render } from '../../setup/test-utils';
import EmployeeList from '../../../src/components/employee-list/EmployeeList';

describe('EmployeeList Component', () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', designation: 'CEO', team: 'Executive' },
    { id: 2, name: 'Jane Smith', designation: 'Developer', team: 'Technology' },
    { id: 3, name: 'Bob Johnson', designation: 'Manager', team: 'Business' }
  ];

  const mockProps = {
    employees: mockEmployees,
    onDelete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders employee list correctly', () => {
    render(<EmployeeList {...mockProps} />);
    
    mockEmployees.forEach(employee => {
      expect(screen.getByText(employee.name)).toBeInTheDocument();
      expect(screen.getByText(employee.designation)).toBeInTheDocument();
      expect(screen.getByText(employee.team, { exact: false })).toBeInTheDocument();
    });
  });

  it('opens delete confirmation dialog when delete button is clicked', () => {
    render(<EmployeeList {...mockProps} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.getByText(/are you sure you want to delete/i)).toBeInTheDocument();
    expect(screen.getByText(mockEmployees[0].name)).toBeInTheDocument();
  });

  it('calls onDelete when deletion is confirmed', async () => {
    render(<EmployeeList {...mockProps} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    const confirmButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(confirmButton);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockEmployees[0].id);
  });

  it('closes dialog without deleting when cancel is clicked', () => {
    render(<EmployeeList {...mockProps} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockProps.onDelete).not.toHaveBeenCalled();
    expect(screen.queryByText(/are you sure you want to delete/i)).not.toBeInTheDocument();
  });

  it('shows success snackbar after deletion', async () => {
    render(<EmployeeList {...mockProps} />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);
    
    const confirmButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(screen.getByText(`${mockEmployees[0].name} has been deleted successfully`)).toBeInTheDocument();
    });
  });

  it('applies correct team color classes', () => {
    render(<EmployeeList {...mockProps} />);
    
    const listItems = screen.getAllByRole('listitem');
    
    expect(listItems[0]).toHaveClass('bg-blue-100/80');
    expect(listItems[1]).toHaveClass('bg-green-100/80');
    expect(listItems[2]).toHaveClass('bg-purple-100/80');
  });
});