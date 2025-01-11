import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class ExportedFileNotFoundError extends BaseError{
    constructor(){
        super({
            code: ErrorCodes.ExportedFileNotFound,
            message: ErrorMessages.ExportedFileNotFound,
            error: null
        })
    }
}