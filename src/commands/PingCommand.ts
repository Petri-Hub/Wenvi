import { Command } from "../interfaces/Command";

export class PingCommand implements Command{
    public async execute(): Promise<void> {
        console.log("Pong!")
    }
}