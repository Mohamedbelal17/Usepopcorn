import { useEffect, useState } from "react";
const KEY = "5199435";

export function useMovies(query, callback) {
  const [movies, SetMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fatching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not Found");
          SetMovies(data.Search);
          // console.log(data.Search);
          setError("");
        } catch (err) {
          if (err.message !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        SetMovies([]);
        setError("");
        return;
      }

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { isLoading, error, movies };
}
