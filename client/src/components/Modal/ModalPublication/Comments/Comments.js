import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { GET_COMMENTS } from "../../../../gql/comment";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ImageNotFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";

const Comments = ({ publication }) => {
  const { data, loading } = useQuery(GET_COMMENTS, {
    variables: {
      id: publication.id,
    },
  });
  if (loading) return null;
  const { getComments } = data;
  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link to={`/${comment.idUser.username}`} className="comment">
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
