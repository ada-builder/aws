import { MediaItem } from './media';
import { Page } from './page';
import {
  ALIGN_CENTER,
  ALIGN_JUSTIFY,
  ALIGN_LEFT,
  ALIGN_RIGHT,
  BLOCK_DATA_DISPLAY,
  BLOCK_FORM,
  BLOCK_HERO,
  BLOCK_IMAGE,
  BLOCK_TEXT_CONTENT,
  BLOCK_TOP_NAVIGATION,
  BUTTON,
  CONTAIN_CONTENT,
  CONTAIN_FULL,
  CONTAIN_OVERFLOW,
  DATA_DISPLAY,
  FONT_STYLE_BOLD,
  FONT_STYLE_ITALIC,
  FONT_STYLE_NORMAL,
  FONT_STYLE_UNDERLINE,
  FORM,
  HEADING_H1,
  HEADING_H2,
  HEADING_H3,
  HEADING_H4,
  IMAGE,
  PARAGRAPH,
  RICH_TEXT,
  TEXT,
} from '../constants';
import { SectionData } from './layout';

export type BlockContain =
  | typeof CONTAIN_FULL
  | typeof CONTAIN_CONTENT
  | typeof CONTAIN_OVERFLOW;

export type ContentAlign =
  | typeof ALIGN_LEFT
  | typeof ALIGN_CENTER
  | typeof ALIGN_RIGHT
  | typeof ALIGN_JUSTIFY;

export type ContentFontEmphasis =
  | typeof FONT_STYLE_BOLD
  | typeof FONT_STYLE_ITALIC
  | typeof FONT_STYLE_NORMAL
  | typeof FONT_STYLE_UNDERLINE;

export type ContentTextStyle =
  | typeof HEADING_H1
  | typeof HEADING_H2
  | typeof HEADING_H3
  | typeof HEADING_H4
  | typeof PARAGRAPH;

export type BlockType =
  | typeof BLOCK_DATA_DISPLAY
  | typeof BLOCK_FORM
  | typeof BLOCK_HERO
  | typeof BLOCK_IMAGE
  | typeof BLOCK_TEXT_CONTENT
  | typeof BLOCK_TOP_NAVIGATION;

export type EditorContentType =
  | typeof BUTTON
  | typeof DATA_DISPLAY
  | typeof FORM
  | typeof IMAGE
  | typeof TEXT
  | typeof RICH_TEXT;

export type Blocks = Record<BlockType, BlockInfo>;

export type BlockInfo = {
  defaultValues: Record<string, any>;
  defaultVariant?: string;
  description?: string;
  image?: string;
  title?: string;
  type: BlockType;
  variants: Record<string, BlockVariant>;
};

export type Block<T = any> = {
  background?: string | MediaItem;
  contain?: BlockContain;
  data?: T;
  id: string;
  isEditing?: boolean;
  type: BlockType;
  variant?: string;
};

export type BlockRow = SectionData & {
  id: string;
  children: Block[];
};

export type BlockVariant = {
  component: React.FC<Block>;
};

export type CommonBlockData = {
  content?: string;
  id: string;
  type: EditorContentType;
};

export type DataDisplay = CommonBlockData & {
  schemaId?: string;
};

export type ContentButton = CommonBlockData & {
  buttonType?: string;
  href?: string;
  variant?: string;
  workflowId?: string;
};

export type ContentText = CommonBlockData & {
  align?: ContentAlign;
  color?: string;
  emphasis?: ContentFontEmphasis[];
  family?: string;
  size?: string;
  textStyle?: ContentTextStyle;
};

export type ContentImage = CommonBlockData & {
  src?: string;
};

// * * * * * * * * * * * * * * * * * * * * * * * *
// Form

export type BlockForm = Block<BlockFormData> & {};

export type BlockFormData = {
  form: {
    formId?: string;
    workflowId?: string;
  };
};

// * * * * * * * * * * * * * * * * * * * * * * * *
// Data Display

export type BlockDataDisplay = Block<BlockDataDisplayData> & {};

export type BlockDataDisplayData = {
  schema?: DataDisplay;
};

// * * * * * * * * * * * * * * * * * * * * * * * *
// Hero

export type BlockHero = Block<BlockHeroData> & {};

export type BlockHeroData = {
  primaryLink?: ContentButton;
  description?: ContentText;
  subTitle?: ContentText;
  title?: ContentText;
};

// * * * * * * * * * * * * * * * * * * * * * * * *
// Image

export type BlockImage = Block<BlockImageData> & {};

export type BlockImageData = {
  image: ContentImage;
  file?: MediaItem;
};

// * * * * * * * * * * * * * * * * * * * * * * * *
// Top Navigation

export type BlockTopNavigationData = {
  pages?: Page[];
};

// * * * * * * * * * * * * * * * * * * * * * * * *
// Text

export type BlockText = Block<BlockTextData> & {};

export type BlockTextData = {
  text: ContentText;
};
