import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";

export class ExampleCommand implements ICommand{
    public async execute({ repository }: CommandInput): Promise<void> {
        await repository.createExample()
        Logger.success('Example file created sucessfully.')
    }
}