import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from './App.js';
import { getUrls, postUrl } from '../../apiCalls.js';
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



})
