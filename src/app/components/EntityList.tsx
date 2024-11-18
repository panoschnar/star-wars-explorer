import { useStarWarsContext } from "../context/StarWarsContext";
import { useEffect } from "react";

const EntityList = () => {
  const { results, toggleFavorite, favorites } = useStarWarsContext();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const hoverBg = card.querySelector(".hover-background") as HTMLElement;

      if (!hoverBg) return;

      const xPercentage =
        ((e.pageX - card.offsetLeft) / card.offsetWidth) * 100;
      const yPercentage =
        ((e.pageY - card.offsetTop) / card.offsetHeight) * 100;

      const xOffset = ((hoverBg.offsetWidth / card.offsetWidth) * 100) / 2;
      const yOffset = ((hoverBg.offsetHeight / card.offsetHeight) * 100) / 2;

      hoverBg.style.left = `calc(${xPercentage}% - ${xOffset}%)`;
      hoverBg.style.top = `calc(${yPercentage}% - ${yOffset}%)`;
    };

    const cards = document.querySelectorAll<HTMLElement>(".result-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleMouseMove);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleMouseMove);
      });
    };
  }, [results]);

  return (
    <div className="results">
      {results.map((result, index) => (
        <div key={index} className="result-card">
          <div className="result-card-content">
            <div className="info-box">
              <a
                href={`/${result.type}/${
                  result.url.split("/").slice(-2, -1)[0]
                }`}
              >
                <h3>{result.name}</h3>
                <p>Type: {result.type}</p>
              </a>
              <button
                onClick={() => toggleFavorite(result)}
                className="favorite-button"
              >
                {favorites.some((fav) => fav.url === result.url) ? "♥" : "♡"}
              </button>
            </div>
          </div>
          <div className="hover-background"></div>
        </div>
      ))}
    </div>
  );
};

export default EntityList;
