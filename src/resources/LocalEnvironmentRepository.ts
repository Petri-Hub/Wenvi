import open from "open";
import { EnvironmentAlreadyCreatedError } from "../errors/EnvironmentAlreadyCreatedError";
import { EnvironmentNotFoundError } from "../errors/EnvironmentNotFoundError";
import { ExampleAlreadyConfiguredError } from "../errors/ExampleAlreadyConfiguredError";
import { ExampleNotFoundError } from "../errors/ExampleNotFoundError";
import { SubjectAlreadyCreatedError } from "../errors/SubjectAlreadyCreatedError";
import { SubjectNotFoundError } from "../errors/SubjectNotFoundError";
import { IRepository } from "../interfaces/IRepository";
import fs from 'fs-extra'
import path from 'path'
import { RepositoryAlreadyCreated } from "../errors/RepositoryAlreadyCreated";
import { VariableNotFoundError } from "../errors/VariableNotFoundError";
import { WenviExportableContent } from "../types/WenviExportableContent";
import { ExportedEnvironment } from "../types/ExportedEnvironment";

export class LocalEnvironmentRepository implements IRepository{
    constructor(
        private readonly folder: string = 'environments'
    ){}

    public async init(): Promise<void> {
        if(await this.exists()){
            throw new RepositoryAlreadyCreated()
        }

        fs.mkdirSync(this.getRepositoryPath())
    }

    public async getSubjects(): Promise<string[]> {
        const path = this.getRepositoryPath()

        const items = fs.readdirSync(path, {
            withFileTypes: true
        })

        const folders = items
            .filter(item => item.isDirectory())
            .map(item => item.name)

        return folders
    }

    public async getEnvironments(subject: string): Promise<string[]> {
        const path = this.getSubjectPath(subject)

        const items = fs.readdirSync(path, {
            withFileTypes: true
        })

        const environments = items
            .filter(item => item.isFile())
            .filter(item => item.name.startsWith('.env.'))
            .map(item => item.name.split('.').pop() as string)

        return environments
    }

