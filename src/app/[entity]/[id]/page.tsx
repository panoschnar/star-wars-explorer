"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchEntityDetails } from "../../utils/apiHelper";
import "./entityDetails.css";
import { backIcon } from "../../../../public/img/icons";
import Loader from "@/app/components/Loader";
import Button from "@/app/components/Button";

const EntityDetailsPage = () => {
  const { entity, id }: any = useParams();
  const [entityDetails, setEntityDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntityDetails(entity, id);
        setEntityDetails(data);
      } catch (err) {
        setError("Failed to load details.");
      }
    };

    fetchData();
  }, [entity, id]);

  const navigateBack = () => {
    router.back();
  };

  if (error) return <p>{error}</p>;
  if (!entityDetails) return <Loader />;

  return (
    <div className="entityContainer">
      <Button type="link" icon={backIcon} label="Back" onClick={navigateBack} />
      <div className="entityCard">
        <h1>{entityDetails.name || "Unknown Entity"}</h1>

        <div className="infoSection">
          <h2>Details</h2>
          <ul>
            <li>
              <strong>Type:</strong> {entity}
            </li>

            {entity === "people" && (
              <>
                <li>
                  <strong>Height:</strong> {entityDetails.height || "Unknown"}
                </li>
                <li>
                  <strong>Mass:</strong> {entityDetails.mass || "Unknown"}
                </li>
                <li>
                  <strong>Birth Year:</strong>{" "}
                  {entityDetails.birth_year || "Unknown"}
                </li>
                <li>
                  <strong>Gender:</strong> {entityDetails.gender || "Unknown"}
                </li>
              </>
            )}

            {entity === "planets" && (
              <>
                <li>
                  <strong>Population:</strong>{" "}
                  {entityDetails.population || "Unknown"}
                </li>
                <li>
                  <strong>Climate:</strong> {entityDetails.climate || "Unknown"}
                </li>
                <li>
                  <strong>Terrain:</strong> {entityDetails.terrain || "Unknown"}
                </li>
              </>
            )}

            {entity === "starships" && (
              <>
                <li>
                  <strong>Model:</strong> {entityDetails.model || "Unknown"}
                </li>
                <li>
                  <strong>Manufacturer:</strong>{" "}
                  {entityDetails.manufacturer || "Unknown"}
                </li>
                <li>
                  <strong>Class:</strong>{" "}
                  {entityDetails.starship_class || "Unknown"}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EntityDetailsPage;
