import { ICommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import chalk from 'chalk'
import { TextToColorConverter } from '../helpers/TextToColorConverter'
import { IRepository } from "../interfaces/IRepository";

export class ListCommand implements ICommand {
    public async execute({ repository, parameters }: CommandInput): Promise<void> {
        const subjects = await this.handleCommandTargets(repository, parameters)
        const hasNoSubjects = subjects.length === 0
        
        if(hasNoSubjects){
            Logger.log('No environments were found.')
            return
        }

        Logger.log('Configured environments:\n')

        for(const subjectName of subjects){
            const subjectColor = TextToColorConverter.convert(subjectName)
            const subjectChalked = chalk.hex(subjectColor).bold(`[${subjectName}]`)

            console.log(subjectChalked)

            const environments = await repository.getEnvironments(subjectName)
            const subjectIsEmpty = environments.length === 0

            if(subjectIsEmpty){
                console.log('  - No environments found')
            }

            for(const environmentName of environments){
                console.log(`  - ${environmentName}`)
            }
            
            console.log()
        }
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
}