import React from "react";
import { useNavigate } from "react-router-dom";
import { useGithub } from "../context/GithubProvider"; // <-- adjust the path if needed

const Favorites = () => {
  const { favorites, removeFavorite } = useGithub();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0E14] px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Favorite Developers</h1>
            <p className="mt-2 text-gray-400">Your saved GitHub profiles.</p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500"
          >
            Back to Search
          </button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex h-[60vh] flex-col items-center justify-center">
            <h2 className="text-3xl font-bold text-gray-300">
              No Favorites Yet
            </h2>

            <p className="mt-3 text-gray-500">
              Search a GitHub user and add them to your favorites.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((fav) => (
              <div
                key={fav.id}
                className="rounded-2xl bg-white/[0.04] p-6 transition hover:ring-2 hover:ring-indigo-500"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={fav.avatar_url}
                    alt={fav.login}
                    className="h-20 w-20 rounded-full border-2 border-indigo-500"
                  />

                  <div>
                    <h2 className="text-xl font-bold">
                      {fav.name || fav.login}
                    </h2>

                    <p className="text-gray-400">@{fav.login}</p>
                  </div>
                </div>

                <div className="mt-5 flex justify-between text-sm text-gray-400">
                  <span>{fav.followers} Followers</span>
                  <span>{fav.public_repos} Repositories</span>
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-300">
                  {fav.bio || "No bio available."}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <a
                    href={fav.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold transition hover:bg-indigo-500"
                  >
                    View Profile
                  </a>

                  <button
                    onClick={() => removeFavorite(fav.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