    public async getEnvironment(subject: string, environment: string): Promise<string> {
        const path = this.getEnvironmentPath(subject, environment)

        if(!await this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        if(!await this.isEnvironmentCreated(subject, environment)){
            throw new EnvironmentNotFoundError()
        }

        return fs.readFileSync(path, 'utf-8')
    }

    public async exists(): Promise<boolean> {
        return fs.existsSync(
            path.join(process.cwd(), 'environments')
        )
    }

    public async openSubject(subject: string): Promise<void> {
        const path = this.getSubjectPath(subject)

        if(!await this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        open(path)
    }

    public async openEnvironment(subject: string, environment: string): Promise<void> {
        const path = this.getEnvironmentPath(subject, environment)

        if(!await this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        if(!await this.isEnvironmentCreated(subject, environment)){
            throw new EnvironmentNotFoundError()
        }

        open(path)
    }

    public async getExample(): Promise<string> {
        const path = this.getExamplePath()

        if(!await this.isExampleCreated()){
            throw new ExampleNotFoundError()
        }

        return fs.readFileSync(path, 'utf-8')
    }

    public async createExample(variables?: string): Promise<void> {
        const path = this.getExamplePath()

        if(await this.isExampleCreated()){
            throw new ExampleAlreadyConfiguredError()
        }

        fs.writeFileSync(path, variables ?? '')
    }

    public async updateExample(variables?: string): Promise<void> {
        const path = this.getExamplePath()

        if(!await this.isExampleCreated()){
            throw new ExampleNotFoundError()
        }

        fs.writeFileSync(path, variables ?? '')
    }

    public async createSubject(subject: string): Promise<void> {
        const path = this.getSubjectPath(subject)

        if(await this.isSubjectCreated(subject)){
            throw new SubjectAlreadyCreatedError()
        }

        fs.mkdirSync(path)
    }

    public async createEnvironment(subjectName: string, environmentName: string, variables?: string): Promise<void> {
        const path = this.getEnvironmentPath(subjectName, environmentName)

        if(!await this.isSubjectCreated(subjectName)){
            this.createSubject(subjectName)
        }

        if(await this.isEnvironmentCreated(subjectName, environmentName)){
            throw new EnvironmentAlreadyCreatedError()
        }

        fs.writeFileSync(path, variables ?? '')
    }

    public async updateEnvironment(subjectName: string, environmentName: string, variables?: string): Promise<void> {
        const path = this.getEnvironmentPath(subjectName, environmentName)

        if(!await this.isSubjectCreated(subjectName)){
            throw new SubjectNotFoundError()
        }

        if(!await this.isEnvironmentCreated(subjectName, environmentName)){
            throw new EnvironmentNotFoundError()
        }

        fs.writeFileSync(path, variables ?? '')
    }

    public async deleteSubject(subject: string): Promise<void> {
        const path = this.getSubjectPath(subject)

        if(!await this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        fs.emptyDirSync(path)
        fs.rmdirSync(path)
    }

    public async deleteEnvironment(subject: string, environment: string): Promise<void> {
        const path = this.getEnvironmentPath(subject, environment)

        if(!await this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        if(!await this.isEnvironmentCreated(subject, environment)){
            throw new EnvironmentNotFoundError()
        }

        fs.rmSync(path)
    }

    public async getKey(subjectName: string, environmentName: string, key: string): Promise<string | null> {
        const environment = await this.getEnvironment(subjectName, environmentName)

        const variables = environment
            .split('\n')
            .map(line => line.trim())

        const variable = variables.find(variable => {
            return variable.startsWith(key)
        })

        if(!variable){
            throw new VariableNotFoundError()
        }

        return variable.split('=')[1] ?? null
    }

    public async updateKey(subjectName: string, environmentName: string, key: string, value: string): Promise<void> {
        const environment = await this.getEnvironment(subjectName, environmentName)

        const variables = environment
            .split('\n')
            .map(line => line.trim())

        const variableIndex = variables.findIndex(variable => {
            return variable.startsWith(key)
        })

        if(variableIndex === -1){
            variables[variables.length] = `${key}=${value}`
        } else {
            variables[variableIndex] = `${key}=${value}`
        }

        this.updateEnvironment(subjectName, environmentName, variables.join('\n'))
    }

    public async deleteKey(subjectName: string, environmentName: string, variableKey: string): Promise<void> {
        const environment = await this.getEnvironment(subjectName, environmentName)

        const variables = environment
            .split('\n')
            .map(line => line.trim())

        const variableIndex = variables.findIndex(variable => {
            return variable.startsWith(variableKey)
        })

        if(variableIndex === -1){
            throw new VariableNotFoundError()
        }

        variables.splice(variableIndex, 1)

        this.updateEnvironment(subjectName, environmentName, variables.join('\n'))
    }

    public async load({ example, environments }: WenviExportableContent): Promise<void> {
        if(!await this.exists()){
            await this.init()
        }

        if(example){
            if(await this.isExampleCreated()){
                await this.updateExample(example)
            } else {
                await this.createExample(example)
            }
        }

        for(const environment of environments){
            const isCreated = await this.isEnvironmentCreated(environment.subject, environment.environment)

            if(isCreated){
                await this.updateEnvironment(environment.subject, environment.environment, environment.content)
                continue
            }

            await this.createEnvironment(environment.subject, environment.environment, environment.content)
        }
    }

    public async isExampleCreated(): Promise<boolean> {
        return fs.existsSync(this.getExamplePath())
    }

    public async isSubjectCreated(subject: string): Promise<boolean> {
        return fs.existsSync(this.getSubjectPath(subject))
    }

    public async isEnvironmentCreated(subject: string, name: string): Promise<boolean> {
        return fs.existsSync(this.getEnvironmentPath(subject, name))
    }

    private getExamplePath(){
        return path.join(this.getRepositoryPath(), '.env.example')
    }

    private getEnvironmentPath(subject: string, environment: string): string {
        return path.join(this.getSubjectPath(subject), `.env.${environment}`)
    }

    private getSubjectPath(subject: string): string {
        return path.join(this.getRepositoryPath(), subject)
    }

    private getRepositoryPath(): string {
        return path.join(process.cwd(), this.getFolder())
    }

    private getFolder(): string {
        return this.folder
    }
}