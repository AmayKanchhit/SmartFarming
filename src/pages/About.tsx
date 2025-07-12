
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About FarmerLink
            </h1>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Supporting small landholding farmers with technology to improve profitability and maximize harvest output
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-farmer-green mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  FarmerLink aims to empower small-scale farmers by providing them with cutting-edge technology 
                  and a direct marketplace to maximize their profits and improve their livelihoods.
                </p>
                
                <p className="text-gray-700">
                  By combining advanced soil analysis through Convolutional Neural Networks with a platform 
                  that eliminates intermediaries, we're helping farmers retain more of their earnings while 
                  increasing their crop yields through data-driven recommendations.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Technology</h2>
                <p className="text-gray-700 mb-4">
                  Our research demonstrates that Convolutional Neural Networks with symmetric architectures excel 
                  in soil classification, achieving an impressive precision of 95.21%. 
                </p>
                <p className="text-gray-700">
                  Additionally, our Random Forest Algorithm performs effectively in yield prediction, with an 
                  accuracy of 75%, helping farmers make informed decisions about crop selection and management.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h2>
                <img 
                  src="/lovable-uploads/c8fefd7f-0268-425e-918a-7c0aacb0e92a.png" 
                  alt="System Flow Diagram" 
                  className="w-full border rounded-lg shadow-sm"
                />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Process</h2>
              
              <ol className="relative border-l border-gray-200 ml-3">
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-farmer-green rounded-full -left-4 ring-4 ring-white">
                    <span className="text-white font-bold">1</span>
                  </span>
                  <h3 className="font-medium leading-tight text-gray-900">Soil Image Analysis</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Farmers upload images of their soil which our CNN model analyzes to determine soil type and quality.
                  </p>
                </li>
                
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-farmer-green rounded-full -left-4 ring-4 ring-white">
                    <span className="text-white font-bold">2</span>
                  </span>
                  <h3 className="font-medium leading-tight text-gray-900">Crop Recommendation</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Based on soil analysis, season, and location, we recommend crops with the highest potential yield and market value.
                  </p>
                </li>
                
                <li className="mb-10 ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-farmer-green rounded-full -left-4 ring-4 ring-white">
                    <span className="text-white font-bold">3</span>
                  </span>
                  <h3 className="font-medium leading-tight text-gray-900">Yield Prediction</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Our Random Forest algorithm predicts expected yield based on multiple factors, helping farmers plan better.
                  </p>
                </li>
                
                <li className="ml-6">
                  <span className="absolute flex items-center justify-center w-8 h-8 bg-farmer-green rounded-full -left-4 ring-4 ring-white">
                    <span className="text-white font-bold">4</span>
                  </span>
                  <h3 className="font-medium leading-tight text-gray-900">Direct Market Connection</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Farmers list their crops on our marketplace, connecting directly with wholesalers to maximize profits.
                  </p>
                </li>
              </ol>
            </div>

            <div className="bg-farmer-green text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join FarmerLink Today</h2>
              <p className="mb-6">
                Whether you're a farmer looking to maximize your yield and profits or a wholesaler seeking 
                quality crops directly from producers, FarmerLink is here to help.
              </p>
              <div className="flex justify-center gap-4">
                <a href="#" className="bg-white text-farmer-green px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
                  Register as Farmer
                </a>
                <a href="#" className="bg-farmer-green border border-white px-6 py-2 rounded-md font-medium hover:bg-farmer-green-dark transition-colors">
                  Register as Wholesaler
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
