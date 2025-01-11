import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { BaseCommand } from "./BaseCommand";

export class ExampleCommand extends BaseCommand implements IExecutableCommand{
    public async execute(): Promise<void> {
        const repository = this.getRepository()
        await repository.createExample()
        Logger.success('Example file created sucessfully.')
    }
}