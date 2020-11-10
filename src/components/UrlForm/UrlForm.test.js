import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UrlForm from './UrlForm';
import { postUrl } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

describe('Url Form', () => {
  let mockAddURL;
  beforeEach(() => {
    mockAddURL = jest.fn();
  })
  it('should render correct elements', () => {
    render(
      <UrlForm 
       addURL={mockAddURL}
      />
    )

    expect(screen.getByPlaceholderText('Title...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('URL to Shorten...')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Shorten Please!'})).toBeInTheDocument();
  })
})