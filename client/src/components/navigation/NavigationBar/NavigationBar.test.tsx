import React from 'react'
import { screen, render } from '@testing-library/react'
import NavigationBar from './NavigationBar'

describe('rendering Navbar', () => {
  test('check text', () => {
    render(<NavigationBar />)

    expect(screen.getByText('o')).toBeTruthy()
  })
})