import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
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
        <Grid.Column className="modal-publication__right" width={6}>
          <Comments publication={publication} />
          <div>Actisons</div>
          <CommentForm publication={publication} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}

export default ModalPublication;
