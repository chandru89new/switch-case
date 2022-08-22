"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otherwise = exports.switchCase = void 0;
const switchCase = (...condPairs) => (...args) => {
    const headPair = condPairs[0];
    if (headPair) {
        const fn = headPair[0];
        const action = headPair[1];
        if (fn(...args)) {
            return action(...args);
        }
        else {
            return (0, exports.switchCase)(...condPairs.slice(1))(...args);
        }
    }
    else {
        throw new Error("You have not covered all pattern match cases (inexhaustive pattern match). Maybe you should try adding an `otherwise` to the end of the pattern match conditions?");
    }
};
exports.switchCase = switchCase;
const otherwise = () => true;
exports.otherwise = otherwise;
