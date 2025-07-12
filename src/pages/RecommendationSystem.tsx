
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const RecommendationSystem = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null | any>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image of your soil.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock response data
      const mockResults = {
        soilType: "Clay",
        suitableCrops: [
          { name: "Rice", profitability: "High", yield: "3.5 tons/acre" },
          { name: "Wheat", profitability: "Medium", yield: "2.8 tons/acre" },
          { name: "Corn", profitability: "Medium-High", yield: "4.2 tons/acre" }
        ],
        recommendation: "Based on your soil analysis, Rice would be the most profitable crop with an estimated yield of 3.5 tons/acre."
      };

      setResults(mockResults);
      setIsLoading(false);
      toast({
        title: "Analysis Complete",
        description: "We've analyzed your soil sample.",
      });
    }, 2000);
  };

  const resetForm = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResults(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Crop Recommendation System
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Upload an image of your soil to receive AI-powered crop recommendations
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="image" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">Soil Image Upload</TabsTrigger>
                <TabsTrigger value="manual">Manual Parameters</TabsTrigger>
              </TabsList>
              
              <TabsContent value="image">
                <Card>
                  <CardHeader>
                    <CardTitle>Upload Soil Image</CardTitle>
                    <CardDescription>
                      Our AI will analyze your soil image and recommend the best crops to plant.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="soil-image">Soil Image</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="soil-image"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              {imagePreview ? (
                                <img 
                                  src={imagePreview} 
                                  alt="Soil preview" 
                                  className="max-h-44 object-contain mb-4" 
                                />
                              ) : (
                                <>
                                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                                  <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    PNG, JPG or JPEG (MAX. 5MB)
                                  </p>
                                </>
                              )}
                            </div>
                            <Input
                              id="soil-image"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                        {imagePreview && (
                          <p className="text-sm text-gray-500 mt-2">
                            {selectedFile?.name}
                          </p>
                        )}
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          For best results, ensure the soil image is clear, well-lit, and taken directly above the soil.
                        </AlertDescription>
                      </Alert>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={resetForm} disabled={isLoading || !selectedFile}>
                      Reset
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading || !selectedFile}>
                      {isLoading ? "Analyzing..." : "Analyze Soil"}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="manual">
                <Card>
                  <CardHeader>
                    <CardTitle>Enter Soil Parameters</CardTitle>
                    <CardDescription>
                      Provide soil characteristics manually if you already know them.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                          <Input id="nitrogen" type="number" placeholder="e.g. 40" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                          <Input id="phosphorus" type="number" placeholder="e.g. 30" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="potassium">Potassium (K)</Label>
                          <Input id="potassium" type="number" placeholder="e.g. 35" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="ph">pH Level</Label>
                          <Input id="ph" type="number" step="0.1" placeholder="e.g. 6.5" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Enter your location" />
                      </div>

                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Note</AlertTitle>
                        <AlertDescription>
                          More precise parameters will result in more accurate recommendations.
                        </AlertDescription>
                      </Alert>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Reset</Button>
                    <Button>Get Recommendations</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Results Section */}
            {results && (
              <div className="mt-8 animate-fade-in">
                <Card className="border-farmer-green-light border-2">
                  <CardHeader>
                    <CardTitle className="text-farmer-green">Soil Analysis Results</CardTitle>
                    <CardDescription>
                      Based on our analysis, here are our recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-700">Soil Type</h4>
                        <p>{results.soilType}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700">Suitable Crops</h4>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {results.suitableCrops.map((crop: any, index: number) => (
                            <div key={index} className="bg-white rounded-md shadow-sm p-4 border border-gray-200">
                              <div className="font-medium">{crop.name}</div>
                              <div className="text-sm text-gray-500">
                                Profitability: {crop.profitability}<br />
                                Est. Yield: {crop.yield}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700">Recommendation</h4>
                        <p className="text-gray-700">{results.recommendation}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button variant="outline" className="mr-2">
                      Save Results
                    </Button>
                    <Button>
                      List on Market
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecommendationSystem;
