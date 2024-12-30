import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class EnvironmentNotSpecifiedError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.EnvironmentNotSpecified,
            message: ErrorMessages.EnvironmentNotSpecified,
            error: null
        })
    }
}