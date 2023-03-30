import * as React from 'react';
import { render } from '@testing-library/react';

import 'jest-canvas-mock';

import { AuthButton } from '../src';

describe('AuthButton', () => {
  it('renders without crashing', () => {
    render(<AuthButton />);
  });
});
