import { useFavorites } from "@/hooks/use-favourite";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { Button } from "./ui/button";
import { X } from "lucide-react";
interface FavouriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}
const FavouriteCities = () => {
  const { favourite, removeFavorite } = useFavorites();
  if (!favourite || favourite.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favourites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {favourite.map((city: FavouriteCityTabletProps) => (
            <FavouriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </>
  );
};
function FavouriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavouriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  return (
    <>
      <div
        onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role="button"
        tabIndex={0}
        className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all ho hover:shadow-md "
      >
        <Button>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
export default FavouriteCities;
