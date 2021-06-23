import React from "react";
import { Grid } from "semantic-ui-react";
import { map } from "lodash";
import "./Publications.scss";
import PreviewPublication from "./PreviewPublication.js/PreviewPublication";

const Publications = ({ publications }) => {
  return (
    <div className="publications">
      <h1>Publicaciones</h1>
      <Grid columns={4}>
        {map(publications, (publication, index) => (
          <Grid.Column key={index}>
            <PreviewPublication publication={publication} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Publications;
