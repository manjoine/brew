import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/All Breweries in a US City of your Choosing/i)
  expect(linkElement).toBeInTheDocument()
})
