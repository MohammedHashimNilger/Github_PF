import React from "react";

const Favorites = () => {
  return (
    <div className="min-h-screen bg-[#0A0E14] text-white px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">❤️ Favorite Developers</h1>
            <p className="mt-2 text-gray-400">Your saved GitHub profiles.</p>
          </div>

          <button className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold transition hover:bg-indigo-500">
            Back to Search
          </button>
        </div>

        {/* Empty State */}
        {/* Show this when there are no favorites */}
        {/* 
        <div className="flex h-[60vh] flex-col items-center justify-center">
          <h2 className="text-3xl font-bold text-gray-300">
            No Favorites Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Search a GitHub user and add them to your favorites.
          </p>
        </div>
        */}

        {/* Favorite Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card */}

          <div className="rounded-2xl bg-white/[0.04] p-6 transition hover:ring-2 hover:ring-indigo-500">
            <div className="flex items-center gap-4">
              <img
                src="https://avatars.githubusercontent.com/u/583231?v=4"
                alt=""
                className="h-20 w-20 rounded-full border-2 border-indigo-500"
              />

              <div>
                <h2 className="text-xl font-bold">The Octocat</h2>
                <p className="text-gray-400">@octocat</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-gray-300">
              This profile has been added to favorites.
            </p>

            <div className="mt-6 flex items-center justify-between">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold transition hover:bg-indigo-500"
              >
                View Profile
              </a>

              <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold transition hover:bg-red-500">
                Remove
              </button>
            </div>
          </div>

          {/* Duplicate this card using map() */}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
