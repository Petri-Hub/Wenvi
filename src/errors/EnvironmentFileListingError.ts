import { BaseError } from "./BaseError";

export class EnvironmentFileListingError extends BaseError {
    constructor(error: unknown) {
        super({
            code: "WENVI_002",
            message: "An error occurred while listing environment files",
            error
        });
    }
}