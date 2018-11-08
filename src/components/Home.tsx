import React from "react";
import { Button } from "@material-ui/core";
import { User } from "../__generated__/types";

class Home extends React.Component {
  public render() {
    return (
      <User.Component>
        {({ data, error }) => {
          if (error) return <p>Error!</p>;
          const user = data as User.Query;
          return (
            <div>
              {JSON.stringify(user)}
              <Button variant="outlined" color="primary">
                Hello World
              </Button>
            </div>
          );
        }}
      </User.Component>
    );
  }
}

export default Home;
