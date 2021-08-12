import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import UserAvatar from "components/UserAvatar";

// Implement a fetch to an API for the comment list
export default function Leaderboard() {
  const [data, setData] = useState([]);
  var isLoaded = false;
  var oldMessages = { data }[Object.keys({ data })[0]];

  useEffect(() => {
    fetch("https://api.npoint.io/6891ac8dc8ef475bac81")
      .then((response) => response.json())
      .then((data) => setData(data))
      .then((oldMessages = { data }[Object.keys({ data })[0]]));
  }, []);

  // Rough and tumble way of checking comments loaded in, then adding up their total comments (Name, # of comments)
  if (oldMessages.length > 0) {
    var userCommentCounts = oldMessages.reduce(function (result, current) {
      if (!result[current["name"]]) {
        result[current["name"]] = 0;
      }
      result[current["name"]]++;
      return result;
    }, {});
    var sortedCommentCounts = sortByValue(userCommentCounts);
    isLoaded = true;
  }

  // Sort our list of names and comment counts descending by comment count (people with most comments on top)
  function sortByValue(userCommentCounts) {
    var sortedArray = [];
    for (var i in userCommentCounts) {
      // Push each JSON Object entry in array by [value, key]
      sortedArray.push([userCommentCounts[i], i]);
    }
    return sortedArray.sort().reverse();
  }

  // Would want this refactored to be more dyamic (i.e. top 5) but it works great
  // Also would want to add more state management (waiting for API calls with loading state, etc.)
  return (
    <div>
      {!isLoaded ? (
        <p>loading...</p>
      ) : (
        <List>
          <ListItem>
            <ListItemAvatar>
              <UserAvatar name={sortedCommentCounts[0][1]} />
            </ListItemAvatar>
            <ListItemText
              primary={
                sortedCommentCounts[0][1] + " " + sortedCommentCounts[0][0]
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <UserAvatar name={sortedCommentCounts[1][1]} />
            </ListItemAvatar>
            <ListItemText
              primary={
                sortedCommentCounts[1][1] + " " + sortedCommentCounts[1][0]
              }
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <UserAvatar name={sortedCommentCounts[2][1]} />
            </ListItemAvatar>
            <ListItemText
              primary={
                sortedCommentCounts[2][1] + " " + sortedCommentCounts[2][0]
              }
            />
          </ListItem>
        </List>
      )}
    </div>
  );
}
