import { CommandFactory } from "../core/CommandFactory";
import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";

export class HelpCommand implements IExecutableCommand{
    public async execute(): Promise<void> {
        Logger.log('Wenvi command list:\n')

        for(const commandKey of Object.values(CommandFactory.COMMAND_KEYS)){
            console.log(` - ${commandKey}`)
        }
    }
}