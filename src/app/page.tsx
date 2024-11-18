"use client";

import { useEffect, useRef } from "react";
import { useStarWarsContext } from "./context/StarWarsContext";
import SearchBar from "./components/SearchBar";
import EntityList from "./components/EntityList";
import Header from "./components/Header";
import Loader from "./components/Loader";

const HomePage = () => {
  const { loading, error, nextPage, loadMoreResults } = useStarWarsContext();

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextPage) {
          loadMoreResults();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [nextPage, loadMoreResults]);

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="title">Star Wars Explorer</h1>

        <SearchBar />

        {error && <p className="error">{error}</p>}

        <EntityList />

        {loading && <Loader />}

        <div ref={observerRef}></div>
      </div>
    </>
  );
};

export default HomePage;
