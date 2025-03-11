import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../setup/test-utils';
import Navbar from '../../../src/components/navbar/Navbar';

describe('Navbar Component', () => {
  const mockProps = {
    onSearch: jest.fn(),
    onTeamFilter: jest.fn(),
    teams: ['Executive', 'Technology', 'Business', 'Accounting'],
    isDarkMode: false,
    onThemeToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<Navbar {...mockProps} />);
    
    expect(screen.getByPlaceholderText('Search employees...')).toBeInTheDocument();
    expect(screen.getByLabelText('Filter by Team')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /toggle dark mode/i })).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(<Navbar {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search employees...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    
    expect(mockProps.onSearch).toHaveBeenCalledWith('John');
  });

  it('handles team filter changes', () => {
    render(<Navbar {...mockProps} />);
    
    const teamFilter = screen.getByLabelText('Filter by Team');
    fireEvent.mouseDown(teamFilter);
    
    const technologyOption = screen.getByText('Technology');
    fireEvent.click(technologyOption);
    
    expect(mockProps.onTeamFilter).toHaveBeenCalledWith('Technology');
  });

  it('toggles theme when clicking the theme button', () => {
    render(<Navbar {...mockProps} />);
    
    const themeButton = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(themeButton);
    
    expect(mockProps.onThemeToggle).toHaveBeenCalled();
  });

  it('displays correct icon based on theme', () => {
    const darkModeProps = { ...mockProps, isDarkMode: true };
    const { rerender } = render(<Navbar {...darkModeProps} />);
    
    expect(screen.getByTestId('Brightness7Icon')).toBeInTheDocument();
    
    rerender(<Navbar {...mockProps} />);
    expect(screen.getByTestId('Brightness4Icon')).toBeInTheDocument();
  });

  it('displays all team options in the filter', () => {
    render(<Navbar {...mockProps} />);
    
    const teamFilter = screen.getByLabelText('Filter by Team');
    fireEvent.mouseDown(teamFilter);
    
    mockProps.teams.forEach(team => {
      expect(screen.getByText(team)).toBeInTheDocument();
    });
    
    expect(screen.getByText('All Teams')).toBeInTheDocument();
  });
});