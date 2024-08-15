import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";

import StarRating from "./StarRating";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = "5199435";

function App() {
  const [query, SetQuery] = useState("");
  const [movies, SetMovies] = useState([]);
  const [moviewatched, SetmovieWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");
  const tempQuery = "interstellar";

  function handleseletedid(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handlesetback() {
    setSelectedId(null);
  }

  function handleAddmovie(movie) {
    SetmovieWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovie(id) {
    SetmovieWatched((moviewatched) =>
      moviewatched.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(
    function () {
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

      handlesetback();

      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search query={query} SetQuery={SetQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MoviesList movies={movies} handleseletedid={handleseletedid} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        {/* <Box
          element={
            <>
              <WatchedSummary moviewatched={moviewatched} />
              <WatchedList moviewatched={moviewatched} />
            </>
          }
        /> */}

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handlesetback={handlesetback}
              handleAddmovie={handleAddmovie}
              moviewatched={moviewatched}
            />
          ) : (
            <>
              <WatchedSummary moviewatched={moviewatched} />
              <WatchedList
                moviewatched={moviewatched}
                OnDelete={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function MovieDetails({
  selectedId,
  handlesetback,
  handleAddmovie,
  moviewatched,
}) {
  const [movie, setMovies] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  useEffect(
    function () {
      async function getSelectedmovie() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();
        setMovies(data);
        setIsLoading(false);
      }
      getSelectedmovie();
    },
    [selectedId]
  );

  const {
    Poster,
    Title,
    Released,
    Genre,
    imdbID,
    imdbRating,
    Runtime,
    Plot,
    Director,
    Actors,
  } = movie;

  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie | ${Title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [Title]
  );

  function handleAdd() {
    const newWatchedmovies = {
      imdbID: selectedId,
      Poster,
      Title,
      imdbRating: Number(imdbRating),
      runtime: Number(Runtime.split(" ").at(0)),
      Released,
      userRating,
    };

    handleAddmovie(newWatchedmovies);
    handlesetback();
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          handlesetback();
          console.log("closed");
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handlesetback]
  );

  const rated = moviewatched.map((movie) => movie.imdbID).includes(selectedId);

  const userrated = moviewatched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handlesetback}>
              &larr;
            </button>

            <img src={Poster} alt={`poster img ${imdbID}`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} Average Rating
              </p>
            </div>
          </header>

          <section>
            {!rated ? (
              <div className="rating">
                <StarRating
                  maxrating={10}
                  size={24}
                  key={imdbID}
                  onSetrating={setUserRating}
                />

                {userRating && (
                  <button className="btn-add" onClick={() => handleAdd()}>
                    + Add to List
                  </button>
                )}
              </div>
            ) : (
              <div className="rating">
                <p>You have rated the movie {userrated} ⭐️</p>
              </div>
            )}

            <p>
              <em>{Plot}</em>
            </p>
            <p>{Actors}</p>
            <p>{Director}</p>
            <button className="btn-add">Details</button>
          </section>
        </>
      )}
    </div>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}
function NumResult({ movies }) {
  return (
    <div className="num-results">
      Found <strong>{movies?.length}</strong> results
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ SetQuery, query }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      className="search"
      value={query}
      onChange={(e) => SetQuery(e.target.value)}
    />
  );
}

function Box({ children }) {
  const [isOp, SetOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => SetOpen((open) => !open)}>
        {!isOp ? "+" : "-"}
      </button>
      {isOp && children}
    </div>
  );
}

function MoviesList({ movies, handleseletedid }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleseletedid={handleseletedid}
        />
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MoviesWatched({ data, OnDelete }) {
  return (
    <li>
      <img src={data.Poster} />
      <h3>{data.Title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{data.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span> {data.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{data.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => OnDelete(data.imdbID)}>
          x
        </button>
      </div>
    </li>
  );
}

function Movie({ movie, handleseletedid }) {
  return (
    <li onClick={() => handleseletedid(movie.imdbID)}>
      <img src={movie.Poster} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ moviewatched }) {
  const avgImdbRating = average(
    moviewatched.map((movies) => movies.imdbRating)
  );
  const avguserRating = average(
    moviewatched.map((movies) => movies.userRating)
  );
  const avgruntime = average(moviewatched.map((movies) => movies.runtime));
  return (
    <div className="summary">
      <h2>movies you watched</h2>

      <div>
        <p>
          <span>#️⃣</span>
          <span> {moviewatched.length}</span>
        </p>
        <p>
          <span>⭐</span>
          <span> {avgImdbRating.toFixed(2)} </span>
        </p>
        <p>
          <span>🌟</span>
          <span> {avguserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span> {avgruntime.toFixed(2)}</span>min
        </p>
      </div>
    </div>
  );
}

function WatchedList({ moviewatched, OnDelete }) {
  return (
    <ul className="list">
      {moviewatched?.map((movies) => (
        <MoviesWatched data={movies} key={movies.imdbID} OnDelete={OnDelete} />
      ))}
    </ul>
  );
}
export default App;
