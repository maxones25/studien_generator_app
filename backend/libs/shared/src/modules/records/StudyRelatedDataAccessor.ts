
export interface StudyRelatedDataAccessor {
    getRelatedByStudy(studyId: string, id: string): Promise<any>;
}