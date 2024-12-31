import open from "open";
import { EnvironmentAlreadyCreatedError } from "../errors/EnvironmentAlreadyCreatedError";
import { EnvironmentNotFoundError } from "../errors/EnvironmentNotFoundError";
import { ExampleAlreadyConfiguredError } from "../errors/ExampleAlreadyConfiguredError";
import { ExampleNotFoundError } from "../errors/ExampleNotConfiguredError";
import { SubjectAlreadyCreatedError } from "../errors/SubjectAlreadyCreatedError";
import { SubjectNotFoundError } from "../errors/SubjectNotFoundError";
import { IRepository } from "../interfaces/IRepository";
import fs from 'fs-extra'
import path from 'path'
import { RepositoryAlreadyCreated } from "../errors/RepositoryAlreadyCreated";

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

        if(!this.isEnvironmentCreated(subject, environment)){
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

        if(!this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        open(path)
    }

    public async openEnvironment(subject: string, environment: string): Promise<void> {
        const path = this.getEnvironmentPath(subject, environment)

        if(!this.isEnvironmentCreated(subject, environment)){
            throw new EnvironmentNotFoundError()
        }

        open(path)
    }

    public async getExample(): Promise<string> {
        const path = this.getExamplePath()

        if(!this.isExampleCreated()){
            throw new ExampleNotFoundError()
        }

        return fs.readFileSync(path, 'utf-8')
    }

    public async createExample(): Promise<void> {
        const path = this.getExamplePath()

        if(this.isExampleCreated()){
            throw new ExampleAlreadyConfiguredError()
        }

        fs.writeFileSync(path, '')
    }

    public async createSubject(subject: string): Promise<void> {
        const path = this.getSubjectPath(subject)

        if(this.isSubjectCreated(subject)){
            throw new SubjectAlreadyCreatedError()
        }

        fs.mkdirSync(path)
    }

    public async createEnvironment(subject: string, environment: string): Promise<void> {
        const path = this.getEnvironmentPath(subject, environment)

        if(!this.isSubjectCreated(subject)){
            this.createSubject(subject)
        }

        if(this.isEnvironmentCreated(subject, environment)){
            throw new EnvironmentAlreadyCreatedError()
        }

        fs.writeFileSync(path, '')
    }

    public async deleteSubject(subject: string): Promise<void> {
        const path = this.getSubjectPath(subject)

        if(!this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        fs.emptyDirSync(path)
        fs.rmdirSync(path)
    }

    public async deleteEnvironment(subject: string, environment: string): Promise<void> {
        const path = this.getEnvironmentPath(subject, environment)

        if(!this.isSubjectCreated(subject)){
            throw new SubjectNotFoundError()
        }

        if(!this.isEnvironmentCreated(subject, environment)){
            throw new EnvironmentNotFoundError()
        }

        fs.rmSync(path)
    }

    private isExampleCreated(): boolean {
        return fs.existsSync(this.getExamplePath())
    }

    private isSubjectCreated(subject: string): boolean {
        return fs.existsSync(this.getSubjectPath(subject))
    }

    private isEnvironmentCreated(subject: string, name: string): boolean {
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