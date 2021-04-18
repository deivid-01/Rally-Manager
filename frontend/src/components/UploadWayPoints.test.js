import { render, screen } from '@testing-library/react';
import UploadWaypoints from './UploadWaypoints';

test('renders learn react link', () => {
  render(<UploadWaypoints />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
