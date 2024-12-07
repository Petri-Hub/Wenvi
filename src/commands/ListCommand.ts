import { Command } from "../interfaces/Command";
import { EnvironmentRepository } from "../interfaces/EnvironmentRepository";

export class ListCommand implements Command {
    constructor(private repository: EnvironmentRepository) { }

    public async execute(): Promise<void> {
        console.log(await this.repository.list())
    }
}