import {defineArrayMember, defineField, defineType} from 'sanity'

// Every field here is optional: a blank field keeps the site's built-in text,
// shown in grey as each field's placeholder.
const KEEP_DEFAULT = 'Leave blank to keep the text shown in grey.'
const TOKENS = '{caught} and {total} are replaced with the score, e.g. "3 of 5".'

export const quizPage = defineType({
  name: 'quizPage',
  title: 'Quiz Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'quiz', title: 'Quiz'},
    {name: 'results', title: 'Results'},
    {name: 'followUp', title: 'Email & Share'},
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Heading',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: `${KEEP_DEFAULT} A line break starts a new line on the site.`,
      placeholder: 'How well do you know your audience?',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: KEEP_DEFAULT,
      placeholder:
        'Most brands plan multicultural marketing on assumptions nobody has checked. Test yours against the numbers.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Background image',
      type: 'image',
      group: 'hero',
      description: 'Leave empty to keep the current background.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'sharedHeroTitle',
      title: 'Heading for shared score links',
      type: 'text',
      rows: 2,
      group: 'hero',
      description: `Replaces the heading when someone opens a link a friend shared. ${TOKENS} ${KEEP_DEFAULT}`,
      placeholder: '{caught} of {total} blind spots caught.\nCan you beat it?',
    }),
    defineField({
      name: 'sharedHeroDescription',
      title: 'Description for shared score links',
      type: 'text',
      rows: 3,
      group: 'hero',
      description: KEEP_DEFAULT,
      placeholder:
        'Someone shared their score with you. Take the quiz and see which assumptions about multicultural consumers hold up against the numbers.',
    }),

    // ── Quiz ───────────────────────────────────────────────────────────────────
    defineField({
      name: 'heading',
      title: 'Section heading',
      type: 'string',
      group: 'quiz',
      description: KEEP_DEFAULT,
      placeholder: 'Where does your brand lose the room?',
    }),
    defineField({
      name: 'intro',
      title: 'Section intro',
      type: 'text',
      rows: 3,
      group: 'quiz',
      description: KEEP_DEFAULT,
      placeholder:
        'Each question is an assumption marketing teams make about multicultural consumers. Pick your answer, then see the real number and where it comes from.',
    }),
    defineField({
      name: 'cardIntro',
      title: 'Start screen text',
      type: 'text',
      rows: 2,
      group: 'quiz',
      description: `Above the start and round buttons. ${KEEP_DEFAULT}`,
      placeholder:
        'Think you know where brands lose the room? Take every question, or just the round that matters to your category.',
    }),
    defineField({
      name: 'correctFeedback',
      title: 'Right answer line',
      type: 'string',
      group: 'quiz',
      description: KEEP_DEFAULT,
      placeholder: 'Caught it.',
    }),
    defineField({
      name: 'missedFeedback',
      title: 'Wrong answer line',
      type: 'string',
      group: 'quiz',
      description: KEEP_DEFAULT,
      placeholder: 'Blind spot — and you’re in good company.',
    }),

    // ── Results ────────────────────────────────────────────────────────────────
    defineField({
      name: 'profiles',
      title: 'Result profiles',
      type: 'array',
      group: 'results',
      description:
        'The name and line shown under the score. Leave empty to keep the built-in Culture Fluent / Aware / Tourist profiles.',
      of: [defineArrayMember({type: 'quizProfile'})],
      validation: (rule) =>
        rule.custom((profiles) => {
          const list = (profiles ?? []) as {minPercent?: number}[]
          if (list.length === 0) return true
          if (!list.some((p) => p.minPercent === 0)) {
            return 'Add a profile that starts at 0% so every score gets one.'
          }
          const mins = list.map((p) => p.minPercent)
          return new Set(mins).size === mins.length || 'Two profiles start at the same score.'
        }),
    }),
    defineField({
      name: 'resultNote',
      title: 'Closing line',
      type: 'text',
      rows: 3,
      group: 'results',
      description: `Above the button at the bottom of the result. ${KEEP_DEFAULT}`,
      placeholder:
        'Every number in this quiz is measurable in real time, with real multicultural consumers — emotional drivers, intensity, and brand comparison included.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Button label',
      type: 'string',
      group: 'results',
      description: KEEP_DEFAULT,
      placeholder: 'Request a Demo',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Button link',
      type: 'string',
      group: 'results',
      description: `A page on the site such as /contact, or a full https:// address. ${KEEP_DEFAULT}`,
      placeholder: '/contact',
      validation: (rule) =>
        rule.custom((value) =>
          !value || value.startsWith('/') || /^https?:\/\//.test(value)
            ? true
            : 'Start with / for a page on the site, or https:// for another site.',
        ),
    }),

    // ── Email & Share ──────────────────────────────────────────────────────────
    defineField({
      name: 'emailHeading',
      title: 'Email form heading',
      type: 'string',
      group: 'followUp',
      description: KEEP_DEFAULT,
      placeholder: 'Get the data behind these numbers',
    }),
    defineField({
      name: 'emailDescription',
      title: 'Email form description',
      type: 'text',
      rows: 2,
      group: 'followUp',
      description: KEEP_DEFAULT,
      placeholder: 'We’ll email your results with every source, and send you the research report behind them.',
    }),
    defineField({
      name: 'emailButtonLabel',
      title: 'Email form button',
      type: 'string',
      group: 'followUp',
      description: KEEP_DEFAULT,
      placeholder: 'Get the research report',
    }),
    defineField({
      name: 'shareHeading',
      title: 'Share heading',
      type: 'string',
      group: 'followUp',
      description: KEEP_DEFAULT,
      placeholder: 'Share your score',
    }),
    defineField({
      name: 'shareDescription',
      title: 'Share description',
      type: 'text',
      rows: 2,
      group: 'followUp',
      description: KEEP_DEFAULT,
      placeholder: 'Your link shows your score and challenges whoever opens it to beat it.',
    }),
    defineField({
      name: 'shareText',
      title: 'Share message',
      type: 'text',
      rows: 3,
      group: 'followUp',
      description: `The post text on X and the phone share sheet. ${TOKENS} {profile} is replaced with their result profile. ${KEEP_DEFAULT}`,
      placeholder:
        "I caught {caught} of {total} cultural blind spots on The Jembe's quiz — that makes me {profile}. How many will you catch?",
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Quiz Page', subtitle: '/quiz'}
    },
  },
})
