import { BaseError } from "./BaseError";

export class EnvironmentFileRetrievalError extends BaseError{
    constructor(error: unknown){
        super({
            code: "WENVI_001",
            message: "An error occurred while retrieving the environment file",
            error
        })
    }
}