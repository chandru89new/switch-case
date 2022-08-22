declare type CondPairs<Args extends unknown[], Result extends unknown> = [
    (...args: Args) => boolean,
    (...args: any[]) => Result
];
export declare const switchCase: <A extends unknown[], R extends unknown>(...condPairs: CondPairs<A, R>[]) => (...args: A) => R;
export declare const otherwise: () => boolean;
export {};
