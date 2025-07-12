
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from "@/components/ui/use-toast";

// Sample crop listings data
const cropListings = [
  {
    id: 1,
    crop: "Rice",
    quantity: "5 tonnes",
    price: "₹25,000 per tonne",
    location: "Nagpur, Maharashtra",
    farmer: "Rajesh Patel",
    postedDate: "2023-10-15",
    description: "Freshly harvested rice, high quality and ready for pickup.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23"
  },
  {
    id: 2,
    crop: "Wheat",
    quantity: "3 tonnes",
    price: "₹22,000 per tonne",
    location: "Pune, Maharashtra",
    farmer: "Amit Singh",
    postedDate: "2023-10-12",
    description: "Premium quality wheat grains. Can deliver within 50km radius.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d"
  },
  {
    id: 3,
    crop: "Cotton",
    quantity: "2 tonnes",
    price: "₹45,000 per tonne",
    location: "Ahmedabad, Gujarat",
    farmer: "Priya Desai",
    postedDate: "2023-10-10",
    description: "High quality cotton, grown organically without pesticides.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  },
  {
    id: 4,
    crop: "Corn",
    quantity: "4 tonnes",
    price: "₹18,000 per tonne",
    location: "Jaipur, Rajasthan",
    farmer: "Sunil Kumar",
    postedDate: "2023-10-08",
    description: "Sweet corn variety with excellent yield, grown with natural fertilizers.",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2"
  },
];

const FarmersMarket = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    message: '',
    phone: ''
  });
  const { toast } = useToast();

  const filteredListings = cropListings.filter(listing => 
    listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnect = (listing: any) => {
    setSelectedListing(listing);
    setShowDialog(true);
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDialog(false);
    
    toast({
      title: "Connection request sent!",
      description: `Your message has been sent to ${selectedListing?.farmer}. They will contact you soon.`,
    });
    
    setContactFormData({
      message: '',
      phone: ''
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Farmer's Market
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Connect directly with farmers to purchase crops with no intermediaries
            </p>
          </div>

          <Tabs defaultValue="browse" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="browse">Browse Listings</TabsTrigger>
              <TabsTrigger value="create">Create Listing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="browse">
              <Card>
                <CardHeader>
                  <CardTitle>Available Crop Listings</CardTitle>
                  <CardDescription>
                    Browse and connect with farmers to purchase crops directly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input 
                        placeholder="Search by crop or location..." 
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="w-full md:w-48">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by crop" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Crops</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="wheat">Wheat</SelectItem>
                          <SelectItem value="cotton">Cotton</SelectItem>
                          <SelectItem value="corn">Corn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {filteredListings.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500">No listings found. Try adjusting your search.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredListings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                          <div className="h-40 overflow-hidden">
                            <img
                              src={listing.image}
                              alt={listing.crop}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-lg">{listing.crop}</h3>
                                <Badge variant="outline" className="mt-1">{listing.quantity}</Badge>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-farmer-green">{listing.price}</p>
                              </div>
                            </div>
                            
                            <div className="mt-2 text-sm text-gray-600">
                              {listing.description}
                            </div>
                            
                            <div className="mt-3 flex items-center text-sm text-gray-500">
                              <MapPin size={16} className="mr-1" />
                              <span>{listing.location}</span>
                            </div>
                            
                            <div className="mt-1 flex justify-between items-center text-sm">
                              <div className="text-gray-500">
                                <Calendar size={16} className="inline mr-1" />
                                <span>{new Date(listing.postedDate).toLocaleDateString()}</span>
                              </div>
                              <div>
                                <span className="text-gray-700">by {listing.farmer}</span>
                              </div>
                            </div>
                            
                            <Button 
                              className="w-full mt-3"
                              onClick={() => handleConnect(listing)}
                            >
                              <MessageSquare size={16} className="mr-2" />
                              Connect with Farmer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Listing</CardTitle>
                  <CardDescription>
                    List your crops to sell directly to wholesalers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="crop-name">Crop Name</Label>
                        <Input id="crop-name" placeholder="e.g. Rice, Wheat, Cotton" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Quantity Available</Label>
                        <div className="flex">
                          <Input id="quantity" type="number" className="rounded-r-none" placeholder="Amount" />
                          <Select defaultValue="tonnes">
                            <SelectTrigger className="w-[120px] rounded-l-none border-l-0">
                              <SelectValue placeholder="Unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tonnes">Tonnes</SelectItem>
                              <SelectItem value="kg">Kilograms</SelectItem>
                              <SelectItem value="quintals">Quintals</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (per unit)</Label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">₹</span>
                          <Input id="price" type="number" className="rounded-l-none" placeholder="e.g. 25000" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="City, State" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <textarea 
                        id="description" 
                        className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Describe your crop quality, cultivation method, delivery options, etc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="crop-image">Upload Crop Image</Label>
                      <Input id="crop-image" type="file" accept="image/*" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Number</Label>
                      <Input id="contact" type="tel" placeholder="Your WhatsApp number" />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="mr-2">
                    Cancel
                  </Button>
                  <Button>
                    Create Listing
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with {selectedListing?.farmer}</DialogTitle>
            <DialogDescription>
              Send a message to express your interest in buying {selectedListing?.crop}.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmitContact} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <textarea 
                id="contact-message"
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Introduce yourself and explain your interest in the crop"
                value={contactFormData.message}
                onChange={(e) => setContactFormData({...contactFormData, message: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Your WhatsApp Number</Label>
              <Input 
                id="contact-phone" 
                type="tel" 
                placeholder="Include country code, e.g. +91" 
                value={contactFormData.phone}
                onChange={(e) => setContactFormData({...contactFormData, phone: e.target.value})}
                required
              />
            </div>
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Send Connection Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default FarmersMarket;
