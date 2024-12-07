import { Command } from "./interfaces/Command";

export class CommandRegistry {
    private commands = new Map<string, Command>();

    public set(name: string, command: Command): void {
        this.commands.set(name, command);
    }

    public get(name: string): Command | null {
        return this.commands.get(name) ?? null;
    }
}