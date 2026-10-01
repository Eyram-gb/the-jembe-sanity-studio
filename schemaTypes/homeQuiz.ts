import {defineArrayMember, defineField, defineType} from 'sanity'

// Every text field is optional: a blank field keeps the site's built-in text,
// shown in grey as each field's placeholder.
const KEEP_DEFAULT = 'Leave blank to keep the text shown in grey.'

export const homeQuiz = defineType({
  name: 'homeQuiz',
  title: 'Home Page Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      description:
        'The questions the home page quiz asks, in this order. Pick from published questions; placeholder questions can’t be picked. Leave empty to keep the built-in five. If you change how many there are, update the description and start text below, which say "five".',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'quizQuestion'}],
          options: {filter: 'placeholder != true'},
        }),
      ],
      validation: (rule) => [
        rule.unique(),
        rule.max(8).warning('The home quiz is meant to take about a minute and a half. Five is the usual.'),
      ],
    }),
    defineField({
      name: 'eyebrow',
      title: 'Label above the heading',
      type: 'string',
      description: KEEP_DEFAULT,
      placeholder: 'Cultural Intelligence Quiz',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: KEEP_DEFAULT,
      placeholder: 'The Cultural Blind Spot Quiz',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: KEEP_DEFAULT,
      placeholder:
        'Five things most marketing teams get wrong about multicultural consumers. Ninety seconds. Every answer comes with the real number.',
    }),
    defineField({
      name: 'cardIntro',
      title: 'Start screen text',
      type: 'text',
      rows: 2,
      description: `Above the start button. ${KEEP_DEFAULT}`,
      placeholder: 'Think you know where brands lose the room? Find out in five quick questions.',
    }),
  ],
  preview: {
    select: {questions: 'questions'},
    prepare({questions}) {
      const count = Array.isArray(questions) ? questions.length : 0
      return {
        title: 'Home Page Quiz',
        subtitle: count ? `${count} question${count === 1 ? '' : 's'} picked` : 'Built-in questions',
      }
    },
  },
})
