import {
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import React, { ComponentType } from 'react';
export type FieldRules<T extends DefaultFormValues = DefaultFormValues> = Omit<
  RegisterOptions<T, Path<T>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

export type DefaultFieldValues = FieldValues;
export type DefaultFormValues = Record<string, DefaultFieldValues>;
export type FormSchemaFieldOptions = {
  data?: any;
  label?: string;
  value: string;
};
export type FormSchemaField<T extends DefaultFieldValues = DefaultFormValues> =
  {
    defaultValue?: PathValue<T, Path<T>>;
    fieldContainerProps?: Record<string, any>;
    id?: string;
    label?: string;
    name: Path<T>;
    options?: FormSchemaFieldOptions[];
    props?: Record<string, any>;
    rules?: FieldRules<T>;
    show?: FormShowOptions;
    type: string;
  };
export type FormSchemaLabel = {
  submitLabel?: React.ReactNode;
};
export type FormSchema<T extends DefaultFormValues = DefaultFormValues> = {
  fields: FormSchemaField<T>[][];
  labels?: FormSchemaLabel;
};
export type FormComponentProps<T extends FieldValues = any> =
  ControllerRenderProps & {
    label?: string;
    options?: FormSchemaFieldOptions[];
    placeholderColor?: string;
    rules?: FieldRules;
    setValue: UseFormSetValue<T>;
  };
export type FormComponent = (props: FormComponentProps) => JSX.Element;
export type FormComponentData = {
  component: ComponentType<FormComponentProps>;
  type?: string;
};
export type FormComponents = Record<string, FormComponentData>;

export type FormShowOptions = Record<
  string,
  string | boolean | number | string[]
>;

export type BuiltForm = {
  createdAt: string;
  fields: FormSchemaField[];
  name: string;
  siteId: string;
  updatedAt: string;
};
