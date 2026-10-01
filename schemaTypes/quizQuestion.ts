import {defineArrayMember, defineField, defineType} from 'sanity'

const POSITIONS = ['First', 'Second', 'Third', 'Fourth']

export const quizQuestion = defineType({
  name: 'quizQuestion',
  title: 'Quiz Question',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'quizCategory'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      description: 'Shown in this order. Two to four answers.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.required().min(2).max(4),
    }),
    defineField({
      name: 'correctIndex',
      title: 'Correct answer',
      type: 'number',
      description: 'Which answer in the list above is right. Re-check this if you reorder the answers.',
      options: {
        list: POSITIONS.map((title, value) => ({title, value})),
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) =>
        rule.required().custom((value, context) => {
          const answers = (context.document?.answers as string[] | undefined) ?? []
          if (typeof value === 'number' && value >= answers.length) {
            return `There ${answers.length === 1 ? 'is only 1 answer' : `are only ${answers.length} answers`}`
          }
          return true
        }),
    }),
    defineField({
      name: 'reveal',
      title: 'Reveal',
      type: 'quizReveal',
      options: {collapsible: false},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder figures',
      type: 'boolean',
      description:
        'Tick while the numbers are still invented. Placeholder questions stay on /quiz but can’t be picked for the home page.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category.title',
      answers: 'answers',
      correctIndex: 'correctIndex',
      placeholder: 'placeholder',
    },
    prepare({question, category, answers, correctIndex, placeholder}) {
      const correct = Array.isArray(answers) ? answers[correctIndex] : undefined
      return {
        title: question ?? 'Untitled question',
        subtitle: [placeholder ? 'PLACEHOLDER' : null, category, correct ? `✓ ${correct}` : null]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
