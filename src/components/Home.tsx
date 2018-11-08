import React from "react";
import { Button } from "@material-ui/core";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const USER_QUERY = gql`
  query {
    user {
      name
      email
    }
  }
`;

class Home extends React.Component {
  public render() {
    return (
      <Query query={USER_QUERY}>
        {({ data, error }) => {
          if (error) return <p>Error!</p>;
          return (
            <div>
              {JSON.stringify(data)}
              <Button variant="outlined" color="primary">
                Hello World
              </Button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Home;
