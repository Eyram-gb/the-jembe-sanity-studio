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
          { title: 'Approach', value: 'approach' },
          { title: 'Contact', value: 'contact' },
          { title: 'FAQ', value: 'faq' },
          { title: 'Insights (listing)', value: 'insights' },
          { title: 'Services', value: 'services' },
          { title: 'Why Culture', value: 'why-culture' },
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
        approach: 'Approach',
        contact: 'Contact',
        faq: 'FAQ',
        insights: 'Insights (listing)',
        services: 'Services',
        'why-culture': 'Why Culture',
      }
      return {
        title: labels[page] ?? page,
        subtitle: title ?? 'No SEO title set',
      }
    },
  },
})
