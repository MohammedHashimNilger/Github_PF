import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

export const GithubContext = createContext();

export const useGithub = () => {
  return useContext(GithubContext);
};

export const GithubProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setRepos([]);
    setUser(null);
    if (username.trim() === "") {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);

    try {
      const [response, repoResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos`),
      ]);

      if (!response.ok || !repoResponse.ok) {
        setError("User not found.");
        return;
      }

      const data = await response.json();
      console.log(data);

      const repoData = await repoResponse.json();
      console.log(repoData);

      setUser(data);
      setRepos(repoData);
      setSearch("");
      setUsername("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFav = () => {
    if (!user) return;

    const favoriteUser = {
      id: user.id,
      login: user.login,
      name: user.name,
      avatar_url: user.avatar_url,
      bio: user.bio,
      html_url: user.html_url,
      followers: user.followers,
      public_repos: user.public_repos,
    };

    if (favorites.some((fav) => fav.id === user.id)) {
      return;
    }

    const updatedFavorites = [...favorites, favoriteUser];

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);

    setFavorites(updatedFavorites);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(storedFavorites); // ✅ Correct
  }, []);

  return (
    <GithubContext.Provider
      value={{
        username,
        setUsername,
        loading,
        user,
        setUser,
        repos,
        error,
        search,
        setSearch,
        handleFav,
        handleSearch,
        favorites,
        setFavorites,
        handleSearch,
        handleFav,
        removeFavorite,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
