// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import LogEntryValue from './LogEntryValue';

it('should render without crashing', () => {
  render(<LogEntryValue />);
});
