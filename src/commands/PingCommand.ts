import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";

export class PingCommand implements ICommand{
    public async execute(): Promise<void> {
        Logger.log('Pong!')
    }
}