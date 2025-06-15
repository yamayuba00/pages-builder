
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Copy, Check } from 'lucide-react';
import { PageComponent, ComponentType } from '@/lib/page-builder-types';
import { pageComponents } from '@/lib/page-components';
import { toast } from 'sonner';

interface AIComponentGeneratorProps {
  existingComponents: PageComponent[];
  onAddComponents: (components: PageComponent[]) => void;
}

export const AIComponentGenerator: React.FC<AIComponentGeneratorProps> = ({
  existingComponents,
  onAddComponents
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedComponents, setGeneratedComponents] = useState<PageComponent[]>([]);
  const [copied, setCopied] = useState(false);

  const analyzeExistingComponents = () => {
    const componentTypes = existingComponents.map(comp => comp.type);
    const componentConfigs = existingComponents.map(comp => {
      const config = pageComponents[comp.type];
      return {
        type: comp.type,
        name: config?.name,
        props: comp.props
      };
    });

    return {
      totalComponents: existingComponents.length,
      componentTypes: [...new Set(componentTypes)],
      components: componentConfigs
    };
  };

  const generateWithAI = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for the components you want to generate');
      return;
    }

    setIsGenerating(true);
    
    try {
      const analysis = analyzeExistingComponents();
      
      // Simulate AI generation (in real implementation, this would call an AI API)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const suggestedComponents = generateComponentSuggestions(prompt, analysis);
      setGeneratedComponents(suggestedComponents);
      
      toast.success(`Generated ${suggestedComponents.length} components based on your request`);
    } catch (error) {
      toast.error('Failed to generate components. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateComponentSuggestions = (userPrompt: string, analysis: any): PageComponent[] => {
    const suggestions: PageComponent[] = [];
    const prompt_lower = userPrompt.toLowerCase();

    // Smart component generation based on prompt keywords
    if (prompt_lower.includes('landing') || prompt_lower.includes('homepage')) {
      suggestions.push(
        createComponent('hero', { 
          title: 'Welcome to Our Platform',
          subtitle: 'Build amazing websites with our drag-and-drop page builder',
          buttonText: 'Get Started'
        }),
        createComponent('grid', {
          desktopColumns: '3',
          gridItems: 'Fast & Easy\nBuild pages in minutes\n\nResponsive\nWorks on all devices\n\nCustomizable\nFully customizable components'
        }),
        createComponent('stats', {
          title: 'Happy Customers',
          value: '10,000+',
          subtitle: 'And growing every day'
        })
      );
    }

    if (prompt_lower.includes('contact') || prompt_lower.includes('form')) {
      suggestions.push(
        createComponent('heading', { text: 'Contact Us', fontSize: '32' }),
        createComponent('form', {
          title: 'Get in Touch',
          fields: 'Name, Email, Subject, Message',
          submitText: 'Send Message'
        })
      );
    }

    if (prompt_lower.includes('about') || prompt_lower.includes('team')) {
      suggestions.push(
        createComponent('heading', { text: 'About Us', fontSize: '32' }),
        createComponent('paragraph', {
          text: 'We are passionate about creating amazing digital experiences that help businesses grow and succeed.'
        }),
        createComponent('grid', {
          desktopColumns: '2',
          gridItems: 'Our Mission\nTo empower everyone to build beautiful websites\n\nOur Vision\nMaking web design accessible to everyone'
        })
      );
    }

    if (prompt_lower.includes('pricing') || prompt_lower.includes('plans')) {
      suggestions.push(
        createComponent('heading', { text: 'Choose Your Plan', fontSize: '32' }),
        createComponent('grid', {
          desktopColumns: '3',
          gridItems: 'Starter\n$9/month - Perfect for beginners\n\nPro\n$29/month - For growing businesses\n\nEnterprise\n$99/month - For large organizations'
        })
      );
    }

    if (prompt_lower.includes('blog') || prompt_lower.includes('news')) {
      suggestions.push(
        createComponent('heading', { text: 'Latest News', fontSize: '32' }),
        createComponent('grid', {
          desktopColumns: '2',
          gridItems: 'How to Build Better Websites\nTips and tricks for modern web design\n\nThe Future of Web Development\nExploring upcoming trends and technologies'
        })
      );
    }

    // If no specific keywords found, generate generic components
    if (suggestions.length === 0) {
      suggestions.push(
        createComponent('heading', { text: 'New Section', fontSize: '28' }),
        createComponent('paragraph', {
          text: 'This section was generated based on your request. You can customize it further using the component editor.'
        }),
        createComponent('button', { text: 'Learn More', alignment: 'center' })
      );
    }

    return suggestions;
  };

  const createComponent = (type: ComponentType, customProps: Record<string, any> = {}): PageComponent => {
    const config = pageComponents[type];
    return {
      id: crypto.randomUUID(),
      type,
      props: { ...config.defaultProps, ...customProps },
      order: existingComponents.length + 1
    };
  };

  const handleAddComponents = () => {
    onAddComponents(generatedComponents);
    setGeneratedComponents([]);
    setPrompt('');
    toast.success('Components added to your page!');
  };

  const copyPromptExample = () => {
    const example = "Create a modern landing page with hero section, features grid, and contact form";
    setPrompt(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Component Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Describe what you want to build:</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a modern landing page with hero section, features, and contact form"
              className="min-h-20"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={generateWithAI}
              disabled={isGenerating || !prompt.trim()}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Components
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={copyPromptExample}
              size="sm"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          {existingComponents.length > 0 && (
            <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
              Current page has {existingComponents.length} components. AI will consider your existing design when generating new components.
            </div>
          )}
        </CardContent>
      </Card>

      {generatedComponents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Components ({generatedComponents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {generatedComponents.map((component, index) => {
                const config = pageComponents[component.type];
                return (
                  <div key={component.id} className="flex items-center justify-between p-3 bg-muted rounded">
                    <div>
                      <span className="font-medium">{config.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">
                        ({component.type})
                      </span>
                    </div>
                  </div>
                );
              })}
              
              <Button onClick={handleAddComponents} className="w-full mt-4">
                Add All Components to Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
