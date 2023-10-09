import React from 'react';

export type SectionData = {
  verticalAlign?: string;
  horizontalAlign?: string;
};

export type Section = SectionData & {
  children: React.ReactNode;
};
