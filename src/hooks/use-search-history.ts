import { useState } from "react";
import { useLocalStorage } from "./use-local-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
u;
interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export const UseSearchHistory = () => {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "searchHistory",
    []
  );
  const historyQuery = useQuery({
    queryKey: ["searchHistory"],
    queryFn: () => history,
    initialData: history, // Keep the history fresh indefinitely
  });
  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItem, "id" | "SearchedAt">
    ) => {
      const newSearch: SearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };
      const filteredHistory = history.filter(
        (item) => item.lat !== search.lat || item.lon !== search.lon
      );
      const updatedHistory = [newSearch, ...filteredHistory].slice(0, 10); // Keep only the last 10 searches
      setHistory(updatedHistory);
    },
  });
};
