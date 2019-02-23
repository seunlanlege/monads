import { Result } from "../Result";
export declare function map_async<T, E = any>(p: Promise<T>): Promise<Result<T, E>>;
