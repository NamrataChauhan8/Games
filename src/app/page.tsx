"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [games, setGames] = useState<any[]>([]);
  const [searchItem, setSearchItem] = useState<string>("");
  const [sortedByPlatform, setSortedByPlatform] = useState<boolean>(
    false
  );

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
        );
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchItem(event.target.value);
  };

  const handleSortByPlatform = () => {
    const sortedGames = [...games].sort((a, b) => {
      if (!a.platform || !b.platform) return 0;
      if (sortedByPlatform) {
        return b.platform.localeCompare(a.platform);
      } else {
        return a.platform.localeCompare(b.platform);
      }
    });
    setGames(sortedGames);
    setSortedByPlatform(!sortedByPlatform);
  };

  const filteredGames = games.filter(
    (game) =>
      game &&
      game.title &&
      game.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="p-8">
      <h2 className="text-3xl text-center text-lime-400 mb-4">Games Arena</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={searchItem}
        onChange={handleSearchChange}
        className="w-full h-12 border-2 border-lime-300 rounded mb-4 px-4 bg-transparent text-white"
      />
      <button
        onClick={handleSortByPlatform}
        className="px-4 py-2 bg-lime-300 text-black rounded mb-4"
      >
        Sort by Platform {sortedByPlatform ? "(Z-A)" : "(A-Z)"}
      </button>
      <table className="w-full border-2 border-lime-300">
        <thead>
          <tr>
            <th className="border border-lime-300 p-4 text-lg"><u>Title</u></th>
            <th className="border border-lime-300 p-4 text-lg"><u>Platform</u></th>
            <th className="border border-lime-300 p-4 text-lg"><u>Score</u></th>
            <th className="border border-lime-300 p-4 text-lg"><u>Genre</u></th>
            <th className="border border-lime-300 p-4 text-lg"><u>Editors Choice</u></th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game, index) => (
            <tr key={index}>
              <td className="border border-lime-300 p-4">{game.title}</td>
              <td className="border border-lime-300 p-4">{game.platform}</td>
              <td className="border border-lime-300 p-4">{game.score}</td>
              <td className="border border-lime-300 p-4">{game.genre}</td>
              <td className="border border-lime-300 p-4">{game.editors_choice === "Y" ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
