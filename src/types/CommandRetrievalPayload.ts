import { CommandDependecies } from "./CommandDependecies"

export type CommandRetrievalPayload = CommandDependecies & {
    commandName: string,
}