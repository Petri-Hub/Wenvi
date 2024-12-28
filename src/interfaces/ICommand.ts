import { CommandInput } from "../types/CommandInput";

export interface ICommand {
    execute(input: CommandInput): Promise<void>
}