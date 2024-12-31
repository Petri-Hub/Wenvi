import { ICommand } from "../interfaces/ICommand";
import { IRepository } from "../interfaces/IRepository";
import { CommandInput } from "../types/CommandInput";

export class TableCommand implements ICommand{
    public async execute({ repository, parameters }: CommandInput): Promise<void> {
        const rows = []

        const subjects = await this.handleCommandTargets(repository, parameters)
        const possibleEnvironments = await this.getAllPossibleEnvironmentNames(repository)

        for(const subjectName of subjects){
            const subjectEnvironments = await repository.getEnvironments(subjectName)
            const row: Record<string, string | boolean> = {
                name: subjectName
            }

            for(const environmentName of possibleEnvironments){
                if(subjectEnvironments.includes(environmentName)){
                    row[environmentName] = '✅'
                } else {
                    row[environmentName] = '❌'
                }
            }

            rows.push(row)
        }
    
        console.table(rows)
    }

    private async handleCommandTargets(repository: IRepository, parameters: string[]): Promise<string[]> {
        if(!parameters.length){
            return await repository.getSubjects()
        }

        const subjects = await repository.getSubjects()
        
        const targets = subjects.filter(subjectName => {
            return parameters.includes(subjectName)
        })

        return targets
    }

    private async getAllPossibleEnvironmentNames(repository: IRepository): Promise<string[]> {
        const subjects = await repository.getSubjects()
        
        const allEnvironments = await Promise.all(subjects.map(subject => {
            return repository.getEnvironments(subject)
        }))

        const uniqueEnvironments = new Set(allEnvironments.flat())

        return Array.from(uniqueEnvironments)
    }
}