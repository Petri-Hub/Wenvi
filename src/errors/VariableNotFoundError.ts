import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class VariableNotFoundError extends BaseError {
    constructor() {
        super({
            code: ErrorCodes.VariableNotFound,
            message: ErrorMessages.VariableNotFound,
            error: null
        });
    }
}