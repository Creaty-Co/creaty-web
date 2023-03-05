/*

* Interfaces that are too small in meaning to split up

*/

import { TagType } from "@entities"

import { URLDataBase64 } from "./common"

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
export interface TopicType {
  id: number
  shortcut: string
  title: string
  icon: string
  tags: TagType[]
}

/* Mailings */

export interface MailingPreviewType {
  id: number
  subject: string
  is_done: boolean | null
}

export interface MailingType {
  id: number
  subject: string
  content: string
}
