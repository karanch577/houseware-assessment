import React from "react"
import { render,screen, fireEvent } from '@testing-library/react'
import { Input } from "../src/todo/components/input";

describe('Input component', () => {
  it('should render Input component', () => {
    render(
        <Input />
    );
  
    const inputElement = screen.getByTestId("text-input");
    expect(inputElement).toBeInTheDocument();
  });

  it('should call onBlur when the input losses focus', 
  () => {
    const mockOnBlur = jest.fn()
    render(
        <Input onBlur={mockOnBlur}/>
    );
  
    const inputElement = screen.getByTestId("text-input");

    // firing onBlur event
    fireEvent.blur(inputElement)
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('should not call onBlur function when the input is focused', 
  () => {
    const mockOnBlur = jest.fn()
    render(
        <Input onBlur={mockOnBlur}/>
    );
  
    const inputElement = screen.getByTestId("text-input");

    // firing focus event
    fireEvent.focus(inputElement)
    expect(mockOnBlur).not.toHaveBeenCalledTimes(1);
  });

  it('should not call onSubmit function when the input is focused and key pressed other than enter', 
  () => {
    const mockOnSubmit = jest.fn()
    render(
        <Input onSubmit={mockOnSubmit}/>
    );
  
    const inputElement = screen.getByTestId("text-input");

    // firing focus event
    fireEvent.change(inputElement, { target: { value: "input"}})

    fireEvent.keyDown(inputElement, {key: "Shift"})
    expect(mockOnSubmit).not.toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit function when the input is focused and Enter is pressed having input length greater than 2', 
  () => {
    const mockOnSubmit = jest.fn()
    render(
        <Input onSubmit={mockOnSubmit}/>
    );
  
    const inputElement = screen.getByTestId("text-input");

    // firing focus event
    fireEvent.change(inputElement, { target: { value: "input"}})

    fireEvent.keyDown(inputElement, {key: "Enter"})
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('should call not onSubmit function when the input is focused and Enter is pressed having input length less than or equal to 2', 
  () => {
    const mockOnSubmit = jest.fn()
    render(
        <Input onSubmit={mockOnSubmit}/>
    );
  
    const inputElement = screen.getByTestId("text-input");

    fireEvent.change(inputElement, { target: { value: "i"}})

    fireEvent.keyDown(inputElement, {key: "Enter"})
    expect(mockOnSubmit).not.toHaveBeenCalledTimes(1);
  });

  it('should sanitize the input value before submitting the data', 
  () => {
    const mockOnSubmit = jest.fn((input) => input)
    // getting the input value submitted to the onSubmit function
    
    render(
        <Input onSubmit={mockOnSubmit}/>
    );
  
    const inputElement = screen.getByTestId("text-input");

    fireEvent.change(inputElement, { target: { value: "1 is < than 2"}})

    fireEvent.keyDown(inputElement, {key: "Enter"})

    const mockInputValue = mockOnSubmit.mock.calls[0][0]
    expect(mockInputValue).toEqual("1 is &lt; than 2")
  });
  })