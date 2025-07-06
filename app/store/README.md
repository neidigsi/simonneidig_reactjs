# State Management | Redux

State management in this project is handled using the ["React Redux"](https://react-redux.js.org) library.

This documentation explains what state is, how state management is structured in the `store` folder, and how to use global state within the components.

## What are States?

States are variables whose values can change over time. The main advantage of using state is that it allows components to display dynamic data and automatically update their content whenever the state changes.

For example, state enables the conditional display or hiding of components based on certain conditions.

Traditionally, state in React is local to individual components. When state needs to be shared between multiple components, it must be passed up and down the component tree. This can lead to situations where some components only exist to pass state between others, even if they do not use the state themselves (see figure below).

![state_management](./state_management.svg)

To solve this problem, a global state management system is used in the frontend of this website. This allows all components to access and update shared state directly, resulting in cleaner code and a better developer experience.

## File Structure

The `store` folder contains all files and subfolders necessary for global state management in the application. Below is an overview of the main files and their responsibilities:

- **hooks.tsx** – Provides the functions `useAppSelector` and `useAppDispatch`, which allow components to access and update state. See [Usage in Components](#usage-in-components). This file is static and does not require changes.
- **store.tsx** – Registers all available slices. Each new slice must be added to this file to become part of the global state.
- **storeProvider.tsx** – A component that wraps other components, providing the Redux store context. All components inside this provider can access the global state.
- **slices/** – Contains all slice files. See [Code Structure in Slice](#code-structure-in-slice).

## Code Structure in Slice

A slice in Redux Toolkit is a modular piece of the global state, containing its own state, reducers, and actions. Each slice is defined in its own file and typically represents a specific domain or feature of the application (e.g., user, settings, page).

Below is an example of a simple slice definition:

```typescript
// Import external dependencies
import { createSlice } from "@reduxjs/toolkit";

interface PageState {
  loaded: boolean;
}

const initialState: PageState = {
  loaded: false,
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    loadPage: (state) => {
      state.loaded = true;
    },
  },
});

export const { loadPage } = pageSlice.actions;
export default pageSlice.reducer;
```

**How to create a new slice:**

1. **Create a new file** in the `slices` directory, e.g., `exampleSlice.tsx`.
2. **Define the state interface** for the new slice (e.g., `ExampleState`).
3. **Set the initial state** for the new slice.
4. **Use `createSlice`** to define the slice, giving it a unique `name`, the `initialState`, and the `reducers` (functions that modify the state).
5. **Export the actions** and the reducer from the slice file.
6. **Add the new reducer** to the main store configuration in `store.tsx` so it becomes part of the global state.

This modular approach keeps state management organized and scalable as the application grows.

## Usage in Components

The following example shows how to use global state from the Redux store within a component:

```typescript
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleDarkMode } from "@/store/slices/settingsSlice";

export default function DarkModeToggl() {
  const isDarkModeEnabled = useAppSelector((state) => state.settings.isDarkModeEnabled);

  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(toggleDarkMode())}>
        <Icon icon={isDarkModeEnabled ? "SunIcon" : "MoonIcon"} />
    </button>
  );
}
```

- The functions `useAppSelector` and `useAppDispatch` must be imported from **hooks.tsx**.
- Any reducer function that should be dispatched (such as `toggleDarkMode`) must be imported from its respective slice.

To access a state variable in the component, initialize it using `useAppSelector` at the start of the component:

```typescript
const isDarkModeEnabled = useAppSelector((state) => state.settings.isDarkModeEnabled);
```

The path inside `useAppSelector` corresponds to the name of the slice in **store.tsx** and the property name defined in the slice itself.

States and functions imported in this way can be used throughout the component. If a state is changed within the component, the change is automatically reflected in all other components that use this state.

To update a state, import the reducer from the slice:

```typescript
import { toggleDarkMode } from "@/store/slices/settingsSlice";
```

Then use it as a dispatcher function:

```typescript
dispatch(toggleDarkMode())
```