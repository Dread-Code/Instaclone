import React from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_NOT_FOLLOWEDS } from "../../../gql/follow";
import ImageNotFound from "../../../assets/png/avatar.png";
import "./UserNotFolloweds.scss";

const UserNotFolloweds = () => {
  const { data, loading } = useQuery(GET_NOT_FOLLOWEDS);

  if (loading) return null;
  const { getNotFolloweds } = data;
  return (
    <div className="user-not-followeds">
      <h3>Nuevos Usuarios</h3>
      {map(getNotFolloweds, (user, index) => (
        <Link
          key={index}
          to={`/${user.username}`}
          className="user-not-followeds__user"
        >
          <Image src={user.avatar || ImageNotFound} avatar />
          <span>{user.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default UserNotFolloweds;
