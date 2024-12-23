import { ICommand } from "./interfaces/ICommand";

export class CommandRegistry {
    private commands = new Map<string, ICommand>();

    public set(name: string, command: ICommand): void {
        this.commands.set(name, command);
    }

    public get(name: string): ICommand | null {
        return this.commands.get(name) ?? null;
    }
}