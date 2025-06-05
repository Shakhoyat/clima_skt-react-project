import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Loader2, Search } from "lucide-react";
import { useSearchLocationsQuery } from "@/hooks/use-weather";
import { CommandSeparator } from "cmdk";
import { useNavigate } from "react-router-dom";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { data: locations, isLoading } = useSearchLocationsQuery(query);
  const navigate = useNavigate();

  const handleSelectedLocation = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    //add to search history
    navigate(`/city/${name}??lat=${lat}&lon=${lon}`);
    setOpen(false);
  };
  //   console.log(locations);
  return (
    <>
      <Button
        variant="outline"
        value={query}
        className="w-full relative justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No City found.</CommandEmpty>
          )}
          <CommandGroup heading="Favourites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Recent Searchrs">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandSeparator />
          {locations && locations.length > 0 && (
            <CommandGroup heading="Suggesations">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat},${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelectedLocation}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    <span> {location.name}</span>
                    {location.state && (
                      <span className="text-sm text-muted-foreground">
                        , {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          {}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
