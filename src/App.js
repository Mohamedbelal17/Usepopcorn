import { useState } from "react";

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

function App() {
  const [movies, SetMovies] = useState(tempMovieData);
  const [moviewatched, SetmovieWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Search />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MoviesList movies={movies} />
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
          <WatchedSummary moviewatched={moviewatched} />
          <WatchedList moviewatched={moviewatched} />
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
function NumResult({ movies }) {
  return (
    <div className="num-results">
      Found <strong>{movies.length}</strong> results
    </div>
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

function Search() {
  const [query, SetQuery] = useState("");

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

function MoviesList({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MoviesWatched({ data }) {
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
          <span>{data.runtime}</span>
        </p>
      </div>
    </li>
  );
}

function Movie({ movie }) {
  return (
    <li>
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
          <span> {avgImdbRating} </span>
        </p>
        <p>
          <span>🌟</span>
          <span> {avguserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span> {avgruntime}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ moviewatched }) {
  return (
    <ul className="list">
      {moviewatched?.map((movies) => (
        <MoviesWatched data={movies} key={movies.imdbID} />
      ))}
    </ul>
  );
}
export default App;
