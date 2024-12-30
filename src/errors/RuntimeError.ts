import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class RuntimeError extends BaseError {
    constructor(error: unknown) {
        super({
            code: ErrorCodes.RuntimeError,
            message: ErrorMessages.RuntimeError,
            error
        })
    }
}