import React, { useReducer } from "react"
import { render,screen, fireEvent } from '@testing-library/react'
import { renderHook } from "@testing-library/react-hooks";
import { todoReducer } from "../src/todo/reducer";
import { act } from "react-dom/test-utils";
import { ADD_ITEM, REMOVE_ALL_ITEMS, REMOVE_ITEM, TOGGLE_ALL, TOGGLE_ITEM, UPDATE_ITEM, REMOVE_COMPLETED_ITEMS } from "../src/todo/constants";


describe('reducer function', () => {
  it('should add a new Item in the state with ADD_ITEM action', () => {

    const { result } = renderHook(() => useReducer(todoReducer, []));
    const [, dispatch] = result.current;

    const newTodo = { type: ADD_ITEM, payload: { title: "todo 1"}}

    act(() => dispatch(newTodo))

    expect(result.current[0]).toEqual([{ id: expect.any(String), title: 'todo 1', completed: false }]);
  });

  it('should update the item in the state with UPDATE_ITEM action', () => {
    const initialState = [{
        id: 1,
        title: "todo1",
        completed: false
    }]
    const { result } = renderHook(() => useReducer(todoReducer, initialState));
    const [, dispatch] = result.current;

    const updateTodo = { type: UPDATE_ITEM, payload: {
        id: 1,
        title: "updated todo"
    }}

    act(() => dispatch(updateTodo))

    expect(result.current[0]).toEqual([{ id: 1, title: 'updated todo', completed: false }]);
  });

  it('should remove the item in the state with REMOVE_ITEM action', () => {
    const initialState = [{
        id: 1,
        title: "todo1",
        completed: false
    }]
    const { result } = renderHook(() => useReducer(todoReducer, initialState));
    const [, dispatch] = result.current;

    const removeTodo = { type: REMOVE_ITEM, payload: {
        id: 1
    }}

    act(() => dispatch(removeTodo))

    expect(result.current[0]).toEqual([]);
  });

  it('should toggle the complete property in the added todo with TOGGLE_ITEM action', () => {
    const initialState = [{
        id: 1,
        title: "todo1",
        completed: false
    }]
    const { result } = renderHook(() => useReducer(todoReducer, initialState));
    const [, dispatch] = result.current;

    const toggleTodo = { type: TOGGLE_ITEM, payload: {
        id: 1
    }}

    act(() => dispatch(toggleTodo))

    expect(result.current[0]).toEqual([
        {
            id: 1,
            title: "todo1",
            completed: true
        }
    ]);
  });

  it('should remove all the todos from the state with REMOVE_ALL_ITEMS action', () => {
    const initialState = [
        {
        id: 1,
        title: "todo1",
        completed: false
        },
        {
        id: 2,
        title: "todo2",
        completed: false
        }
    ]
    const { result } = renderHook(() => useReducer(todoReducer, initialState));
    const [, dispatch] = result.current;

    const removeAllTodos = { type: REMOVE_ALL_ITEMS }

    act(() => dispatch(removeAllTodos))

    expect(result.current[0]).toEqual([]);
  });

  it('should complete all the todos with TOGGLE_ALL action', () => {
    const initialState = [
        {
        id: 1,
        title: "todo1",
        completed: false
        },
        {
        id: 2,
        title: "todo2",
        completed: false
        }
    ]
    const { result } = renderHook(() => useReducer(todoReducer, initialState));
    const [, dispatch] = result.current;

    const toggleAll = { type: TOGGLE_ALL, 
    payload: { completed: true } }

    act(() => dispatch(toggleAll))

    expect(result.current[0]).toEqual([
        {
            id: 1,
            title: "todo1",
            completed: true
            },
            {
            id: 2,
            title: "todo2",
            completed: true
            }
    ]);
  });

  it('should remove all the completed todos with REMOVE_COMPLETED_ITEMS action', () => {
    const initialState = [
        {
        id: 1,
        title: "todo1",
        completed: false
        },
        {
        id: 2,
        title: "todo2",
        completed: true
        }
    ]
    const { result } = renderHook(() => useReducer(todoReducer, initialState));
    const [, dispatch] = result.current;

    const removeCompletedTodos = { type: REMOVE_COMPLETED_ITEMS, 
    payload: { completed: true } }

    act(() => dispatch(removeCompletedTodos))

    expect(result.current[0]).toEqual([
        {
            id: 1,
            title: "todo1",
            completed: false
        }
    ]);
  });

  it('should throw an error with any other unknown action', () => {
    const { result } = renderHook(() => useReducer(todoReducer, []));
    const [, dispatch] = result.current;

    const unknownAction = { type: "randomAction"}

    act(() => {
        try {
            dispatch(unknownAction)
            
        } catch (error) {
            expect(error.message).toContain(`Unknown action: ${unknownAction.type}`);
        }
    })
  });
})