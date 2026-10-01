import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

// Types that live under the Quiz folder instead of the generic list.
const QUIZ_TYPES = ['quizPage', 'homeQuiz', 'quizQuestion', 'quizCategory'];

export const deskStructure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categories",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "post",
        title: "Posts",
        S,
        context,
      }),

      S.divider(),
      S.listItem()
        .title('Page SEO')
        .icon(() => '🔍')
        .child(
          S.documentTypeList('pageSeo').title('Page SEO')
        ),

      S.listItem()
        .title('Quiz')
        .icon(() => '❓')
        .child(
          S.list()
            .title('Quiz')
            .items([
              S.listItem()
                .title('Quiz Page')
                .id('quizPage')
                .child(S.document().schemaType('quizPage').documentId('quizPage').title('Quiz Page')),
              S.listItem()
                .title('Home Page Quiz')
                .id('homeQuiz')
                .child(S.document().schemaType('homeQuiz').documentId('homeQuiz').title('Home Page Quiz')),
              S.documentTypeListItem('quizQuestion').title('Questions'),
              orderableDocumentListDeskItem({
                type: "quizCategory",
                title: "Categories",
                S,
                context,
              }),
            ])
        ),

      ...S.documentTypeListItems().filter(
        (listItem: any) => !['category', 'post', 'pageSeo', ...QUIZ_TYPES].includes(listItem.getId())
      ),
    ]);
