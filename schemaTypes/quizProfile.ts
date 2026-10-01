import {defineField, defineType} from 'sanity'

export const quizProfile = defineType({
  name: 'quizProfile',
  title: 'Result Profile',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'e.g. Culture Fluent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Shown under the score. Keep it encouraging, never a verdict on the person.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'minPercent',
      title: 'Minimum score (%)',
      type: 'number',
      description:
        'The lowest share of correct answers that earns this profile. Someone gets the highest profile they reach, so one profile should start at 0.',
      validation: (rule) => rule.required().min(0).max(100),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder wording',
      type: 'boolean',
      description: 'Tick to show "Placeholder wording — pending Jembe copy" under the profile on the site.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {name: 'name', minPercent: 'minPercent', placeholder: 'placeholder'},
    prepare({name, minPercent, placeholder}) {
      return {
        title: name ?? 'Unnamed profile',
        subtitle: [`${minPercent ?? '?'}% and up`, placeholder ? 'PLACEHOLDER' : null].filter(Boolean).join(' · '),
      }
    },
  },
})
