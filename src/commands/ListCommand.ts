import { ICommand } from "../interfaces/ICommand";
import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository";

export class ListCommand implements ICommand {
    constructor(private repository: IEnvironmentRepository) { }

    public async execute(): Promise<void> {
        console.log(await this.repository.list())
    }
}