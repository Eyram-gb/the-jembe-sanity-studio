import { defineField, defineType } from 'sanity'

export const caseStudySection = defineType({
  name: 'caseStudySection',
  title: 'Case Study Section',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      description: 'Short all-caps label shown above the title (e.g. CONTEXT, CHALLENGE, APPROACH, IMPLICATIONS, CRITICAL INSIGHT, IMPACT)',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Section Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Right (float alongside text)', value: 'right' },
          { title: 'Left (float alongside text)', value: 'left' },
          { title: 'Full Width (break between sections)', value: 'full' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
      hidden: ({ parent }) => !parent?.image,
    }),
    defineField({
      name: 'stats',
      title: 'Stat Blocks',
      type: 'array',
      description: 'Orange stat boxes (e.g. 700+, 133.5M). Leave empty if not needed.',
      of: [{ type: 'stat' }],
    }),
    defineField({
      name: 'callout',
      title: 'Callout / Highlight Box',
      type: 'object',
      description: 'A highlighted warning or key insight box (e.g. "Presence ≠ Relevance").',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 4,
        }),
      ],
    }),
    defineField({
      name: 'numberedFindings',
      title: 'Numbered Findings',
      type: 'array',
      description: 'Numbered list items (#1, #2, #3…) with bold heading and rich body text.',
      of: [
        {
          type: 'object',
          name: 'numberedFinding',
          title: 'Finding',
          fields: [
            defineField({
              name: 'number',
              title: 'Number Label',
              type: 'string',
              description: 'e.g. #1, #2, #3',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [{ type: 'block' }],
            }),
          ],
          preview: {
            select: { number: 'number', heading: 'heading' },
            prepare({ number, heading }) {
              return { title: `${number} ${heading}` }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { label: 'label', title: 'title' },
    prepare({ label, title }) {
      return { title: label ? `[${label}] ${title}` : title }
    },
  },
})
