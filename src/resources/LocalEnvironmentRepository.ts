import { EnvironmentAlreadyCreatedError } from "../errors/EnvironmentAlreadyCreatedError";
import { EnvironmentFileListingError } from "../errors/EnvironmentFileListingError";
import { EnvironmentFileRetrievalError } from "../errors/EnvironmentFileRetrievalError";
import { SubjectAlreadyCreatedError } from "../errors/SubjectAlreadyCreatedError";
import { IRepository } from "../interfaces/IRepository";
import { EnvironmentFile } from "../types/EnvironmentFile";
import fs from 'fs'
import path from 'path'

export class LocalEnvironmentRepository implements IRepository{
    constructor(
        private readonly folder: string = 'environments'
    ){}

    public async get(subject: string, environment: string): Promise<string | null> {
        try{
           
            const directory = path.join(process.cwd(), 'environments', subject)
            const filePath = path.join(directory, `.env.${environment}`)
            const environmentVariables = fs.readFileSync(filePath, 'utf-8')
            
            return environmentVariables

        } catch(error){
            throw new EnvironmentFileRetrievalError(error)
        }
    }

    public async list(): Promise<EnvironmentFile[]> {
        try{

            const results = []
            const subjects = this.getSubjects()
            
            for(const subjectName of subjects){
                const environments = this.getEnvironmentsFromSubject(subjectName)
                
                for(const environmentName of environments){
                    results.push({
                        subject: subjectName,
                        environment: environmentName.split('.').pop() as string
                    })
                }               
            }

            return results

        } catch(error){
            throw new EnvironmentFileListingError(error)
        }
    }

    public async listSubjects(): Promise<string[]> {
        return this.getSubjects()
    }

    public async listEnvironments(subject: string): Promise<string[]> {
        return this.getEnvironmentsFromSubject(subject)
    }

    public getSubjects(): string[] {
        const directoryPath = path.join(process.cwd(), 'environments')
        const directoryContents = fs.readdirSync(directoryPath)

        const subjects = directoryContents.filter(contentName => {
            const stats = fs.statSync(path.join(directoryPath, contentName))
            const isDirectory = stats.isDirectory()

            return isDirectory
        })
        
        return subjects
    }

    public getEnvironmentsFromSubject(subject: string): string[] {
        const directoryPath = path.join(process.cwd(), 'environments', subject)
        const fileNames = fs.readdirSync(directoryPath)
        const environments = fileNames.filter(fileName => fileName.startsWith('.env'))
        
        return environments
    }

    public async exists(): Promise<boolean> {
        return fs.existsSync(
            path.join(process.cwd(), 'environments')
        )
    }

    public async example(): Promise<string | null> {
        const examplePath = path.join(process.cwd(), 'environments', '.env.example')

        if(!fs.existsSync(examplePath)){
            return null
        }

        return fs.readFileSync(examplePath, 'utf-8')
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

    private isSubjectCreated(subject: string): boolean {
        return fs.existsSync(this.getSubjectPath(subject))
    }

    private isEnvironmentCreated(subject: string, name: string): boolean {
        return fs.existsSync(this.getEnvironmentPath(subject, name))
    }

    private getEnvironmentPath(subject: string, environment: string): string {
        return path.join(this.getSubjectPath(subject), `.env.${environment}`)
    }

    private getSubjectPath(subject: string): string {
        return path.join(this.getRepositoryPath(), subject)
    }

    private getRepositoryPath(): string {
        return path.join(process.cwd(), 'environments')
    }

    private getFolder(): string {
        return this.folder
    }
}