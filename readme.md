# Advanced switch case

Switch case library for advanced switch-case use.

For example, say you are given two numbers and you need to do this:

- if both are prime, return the larger prime number
- if only one of them is prime, return the difference of the two numbers
- if neither are prime, return the sum of the two numbers

Getting this done using native `switch-case` can be tricky and/or cumbersome.

Using this library, you can do this:

```js
import { switchCase, otherwise } from "adv-switch-case";

const isPrime = (a) => {
  // assume that this function returns true if a is prime,
  // and if not, false
};

const getLarger = (a, b) => (a > b ? a : b);
const getDifference = (a, b) => Math.abs(a - b);

const result = switchCase(
  [(a, b) => isPrime(a) && isPrime(b), getLarger],
  [(a, b) => isPrime(a) || isPrime(b), getDifference],
  [otherwise, (a, b) => a + b]
)(a, b);

// result(10, 3) => 7
// result(10, 10) => 20
// result(2, 7) => 7
```

## Install

npm:

```
npm install adv-switch-case
```

yarn:

```
yarn add adv-switch-case
```

## Use

In your js:

```js
import { switchCase, otherwise } from "adv-switch-case";
// or
// const { switchCase, otherwise } = require('adv-switch-case')
```

And then use it like so:

```js

const condition1 = (arg1, arg2, ...) = > {
  // do something and return a boolean
}
const condition2 = (arg1, arg2, ...) = > {
  // do something and return a boolean
}

const result1 = (arg1, arg2, ...) = > {
  // do something with the args and return anything
}
const result2 = (arg1, arg2, ...) = > {
  // do something with the args and return anything
}
const result3 = (arg1, arg2, ...) = > {
  // do something with the args and return anything
}

const result = switchCase(
  [condition1, result1],
  [condition2, result2],
  [otherwise, result3]
)(arg1, arg2, ...)
```

All `conditionX` and `resultX` should be a function.

`conditionX` should be functions that return a boolean value.
`resultX` can be functions that return any value.

Both `conditionX` and `resultX` functions will take the same arguments as that passed to the `switchCase` (ie, `(arg1, arg2, ...)`).

Just like how you'd have a `default` case in `switch - case`, you have to ensure that you add the `otherwise` condition to the end. This makes sure your case switching is _complete_.

## What happens if no case matches?

If you miss adding an `otherwise` condition, it's possible your `switchCase` will throw an error when no other condition is satisified.

This will <font color="red">throw an exception</font>.

So make sure you always include an `otherwise` condition to the end of your `switchCase`.

## Why is everything a function?

I supposed one could ask: why not something like...

```js
switchCase(
  [3, doSomethingWithArgs],
  [4, doSomeOtherThing],
  [otherwise, doNothing]
)(3); // should run `doSomethingWithArgs(3)`
```

If your task is to just compare literal values directly, then `adv-switch-case` is an overkill. You can accomplish the task with a simple `switch case` from native JS.

The other benefit of making everything a function is that you could have a potentially expensive computation in your condition and it wont run unless preceding conditions have returned false.

## What's `otherwise`?

`otherwise` is just a function that returns `true`. It's a shortcut to writing `() => true` in your switchCase.

## Typescript

`adv-switch-case` comes with a fair bit of TS support.

You can explicitly type your `switchCase` to let TS check for argument and return types.

For example, let's use the example from the intro.

```js
const result = switchCase(
  [(a, b) => isPrime(a) && isPrime(b), getLarger],
  [(a, b) => isPrime(a) || isPrime(b), getDifference],
  [otherwise, (a, b) => a + b]
)(a, b);
```

can be typed as:

```ts
const result = switchCase(
  [(a: number, b: number) => isPrime(a) && isPrime(b), getLarger],
  [(a: number, b: number) => isPrime(a) || isPrime(b), getDifference],
  [otherwise, (a: number, b: number) => a + b]
)(2, 3);

// typeof result = number
// typeof condition functions inside switchCase will be
// (...args: number[]) => boolean
// and typeof result functions inside switchCase will be
// (...args: number[]) => number
```

Any arguments to the condition function we use inside switchCase will be type-checked for (a: number, b: number) because the arguments we passed are (2, 3)

`result` will automatically type to 'number' because the output of the result functions are numbers.

Sometimes, the results of different conditions could be different types. In such cases, explicitly type `switchCase` like so:

```ts
const result = switchCase<number[], number | string>(
  [(a: number, b: number) => isPrime(a) && isPrime(b), getLarger],
  [(a: number, b: number) => isPrime(a) || isPrime(b), getDifference],
  [otherwise, "Neither is a prime."]
)(2, 3);
```

That is:

```ts
switchCase<ArgsArray, ResultTypes>(...)
type ArgsArray = array of sum type of your argument types
type ResultTypes = sum type of your results for all conditions
```
