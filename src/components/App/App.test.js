import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App.js';
import { deleteUrl, getUrls, postUrl } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

describe('App', () => {
  beforeEach(() => {
    getUrls.mockResolvedValueOnce({
    urls: [
        {
          id: 1,
          long_url: 'http://superduperlongurlpleaseshortenit.org',
          short_url: 'http://localhost:3001/useshorturl/1',
          title: 'Hey there!'
        },
        {
          id: 2,
          long_url: 'http://pleaseshortenthislongonemorethanthelastone.org',
          short_url: 'http://localhost:3001/useshorturl/2',
          title: 'So, we meet again'
        }
      ]});
  })

  it('should render App-specific UI', () => {
    render(<App />)
    expect(screen.getByText('URL Shortener')).toBeInTheDocument();
  })

  it('should render any existing urls are added to DOM', async () => {
    render(<App />)

    const firstTitle = await waitFor(() => screen.getByText('So, we meet again'));
    expect(firstTitle).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/1')).toBeInTheDocument();
    expect(screen.getByText('http://superduperlongurlpleaseshortenit.org')).toBeInTheDocument();
    expect(screen.getByText('Hey there!')).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/2')).toBeInTheDocument();
    expect(screen.getByText('http://pleaseshortenthislongonemorethanthelastone.org')).toBeInTheDocument();
  })

  it('should render new url that was typed in and submitted', async () => {

    postUrl.mockResolvedValueOnce({
        id: 3,
        long_url: 'https://stackoverflow.com/questions/tagged/javascript',
        short_url: 'http://localhost:3001/useshorturl/3',
        title: 'stack overflow'
    })

    render(<App />)

    const firstTitle = await waitFor(() => screen.getByText('So, we meet again'));
    expect(firstTitle).toBeInTheDocument();

    userEvent.type(screen.getByPlaceholderText('Title...'), 'stack overflow');
    userEvent.type(screen.getByPlaceholderText('URL to Shorten...'), 'https://stackoverflow.com/questions/tagged/javascript');
    
    expect(screen.getByPlaceholderText('Title...')).toHaveValue('stack overflow');
    expect(screen.getByPlaceholderText('URL to Shorten...')).toHaveValue('https://stackoverflow.com/questions/tagged/javascript');
    
    userEvent.click(screen.getByRole('button', {name: 'Shorten Please!'}));
    
    const newUrlTitle = await waitFor(() => screen.getByText('stack overflow'));
    expect(newUrlTitle).toBeInTheDocument();
    expect(screen.getByText('https://stackoverflow.com/questions/tagged/javascript')).toBeInTheDocument();
    expect(screen.getByText('http://localhost:3001/useshorturl/3')).toBeInTheDocument();
  })

  it('should remove url card if user chooses to delete it', async () => {

    deleteUrl.mockResolvedValueOnce();

    render(<App />)

    const firstTitle = await waitFor(() => screen.getByText('Hey there!'));
    expect(firstTitle).toBeInTheDocument();

    userEvent.click(screen.getByTestId('1'));

    getUrls.mockResolvedValue({
      urls: [
        {
          id: 2,
          long_url: 'http://pleaseshortenthislongonemorethanthelastone.org',
          short_url: 'http://localhost:3001/useshorturl/2',
          title: 'So, we meet again'
        }
      ]
    })

    await waitFor(() => expect(screen.queryByText('Hey there!')).toBeNull())
    expect(screen.queryByText('http://superduperlongurlpleaseshortenit.org')).toBeNull();
  })
})
