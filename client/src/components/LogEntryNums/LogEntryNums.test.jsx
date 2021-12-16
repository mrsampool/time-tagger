// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import LogEntryNums from './LogEntryNums';

it('should render without crashing', () => {
  render(<LogEntryNums />);
});
