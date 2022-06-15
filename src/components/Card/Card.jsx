import React from "react";
import "./card.css";

export default function Card(user) {
  return (
    <div className="card">
      <h1 className="card-name">{user.user.name}</h1>
      <h1 className="card-username">{user.user.username}</h1>
      <h1 className="card-username">{user.user.phone}</h1>
      <h1 className="card-username">{user.user.company.name}</h1>
    </div>
  );
}
