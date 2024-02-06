import React, { useReducer } from "react"
import { render,screen, fireEvent } from '@testing-library/react'
import { Main } from "../src/todo/components/main";
import { MemoryRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import { todoReducer } from "../src/todo/reducer";
import { Footer } from "../src/todo/components/footer";


describe('Main component', () => {
  it('should render Main component', () => {
    const mockTodosData = []
    render(
        <MemoryRouter>
            <Main todos={mockTodosData} />
        </MemoryRouter>
    );
  
    const main = screen.getByTestId("main");
    expect(main).toBeInTheDocument();
  });

  it('should render the todos if there are any', () => {
    const mockTodosData = [{
      id: 1,
      title: "test todo",
      completed: false
    }]
    render(
        <MemoryRouter>
            <Main todos={mockTodosData} />
        </MemoryRouter>
    );
  
    const todoItem = screen.getByTestId("todo-item");
    expect(todoItem).toBeInTheDocument()
  });

  // integration test
  it('should complete all the todos when click on the toggle all checkbox', () => {
    const initialState = [
      {
      id: 1,
      title: "test todo",
      completed: false
      },
      {
      id: 2,
      title: "test todo1",
      completed: false
      },
    ]
    const { result } = renderHook(() => useReducer(todoReducer, initialState))

    const [, dispatch] = result.current;

    const { rerender } = render(
        <MemoryRouter>
            <Main todos={result.current[0]} dispatch={dispatch} />
            <Footer todos={result.current[0]} dispatch={dispatch} />
        </MemoryRouter>
    );
  
    const toggleAllCheckbox = screen.getByTestId("toggle-all");

    // clicking the toggleAllCheckbox
    fireEvent.click(toggleAllCheckbox)
    
    // re-rendering the component to get the updated state
    rerender(
      <MemoryRouter>
          <Main todos={result.current[0]} dispatch={dispatch} />
          <Footer todos={result.current[0]} dispatch={dispatch} />
      </MemoryRouter>
  );

    expect(result.current[0]).toEqual([
      {
      id: 1,
      title: "test todo",
      completed: true
      },
      {
      id: 2,
      title: "test todo1",
      completed: true
      },
    ]);

    // // checking if the footer displays "0 items left!"
    const emptyMessage = screen.getByText("0 items left!")

    expect(emptyMessage).toBeInTheDocument()
  })

  it('should display all todos when clicked on All button', () => {
    const mockTodo = [
      {
      id: 1,
      title: "test todo",
      completed: false
      },
      {
      id: 2,
      title: "test todo1",
      completed: true
      },
    ]

    // onclick on the All button it navigate to "/"
    // rendering the Main component on "/"

    render(
        <MemoryRouter initialEntries={[`/`]}>
            <Main todos={mockTodo} />
        </MemoryRouter>
    );

    const todoItems = screen.getAllByTestId("todo-item")
    expect(todoItems.length).toBe(2)
  })

  it('should display all active todos when clicked on Active button', () => {
    const mockTodo = [
      {
      id: 1,
      title: "test todo",
      completed: false
      },
      {
      id: 2,
      title: "test todo1",
      completed: true
      },
    ]

    // onclick on the Active button it navigate to "/active"
    // rendering the Main component on "/active"

    render(
      <MemoryRouter initialEntries={[`/active`]}>
        <Main todos={mockTodo} />
      </MemoryRouter>
    )

    const todoItems = screen.getAllByTestId("todo-item")
    expect(todoItems.length).toBe(1)
  })

  it('should display all completed todos when clicked on Completed button', () => {
    const mockTodo = [
      {
      id: 1,
      title: "test todo",
      completed: false
      },
      {
      id: 2,
      title: "test todo1",
      completed: true
      },
    ]

    // on clicking on the Complete button - it navigate to "/completed"
    // rendering the Main component on "/completed"
    render(
        <MemoryRouter initialEntries={["/completed"]}>
            <Main todos={mockTodo} />
        </MemoryRouter>
    );

    const todoItems = screen.getAllByTestId("todo-item")
    expect(todoItems.length).toBe(1)
  })
})