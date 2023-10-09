import React from 'react';
import { MediaItem } from './media';
import { Block } from './blocks';

export type Page<T = string> = {
  children?: Page[];
  content?: T;
  extra?: Record<string, any>;
  id: string;
  pageTitle: string;
  parentId?: string;
  pathname: string;
  siteId: string;
  template?: string;
};

export type SideNavItem = {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  type?: string;
};

export type Site = {
  id: string;
  domain?: string;
  logo?: MediaItem;
  name?: string;
  sidebar?: SideNavItem[];
  theme: Record<string, any>;
};

export type SitePages = Page[];

export type SiteBuildSettings = {
  codebuildName: string;
};

export type SiteTemplate = {
  label: string;
  templateName: string;
  form: any[];
};

export type UserSite = {
  siteId: string;
  userId: string;
};
