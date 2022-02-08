/*

* Interfaces that are too small to split up

*/

/* Form */

export interface FormType {
  id: number
  type: "become_mentor" | "choose_mentor" | "test_meeting" | "still_questions"
  description: string | null
  post_send: string
  fields: FormFieldType[]
}

export interface FormFieldType {
  type: "name" | "email" | "telegram" | "facebook" | "whats_app" | "viber" | "about",
  placeholder: string
}
