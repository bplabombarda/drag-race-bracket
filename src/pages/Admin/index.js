import React, { useEffect, useState } from "react";

import FormInput from "Components/FormInput";
import FormSelect from "Components/FormSelect";
import firebase from "Utils/firebase";

const db = firebase.firestore();

const defaultSeason = {
  name: "",
  queens: [],
  queensInFinale: "",
  type: ""
};

export default function Admin() {
  const [season, setSeason] = useState(defaultSeason);
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection("seasons").get();
      const seasonsList = snapshot.docs.map(doc => doc.data());

      setSeasons(seasonsList);
    };
    fetchData();
  }, []);

  const handleMultipleOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    const newSeason = {
      ...season,
      [name]: [...season[name], value]
    };

    setSeason(newSeason);
  };

  const handleOnChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    const newSeason = {
      ...season,
      [name]: value
    };

    // If the `name` field changes, we want to rebuild the URL.
    if (name === "name") {
      newSeason.url = buildUrl(value);
    }

    setSeason(newSeason);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    await db.collection("seasons").add(season);

    setSeasons([...seasons, season]);
    setSeason(defaultSeason);
  };

  const buildUrl = name => {
    // Remove non-alphanumeric or space characters.
    // Replace spaces with dashes.
    return name
      .replace(/[^a-zA-Z 0-9]+/g, "")
      .replace(/\s+/g, "-")
      .toLowerCase();
  };

  return (
    <>
      <h2>Add a New Season:</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          className="formInput"
          handleOnChange={handleOnChange}
          labelText="Season Name: "
          name="name"
          type="text"
          value={season.name}
        />
        <FormInput
          className="formInput"
          handleOnChange={handleOnChange}
          labelText="Season Type: "
          name="type"
          type="text"
          value={season.type}
        />
        <FormInput
          className="formInput"
          handleOnChange={handleOnChange}
          labelText="Queens In Finale: "
          name="queensInFinale"
          type="text"
          value={season.queensInFinale}
        />
        <FormInput
          className="formInput"
          handleOnChange={handleOnChange}
          labelText="Add A Queen"
          name="queensInFinale"
          type="text"
          value={season.queensInFinale}
        />
        <span>Queens:</span>
        <ul>
          {season.queens.map(({ name }, index) => {
            <li key={`queen_${index}`}>{name}</li>;
          })}
        </ul>
        <FormInput
          className="formSubmit"
          handleOnChange={() => null}
          labelText=""
          name="submit"
          type="submit"
          value="Add Season"
        />
      </form>

      <h2>Seasons:</h2>
      <ul>
        {seasons.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
}
