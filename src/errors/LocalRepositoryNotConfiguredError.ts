import { BaseError } from "./BaseError";

export class LocalRepositoryNotConfiguredError extends BaseError{
    constructor(){
        super({
            code: "WENVI_005",
            message: "Local repository not configured. Use `wenvi init` to setup.",
            error: null
        })
    }
}