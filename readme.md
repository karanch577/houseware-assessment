# TodoMVC: React

## Description

This application uses React 17.0.2 to implement a todo application.

-   [React](https://reactjs.org/) is a JavaScript library for creating user interfaces.

## Implementation details

React focuses mainly on providing composable user interfaces to enable developers to build an appealing website or web app. React does not force the user to utilize a particular design pattern, but it does provide useful hooks to implement an MVC pattern, if desired. 

React:\
Model: Todo reducer (reducer.js)\
View: React ui components\
Controller: App component + useReducer hook

MVC:\
Model: Maintains the data and behavior of an application\
View: Displays the model in the ui\
Controller: Serves as an interface between view & model components

## Build steps

To build the static files, this application utilizes webpack. It minifies and optimizes output files and copies all necessary files to a `dist` folder.

## Requirements

The only requirement is an installation of Node, to be able to install dependencies and run scripts to serve a local server.

```
* Node (min version: 18.13.0)
* NPM (min version: 8.19.3)
```

## Local preview

```
terminal:
1. npm install
2. npm run start
```
<!-- Write a plan (readme file) to write out test cases - For each component, it should include - what type of tests, and what all cases. -->

## Testing overview
### Header Component
##### Type of testing - Unit testing
1. It should renders `Header` component.
2. It should renders `input` element.
#### Type of testing - Integration testing
1. It should  render the todo in the `Main` component after adding the todo from the `Header` component.

### Main Component
##### Type of testing - Unit testing
1. It should render `Main` component.
2. Check Whether the todos are rendered or not.
3. It should display all todos when clicked on `All` button
4. It should display all active todos when clicked on `Active` button
5. It should display all completed todos when clicked on `Completed` button.
##### Type of testing - Integration testing
1. It should complete all the todos when click on the `toggle-all` checkbox.

### Footer Component
##### Type of testing - Unit testing
1. It should render `Footer` component only if there are some todos.
2. It should not render `Footer` component if there is no todo.
3. It should remove all the completed todo when clicked on the `Clear completed` button

### App Component
###### Type of testing - Unit testing
1. It should renders `App` component.

### Input Component
##### Type of testing - Unit testing
1. It should render `Input` component.
2. It should not call `onBlur` function when the input is focused.
3. It should not call `onSubmit` function when the `input` is focused and key pressed other than enter.
4. It should call `onSubmit` function when the input is focused and Enter is pressed having input length greater than 2.
5. It should call not `onSubmit` function when the input is focused and Enter is pressed having input length less than or equal to 2.
6. It should sanitize the `input` value before submitting the data.

### Item Component
##### Type of testing - Unit testing
1. It should render `Item` component.
2. It should display the `input` field when double clicked on the `todo-item-label`.
3. It should remove the todo item when clicked on the `destroy` button.
4. It should toggle the todo complete property when clicked on the `todo-item-toggle` checkbox.
5. It should update the todo when the todo is updated and the length of updated todo is greater than 1.
6. It should not render the `Input` component when the `Input` element is not focused(onBlur).
##### Failed test case - to be fixed
1. It should remove the todo when the todo is updated having empty string ("").

### Reducer Component
##### Type of testing - Unit testing
1. It should add a new Item in the state with `ADD_ITEM`action.
2. It should update the item in the state with `UPDATE_ITEM` action.
3. It should remove the item in the state with `REMOVE_ITEM` action.
4. It should toggle the complete property in the added todo with `TOGGLE_ITEM` action.
5. It should remove all the todos from the state with `REMOVE_ALL_ITEMS` action.
6. It should complete all the todos with `TOGGLE_ALL` action.
7. It should remove all the completed todos with `REMOVE_COMPLETED_ITEMS` action.
8. It should throw an error with any other unknown action.

### End to End testing
1. It should able to add todos.
2. It should able to edit the added todos.
3. It should able to remove the added todos.