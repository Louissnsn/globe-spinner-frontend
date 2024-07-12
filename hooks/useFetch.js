import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const DEFAULT_OPTIONS = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export default function useFetch({
  URL,
  options = DEFAULT_OPTIONS,
  triggerFetch,
}) {
  const isScreenFocused = useIsFocused();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestController = new AbortController();
    if (!isScreenFocused) return;

    // Reset error and set loading state
    setError(null);
    setIsLoading(true);

    // Fetch data from the provided URL
    fetch(URL, { ...options, signal: requestController.signal })
      .then((response) => {
        // Handle response errors
        if (!response.ok) {
          setError(response.statusText);
          setIsLoading(false);
          return null;
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setData(data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        // Handle fetch errors
        setError(error);
        setIsLoading(false);
      });

    // Cleanup function to abort fetch on component unmount
    return () => requestController.abort();
  }, [triggerFetch, isScreenFocused, URL, options]);

  return { isLoading, data, error };
}
