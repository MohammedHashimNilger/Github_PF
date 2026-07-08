import React, { useState } from "react";

function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const sortedRepos = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );
  const topRepos = sortedRepos.slice(0, 10);
  const filteredRepos = topRepos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase()),
  );

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

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!favorites.some((fav) => fav.id === user.id)) {
      favorites.push(favoriteUser);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  if (user && !loading) {
    return (
      <div className="min-h-screen w-full bg-[#0A0E14] text-slate-200">
        <div className="border-b border-white/5 px-6 py-4">
          <button
            onClick={() => setUser(null)}
            className="font-mono text-sm text-slate-400 transition hover:text-[#39D353]"
          >
            ← back to search
          </button>
        </div>

        <div className="border-b border-white/5 bg-gradient-to-b from-indigo-600/10 via-purple-600/5 to-transparent px-6 py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center md:flex-row md:items-end md:text-left">
            <img
              src={user.avatar_url}
              alt="Avatar"
              className="h-36 w-36 rounded-full border-4 border-[#0A0E14] object-cover shadow-lg md:h-40 md:w-40"
            />

            <div>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                {user.name}
              </h1>
              <p className="mt-1 text-lg text-slate-400">{user.login}</p>
              <p className="mx-auto mt-4 max-w-xl text-slate-300 md:mx-0">
                {user.bio || "No bio available"}
              </p>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
              >
                View GitHub Profile
              </a>
              <button
                className="mt-6 inline-flex rounded-xl bg-violet-700 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500
                ml-3
                "
                onClick={handleFav}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">
                {user.followers}
              </h2>
              <p className="mt-2 text-slate-400">Followers</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">
                {user.following}
              </h2>
              <p className="mt-2 text-slate-400">Following</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">
                {user.public_repos}
              </h2>
              <p className="mt-2 text-slate-400">Repositories</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">
                {user.public_gists}
              </h2>
              <p className="mt-2 text-slate-400">Gists</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">Location</p>
              <p className="mt-2 text-white">{user.location}</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">Company</p>
              <p className="mt-2 text-white">
                {user.company || "Not Available"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">Joined</p>
              <p className="mt-2 text-white">
                {new Date(user.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Top Repositories
              </h2>
              <button className="text-indigo-400 hover:text-indigo-300">
                View All →
              </button>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Search repositories..."
                className="w-full rounded-lg border border-white/10 bg-[#0A0E14] px-4 py-3 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none mb-7"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {filteredRepos.length === 0 ? (
                <p className="text-center text-slate-400">
                  {search
                    ? "No repositories match your search."
                    : "No repositories available."}
                </p>
              ) : (
                filteredRepos.map((repo) => (
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    key={repo.id}
                  >
                    <div className="cursor-pointer rounded-2xl bg-white/[0.03] p-5 transition hover:ring-2 hover:ring-indigo-500">
                      <h3 className="text-lg font-semibold text-white">
                        {repo.name}
                      </h3>
                      <p className="mt-2 text-slate-400">
                        {repo.description || "No description available."}
                      </p>
                      <div className="mt-5 flex justify-between text-sm">
                        <span className="text-yellow-400">
                          {repo.stargazers_count}
                        </span>
                        <span className="text-slate-400">
                          {repo.language || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0E14] px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white/[0.03] p-8 shadow-2xl">
        <h1 className="text-center text-4xl font-bold text-white">
          GitHub Profile Finder
        </h1>

        <p className="mb-8 mt-2 text-center text-gray-400">
          Search any GitHub user and view their profile.
        </p>

        <form
          className="flex flex-col gap-4 sm:flex-row"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Enter GitHub username..."
            className="flex-1 rounded-lg border border-white/10 bg-[#0A0E14] px-4 py-3 text-white placeholder:text-gray-500 focus:border-indigo-500 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Search
          </button>
        </form>

        {error && (
          <p className="mt-5 text-center font-medium text-red-500">{error}</p>
        )}

        {loading && (
          <h2 className="mt-8 text-center text-xl font-semibold text-blue-400">
            Loading...
          </h2>
        )}
      </div>
    </div>
  );
}

export default Home;
