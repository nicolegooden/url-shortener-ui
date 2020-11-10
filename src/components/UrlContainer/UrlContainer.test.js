import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import UrlContainer from './UrlContainer';
import { getUrls } from '../../apiCalls.js';
jest.mock('../../apiCalls.js');

describe('Url Container', () => {
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
    ])

    it('')
  })
})