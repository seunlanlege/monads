export interface Match<T, E, U> {
  ok: (val: T) => U
  err: (val: E) => U
}

export interface Result<T, E> {
  is_ok(): boolean
  is_err(): boolean
  unwrap(): T | never
  unwrap_err(): E | never
  ok_or(optb: T): T
  match<U>(fn: Match<T, E, U>): U
  map<U>(fn: (val: T) => U): Result<U, E>
  map_err<U>(fn: (err: E) => U): Result<T, U>
  and_then<U>(fn: (val: T) => Result<U, E>): Result<U, E>
}

export interface _Ok<T, E = never> extends Result<T, E> {
  unwrap(): T
  unwrap_err(): E
  match<U>(fn: Match<T, E, U>): U
  map<U>(fn: (val: T) => U): _Ok<U, E>
  and_then<U>(fn: (val: T) => Result<U, E>): Result<U, E>
}

export interface _Err<E, T = never> extends Result<T, E> {
  unwrap(): T
  unwrap_err(): E
  match<U>(fn: Match<never, E, U>): U
  map<U>(fn: (val: T) => U): _Err<E, U>
}

export function Ok<T, E = never>(val: T): _Ok<T, E> {
  return {
    is_ok(): boolean {
      return true
    },
    is_err(): boolean {
      return false
    },
    unwrap(): T {
      return val
    },
    unwrap_err(): E {
      throw new ReferenceError(`Cannot get Err value of Result.Ok`)
    },
    ok_or(optb: T): T {
      return val
    },
    match<U>(fn: Match<T, never, U>): U {
      return fn.ok(val)
    },
    map<U>(fn: (val: T) => U): Result<U, E> {
      return Ok(fn(val))
    },
    map_err<U>(_fn: (err: E) => U): Result<T, U> {
      return Ok<T, U>(val)
    },
    and_then<U>(fn: (val: T) => Result<U, E>): Result<U, E> {
      return fn(val)
    },
  }
}

export function Err<T, E>(val: E): _Err<E, T> {
  return {
    is_ok(): boolean {
      return false
    },
    is_err(): boolean {
      return true
    },
    unwrap(): never {
      throw new ReferenceError(`Cannot get Ok value of Result.Err`)
    },
    unwrap_err(): E {
      return val
    },
    ok_or(optb: T): T {
      return optb
    },
    match<U>(fn: Match<never, E, U>): U {
      return fn.err(val)
    },
    map<U>(_fn: (val: T) => U): Result<U, E> {
      return Err<U, E>(val)
    },
    map_err<U>(fn: (err: E) => U): Result<T, U> {
      return Err<T, U>(fn(val))
    },
    and_then<U>(_fn: (val: T) => Result<U, E>): Result<U, E> {
      return Err<U, E>(val)
    },
  }
}
