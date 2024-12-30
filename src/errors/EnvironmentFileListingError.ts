import { ErrorCodes } from "../constants/ErrorCodes";
import { ErrorMessages } from "../constants/ErrorMessages";
import { BaseError } from "./BaseError";

export class EnvironmentFileListingError extends BaseError {
    constructor(error: unknown) {
        super({
            code: ErrorCodes.EnvironmentListingError,
            message: ErrorMessages.EnvironmentListingError,
            error
        });
    }
}