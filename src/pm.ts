type CondPairs<Args extends unknown[], Result extends unknown> = [
  (...args: Args) => boolean,
  (...args: Args) => Result
];

export const switchCase = <A extends unknown[], R extends unknown>
  (...condPairs: Array<CondPairs<A, R>>) =>
  (...args: A): R => {
    const headPair = condPairs[0];
    if (headPair) {
      const fn = headPair[0];
      const action = headPair[1];
      if (fn(...args)) {
        return action(...args);
      } else {
        return switchCase(...condPairs.slice(1))(...args);
      }
    } else {
      throw new Error(
        "You have not covered all pattern match cases (inexhaustive pattern match). Maybe you should try adding an `otherwise` to the end of the pattern match conditions?"
      );
    }
  };

export const otherwise = () => true;
