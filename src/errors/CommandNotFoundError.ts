import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class CommandNotFoundError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.CommandNotFound,
            message: ErrorMessages.CommandNotFound,
            error: null
        })
    }
}