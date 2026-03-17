import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  orderings: [
    {
      title: "Manual Order",
      name: "manualOrder",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      description: "e.g., Article, News, or Research Report",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "Category Banner",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "description",
      type: "text",
      rows: 3,
    }),
   {
  name: 'orderRank',
  title: 'Order Rank',
  type: 'string',
  hidden: true,
},
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      description: 'Override metadata for the category insights page (/insights/[categoryId]). Falls back to the category title, description, and image if left blank.',
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
});