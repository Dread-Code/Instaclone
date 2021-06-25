import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PUBLICATIONS_FOLLOWEDS } from "../../../gql/publication";
import Actions from "../../Modal/ModalPublication/Actions";
import CommentForm from "../../Modal/ModalPublication/CommentForm";

import ImageNotFound from "../../../assets/png/avatar.png";
import "./Feed.scss";
import ModalPublication from "../../Modal/ModalPublication";

const Feed = () => {
  const { data, loading } = useQuery(GET_PUBLICATIONS_FOLLOWEDS);
  const [showModal, setShowModal] = useState(false);
  const [publicationSelect, setPublicationSelect] = useState();

  const handleModalPublication = (publication) => {
    setPublicationSelect(publication);
    setShowModal(true);
  };

  if (loading) return null;
  const { getPublicationsFollowed } = data;

  return (
    <>
      <div className="feed">
        {map(getPublicationsFollowed, (publication, index) => (
          <div key={index} className="feed__box">
            <Link to={`/${publication.idUser.username}`}>
              <div className="feed__box-user">
                <Image
                  src={publication.idUser.avatar || ImageNotFound}
                  avatar
                />
                <span>{publication.idUser.name}</span>
              </div>
            </Link>
            <div
              className="feed__box-photo"
              style={{ backgroundImage: `url("${publication.file}")` }}
              onClick={() => handleModalPublication(publication)}
            />
            <div className="feed__box-actions">
              <Actions publication={publication} />
            </div>
            <div className="feed__box-form">
              <CommentForm publication={publication} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <ModalPublication
          open={showModal}
          setShow={setShowModal}
          publication={publicationSelect}
        />
      )}
    </>
  );
};

export default Feed;
