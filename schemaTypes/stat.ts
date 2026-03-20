import { defineField, defineType } from 'sanity'

export const stat = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g. 700+, 133.5M, 2',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. Viewers surveyed, Total viewers reached',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { value: 'value', label: 'label' },
    prepare({ value, label }) {
      return { title: `${value} — ${label}` }
    },
  },
})
