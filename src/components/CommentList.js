import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import UserAvatar from "components/UserAvatar";

// Implement a simple fetch for the comment list
// Another method to doing this would be to use props / connect / hooks
export default function CommentList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://api.npoint.io/6891ac8dc8ef475bac81")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Lot of comments makes scrolling to see a new comment tedious so I've reversed the mapping - i.e. new on top
  return (
    <div>
      <List>
        {data
          .slice(0)
          .reverse()
          .map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <UserAvatar name={user.name} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.comment} />
            </ListItem>
          ))}
      </List>
    </div>
  );
}
