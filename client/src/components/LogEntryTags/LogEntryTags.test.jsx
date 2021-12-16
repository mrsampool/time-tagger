// Libraries
import React from 'react';
import { render } from '@testing-library/react';

// Components
import LogEntryTags from './LogEntryTags';

it('should render without crashing', () => {
  render(<LogEntryTags />);
});
