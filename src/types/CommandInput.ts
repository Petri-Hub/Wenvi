import { IRepository } from "../interfaces/IRepository"

export type CommandInput = {
    repository: IRepository
    parameters: string[]
}