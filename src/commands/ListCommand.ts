import { LocalRepositoryNotConfiguredError } from "../errors/LocalRepositoryNotConfiguredError";
import { ICommand } from "../interfaces/ICommand";
import { IEnvironmentRepository } from "../interfaces/IEnvironmentRepository";

export class ListCommand implements ICommand {
    constructor(private repository: IEnvironmentRepository) { }

    public async execute(): Promise<void> {
        const isRepositoryMissing = !await this.repository.exists()
        
        if(isRepositoryMissing){
            throw new LocalRepositoryNotConfiguredError()
        }

        const environments = await this.repository.list()
        const isEmpty = environments.length === 0

        if(isEmpty){
            console.log('No environments found')
            return
        }

        console.log(environments)
    }
}