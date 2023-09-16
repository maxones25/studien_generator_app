export interface IGetStudyRelatedDataUseCase {
  execute(studyId: string, id: string): Promise<any>;
}
