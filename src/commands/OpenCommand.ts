import { ICommand } from "../interfaces/ICommand";
import { IRepository } from "../interfaces/IRepository";
import { CommandInput } from "../types/CommandInput";

export class OpenCommand implements ICommand{
    public async execute({ repository, parameters: [subjectName, environmentName] }: CommandInput){
        if(!environmentName){
            await this.openSubject(repository, subjectName)
        } else {
            await this.openEnvironment(repository, subjectName, environmentName)
        }
    }

    private async openSubject(repository: IRepository, subjectName: string){
        await repository.openSubject(subjectName)
    }

    private async openEnvironment(repository: IRepository, subjectName: string, environmentName: string){
        await repository.openEnvironment(subjectName, environmentName)
    }
}