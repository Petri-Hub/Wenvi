import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class SubjectNotSpecifiedError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.SubjectNotSpecified,
            message: ErrorMessages.SubjectNotSpecified,
            error: null
        })
    }
}