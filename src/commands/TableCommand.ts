import { ICommand } from "../interfaces/ICommand";
import { IRepository } from "../interfaces/IRepository";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";

export class TableCommand implements ICommand{
    public async execute({ repository, parameters }: CommandInput): Promise<void> {
        const rows = []

        const subjects = await this.handleCommandTargets(repository, parameters)
        const possibleEnvironments = await this.getAllPossibleEnvironmentNames(repository)

        if(!subjects.length){
            Logger.log('You have no subjects to display.')
            return
        }

        if(!possibleEnvironments.length){
            Logger.log('You have no environments to display.')
            return
        }

        for(const subjectName of subjects){
            const subjectEnvironments = await repository.getEnvironments(subjectName)
            
            const row: Record<string, any> = {
                name: subjectName,
                environments: 0
            }

            for(const environmentName of possibleEnvironments){
                if(subjectEnvironments.includes(environmentName)){
                    row[environmentName] = '✅'
                    row['environments']++
                } else {
                    row[environmentName] = '❌'
                }
            }

            rows.push(row)
        }

        const sortedRows = rows.sort((rowA, rowB) => {
            return rowB.environments - rowA.environments 
        })
    
        Logger.log('Table of subjects and environments:')
        console.table(sortedRows, ['name', ...possibleEnvironments])
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

        const sortedEnvironemnts = Array.from(uniqueEnvironments).sort((environmentA, environmentB) => {
            return Intl.Collator().compare(environmentA, environmentB)
        })

        return sortedEnvironemnts
    }
}