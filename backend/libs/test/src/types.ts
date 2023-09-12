export interface RequestOptions {}

export interface AuthRequestOptions extends RequestOptions {
  accessToken: string | undefined;
}

export interface StudyRequestOptions extends AuthRequestOptions {
  studyId: string | undefined;
}
