import { IRepository } from "../interfaces/IRepository"

export type CommandCreationPayload = {
    commandName: string,
    repository: IRepository
}