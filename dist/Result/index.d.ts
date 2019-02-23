export interface Match<T, E, U> {
    ok: (val: T) => U;
    err: (val: E) => U;
}
export interface Result<T, E> {
    is_ok(): boolean;
    is_err(): boolean;
    unwrap(): T | never;
    unwrap_err(): E | never;
    ok_or(optb: T): T;
    match<U>(fn: Match<T, E, U>): U;
    map<U>(fn: (val: T) => U): Result<U, E>;
    map_err<U>(fn: (err: E) => U): Result<T, U>;
    and_then<U>(fn: (val: T) => Result<U, E>): Result<U, E>;
}
export interface _Ok<T, E = never> extends Result<T, E> {
    unwrap(): T;
    unwrap_err(): E;
    match<U>(fn: Match<T, E, U>): U;
    map<U>(fn: (val: T) => U): _Ok<U, E>;
    and_then<U>(fn: (val: T) => Result<U, E>): Result<U, E>;
}
export interface _Err<E, T = never> extends Result<T, E> {
    unwrap(): T;
    unwrap_err(): E;
    match<U>(fn: Match<never, E, U>): U;
    map<U>(fn: (val: T) => U): _Err<E, U>;
}
export declare function Ok<T, E = never>(val: T): _Ok<T, E>;
export declare function Err<T, E>(val: E): _Err<E, T>;
