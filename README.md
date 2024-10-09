# React Easy State

This is built to have a very easy and simple state manipulator system that also allows for middleware, async, APIs, and actions.

## VERY EASY!

Very easy to use in most applications. It works very similar to useState. As in you can just use:

```
const [counter, setCounter] = useStore<number>(storeSetting)
```

StoreSetting can be three different values:

1. Just a string for the store's name that is storing the value globally.
2. You can toss in an initial state on the end that will only initiate if the store doesn't yet exist.
3. Or, you can have an object variable with the following settings:

```
{
  storeName: "The name of the story! This is required!",
  initialState: "", /* The initial state. Must match the type used in the T for useStore. Can be a function or promise or a function that returns a promise. */
  fillerValue?: "", /* This would be the filler value for the state to use if the initialState is a promise or returned a promise. */
  persistent?: false, /* A boolean value for whether it should be stored in the localStorage as well or not. */
  actions?: {}, /* A list of actions for the store. They are a ([any arguments]) => T/state format for when in here, but the actions then returned will be in a ([any arguments]) => void format and uses key value pairs for the actions */
  middleware?: [], /* A bunch of middleware for modifying the state as it gets set. It just takes in the current state, then returns it. It'll run in the order that it is added here. */
}
```

Once this is ran it will actions return potentially many variables in an array. The first is the current state for this store which will refresh the component. The second is the setter for the state, and after are just a list of all of the possible actions that are available.

## It is that easy

There are other functions. But honestly? That is all you need for functional components.

I'm still drawing together an easy way to bring it to classes. I want it to remain easy.

# But how to get actions outside of it? Easy as well!

Just import the getActions command. Once the store is created you can grab any actions you want such as:

const { increment, decrement } = getActions("counter");

## Though there are functions for handling REST APIs too!

But the store must exist for it to work. Just import "REST" then the REST.get, REST.post, REST.put, REST.delete, and REST.patch functions will be available.

## All sorts of things you can do!

You can lay out and create each store in a separate class then easily just use this stuff everywhere else! Yes, it uses the useState functionality to create these hooks but this sets it up so you don't have to set any of it up yourself. It is quick, easy, and very flexible in how it can be used.

## TO DO:

- Expand the REST documentation
- Add class support
