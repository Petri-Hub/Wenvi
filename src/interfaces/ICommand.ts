import { CommandInput } from "../types/CommandInput";

export interface IExecutableCommand {
    execute(input: CommandInput): Promise<void>
}