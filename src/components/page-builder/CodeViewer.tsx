
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CodeViewerProps {
  code: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Berhasil!",
      description: "Kode telah disalin ke clipboard.",
    });
  };

  return (
    <div className="relative h-full rounded-lg bg-[#1e1e1e]">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 text-gray-400 hover:bg-gray-700 hover:text-white"
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <SyntaxHighlighter
        language="jsx"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          backgroundColor: 'transparent',
          height: '100%',
          overflow: 'auto',
          fontSize: '14px',
        }}
        codeTagProps={{
          style: {
            fontFamily: '"Fira Code", "Fira Mono", monospace',
          },
        }}
        className="custom-scrollbar"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;
