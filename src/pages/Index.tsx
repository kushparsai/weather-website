import { useState } from "react";
import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { toast } from "@/hooks/use-toast";

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    vis_km: number;
    feelslike_c: number;
    air_quality: {
      pm2_5: number;
      pm10: number;
      o3: number;
      no2: number;
      so2: number;
    };
  };
}

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=e92139cada854d259ed153131252207&q=${encodeURIComponent(location)}&aqi=yes`
      );
      
      if (!response.ok) {
        throw new Error("Weather data not found");
      }
      
      const data = await response.json();
      setWeather(data);
      toast({
        title: "Weather Updated",
        description: `Weather information for ${data.location.name} loaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              India's Weather
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get real-time weather information for any city in India. Check temperature, 
              humidity, wind speed, and air quality index.
            </p>
          </div>

       
          <WeatherSearch onSearch={fetchWeather} loading={loading} />

          
          {weather && <WeatherDisplay weather={weather} />}

          
          {!weather && !loading && (
            <div className="text-center py-16">
              <div className="bg-gradient-card backdrop-blur-md border-white/30 shadow-card rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Start by searching for a city</h3>
                <p className="text-muted-foreground">
                  Enter any Indian city name or choose from the popular cities above to get started.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
