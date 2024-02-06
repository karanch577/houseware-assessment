import React from "react"
import { App } from "../src/todo/app.jsx"
import { render,screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom";

describe('App component', () => {
  it('should renders App component', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  
    const headerElement = screen.getByTestId("header");
    const mainElement = screen.getByTestId("main");
    // the footer is shown only if we have any todo item
    
    expect(headerElement).toBeInTheDocument();
    expect(mainElement).toBeInTheDocument();
  });
  })