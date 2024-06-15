// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';
// import Home from '../index';
// import NavBar from '../../../components/NavBar';

// // Mock the NavBar component
// jest.mock('../../../components/NavBar', () => ({
//   __esModule: true,
//   default: ({ isLoggedIn }: { isLoggedIn: boolean }) => (
//     <div data-testid="navbar">
//       {isLoggedIn ? 'Logged In' : 'Logged Out'}
//     </div>
//   )
// }));

// describe('Home component', () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   test('renders correctly', () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     // Check if the main elements are rendered
//     expect(screen.getByText(/Soar towards innovation/i)).toBeInTheDocument();
//     expect(screen.getByText(/BLE and drones taking technology to new heights/i)).toBeInTheDocument();
//     expect(screen.getByText(/Get started/i)).toBeInTheDocument();
//   });

//   test('checks if user is logged in', () => {
//     localStorage.setItem('token', 'test-token');
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     // Check if NavBar receives the correct prop when user is logged in
//     expect(screen.getByTestId('navbar')).toHaveTextContent('Logged In');
//   });

//   test('checks if user is logged out', () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     // Check if NavBar receives the correct prop when user is logged out
//     expect(screen.getByTestId('navbar')).toHaveTextContent('Logged Out');
//   });

//   test('checks the presence of the link with correct properties', () => {
//     render(
//       <MemoryRouter>
//         <Home />
//       </MemoryRouter>
//     );

//     const link = screen.getByRole('link', { name: /Get started/i });
//     expect(link).toBeInTheDocument();
//     expect(link).toHaveAttribute('href', '/map');
//   });
// });


export {};
