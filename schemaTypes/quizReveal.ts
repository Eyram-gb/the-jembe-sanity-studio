import {defineField, defineType, type StringRule} from 'sanity'

type RevealType = 'solo' | 'txt' | 'vs' | 'arrow'

// The headline fields each reveal style needs; the rest are hidden for that style.
const requiredFor = (type: RevealType) => (rule: StringRule) =>
  rule.custom((value, context) =>
    (context.parent as {type?: string} | undefined)?.type === type && !value?.trim()
      ? 'Required for this reveal style'
      : true,
  )

export const quizReveal = defineType({
  name: 'quizReveal',
  title: 'Reveal',
  type: 'object',
  description: 'The card shown once someone answers: the real number and where it comes from.',
  fields: [
    defineField({
      name: 'type',
      title: 'Reveal style',
      type: 'string',
      options: {
        list: [
          {title: 'One number (e.g. $2.1T)', value: 'solo'},
          {title: 'A statement', value: 'txt'},
          {title: 'Two numbers compared (82% vs 45%)', value: 'vs'},
          {title: 'A shift (A quarter → a week)', value: 'arrow'},
        ],
        layout: 'radio',
      },
      initialValue: 'solo',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stat',
      title: 'Number',
      type: 'string',
      description: 'e.g. $2.1T, 15%',
      hidden: ({parent}) => parent?.type !== 'solo',
      validation: requiredFor('solo'),
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 2,
      hidden: ({parent}) => parent?.type !== 'txt',
      validation: requiredFor('txt'),
    }),
    defineField({
      name: 'statA',
      title: 'First number',
      type: 'string',
      description: 'Shown in yellow, e.g. what people assume.',
      hidden: ({parent}) => parent?.type !== 'vs',
      validation: requiredFor('vs'),
    }),
    defineField({
      name: 'statB',
      title: 'Second number',
      type: 'string',
      description: 'Shown in white, e.g. the real figure.',
      hidden: ({parent}) => parent?.type !== 'vs',
      validation: requiredFor('vs'),
    }),
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'arrow',
      validation: requiredFor('arrow'),
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'string',
      hidden: ({parent}) => parent?.type !== 'arrow',
      validation: requiredFor('arrow'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Short yellow line at the foot of the card, e.g. "Being seen ≠ being understood".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'e.g. "Source: Jembe Beauty Study"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Card label',
      type: 'string',
      description: 'Small heading at the top of the card. Leave blank for "CULTURAL BLIND SPOT".',
    }),
  ],
})
