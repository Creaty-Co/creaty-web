import { ExtractArrayType } from "@shared/types"

import LocaleResourceSchemaJson from "./schema.json"

export const supportedLocales = ["en"] as const

export type LocaleKeys = ExtractArrayType<typeof supportedLocales> | "dev"
export type LocaleResourceSchema = typeof LocaleResourceSchemaJson
