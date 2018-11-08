/* tslint:disable */

// ====================================================
// START: Typescript template
// ====================================================

// ====================================================
// Types
// ====================================================

export interface Query {
  user: User;
}

export interface User {
  name?: string | null;

  email?: string | null;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  name?: string | null;
}

// ====================================================
// END: Typescript template
// ====================================================

// ====================================================
// Documents
// ====================================================

export namespace User {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    user: User;
  };

  export type User = {
    __typename?: "User";

    name?: string | null;

    email?: string | null;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace User {
  export const Document = gql`
    query user {
      user {
        name
        email
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...this["props"] as any}
        />
      );
    }
  }
  export function HOC<
    TProps = any,
    OperationOptions = ReactApollo.OperationOption<TProps, Query, Variables>
  >(operationOptions: OperationOptions) {
    return ReactApollo.graphql<TProps, Query, Variables>(
      Document,
      operationOptions,
    );
  }
}
