import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { ArrowLeft, Save, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

// API URL - change this to your actual API URL in production
const API_URL = 'http://localhost:5000/api/portfolio';

// This page will only be available in development mode or with authentication in production
const DataEditor = () => {
  const { data, loading } = usePortfolio();
  const [portfolioData, setPortfolioData] = useState<string>('');
  const [activeTab, setActiveTab] = useState('json');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      setPortfolioData(JSON.stringify(data, null, 2));
    }
  }, [data, loading]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      // Validate JSON
      const parsedData = JSON.parse(portfolioData);
      
      // In development, we'll just download the file
      // In production, you would send it to your API
      if (process.env.NODE_ENV === 'development') {
        // Download the updated JSON file
        const blob = new Blob([portfolioData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'portfolio-data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Changes saved",
          description: "Your portfolio data has been downloaded as a file.",
        });
      } else {
        // Send to API
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedData),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to save portfolio data: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        toast({
          title: "Changes saved",
          description: result.message || "Your portfolio data has been updated.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error saving changes",
        description: error instanceof Error ? error.message : "Invalid JSON format",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        // Validate JSON
        JSON.parse(content);
        setPortfolioData(content);
        toast({
          title: "File loaded",
          description: "Portfolio data has been loaded from file.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading file",
          description: "The file does not contain valid JSON data.",
        });
      }
    };
    reader.readAsText(file);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Portfolio Data Editor</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Import
            <input
              id="file-upload"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>
          <Button variant="outline" onClick={() => handleSave()}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => handleSave()} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Portfolio Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="json">JSON Editor</TabsTrigger>
              <TabsTrigger value="guide">Guide</TabsTrigger>
            </TabsList>
            
            <TabsContent value="json">
              <Textarea
                className="font-mono h-[70vh]"
                value={portfolioData}
                onChange={(e) => setPortfolioData(e.target.value)}
              />
            </TabsContent>
            
            <TabsContent value="guide">
              <div className="prose dark:prose-invert max-w-none">
                <h2>How to Edit Your Portfolio Data</h2>
                <p>
                  The JSON editor allows you to modify all the content of your portfolio.
                  Here's a quick guide on the structure:
                </p>
                
                <h3>JSON Structure</h3>
                <ul>
                  <li>
                    <strong>hero</strong>: Main section content including your name, title, and social links
                  </li>
                  <li>
                    <strong>about</strong>: Your bio information and skills summary
                  </li>
                  <li>
                    <strong>skills</strong>: Detailed breakdown of your technical skills and expertise
                  </li>
                  <li>
                    <strong>experience</strong>: Your work history and achievements
                  </li>
                  <li>
                    <strong>projects</strong>: Portfolio projects with descriptions and links
                  </li>
                  <li>
                    <strong>contact</strong>: Contact information and form settings
                  </li>
                </ul>
                
                <h3>Tips for Editing</h3>
                <ul>
                  <li>Maintain proper JSON formatting (quotes, commas, brackets)</li>
                  <li>Save frequently and test your changes</li>
                  <li>Export your data as a backup before making major changes</li>
                </ul>
                
                <h3>Deployment Notes</h3>
                <p>
                  In development mode, changes will be exported as a file that you can manually place in your project.
                  In production, changes will be saved via API calls to your server, which will update the data file.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataEditor; 