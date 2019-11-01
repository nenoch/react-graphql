import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const POST_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = ({ history }) => {
  const [linkState, setLinkState] = useState({
    description: "",
    url: ""
  });

  return (
    <div>
      <div className="flex flex-column mt3">
        <input
          className="mb2"
          value={linkState.description}
          onChange={e =>
            setLinkState({ ...linkState, description: e.target.value })
          }
          type="text"
          placeholder="A description for the link"
        />
        <input
          className="mb2"
          value={linkState.url}
          onChange={e => setLinkState({ ...linkState, url: e.target.value })}
          type="text"
          placeholder="The URL for the link"
        />
      </div>
      <Mutation mutation={POST_MUTATION} onCompleted={() => history.push("/")}>
        {postMutation => (
          <button
            onClick={e => {
              e.preventDefault();
              postMutation({ variables: linkState });
            }}
          >
            Submit
          </button>
        )}
      </Mutation>
    </div>
  );
};

export default CreateLink;
