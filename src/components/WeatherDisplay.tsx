import { Cloud, Sun, CloudRain, Snowflake, Wind, Droplets, Eye, Thermometer } from "lucide-react";
import { Card } from "@/components/ui/card";

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

const getWeatherIcon = (condition: string) => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
    return <Sun className="h-16 w-16 text-weather-sunny" />;
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return <CloudRain className="h-16 w-16 text-weather-rainy" />;
  } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return <Snowflake className="h-16 w-16 text-weather-cold" />;
  } else {
    return <Cloud className="h-16 w-16 text-weather-cloudy" />;
  }
};

const getAQILevel = (pm25: number) => {
  if (pm25 <= 12) return { level: "Good", color: "text-green-600", bg: "bg-green-100" };
  if (pm25 <= 35) return { level: "Moderate", color: "text-yellow-600", bg: "bg-yellow-100" };
  if (pm25 <= 55) return { level: "Unhealthy for Sensitive", color: "text-orange-600", bg: "bg-orange-100" };
  if (pm25 <= 150) return { level: "Unhealthy", color: "text-red-600", bg: "bg-red-100" };
  return { level: "Hazardous", color: "text-purple-600", bg: "bg-purple-100" };
};

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay = ({ weather }: WeatherDisplayProps) => {
  const aqi = getAQILevel(weather.current.air_quality.pm2_5);
  const localTime = new Date(weather.location.localtime).toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Main Weather Card */}
      <Card className="bg-gradient-card backdrop-blur-md border-white/30 shadow-weather p-6">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              {weather.location.name}, {weather.location.region}
            </h1>
            <p className="text-muted-foreground">{localTime}</p>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            {getWeatherIcon(weather.current.condition.text)}
            <div className="text-left">
              <div className="text-6xl font-bold text-primary">
                {Math.round(weather.current.temp_c)}°C
              </div>
              <div className="text-xl text-muted-foreground">
                {weather.current.condition.text}
              </div>
              <div className="text-sm text-muted-foreground">
                Feels like {Math.round(weather.current.feelslike_c)}°C
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card backdrop-blur-md border-white/30 shadow-card p-4">
          <div className="flex items-center gap-3">
            <Droplets className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-xl font-semibold">{weather.current.humidity}%</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-md border-white/30 shadow-card p-4">
          <div className="flex items-center gap-3">
            <Wind className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="text-xl font-semibold">{weather.current.wind_kph} km/h</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-md border-white/30 shadow-card p-4">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Visibility</p>
              <p className="text-xl font-semibold">{weather.current.vis_km} km</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-card backdrop-blur-md border-white/30 shadow-card p-4">
          <div className="flex items-center gap-3">
            <Thermometer className="h-8 w-8 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="text-xl font-semibold">{Math.round(weather.current.feelslike_c)}°C</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Air Quality Card */}
      <Card className="bg-gradient-card backdrop-blur-md border-white/30 shadow-card p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Air Quality Index</h3>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${aqi.bg} ${aqi.color}`}>
              {aqi.level}
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">PM2.5</p>
              <p className="text-lg font-semibold">{weather.current.air_quality.pm2_5}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">PM10</p>
              <p className="text-lg font-semibold">{weather.current.air_quality.pm10}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">O₃</p>
              <p className="text-lg font-semibold">{weather.current.air_quality.o3}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">NO₂</p>
              <p className="text-lg font-semibold">{weather.current.air_quality.no2}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">SO₂</p>
              <p className="text-lg font-semibold">{weather.current.air_quality.so2}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};