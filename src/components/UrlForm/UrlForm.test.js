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

  it('should track user interaction with input fields', () => {
    render(
      <UrlForm 
        addURL={mockAddURL}
      />
    )

    userEvent.type(screen.getByPlaceholderText('Title...'), 'Harper the Berner');
    userEvent.type(screen.getByPlaceholderText('URL to Shorten...'), 'longurltoshowallbernerpicturesever.com');
    expect(screen.getByPlaceholderText('Title...')).toHaveValue('Harper the Berner');
    expect(screen.getByPlaceholderText('URL to Shorten...')).toHaveValue('longurltoshowallbernerpicturesever.com');
  })
})