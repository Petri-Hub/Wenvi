import { BaseErrorData } from "../types/BaseErrorData";

export abstract class BaseError {
    private code: string
    private message: string
    private error: unknown

    constructor({ code, message, error }: BaseErrorData) {
        this.code = code
        this.message = message
        this.error = error
    }

    public getCode(): string {
        return this.code
    }

    public getMessage(): string {
        return this.message
    }

    public getError(): unknown {
        return this.error
    }
}