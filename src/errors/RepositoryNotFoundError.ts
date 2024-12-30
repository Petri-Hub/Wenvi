import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class RepositoryNotFoundError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.RepositoryNotFound,
            message: ErrorMessages.RepositoryNotFound,
            error: null
        })
    }
}