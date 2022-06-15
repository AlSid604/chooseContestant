import { useState, useEffect, Fragment, useMemo } from "react";
import axios from "axios";
import Card from "../src/components/Card/Card";
import Option from "../src/components/Option/Option";
import "./app.css";

function App() {
  const [users, setUsers] = useState([]);
  const [favouriteCandidate, setFavouriteCandidate] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [submited, setSubmited] = useState(false);
  const [winner, setWinner] = useState("");
  const [votingEnabled, setVotingEnabled] = useState(true);
  const [paginate, setPaginate] = useState(1);
  const getUsers = async function () {
    try {
      return axios
        .get("https://jsonplaceholder.typicode.com/users/")
        .then(({ data }) => {
          return data;
          //
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setFetching(true);
      const users = await getUsers();
      console.log(users);
      setUsers(users);
    }
    fetchData();

    setFetching(false);
  }, []); // Or [] if effect doesn't need props or state\

  function handleChange(e) {
    let newThing = e.target.value;
    setFavouriteCandidate(newThing);
  }

  function submitHandler(e) {
    setWinner(e.target.value);
    setSubmited(true);
    setVotingEnabled(false);
  }

  if (isFetching) {
    return (
      <Fragment>
        <div className="center-me">
          <h1>Loading</h1>
          <div className="loader"></div>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="App">
        {users.map((user) => {
          return <Card key={user.id} user={user}></Card>;
        })}
      </div>
      <div className="bottom">Everyone in the user List</div>
      <div className="bottom">Your Favourite Candidate?</div>
      <div className="options">
        <select id="user-picks" onChange={handleChange}>
          {users.map((user) => {
            return <Option key={user.id} user={user}></Option>;
          })}
        </select>
        {votingEnabled ? (
          <button onClick={submitHandler} value={favouriteCandidate}>
            Choose
          </button>
        ) : (
          <button onClick={submitHandler} value={favouriteCandidate} disabled>
            Choose
          </button>
        )}
        {submited ? "(cannot choose twice)" : null}
      </div>
      <div className="center-me2">
        {submited
          ? `Congrats! You have voted on lucky contestant ${winner}!`
          : null}
      </div>
    </Fragment>
  );
}

export default App;
