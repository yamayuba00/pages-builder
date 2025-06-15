export type ComponentType = 
  | 'navbar' 
  | 'hero' 
  | 'text' 
  | 'image'
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
  | 'contact'
  | 'container'
  | 'row'
  | 'column'
  | 'spacer'
  | 'heading'
  | 'paragraph'
  | 'quote'
  | 'code'
  | 'link'
  | 'tabs'
  | 'accordion'
  | 'grid';

export interface PageComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  order: number;
  gridStart?: number;
  gridEnd?: number;
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
