import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";

export class InitCommand implements ICommand{
    public async execute({ repository }: CommandInput): Promise<void> {
        await repository.init()
        Logger.success('Repository created successfully.')
    }
}