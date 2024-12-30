import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class SubjectAlreadyCreatedError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.SubjectAlreadyCreated,
            message: ErrorMessages.SubjectAlreadyCreated,
            error: null
        })
    }
}