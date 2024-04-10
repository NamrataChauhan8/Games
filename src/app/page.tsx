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
    <div style={{ padding: "20px"}}>
      <h2 style={{ fontSize: "30px", textAlign: "center" , color:"yellowgreen", marginBottom:"1%"}}><u>Games Arena</u></h2>
      <input
        type="text"
        placeholder="Search by title"
        value={searchItem}
        onChange={handleSearchChange}
        style={{
          color: "white",
          width: "100%",
          height: "40px",
          border: "2px solid yellowgreen",
          borderRadius: "5px",
          marginBottom: "20px",
          padding: "0 10px",
          background:"transparent",
        }}
      />
      <button
        onClick={handleSortByPlatform}
        style={{
          padding: "10px 20px",
          backgroundColor: "yellowgreen",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Sort by Platform {sortedByPlatform ? "(Z-A)" : "(A-Z)"}
      </button>
      <table style={{ width: "100%", border:"2px solid yellowgreen"}}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px" , fontSize:"20px"}}>
              <u>Title</u>
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" , fontSize:"20px"}}>
              <u>Platform</u>
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" , fontSize:"20px"}}>
              <u>Score</u>
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" , fontSize:"20px"}}>
              <u>Genre</u>
            </th>
            <th style={{ border: "1px solid #ddd", padding: "10px" , fontSize:"20px"}}>
              <u>Editors Choice</u>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {game.title}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {game.platform}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {game.score}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {game.genre}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {game.editors_choice === "Y" ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
