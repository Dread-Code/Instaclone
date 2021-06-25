import React from "react";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed";
import "./Home.scss";

export default function Home() {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home_right" width={5}>
        <h2>usuario no Seguidos</h2>
      </Grid.Column>
    </Grid>
  );
}
