import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class WenviUpgradeError extends BaseError{
    constructor(error: unknown){
        super({
            code: ErrorCodes.UpgradeError,
            message: ErrorMessages.UpgradeError,
            error: error
        })
    }
}