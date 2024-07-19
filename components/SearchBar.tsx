"use client";
import useDebounce from "@/hooks/useDebounce";
import useMovie from "@/hooks/useMovie";
import useOutsideClick from "@/hooks/useOutsideClick";
import { SearchIcon } from "@/icons";
import React, { useEffect, useState } from "react";
import SearchMovieList from "./SearchMovieList";

const SearchBar: React.FC = () => {
  const { getAllMovies } = useMovie();
  const { data: movies, isFetching } = getAllMovies;

  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<Array<any>>([]);

  const ref = useOutsideClick(() => setSearchOpen(false));

  const debouncedFilterMovies = useDebounce((value: string) => {
    if (movies && movies.results) {
      setFilteredMovies(
        movies.results.filter((movie: { title: string }) =>
          movie.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  }, 500);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedFilterMovies(value);
  };

  useEffect(() => {
    if (movies && movies.results) {
      setFilteredMovies(movies.results);
    }
  }, [movies]);

  return (
    <div className="relative">
      <button onClick={() => setSearchOpen((prev) => !prev)}>
        <SearchIcon className="stroke-white" />
      </button>
      {isSearchOpen && (
        <div
          ref={ref}
          className="sm:fixed absolute top-full  sm:left-1/2 -left-[10rem] p-4 bg-white shadow-lg"
        >
          <input
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search Movies"
          />
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <SearchMovieList movies={filteredMovies} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
