import React, { useReducer } from "react"
import { render,screen, fireEvent } from '@testing-library/react'
import { Item } from "../src/todo/components/item";
import { renderHook } from "@testing-library/react-hooks";
import { todoReducer } from "../src/todo/reducer";

describe('Item component', () => {
  it('should render Item component', () => {
    const mockTodo = {
        id: 1, 
        title: "todo",
        completed: false
    }
    render(
        <Item todo={mockTodo} />
    );
  
    const inputElement = screen.getByTestId("todo-item");
    expect(inputElement).toBeInTheDocument();
  });

  it('should display the input field when double clicked on the todo item label', () => {
    const mockTodo = {
        id: 1, 
        title: "todo",
        completed: false
    }
    render(
        <Item todo={mockTodo} />
    );
  
    const todoItemLabel = screen.getByTestId("todo-item-label");

    // double clicking the todoItemLabel
    fireEvent.doubleClick(todoItemLabel)

    const inputField = screen.getByLabelText("Edit Todo Input")

    expect(inputField).toBeInTheDocument();
  });

  it('should remove the todo item when clicked on the destroy button', () => {
    const initialState = [{
        id: 1, 
        title: "todo",
        completed: false
    }]

    const { result } = renderHook(() => useReducer(todoReducer, initialState))

    const [, dispatch] = result.current;
    render(
        <Item todo={initialState[0]} dispatch={dispatch} />
    );

    const destroyBtn = screen.getByTestId("todo-item-button")

    // clicking the todoItemLabel
    fireEvent.click(destroyBtn)

    expect(result.current[0]).toEqual([])
  });

  it('should toggle the todo complete property when clicked on the todo-item-toggle checkbox', () => {
    const initialState = [{
        id: 1, 
        title: "todo",
        completed: false
    }]

    const { result } = renderHook(() => useReducer(todoReducer, initialState))

    const [, dispatch] = result.current;
    render(
        <Item todo={initialState[0]} dispatch={dispatch} />
    );
  
    const todoItemCheckbox = screen.getByTestId("todo-item-toggle");

    // clicking the todoItemCheckbox
    fireEvent.click(todoItemCheckbox)

    expect(result.current[0]).toEqual([
        {
            id: 1,
            title: "todo",
            completed: true
        }
    ])
  });

  it('should update the todo when the todo is updated and the length of updated todo is greater than 1', () => {
    const initialState = [{
        id: 1, 
        title: "todo",
        completed: false
    }]

    const { result } = renderHook(() => useReducer(todoReducer, initialState))

    const [, dispatch] = result.current;
    render(
        <Item todo={initialState[0]} dispatch={dispatch} />
    );
  
    // edit input field appear only if we double click the todo-item-label

    const todoItemLabel = screen.getByTestId("todo-item-label")

    // double clicking the todoItemLabel
    fireEvent.doubleClick(todoItemLabel)

    // After that the Input component is rendered
    const inputElement = screen.getByTestId("text-input")

    // the Input component call the onSubmit function if the input is more than 2 and on key down "Enter"

    fireEvent.change(inputElement, { target: { value: "todo updated"}})

    fireEvent.keyDown(inputElement, {key: "Enter"})

    expect(result.current[0]).toEqual([
        {
            id: 1,
            title: "todo updated",
            completed: false
        }
    ])
  });

  it('should remove the todo when the todo is updated having empty string ("")', () => {
    const initialState = [{
        id: 1, 
        title: "todo",
        completed: false
    }]

    const { result } = renderHook(() => useReducer(todoReducer, initialState))

    const [, dispatch] = result.current;
    render(
        <Item todo={initialState[0]} dispatch={dispatch} />
    );
  
    // edit input field appear only if we double click the todo-item-label

    const todoItemLabel = screen.getByTestId("todo-item-label")

    // double clicking the todoItemLabel
    fireEvent.doubleClick(todoItemLabel)

    // After that the Input component is rendered
    const inputElement = screen.getByTestId("text-input")

    // the Input component call the onSubmit function if the input is more than 2 and on key down "Enter"

    fireEvent.change(inputElement, { target: { value: ""}})

    fireEvent.keyDown(inputElement, {key: "Enter"})

    expect(result.current[0]).toEqual([])
  });

  it('should not render the Input component when the Input element is not focused(onBlur)', () => {
    const initialState = [{
        id: 1, 
        title: "todo",
        completed: false
    }]

    render(
        <Item todo={initialState[0]} />
    );
  
    // edit input field appear only if we double click the todo-item-label

    const todoItemLabel = screen.getByTestId("todo-item-label")

    // double clicking the todoItemLabel
    fireEvent.doubleClick(todoItemLabel)

    // After that the Input component is rendered
    const inputElement = screen.getByTestId("text-input")

    // the Input component call the onSubmit function if the input is more than 2 and on key down "Enter"

    fireEvent.blur(inputElement)

    expect(inputElement).not.toBeInTheDocument()
  });
})