import React, { useState } from "react";

function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setUser(null);
    if (username.trim() === "") {
      setError("Please enter a GitHub username.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        setError("User not found.");
        return;
      }

      const data = await response.json();
      setUser(data);
      setUsername("");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Full-screen profile takeover
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
              src="https://via.placeholder.com/160"
              alt="Avatar"
              className="h-36 w-36 rounded-full border-4 border-[#0A0E14] object-cover shadow-lg md:h-40 md:w-40"
            />

            <div>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                The Octocat
              </h1>
              <p className="mt-1 text-lg text-slate-400">@octocat</p>
              <p className="mx-auto mt-4 max-w-xl text-slate-300 md:mx-0">
                Passionate developer building amazing open-source projects and
                modern web applications.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">560</h2>
              <p className="mt-2 text-slate-400">Followers</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">180</h2>
              <p className="mt-2 text-slate-400">Following</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">95</h2>
              <p className="mt-2 text-slate-400">Repositories</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5 text-center">
              <h2 className="text-3xl font-bold text-white">18</h2>
              <p className="mt-2 text-slate-400">Gists</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">📍 Location</p>
              <p className="mt-2 text-white">San Francisco, USA</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">🏢 Company</p>
              <p className="mt-2 text-white">GitHub</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">🌐 Website</p>
              <p className="mt-2 text-indigo-400">github.blog</p>
            </div>
            <div className="rounded-2xl bg-white/[0.03] p-5">
              <p className="text-sm text-slate-500">📅 Joined</p>
              <p className="mt-2 text-white">January 25, 2011</p>
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

            <div className="grid gap-5 md:grid-cols-2">
              <div className="cursor-pointer rounded-2xl bg-white/[0.03] p-5 transition hover:ring-2 hover:ring-indigo-500">
                <h3 className="text-lg font-semibold text-white">
                  react-dashboard
                </h3>
                <p className="mt-2 text-slate-400">
                  Modern admin dashboard built with React and Tailwind CSS.
                </p>
                <div className="mt-5 flex justify-between text-sm">
                  <span className="text-yellow-400">⭐ 235</span>
                  <span className="text-slate-400">JavaScript</span>
                </div>
              </div>

              <div className="cursor-pointer rounded-2xl bg-white/[0.03] p-5 transition hover:ring-2 hover:ring-indigo-500">
                <h3 className="text-lg font-semibold text-white">
                  portfolio-v2
                </h3>
                <p className="mt-2 text-slate-400">
                  Personal portfolio website with animations and dark mode.
                </p>
                <div className="mt-5 flex justify-between text-sm">
                  <span className="text-yellow-400">⭐ 108</span>
                  <span className="text-slate-400">React</span>
                </div>
              </div>
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
