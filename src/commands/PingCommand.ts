import { ICommand } from "../interfaces/ICommand";

export class PingCommand implements ICommand{
    public async execute(): Promise<void> {
        console.log("Pong!")
    }
}