import { ICommand } from "../interfaces/ICommand";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";

export class OpenCommand extends BaseCommand implements ICommand{
    public async execute({ parameters: [subjectName, environmentName] }: CommandInput){
        environmentName
            ? await this.openEnvironment(subjectName, environmentName)
            : await this.openSubject(subjectName)
    }

    private async openSubject(subjectName: string){
        await this.getRepository().openSubject(subjectName)
    }

    private async openEnvironment(subjectName: string, environmentName: string){
        await this.getRepository().openEnvironment(subjectName, environmentName)
    }
}