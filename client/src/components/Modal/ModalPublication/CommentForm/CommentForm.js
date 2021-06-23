import React from "react";
import "./CommentForm.scss";
import { Form, Button } from "semantic-ui-react";

function CommentForm({ publication }) {
  return (
    <Form className="comment-form">
      <Form.Input placeholder="Anade un comentario..." name="comment" />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}

export default CommentForm;
