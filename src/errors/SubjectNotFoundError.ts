import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class SubjectNotFoundError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.SubjectNotFound,
            message: ErrorMessages.SubjectNotFound,
            error: null
        })
    }
}