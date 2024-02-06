import React, { useReducer } from "react"
import { render,screen, fireEvent } from '@testing-library/react'
import { Header } from "../src/todo/components/header";
import { Main } from "../src/todo/components/main";
import { MemoryRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import { todoReducer } from "../src/todo/reducer";

describe('Header component', () => {
  it('should renders Header component', () => {
    render(
        <Header />
    );
  
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  it('should renders input element', () => {
    render(
        <Header />
    );
  
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

//   Integration testing
  it('should  render the todo in the Main component after adding the todo from the Header component', () => {
    const { result } = renderHook(() => useReducer(todoReducer, []))
    const { rerender } = render(
      <MemoryRouter>
        <Header dispatch={result.current[1]} />
        <Main todos={result.current[0]} />
      </MemoryRouter>
    );
  
    const inputElement = screen.getByRole("textbox");

    // adding some value in the input field
    fireEvent.change(inputElement, { target: { value : "New Todo"}})

    // on pressing enter it should call addItem handler function
    fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter', charCode: 13})

    // re-rendering the component to get the updated state
    rerender(
      <MemoryRouter>
        <Header dispatch={result.current[1]} />
        <Main todos={result.current[0]} />
      </MemoryRouter>
  );

    const todoItem = screen.getByTestId("todo-item")

    expect(todoItem).toBeInTheDocument()
  });
  })