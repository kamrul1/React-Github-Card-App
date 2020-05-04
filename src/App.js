import React, { useState } from "react";
import "./styles.css";
import { testData } from "./TestData";
import axios from "axios";

const CardList = props => (
  <div>
    {props.profiles.map(profile => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

const Card = profile => (
  <div className="github-profile">
    <img src={profile.avatar_url} />
    <div className="info">
      <div className="name">{profile.name}</div>
      <div className="company">{profile.company}</div>
    </div>
  </div>
);

function Form(props) {
  const [userName, setUserName] = useState("");
  const handleSubmit = async event => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`);
    props.onSubmit(resp.data);
    setUserName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={userName}
        onChange={event => {
          setUserName(event.target.value);
        }}
        placeholder="GitHub username"
        required
      />
      <button>Add card</button>
    </form>
  );
}

export function App({ title }) {
  const [profiles, setProfiles] = useState([]);

  let addNewProfile = profileData => {
    setProfiles([...profiles, profileData]);
  };

  return (
    <div>
      <div className="header">{title}</div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles={profiles} />
    </div>
  );
}
