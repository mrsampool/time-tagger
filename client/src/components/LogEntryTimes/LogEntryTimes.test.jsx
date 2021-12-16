// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import LogEntryTimes from './LogEntryTimes';

it('should render without crashing', () => {
  render(<LogEntryTimes />);
});
