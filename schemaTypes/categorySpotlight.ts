import {defineField, defineType} from 'sanity'

export const categorySpotlight = {
    name: 'categorySpotlight',
  title: 'Category Spotlights',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Select Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
  name: 'featuredPosts',
  title: 'Pinned Posts for this Category',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{type: 'post'}],
      options: {
        filter: ({ document }: { document: Record<string, any> }) => {
          if (!document?.category?._ref) {
            return {
              filter: '_type == "post"'
            }
          }
          return {
            filter: '_type == "post" && references($categoryId)',
            params: {
              categoryId: document.category._ref
            }
          }
        }
      }
    }
  ],
  validation: (Rule) => Rule.max(3),
})
  ],
  preview: {
    select: {
      title: 'category.title',
    },
    prepare({title}: {title: string}) {
      return {
        title: `Spotlight for: ${title || 'Select a Category first'}`
      }
    }
  }
}