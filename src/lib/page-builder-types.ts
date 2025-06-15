
export type ComponentType = 'navbar' | 'hero' | 'text' | 'image';

export interface PageComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  order: number;
}

export interface ComponentConfig {
  type: ComponentType;
  name: string;
  defaultProps: Record<string, any>;
  propsConfig: PropConfig[];
  component: React.FC<any>;
}

export interface PropConfig {
  key: string;
  label: string;
  type: 'text' | 'color' | 'textarea';
}
