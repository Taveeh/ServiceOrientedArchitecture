import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
// import { List, ListItem, ListItemText } from "@mui/material";

export const App = ({ user, token }) => {
  const [shows, setShows] = useState([]);
  const [booksLoaded, setBooksLoaded] = useState(false);

  console.log("HELLO THERE");
  console.log(token);
  function fetchElements() {
    console.log("test");
    fetch("http://localhost:8081/tvshows", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => {
      console.log(data);
      data.json().then((res) => {
        setShows(res);
        console.log(res);
      });
    });
  }

  useEffect(() => {
    fetchElements();
  }, [token]);

  // const fetchBooks = async () => {
  //   console.log("test");
  //   try {
  //     const booksUrl = "http://localhost:8081/tvshows";
  //     console.log(`sending request: ${booksUrl}`);
  //     let response = await fetch(booksUrl, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     let json = await response.json();
  //     console.log(json);
  //     return { success: true, data: json };
  //   } catch (error) {
  //     console.log(error);
  //     return { success: false };
  //   }
  // };
  // useEffect(() => {
  //   console.log("testest");
  // });
  //
  // useEffect(() => {
  //   console.log("teeest");
  //   fetchBooks();
  // }, [user, token]);
  //
  // useEffect(() => {
  //   (async () => {
  //     setBooksLoaded(false);
  //     let res = await fetchBooks();
  //     if (res.success) {
  //       setShows(res.data);
  //       setBooksLoaded(true);
  //       console.log(shows);
  //     }
  //   })();
  // }, [token]);

  return (
    <div>
      <h3>Your TvShows</h3>
      <List>
        {shows.map((show, index) => (
          <ListItem key={index}>
            <ListItemText primary={show.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default App;
