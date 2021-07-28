import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SignIn from "./auth/pages/SignIn";
import CryptoJS from "crypto-js";

function CharactersPage() {
  const KEY_PUBLIC = "76f197c37a94b2c1d38b5bd636668464";
  const KEY_PRIVATE = "50eed1642f6dd8ed6548fe838400eb747ce20b68";
  let ts = new Date().getTime();
  let hash = CryptoJS.MD5(ts + KEY_PRIVATE + KEY_PUBLIC).toString();
  let params = {
    ts: ts,
    apikey: KEY_PUBLIC,
    hash: hash,
    characters: "1009718"
  };

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  let url0 = "https://jsonplaceholder.typicode.com/todos";
  let url =
    "http://gateway.marvel.com/v1/comics/?ts=" +
    params.ts +
    "&apikey=" +
    params.apikey +
    "&hash=" +
    params.hash;

  useEffect(() => {
    async function f() {
      try {
        let response = await fetch(url /*, params*/);
        return await response.json();
      } catch (err) {
        (err) => setError(err);
      }
    }
    f()
      .then((json) => setData(json))
      .then(() => setIsLoading(false));
    // * заменить на async / await
    // fetch(url0 /*, params*/)
    //   .then((response) => response.json())
    //   .then((json) => setData(json))
    //   .catch((e) => setError(e))
    //   .then(() => setIsLoading(false));
  }, []);

  //console.log(params, url);

  if (isLoading) {
    return "Loading";
  }

  if (error) {
    return "Error " + error.message;
  }

  console.log(data);
  let listItems = data.map((item) => (
    <div key={item.id} className="col">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="text-muted">#{item.id}</div>
          <h5>{item.title}</h5>
        </div>
      </div>
    </div>
  ));
  /*JSON.stringify(data)*/

  return <div className="row row-cols-2 g-3 py-5">{listItems}</div>;
}

export default function App() {
  // const [route, setRoute] = useState("signin");

  function onSignIn(userData) {
    // setRoute("main");
  }

  // function renderRoute() {
  //   switch (route) {
  //     case "signin":
  //       return <SignIn onSignIn={onSignIn} />;
  //     case "main":
  //       return <CharactersPage />;
  //     default:
  //       return <div>404 not found</div>;
  //   }
  // }

  return (
    <Router>
      <div className="App container">
        <Switch>
          <Route path="/main">
            <CharactersPage />
          </Route>
          <Route path="/">
            <SignIn onSignIn={onSignIn} />
          </Route>
          <Route path="*">
            <div>404 not found</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
