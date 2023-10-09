export type Page = {
  children?: Page[];
  content?: string;
  extra?: Record<string, any>;
  id: string;
  pageTitle: string;
  parentId?: string;
  pathname: string;
  siteId: string;
  template?: string;
};

export type SitePages = Page[];
