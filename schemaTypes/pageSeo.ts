import { defineField, defineType } from 'sanity'

export const pageSeo = defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      description: 'Which page this SEO entry applies to.',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'Insights (listing)', value: 'insights' },
          { title: 'What We Do', value: 'what-we-do' },
          { title: 'Work With Us', value: 'work-with-us' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: {
        collapsible: false,
      },
    }),
  ],
  preview: {
    select: { page: 'page', title: 'seo.title' },
    prepare({ page, title }) {
      const labels: Record<string, string> = {
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        insights: 'Insights (listing)',
        'what-we-do': 'What We Do',
        'work-with-us': 'Work With Us',
      }
      return {
        title: labels[page] ?? page,
        subtitle: title ?? 'No SEO title set',
      }
    },
  },
})
