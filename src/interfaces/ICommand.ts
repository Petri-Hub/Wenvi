export interface ICommand {
    execute(...args: string[]): Promise<void>
}