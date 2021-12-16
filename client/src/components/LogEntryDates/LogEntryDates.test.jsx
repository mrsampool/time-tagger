// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import LogEntryDates from './LogEntryDates';

it('should render without crashing', () => {
  render(<LogEntryDates />);
});
