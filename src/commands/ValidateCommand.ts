import Table from 'cli-table3'
import chalk from 'chalk';
import { HorizontalTableRow } from "cli-table3";
import { IExecutableCommand } from "../interfaces/ICommand";
import { BaseCommand } from "./BaseCommand";
import { EnvironmentValidation } from "../types/EnvironmentValidation";
import { Logger } from "../logging/Logger";
import { TextToColorConverter } from '../helpers/TextToColorConverter';

export class ValidateCommand extends BaseCommand implements IExecutableCommand{    
    public async execute(): Promise<void> {

        const rows = await this.createRows()
        const table = await this.createTable(rows)

        Logger.log('Validations of subjects and environments:')
        console.log(table.toString())
    }

    private async createRows(): Promise<HorizontalTableRow[]> {
        const rows: HorizontalTableRow[] = []

        const repository = this.getRepository()
        const subjects = await repository.getSubjects()

        for(const subjectName of subjects){
            const environments = await repository.getEnvironments(subjectName)
            
            for(const environmentName of environments){
                const example = await this.getRequiredVariables()
                const environment = await repository.getEnvironment(
                    subjectName, 
                    environmentName
                )

                const validation = await this.validateEnvironment(
                    example, 
                    environment
                )

                const missingKeysColored = validation.missingKeys.map(key => {
                    return chalk.red(key)
                })

                const additionalKeys = validation.additionalKeys.map(key => {
                    return chalk.yellow(key)
                })

                rows.push([
                    { vAlign: 'center', content: environmentName },
                    { vAlign: 'center', content: validation.isValid ? '✅' : '❌' },
                    missingKeysColored.join('\n'),
                    additionalKeys.join('\n')
                ])
            }

            const subjectChalked = chalk.hex(TextToColorConverter.convert(subjectName)).bold(subjectName)
            const firstSubjectRow =  rows.at(rows.length - environments.length)!

            firstSubjectRow.unshift({ 
                rowSpan: environments.length,
                content: subjectChalked,
                vAlign: 'center'
            }) 
        }

        return rows
    }

    private async validateEnvironment(example: string[], environment: string): Promise<EnvironmentValidation>{
        const variables = environment
            .split('\n')
            .map(line => line.split('=').at(0)) as string[]

        const missingKeys = example
            .filter(exampleVariable => !variables.includes(exampleVariable))

        const additionalKeys = variables
            .filter(variable => !example.includes(variable))

        const isValid = !missingKeys.length

        return {
            isValid,
            missingKeys,
            additionalKeys
        }
    }

    private async getRequiredVariables(): Promise<string[]> {
        const repository = this.getRepository()
        const example = await repository.getExample()

        return example
            .split('\n')
            .map(line => line.split('=').at(0)) as string[]
    }

    private async createTable(rows: HorizontalTableRow[]): Promise<Table.Table> {
        const table = new Table({
            head: ['Subject', 'Environment', 'Valid', 'Missing Keys', 'Additional Keys'],
            wordWrap: true,
            colAligns: ['left', 'left', 'center', 'left', 'left'],
            style: {
                head: ['white', 'white', 'white', 'red', 'yellow']
            }        
        })

        table.push(...rows)

        return table
    }
}