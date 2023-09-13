
export interface IPagesRepository {
    addPage(formId: string, number: number): Promise<string>;
}