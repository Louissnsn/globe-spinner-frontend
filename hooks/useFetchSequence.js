import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const DEFAULT_OPTIONS = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

// To manage several fetches where the URL of the next fetch
// depends on the progress info (including data) of all the fetches until now

export default function useFetchSequence({
  firstURL,
  triggerFirstFetch,
  requestsSequence,
}) {
  const [nextURL, setNextURL] = useState(firstURL);
  const [requestIndex, setRequestIndex] = useState(0);

  const n = requestsSequence.length;
  const isScreenFocused = useIsFocused();
  const [requestsProgress, setRequestsProgress] = useState(
    Array(n).fill({
      data: null,
      error: null,
      isLoading: false,
    })
  );

  // Function to update the requestsProgress array
  const updatedRequests = (prevRequests, keyValuePairs) => {
    const requestsCopy = [...prevRequests];
    requestsCopy[requestIndex] = {
      ...requestsCopy[requestIndex],
      ...keyValuePairs,
    };
    return requestsCopy;
  };

  useEffect(() => {
    const request = requestsSequence[requestIndex];
    const { options = DEFAULT_OPTIONS, getNextURL } = request;

    const requestController = new AbortController();

    if (!isScreenFocused) return;

    // Set the current request to loading state
    setRequestsProgress((prev) =>
      updatedRequests(prev, { error: null, isLoading: true })
    );

    console.log("nextURL: ", nextURL);

    // Fetch data from the next URL
    fetch(nextURL, { ...options, signal: requestController.signal })
      .then((response) => {
        if (!response.ok) {
          setRequestsProgress((prev) =>
            updatedRequests(prev, {
              error: response.statusText,
              isLoading: false,
            })
          );
          return;
        }
        return response.json();
      })
      .then((data) => {
        // Update the progress and set the next URL
        const updatedProgress = updatedRequests(requestsProgress, {
          data: data,
          isLoading: false,
        });
        setNextURL(getNextURL(updatedProgress));
        setRequestsProgress(updatedProgress);
        setRequestIndex((prev) => prev + 1);
      })
      .catch((error) => {
        setRequestsProgress((prev) =>
          updatedRequests(prev, { error: error.message, isLoading: false })
        );
      });

    // Cleanup function to abort fetch on component unmount
    return () => requestController.abort();
  }, [
    triggerFirstFetch,
    isScreenFocused,
    nextURL,
    requestsSequence,
    requestIndex,
  ]);

  return requestsProgress;
}
