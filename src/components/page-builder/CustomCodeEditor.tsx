
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Code, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomCodeEditorProps {
  customCSS: string;
  customJS: string;
  onSave: (css: string, js: string) => void;
}

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({
  customCSS,
  customJS,
  onSave
}) => {
  const [css, setCSS] = useState(customCSS);
  const [js, setJS] = useState(customJS);
  const { toast } = useToast();

  const cssPlaceholder = `/* Custom CSS */
.my-custom-class {
  color: #ff0000;
  font-weight: bold;
}`;

  const jsPlaceholder = `// Custom JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded!');
});`;

  const handleSave = () => {
    onSave(css, js);
    toast({
      title: "Kode berhasil disimpan!",
      description: "CSS dan JavaScript custom telah diterapkan ke halaman.",
    });
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="flex items-center gap-2 mb-3">
        <Code className="h-4 w-4" />
        <h3 className="font-semibold text-sm">Custom Code</h3>
      </div>
      
      <Tabs defaultValue="css" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="css" className="text-xs">CSS</TabsTrigger>
          <TabsTrigger value="js" className="text-xs">JavaScript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="css" className="space-y-2">
          <Label htmlFor="custom-css" className="text-xs">Custom CSS</Label>
          <Textarea
            id="custom-css"
            placeholder={cssPlaceholder}
            value={css}
            onChange={(e) => setCSS(e.target.value)}
            rows={6}
            className="font-mono text-xs resize-none"
          />
        </TabsContent>
        
        <TabsContent value="js" className="space-y-2">
          <Label htmlFor="custom-js" className="text-xs">Custom JavaScript</Label>
          <Textarea
            id="custom-js"
            placeholder={jsPlaceholder}
            value={js}
            onChange={(e) => setJS(e.target.value)}
            rows={6}
            className="font-mono text-xs resize-none"
          />
        </TabsContent>
      </Tabs>
      
      <Button onClick={handleSave} size="sm" className="mt-2 w-full">
        <Save className="h-3 w-3 mr-1" />
        Simpan
      </Button>
    </div>
  );
};

export default CustomCodeEditor;
