import React from "react";
import { Modal, Grid, Image } from "semantic-ui-react";
import "./ModalPublication.scss";

function ModalPublication({ open, setShow, publication }) {
  return (
    <Modal
      open={open}
      onClose={() => setShow(false)}
      className="modal-publication"
    >
      <Grid>
        <Grid.Column
          className="modal-publication__left"
          width={10}
          style={{ backgroundImage: `url(${publication.file})` }}
        />
        <Grid.Column className="modal-publication__right">
          <div>Comentarioas</div>
          <div>Actions</div>
          <div>Form comments</div>
        </Grid.Column>
      </Grid>
    </Modal>
  );
}

export default ModalPublication;
