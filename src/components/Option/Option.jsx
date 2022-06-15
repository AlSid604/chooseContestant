import React from "react";

export default function Option(user) {
  return <option value={user.user.name}>{user.user.name}</option>;
}
