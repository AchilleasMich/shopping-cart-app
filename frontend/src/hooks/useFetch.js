import { useEffect, useState } from "react";

// doNotRun a hacky way to avoid breaking rules of hooks
export const useFetch = (url, doNotRun = false) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const resp = await fetch(url);
        const json = await resp.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        console.error(error)
        setError("Failed to get data");
        setIsLoading(false);
      } finally {
        setIsLoading(false)
      }
    }

    if (!url || doNotRun) return;
    getData();
  }, [url]);

  return { data, isLoading, error }
}
