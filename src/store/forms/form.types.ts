export enum EFormIds {
  BECOME_MENTOR = "BECOME_MENTOR",
  GET_HELP = "GET_HELP",
  TEST_MEETING = "TEST_MEETING",
  STILL_QUESTIONS = "STILL_QUESTIONS",
  SIGNUP_MENTOR = "SIGNUP_MENTOR",
}

export const FormIds = {
  [EFormIds.BECOME_MENTOR]: 1,
  [EFormIds.GET_HELP]: 2,
  [EFormIds.TEST_MEETING]: 3,
  [EFormIds.STILL_QUESTIONS]: 4,
  [EFormIds.SIGNUP_MENTOR]: 5,
}

export interface FormRequestParamsType {
  formName: TFormNames
  path: string
  name?: string
  email?: string
  about?: string
  url?: string

  telegram?: string
  facebook?: string
  whats_app?: string
  viber?: string
}

export type TFormNames = keyof typeof EFormIds
