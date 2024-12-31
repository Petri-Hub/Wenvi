import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class EnvironmentNotFoundError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.EnvironmentNotFound,
            message: ErrorMessages.EnvironmentNotFound,
            error: null
        })
    }
}