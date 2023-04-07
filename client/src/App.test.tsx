import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import App, { Context, store } from './App'
import { BrowserRouter } from 'react-router-dom'

describe('App component', () => {
  it('should render NavigationBar, Router, and Footer', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Context.Provider value={{ store }}>
          <App />
        </Context.Provider>
      </BrowserRouter>
    )

    expect(getByTestId('NavigationBar')).toBeInTheDocument()
    expect(getByTestId('Footer')).toBeInTheDocument()
  })

  it('should pass the store object to the Context provider', () => {
    const { container } = render(
      <BrowserRouter>
        <Context.Provider value={{ store }}>
          <App />
        </Context.Provider>
      </BrowserRouter>
    )

    expect(container.querySelector('Context.Provider')?.textContent).toContain(JSON.stringify({ store }))
  })
})
