import React from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./CommentForm.scss";
import { ADD_COMMENT } from "../../../../gql/comment";

function CommentForm({ publication }) {
  const [addComment] = useMutation(ADD_COMMENT);

  const { handleSubmit, values, handleChange, errors, handleReset } = useFormik(
    {
      initialValues: {
        comment: "",
      },
      validationSchema: Yup.object({
        comment: Yup.string().required(),
      }),
      onSubmit: async ({ comment }) => {
        try {
          await addComment({
            variables: {
              input: { idPublication: publication.id, comment },
            },
          });
          handleReset();
        } catch (error) {
          console.log(error);
        }
      },
    }
  );
  return (
    <Form className="comment-form" onSubmit={handleSubmit}>
      <Form.Input
        placeholder="Anade un comentario..."
        name="comment"
        value={values.comment}
        onChange={handleChange}
        error={errors.comment && true}
      />
      <Button type="submit">Publicar</Button>
    </Form>
  );
}

export default CommentForm;
