import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class ExampleNotFoundError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.ExampleNotFound,
            message: ErrorMessages.ExampleNotFound,
            error: null
        })
    }
}