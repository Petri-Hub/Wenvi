import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class EnvironmentFileRetrievalError extends BaseError{
    constructor(error: unknown){
        super({
            code: ErrorCodes.EnvironmentRetrievalError,
            message: ErrorMessages.EnvironmentRetrievalError,
            error
        })
    }
}