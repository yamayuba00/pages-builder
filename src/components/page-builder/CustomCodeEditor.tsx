
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

  const handleSave = () => {
    onSave(css, js);
    toast({
      title: "Kode berhasil disimpan!",
      description: "CSS dan JavaScript custom telah diterapkan ke halaman.",
    });
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center gap-2 mb-4">
        <Code className="h-4 w-4" />
        <h3 className="font-semibold">Custom Code</h3>
      </div>
      
      <Tabs defaultValue="css" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="css">CSS</TabsTrigger>
          <TabsTrigger value="js">JavaScript</TabsTrigger>
        </TabsList>
        
        <TabsContent value="css" className="space-y-4">
          <div>
            <Label htmlFor="custom-css">Custom CSS</Label>
            <Textarea
              id="custom-css"
              placeholder="/* Tambahkan CSS custom di sini */
.my-custom-class {
  color: #ff0000;
  font-weight: bold;
}"
              value={css}
              onChange={(e) => setCSS(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="js" className="space-y-4">
          <div>
            <Label htmlFor="custom-js">Custom JavaScript</Label>
            <Textarea
              id="custom-js"
              placeholder="// Tambahkan JavaScript custom di sini
document.addEventListener('DOMContentLoaded', function() {
  console.log('Page loaded!');
  
  // Contoh: Smooth scroll untuk semua link
  document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});"
              value={js}
              onChange={(e) => setJS(e.target.value)}
              rows={10}
              className="font-mono text-sm"
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <Button onClick={handleSave} className="mt-4 w-full">
        <Save className="h-4 w-4 mr-2" />
        Simpan Custom Code
      </Button>
    </div>
  );
};

export default CustomCodeEditor;
