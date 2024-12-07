import { BaseError } from "./BaseError";

export class RuntimeError extends BaseError {
    constructor(error: unknown) {
        super({
            code: "WENVI_003",
            message: "An error ocurred while running a command.",
            error
        })
    }
}