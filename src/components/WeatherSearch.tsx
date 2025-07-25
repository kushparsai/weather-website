import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WeatherSearchProps {
  onSearch: (location: string) => void;
  loading?: boolean;
}

export const WeatherSearch = ({ onSearch, loading = false }: WeatherSearchProps) => {
  const [location, setLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const popularCities = [
    "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", 
    "Hyderabad", "Pune", "Jaipur", "Lucknow", "Kanpur"
  ];

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Enter city name (e.g., Mumbai, Delhi)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 bg-card/50 backdrop-blur-sm border-white/30 focus:border-primary/50 focus:ring-primary/25"
            disabled={loading}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>
        <Button 
          type="submit" 
          disabled={!location.trim() || loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-weather"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Popular Indian Cities:</p>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <Button
              key={city}
              variant="outline"
              size="sm"
              onClick={() => onSearch(city)}
              disabled={loading}
              className="bg-card/30 backdrop-blur-sm border-white/30 hover:bg-primary/20 hover:border-primary/50 text-xs"
            >
              {city}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};