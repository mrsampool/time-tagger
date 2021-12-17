// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import Warn from './Warn';

it('should render without crashing', () => {
  render(<Warn />);
});
