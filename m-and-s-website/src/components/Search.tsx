import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

interface Item {
  key: string;
  price: number;
  category: string;
}

const SearchResults: React.FC = () => {
  const [results, setResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://inventory.mandsorganics-delmarvamediterraneanmarket.com/api/search?query=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setError("Failed to load search results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchResults();
    }
  }, [searchQuery]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Search Results for "{searchQuery}"</h2>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.key}>
              <Link
                to={`/category/${encodeURIComponent(
                  item.category
                )}/${encodeURIComponent(item.key)}`}
              >
                {item.key} - {item.category} - ${item.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
