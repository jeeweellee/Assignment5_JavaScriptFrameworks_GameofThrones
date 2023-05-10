import "./styles.css";
import React, { useState } from "react";

function CreateInfo({ info }) {
  return (
    <div className="Display">
      <h2>{info.fullName}</h2>
      <p>Family: {info.family}</p>
      <p>Titles: {info.title}</p>
      <img src={info.imageUrl} alt={info.firstName} />
    </div>
  );
}

export default function App() {
  const [character, setCharacter] = useState("");
  const [items, setItems] = useState([]);

  function DisplayInfo(event) {
    event.preventDefault();

    const emptyText = character.trim();
    if (emptyText === "") {
      return;
    }

    const url =
      "https://thronesapi.com/api/v2/Characters?fullName=" + character;
    const encodedURL = encodeURI(url);

    return fetch(encodedURL)
      .then((res) => res.json())
      .then((results) => setItems(results));
  }

  function SearchInput(event) {
    setCharacter(event.target.value);
  }

  return (
    <>
      <h1>GAME OF THRONES CHARACTERS</h1>
      <form className="Form">
        <input
          type="text"
          placeholder="Try searching for Jon Snow"
          onChange={SearchInput}
          value={character}
        />
        <button onClick={DisplayInfo}>Search</button>
        <p>You are searching for: {character}</p>
      </form>

      {items.map((c) => (
        <CreateInfo info={c} />
      ))}
    </>
  );
}
