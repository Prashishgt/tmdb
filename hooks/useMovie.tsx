import { FetchMovies } from "@/axios";
import { useQuery } from "@tanstack/react-query";

const useMovie = () => {
  const getAllMovies = useQuery({
    queryFn: FetchMovies,
    queryKey: ["fetch-all-movies"],
  });

  return { getAllMovies };
};

export default useMovie;
