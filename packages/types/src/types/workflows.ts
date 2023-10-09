import { FormSchema, FormSchemaField, FormSchemaFieldOptions } from './form';

export type WorkflowEvent = {
  stepName: string;
  stepValues?: Record<string, string>;
  state: Omit<Workflow, 'arn'> & Record<string, any>;
};

export type Workflow<T = WorkflowUIState> = {
  arn: string;
  id: string;
  name?: string;
  siteId: string;
  start: string;
  uiState?: T;
};

export type WorkflowConfig = {
  dataInputSchema?: WorkflowConfigSchema | null;
  dataOutputSchema?: WorkflowConfigSchema | null;
};

export type WorkflowStep = {
  id: string;
  type: string;
  workflowId: string;
} & Record<string, any>;

export type WorkflowConfigSchema = Record<string, string>;

export type WorkflowStepInfo = {
  group?: string[];
  id?: string;
  inputs: number;
  inputForm?: FormSchemaField[][];
  label: string;
  output: Record<string, string> | null;
  outputs: number;
  type: string;
};

export type WorkflowUIState<T = any> = {
  edges: UIEdge[];
  nodes: UINode<T>[];
  viewport: UIWorkflow;
};

export type UIWorkflow = {
  x: number;
  y: number;
  zoom: number;
};

export type UINode<T = any> = {
  data: UINodeData<T>;
  dragging: boolean;
  height: number;
  id: string;
  position: {
    x: number;
    y: number;
  };
  positionAbsolute: {
    x: number;
    y: number;
  };
  selected: boolean;
  type: string;
  width: number;
  children?: UINode[];
};

export type UINodeTree = UINode & {
  children: UINodeTree[];
};

export type UINodeData<T = any> = T & {
  step: WorkflowStepInfo;
  name: string;
};

export type ActiveUiNode<T = any> = {
  data: UINodeData<T>;
  id: string;
  inputForm?: FormSchema;
  type: string;
};

export type UIEdge = {
  id: string;
  source: string;
  sourceHandle: string | null;
  target: string;
  targetHandle: string | null;
};

export type WorkflowMetadata = {
  inputElements?: FormSchemaFieldOptions[];
  outputElements?: FormSchemaFieldOptions[];
};
