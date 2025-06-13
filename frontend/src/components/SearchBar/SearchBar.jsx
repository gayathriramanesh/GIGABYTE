import { useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const response = await axios.get("http://0.0.0.0:8000/products/filter", {
        params: { name: searchText },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setResults(response.data);
    } catch (error) {
      alert("Search failed: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">
        <input
          className="searchbox"
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="search-button" onClick={handleClick}>
          <SearchIcon />
        </button>
      </div>

      {results.length > 0 && (
        <div className="search-results-dropdown">
          {results.map((product) => (
            <div
              key={product.id}
              className="search-result-item"
              onClick={() => navigate(`/product/${product.pid}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={product.image_url}
                alt={product.product_name}
                className="product-image"
              />
              <span className="product-name">{product.product_name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SearchBar };
