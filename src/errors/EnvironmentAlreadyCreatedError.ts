import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class EnvironmentAlreadyCreatedError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.EnvironmentAlreadyCreated,
            message: ErrorMessages.EnvironmentAlreadyCreated,
            error: null
        })
    }
}