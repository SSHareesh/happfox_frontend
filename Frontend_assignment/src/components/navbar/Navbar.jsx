import { useState } from 'react';
import { AppBar, Toolbar, TextField, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ onSearch, onTeamFilter, teams, isDarkMode, onThemeToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleTeamFilter = (event) => {
    const value = event.target.value;
    setSelectedTeam(value);
    onTeamFilter(value);
  };

  return (
    <AppBar 
      position="sticky" 
      className="bg-blue-600 shadow-md"
      elevation={0}
    >
      <Toolbar className="px-4 py-2">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          <FormControl size="small" className="w-64">
            <InputLabel className="text-white">Filter by Team</InputLabel>
            <Select
              value={selectedTeam}
              onChange={handleTeamFilter}
              label="Filter by Team"
              className="bg-white/10 text-white"
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                },
                '& .MuiSelect-select': {
                  color: 'white'
                }
              }}
            >
              <MenuItem value="">All Teams</MenuItem>
              {teams.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="flex-1 flex justify-center mx-4">
            <TextField
              variant="outlined"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              className="w-80"
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.5)'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white'
                  }
                },
                '& .MuiInputBase-input::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
            />
          </div>

          <IconButton
            onClick={onThemeToggle}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-200"
          >
            {isDarkMode ? (
              <Brightness7Icon className="text-white" />
            ) : (
              <Brightness4Icon className="text-white" />
            )}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;