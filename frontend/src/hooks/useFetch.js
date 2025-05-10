import { useEffect, useState } from "react";

export const useFetch = (url, enabled=true) => {
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

    if (!url || !enabled) return;
    getData();
  }, [url]);

  return { data, isLoading, error }
}
