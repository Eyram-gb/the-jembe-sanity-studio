import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'e.g., Article, News, or Research Report',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    // New Image Field Added Here
    defineField({
      name: 'image',
      title: 'Category Banner',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop the image inside Sanity Studio
      },
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
  ],
})