"use client";
import React from "react";
import Carousel from "./Carousel";
import useMovie from "@/hooks/useMovie";

const Hero = () => {
  const { getAllMovies } = useMovie();
  const { data, isFetching } = getAllMovies;

  if (isFetching) return <p>Loading..</p>;
  return (
    <div>
      <Carousel items={data?.results} />
    </div>
  );
};

export default Hero;
