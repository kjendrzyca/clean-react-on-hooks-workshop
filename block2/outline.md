# intro with theory, couple minutes per hook

## what we do here

these examples are NOT supposed to be complicated or even real-life
they are here to make you familiar with hook syntax
to lay the hook foundations for more complicated usages

## dangers of hooks

too cool? you `useMemo` when you should use `useCallback` or nothing at all

# hooks test-based examples

## useState

just a standard example of a counter

```
// given
<Counter />

// when
*click*

// check counter incremented
```

## useEffect

again a standard counter example, but with a persistence layer

```
// given
const saveCount = jest.fn()
const getInitialCount = jest.fn().mockImplementationOnce(() => Promise.resolve(67))

// when
<Counter
  saveCount={saveCount}
  getInitialCount={getInitialCount}
/>

// then
rendered count === 67

// when
*click*

// then
saveCount called
getInitialCount not called again (only once for didMount)
```

## useContext - 2/10 would skip

standard example of light/dark themes

provide all the code without `useContext` and using the context values

```
setup tests:

// 1. should render with light theme
// 2. should change to dark theme on click
```

## useCallback

// convoluted example with child component that re-renders based on the callback (so passes a handler or something)
// need to check if this is even testable

// TODO

# useMemo

```
// given
const computationallyExpensiveFunction = jest.fn()

<DoAThing handler={computationallyExpensiveFunction}/>

// when
*click**click**click*

// then
computationallyExpensiveFunction called only once
```

# useRef 4/10 would skip

```
// given
const centerOnElement = jest.fn()

<Map locationNames={['house1', 'house2', 'house3']} handleClick={centerOnElement}/>

// check if rendered 3 divs with these IDs

// when
*click #house3*
*click #house2*
*click #house1*

// then
check centerOnElement calls
check if the references of these calls are the references to correct DOM elements
```
