import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { GET_COMMENTS, WS_GET_COMMENTS } from "../../../../gql/comment";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { Link } from "react-router-dom";
import ImageNotFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";

const Comments = ({ publication }) => {
  const client = useApolloClient();
  const { data, loading } = useQuery(GET_COMMENTS, {
    variables: {
      id: publication.id,
    },
  });

  const { data: dataWs } = useSubscription(WS_GET_COMMENTS, {
    variables: {
      id: publication.id,
    },
  });
  useEffect(() => {
    if (dataWs?.newComment) {
      client.writeQuery({
        query: GET_COMMENTS,
        data: {
          getComments: { ...dataWs.newComment },
        },
        variables: {
          id: publication.id,
        },
      });
    }
  }, [dataWs]);

  if (loading) return null;

  return (
    <div className="comments">
      {map(data.getComments, (comment, index) => (
        <Link
          to={`/${comment.idUser.username}`}
          className="comment"
          key={index}
        >
          <Image src={comment.idUser.avatar || ImageNotFound} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Comments;
