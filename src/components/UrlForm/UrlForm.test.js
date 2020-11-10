import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UrlForm from './UrlForm';

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

  it('should call addURL when form is submitted', () => {
    render(
      <UrlForm 
        addURL={mockAddURL}
      />
    )  

    userEvent.type(screen.getByPlaceholderText('Title...'), 'stack overflow');
    userEvent.type(screen.getByPlaceholderText('URL to Shorten...'), 'https://stackoverflow.com/questions/tagged/javascript');
    expect(screen.getByPlaceholderText('Title...')).toHaveValue('stack overflow');
    expect(screen.getByPlaceholderText('URL to Shorten...')).toHaveValue('https://stackoverflow.com/questions/tagged/javascript');
    userEvent.click(screen.getByRole('button', {name: 'Shorten Please!'}));
    expect(mockAddURL).toHaveBeenCalledTimes(1);
    expect(mockAddURL).toHaveBeenCalledWith('https://stackoverflow.com/questions/tagged/javascript', 'stack overflow');
  })
})