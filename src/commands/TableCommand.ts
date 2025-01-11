import Table, { HorizontalTableRow } from "cli-table3";
import { IExecutableCommand } from "../interfaces/ICommand";
import { Logger } from "../logging/Logger";
import { CommandInput } from "../types/CommandInput";
import { BaseCommand } from "./BaseCommand";
import { TextToColorConverter } from "../helpers/TextToColorConverter";
import chalk from "chalk";

export class TableCommand extends BaseCommand implements IExecutableCommand{
    public async execute({ parameters }: CommandInput): Promise<void> {

        const subjects = await this.handleCommandTargets(parameters)
        const environments = await this.getAllPossibleEnvironmentNames()

        if(!subjects.length){
            Logger.log('You have no subjects to display.')
            return
        }

        if(!environments.length){
            Logger.log('You have no environments to display.')
            return
        }

        const rows = await this.createTableRows(parameters)
        const table = await this.createTable(rows)

        Logger.log('Table of subjects and environments:')
        console.log(table.toString())
    }

    private async createTableRows(parameters: string[]): Promise<HorizontalTableRow[]> {
        const rows = []

        const subjects = await this.handleCommandTargets(parameters)
        const environments = await this.getAllPossibleEnvironmentNames()

        for(const subjectName of subjects){
            const row: HorizontalTableRow = [
                chalk.hex(TextToColorConverter.convert(subjectName)).bold(subjectName)
            ]

            for(const environmentName of environments){
                const hasEnvironment = await this.getRepository().isEnvironmentCreated(
                    subjectName,
                    environmentName
                )

                hasEnvironment
                    ? row.push('✅')
                    : row.push('❌')
            }

            rows.push(row)
        }

        return rows
    }

    private async createTable(rows: HorizontalTableRow[]): Promise<Table.Table> {
        const environments = await this.getAllPossibleEnvironmentNames()

        const table = new Table({
            head: ['Subject/Env', ...environments],
            wordWrap: true,
            colAligns: ['left', ...Array(environments.length).fill('center')],
            style: {
                head: ['white']
            }        
        })

        table.push(...rows)

        return table
    }

    private async handleCommandTargets(parameters: string[]): Promise<string[]> {
        const repository = this.getRepository()

        if(!parameters.length){
            return await repository.getSubjects()
        }

        const subjects = await repository.getSubjects()
        
        const targets = subjects.filter(subjectName => {
            return parameters.includes(subjectName)
        })

        return targets
    }

    private async getAllPossibleEnvironmentNames(): Promise<string[]> {
        const repository = this.getRepository()
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