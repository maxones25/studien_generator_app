export interface RequestOptions {}

export interface AuthRequestOptions extends RequestOptions {
  accessToken: string;
}

export interface StudyRequestOptions extends AuthRequestOptions {
  studyId: string;
}
