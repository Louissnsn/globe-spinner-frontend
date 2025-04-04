import { useState, useEffect } from "react";

const DEFAULT_OPTIONS = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const imageAPIoptions = {
  headers: {
    Authorization: "5t6cWcJQKyLgJsDtnmjZX8fLomdIIvsa46xUgeXPcL5AZMAK4r2GODOm",
  },
};

const imagesAPIprefix = "https://api.pexels.com/v1/search?query=";

export default function useFetchSequence({
  generateRouteURL,
  generateFilters,
  triggerFirstFetch,
}) {
  const [generatedTrips, setGeneratedTrips] = useState(null);
  const [isLoadingGenerate, setIsLoadingGenerate] = useState(false);
  const [errorGenerate, setErrorGenerate] = useState(null);

  const [place1, setPlace1] = useState(null);
  const [isLoadingPlace1, setIsLoadingPlace1] = useState(false);
  const [errorPlace1, setErrorPlace1] = useState(null);

  const [place2, setPlace2] = useState(null);
  const [isLoadingPlace2, setIsLoadingPlace2] = useState(false);
  const [errorPlace2, setErrorPlace2] = useState(null);

  // Function to fetch generated trips and their images
  useEffect(() => {
    const fetchGenerate = async () => {
      let place1URL, place2URL;
      let tripsValid = true;

      const requestController = new AbortController();

      // Setup filters for generating trips
      const filters = {
        lat: generateFilters.departureLocation[1],
        lon: generateFilters.departureLocation[0],
        budget: generateFilters.budget,
        nbrOfTravelers: generateFilters.nbrOfTravelers,
        departureDateOutbound: generateFilters.departureDate,
        departureDateInbound: generateFilters.returnDate,
        interval: 1,
        types: generateFilters.transportType,
      };

      const fetchGenerateRouteOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      };

      setGeneratedTrips(null);
      setIsLoadingGenerate(true);

      // Fetch generated trips
      await fetch(generateRouteURL, {
        ...fetchGenerateRouteOptions,
        signal: requestController.signal,
      })
        .then((response) => {
          if (!response.ok) {
            setErrorGenerate(response.statusText);
            tripsValid = false;
            return;
          }
          return response.json();
        })
        .then((data) => {
          if (!data.result) {
            tripsValid = false;
            setErrorGenerate(data.error);
            return;
          }
          setGeneratedTrips(data.trips);
          setIsLoadingGenerate(false);
          place1URL = `${imagesAPIprefix}${data.trips[0].destination.name}+aerial`;
          place2URL = `${imagesAPIprefix}${data.trips[1].destination.name}+aerial`;
        })
        .catch((error) => {
          setErrorGenerate(error);
          tripsValid = false;
        });

      if (!tripsValid) return;

      // Fetch images for the first place
      setPlace1(null);
      setIsLoadingPlace1(true);

      fetch(place1URL, {
        ...imageAPIoptions,
        signal: requestController.signal,
      })
        .then((response) => {
          if (!response.ok) {
            setErrorPlace1(response.statusText);
            return;
          }
          return response.json();
        })
        .then((data) => {
          setPlace1(data);
          setIsLoadingPlace1(false);
        })
        .catch((error) => {
          setErrorPlace1(error);
        });

      // Fetch images for the second place
      setPlace2(null);
      setIsLoadingPlace2(true);

      fetch(place2URL, {
        ...imageAPIoptions,
        signal: requestController.signal,
      })
        .then((response) => {
          if (!response.ok) {
            setErrorPlace2(response.statusText);
            return;
          }
          return response.json();
        })
        .then((data) => {
          setPlace2(data);
          setIsLoadingPlace2(false);
        })
        .catch((error) => {
          setErrorPlace2(error);
        });

      return () => requestController.abort();
    };

    fetchGenerate();
  }, [triggerFirstFetch]);

  return {
    generatedTrips,
    isLoadingGenerate,
    errorGenerate,
    place1,
    isLoadingPlace1,
    errorPlace1,
    place2,
    isLoadingPlace2,
    errorPlace2,
  };
}
