"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@openmaths/utils");
function Some(val) {
    return utils_1.isPresent(val) ? some_constructor(val) : none_constructor();
}
exports.Some = Some;
exports.None = none_constructor();
function some_constructor(val) {
    utils_1.throwIfMissing(val, `Some has to contain a value. Received ${typeof val}.`);
    return {
        is_some() {
            return true;
        },
        is_none() {
            return false;
        },
        match(fn) {
            return fn.some(val);
        },
        map(fn) {
            return some_constructor(fn(val));
        },
        and_then(fn) {
            return fn(val);
        },
        or(_optb) {
            return this;
        },
        and(optb) {
            return optb;
        },
        unwrap_or(def) {
            utils_1.throwIfMissing(def, "Cannot call unwrap_or with a missing value.");
            return val;
        },
        unwrap() {
            return val;
        },
    };
}
exports.some_constructor = some_constructor;
function none_constructor() {
    return {
        is_some() {
            return false;
        },
        is_none() {
            return true;
        },
        match(fn) {
            return utils_1.isFunction(fn.none) ? fn.none() : fn.none;
        },
        map(fn) {
            return none_constructor();
        },
        and_then(fn) {
            return none_constructor();
        },
        or(optb) {
            return optb;
        },
        and(_optb) {
            return none_constructor();
        },
        unwrap_or(def) {
            utils_1.throwIfMissing(def, "Cannot call unwrap_or with a missing value.");
            return def;
        },
        unwrap() {
            throw new ReferenceError("Trying to unwrap None.");
        },
    };
}
exports.none_constructor = none_constructor;
function get_in(obj, key) {
    const val = key.split(".").reduce((o, x) => (o == null ? o : o[x]), obj);
    return Some(val);
}
exports.get_in = get_in;
//# sourceMappingURL=index.js.map