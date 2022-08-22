const { switchCase, otherwise } = require("./index");

const pm = switchCase(
  [(a, b) => a > b, (a, b) => `${a} is greater than ${b}`],
  [(a, b) => a < b, (a, b) => `${b} is greater than ${a}`],
  [(a, b) => a === b, (a, b) => `Both are equal`],
  [otherwise, () => `Not exactly sure if they are comparable!`]
);

test("test condition 1 passes", () => {
  expect(pm(10, 11)).toEqual(`11 is greater than 10`);
});

test("test condition 2 passes", () => {
  expect(pm(100, 11)).toEqual(`100 is greater than 11`);
});

test("equality condition passes", () => {
  expect(pm(100, 100)).toEqual(`Both are equal`);
});

test("otherwise passes", () => {
  expect(pm(100, "100")).toEqual(
    `Not exactly sure if they are comparable!`
  );
});

test("inexhaustive pattern match throws", () => {
  expect(() =>
    switchCase(
      [(a, b) => a > b, (a, b) => `${a} is greater than ${b}`],
      [(a, b) => a < b, (a, b) => `${b} is greater than ${a}`],
      [(a, b) => a === b, (a, b) => `Both are equal`]
    )(10, "10")
  ).toThrow();
});
