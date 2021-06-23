import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import "./PreviewPublication.scss";
import ModalPublication from "../../../Modal/ModalPublication/";

const PreviewPublication = ({ publication }) => {
  const { file } = publication;
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="preview-publication" onClick={() => setShowModal(true)}>
        <Image className="preview-publication__image" src={file} />
        <ModalPublication
          open={showModal}
          setShow={setShowModal}
          publication={publication}
        />
      </div>
    </>
  );
};

export default PreviewPublication;
