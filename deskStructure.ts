import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

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

      ...S.documentTypeListItems().filter(
        (listItem: any) => !['category', 'post', 'pageSeo'].includes(listItem.getId())
      ),
    ]);