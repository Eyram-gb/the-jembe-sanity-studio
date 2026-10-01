import {defineField, defineType} from 'sanity'

export const quizCategory = defineType({
  name: 'quizCategory',
  title: 'Quiz Category',
  type: 'document',
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'orderRank', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The round name on the /quiz intro, e.g. "Myth or Fact". It also appears in capitals above each question. Drag categories in the list to set the order rounds are offered in.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'orderRank',
      title: 'Order Rank',
      type: 'string',
      hidden: true,
    }),
  ],
})
