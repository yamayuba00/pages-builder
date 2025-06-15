
export type ComponentType = 
  | 'navbar' 
  | 'hero' 
  | 'text' 
  | 'image'
  | 'grid'
  | 'card'
  | 'button'
  | 'table'
  | 'chart'
  | 'sidebar'
  | 'header'
  | 'footer'
  | 'form'
  | 'list'
  | 'divider'
  | 'stats'
  | 'testimonial'
  | 'pricing'
  | 'faq'
  | 'contact';

export interface PageComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  order: number;
}

export interface ComponentConfig {
  type: ComponentType;
  name: string;
  category: 'layout' | 'content' | 'dashboard' | 'marketing' | 'form';
  defaultProps: Record<string, any>;
  propsConfig: PropConfig[];
  component: React.FC<any>;
}

export interface PropConfig {
  key: string;
  label: string;
  type: 'text' | 'color' | 'textarea' | 'select' | 'number';
  options?: string[];
}
