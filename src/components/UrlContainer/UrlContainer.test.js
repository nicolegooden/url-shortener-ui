import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UrlContainer from './UrlContainer';
import { getUrls } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

describe('Url Container', () => {
  let mockUrls;
  beforeEach(() => {
    getUrls.mockResolvedValue([
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
    ]);

    mockUrls = [
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
    ]
  })

    it('should render headings and anchor tags as expected', async () => {
       render(
        <UrlContainer
          urls={mockUrls}
        />
       ) 

       const firstTitle = await waitFor(() => screen.getByText('Hey there!'))
       expect(firstTitle).toBeInTheDocument();
       expect(screen.getByText('http://localhost:3001/useshorturl/1')).toBeInTheDocument();
       expect(screen.getByText('http://superduperlongurlpleaseshortenit.org')).toBeInTheDocument();
       expect(screen.getByText('So, we meet again')).toBeInTheDocument();
       expect(screen.getByText('http://localhost:3001/useshorturl/2')).toBeInTheDocument();
       expect(screen.getByText('http://pleaseshortenthislongonemorethanthelastone.org')).toBeInTheDocument();
    })
})