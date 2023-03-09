export interface ContactFormRequestParamsType {
  id: number
  path: string
  values: Record<string, string>
}

export type ContactFormTypes = "become_mentor" | "choose_mentor" | "test_meeting" | "still_questions" | "signup_mentor"
export interface ContactFormType {
  id: number

  fields: ContactFormFieldType[]
  type: ContactFormTypes
  
  submitted: boolean
}

export interface ContactFormFieldType {
  value?: string | number | boolean
  name: string
}

export enum ContactFormFieldFieldTypeEmum {
  about = "textarea",
  email = "input",
  name = "input",
}

export interface IContactFormState extends Record<ContactFormType["type"], ContactFormType> {}
