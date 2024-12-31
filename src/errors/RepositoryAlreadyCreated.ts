import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class RepositoryAlreadyCreated extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.RepositoryAlreadyCreated,
            message: ErrorMessages.RepositoryAlreadyCreated,
            error: null
        })
    }
}