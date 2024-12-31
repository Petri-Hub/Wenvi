import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class ExampleAlreadyConfiguredError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.ExampleAlreadyConfigured,
            message: ErrorMessages.ExampleAlreadyConfigured,
            error: null
        })
    }
}