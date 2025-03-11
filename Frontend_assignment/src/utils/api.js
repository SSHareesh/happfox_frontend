import Pretender from 'pretender';

const employees = [
  {
    id: 1,
    name: 'Mark Hill',
    designation: 'Chief Executive Officer',
    team: 'Executive',
    manager: null
  },
  {
    id: 2,
    name: 'Joe Linux',
    designation: 'Chief Technology Officer',
    team: 'Technology',
    manager: 1
  },
  {
    id: 3,
    name: 'Linda May',
    designation: 'Chief Business Officer',
    team: 'Business',
    manager: 1
  },
  {
    id: 4,
    name: 'John Green',
    designation: 'Chief Accounting Officer',
    team: 'Accounting',
    manager: 1
  },
  {
    id: 5,
    name: 'Ron Blomquist',
    designation: 'Chief Information Officer',
    team: 'Technology',
    manager: 2
  },
  {
    id: 6,
    name: 'Michael Rubin',
    designation: 'Chief Innovation Officer',
    team: 'Technology',
    manager: 5
  },
  {
    id: 7,
    name: 'Alice Lopez',
    designation: 'Chief Communications Officer',
    team: 'Business',
    manager: 3
  },
  {
    id: 8,
    name: 'Mary Johnson',
    designation: 'Chief Brand Officer',
    team: 'Business',
    manager: 7
  },
  {
    id: 9,
    name: 'Kirk Douglas',
    designation: 'Chief Business Development Officer',
    team: 'Business',
    manager: 7
  },
  {
    id: 10,
    name: 'Erica Reel',
    designation: 'Chief Customer Officer',
    team: 'Accounting',
    manager: 4
  }
];

const server = new Pretender(function() {
  this.get('/api/employees', () => {
    console.log('Intercepted API Call:', employees);
    return [200, { 'Content-Type': 'application/json' }, JSON.stringify(employees)];
  });

  this.put('/api/employees/:id', (request) => {
    const id = parseInt(request.params.id);
    const updates = JSON.parse(request.requestBody);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    
    if (employeeIndex !== -1) {
      employees[employeeIndex] = { ...employees[employeeIndex], ...updates };
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify(employees[employeeIndex])];
    }
    return [404, { 'Content-Type': 'application/json' }, JSON.stringify({ error: 'Employee not found' })];
  });

  this.delete('/api/employees/:id', (request) => {
    const id = parseInt(request.params.id);
    const employeeIndex = employees.findIndex(emp => emp.id === id);
    
    if (employeeIndex !== -1) {
      employees.splice(employeeIndex, 1);
      return [200, { 'Content-Type': 'application/json' }, JSON.stringify({ message: 'Employee deleted successfully' })];
    }
    return [404, { 'Content-Type': 'application/json' }, JSON.stringify({ error: 'Employee not found' })];
  });
});

export default server;