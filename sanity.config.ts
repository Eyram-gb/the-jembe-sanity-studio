import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { deskStructure } from './deskStructure'

// One of each, edited from the Quiz folder: no "create new" or "duplicate".
const SINGLETON_TYPES = new Set(['quizPage', 'homeQuiz'])
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'the-jembe',

  projectId: 'xaid2ckt',
  dataset: 'production',

  plugins: [
    visionTool(),
    structureTool({
      structure: deskStructure,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({schemaType}) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({action}) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
})
