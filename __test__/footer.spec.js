import React, { useReducer } from "react"
import { render,screen, fireEvent } from '@testing-library/react'
import { Footer } from "../src/todo/components/footer";
import { MemoryRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import { todoReducer } from "../src/todo/reducer";

describe('Footer component', () => {
  it('should render Footer component only if there are some todos', () => {
    const mockTodos = [{
        id: 1,
        title: "todo",
        completed: false
    }]
    render(
        <MemoryRouter>
            <Footer todos={mockTodos}/>
        </MemoryRouter>
    );
  
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });

  it('should not render Footer component if there is no todo', () => {
    const mockTodos = []
    const {container} = render(
        <MemoryRouter>
            <Footer todos={mockTodos}/>
        </MemoryRouter>
    );
  
    expect(container.firstChild).toBeNull();
  });

  it('should remove all the completed todo when clicked on the Clear completed button', () => {
    const initialState = [
        {
            id: 1,
            title: "todo1",
            completed: true
        },
        {
            id: 2,
            title: "todo2",
            completed: true
        },
    ]
    const { result } = renderHook(() => useReducer(todoReducer, initialState))
    const [, dispatch] = result.current;
    render(
        <MemoryRouter>
            <Footer todos={initialState} dispatch={dispatch}/>
        </MemoryRouter>
    );
  
    const clearCompletedBtn = screen.getByRole("button", { name: "Clear completed"})

    fireEvent.click(clearCompletedBtn)

    expect(result.current[0]).toEqual([])
  });
})