export interface IRepository {
   init(): Promise<void>
   exists(): Promise<boolean>
   getSubjects(): Promise<string[]>
   getEnvironments(subjectName: string): Promise<string[]>
   getEnvironment(subjectName: string, environmentName: string): Promise<string>
   getExample(): Promise<string>
   createExample(): Promise<void>
   createSubject(subjectName: string): Promise<void>
   createEnvironment(subjectName: string, environmentName: string, environment?: string): Promise<void>
   updateEnvironment(subjectName: string, environmentName: string, environment?: string): Promise<void>
   deleteSubject(subjectName: string): Promise<void>
   deleteEnvironment(subjectName: string, environmentName: string): Promise<void>
   openSubject(subjectName: string): Promise<void>
   openEnvironment(subjectName: string, environmentName: string): Promise<void>
   isSubjectCreated(subjectName: string): Promise<boolean>
   isEnvironmentCreated(subjectName: string, environmentName: string): Promise<boolean>
   isExampleCreated(): Promise<boolean>
}