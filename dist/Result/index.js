"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Ok(val) {
    return {
        is_ok() {
            return true;
        },
        is_err() {
            return false;
        },
        unwrap() {
            return val;
        },
        unwrap_err() {
            throw new ReferenceError(`Cannot get Err value of Result.Ok`);
        },
        ok_or(optb) {
            return val;
        },
        match(fn) {
            return fn.ok(val);
        },
        map(fn) {
            return Ok(fn(val));
        },
        map_err(_fn) {
            return Ok(val);
        },
        and_then(fn) {
            return fn(val);
        },
    };
}
exports.Ok = Ok;
function Err(val) {
    return {
        is_ok() {
            return false;
        },
        is_err() {
            return true;
        },
        unwrap() {
            throw new ReferenceError(`Cannot get Ok value of Result.Err`);
        },
        unwrap_err() {
            return val;
        },
        ok_or(optb) {
            return optb;
        },
        match(fn) {
            return fn.err(val);
        },
        map(_fn) {
            return Err(val);
        },
        map_err(fn) {
            return Err(fn(val));
        },
        and_then(_fn) {
            return Err(val);
        },
    };
}
exports.Err = Err;
//# sourceMappingURL=index.js.map