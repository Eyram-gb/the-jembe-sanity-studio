import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    // ── Core meta ──────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Shown in browser tabs and search results. Leave blank to use the document title.',
      validation: (rule) => rule.max(70).warning('Titles over 70 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'A short summary shown in search engine results (aim for 120-160 characters).',
      validation: (rule) =>
        rule.max(160).warning('Descriptions over 160 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Relevant keywords for this page.',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'The preferred URL for this page. Prevents duplicate-content penalties on dynamic/filtered routes (e.g. /insights/[categoryId]).',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable to add robots: noindex, nofollow — use for draft, private, or duplicate pages.',
      initialValue: false,
    }),

    // ── Open Graph ─────────────────────────────────────────────────────────────
    defineField({
      name: 'ogType',
      title: 'Open Graph Type',
      type: 'string',
      description: 'Use "article" for insight posts and blog entries; "website" for category/static pages.',
      options: {
        list: [
          {title: 'Website', value: 'website'},
          {title: 'Article', value: 'article'},
        ],
        layout: 'radio',
      },
      initialValue: 'website',
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph Title',
      type: 'string',
      description: 'Title shown when shared on Facebook, LinkedIn, etc. Defaults to the page title if blank.',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph Description',
      type: 'text',
      rows: 3,
      description: 'Description shown when shared on social media. Defaults to the meta description if blank.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image displayed when this page is shared. Recommended: 1200 × 630px, under 1 MB. Falls back to the post/category image if blank.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and search engines.',
        }),
      ],
    }),

    // ── Twitter / X ────────────────────────────────────────────────────────────
    defineField({
      name: 'twitterCard',
      title: 'Twitter Card Type',
      type: 'string',
      description: 'Controls the card style when shared on X (Twitter).',
      options: {
        list: [
          {title: 'Summary with Large Image', value: 'summary_large_image'},
          {title: 'Summary', value: 'summary'},
        ],
        layout: 'radio',
      },
      initialValue: 'summary_large_image',
    }),
    defineField({
      name: 'twitterTitle',
      title: 'Twitter Title',
      type: 'string',
      description: 'Title on X (Twitter) cards. Defaults to the Open Graph title if blank.',
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: 'twitterDescription',
      title: 'Twitter Description',
      type: 'text',
      rows: 3,
      description: 'Description on X (Twitter) cards. Defaults to the meta description if blank.',
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: 'twitterCreator',
      title: 'Twitter Creator Handle',
      type: 'string',
      description: "Author's X (Twitter) handle, e.g. @thejembe. Used for article attribution on insight posts.",
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
    },
    prepare({title, description}) {
      return {
        title: title ?? '(No SEO title set)',
        subtitle: description ?? '(No meta description set)',
      }
    },
  },
})
