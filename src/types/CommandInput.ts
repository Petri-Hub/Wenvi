import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository"

export type CommandInput = {
    repository: IEnvironmentRepository
    parameters: string[]
}