import React from "react";
import { Grid } from "semantic-ui-react";
import Feed from "../../components/Home/Feed";
import UserNotFolloweds from "../../components/Home/UserNotFolloweds";

import "./Home.scss";

export default function Home() {
  return (
    <Grid className="home">
      <Grid.Column className="home__left" width={11}>
        <Feed />
      </Grid.Column>
      <Grid.Column className="home_right" width={5}>
        <UserNotFolloweds />
      </Grid.Column>
    </Grid>
  );
}
