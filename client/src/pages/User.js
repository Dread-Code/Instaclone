import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { size } from "lodash";
import Profile from "../components/User/Profile";
import { useQuery, useSubscription, useApolloClient } from "@apollo/client";
import { GET_PUBLICATIONS, WS_GET_PUBLICATIONS } from "../gql/publication";
import Publications from "../components/User/Publications/Publications";

export default function User() {
  const { username } = useParams();
  const client = useApolloClient();

  const [publications, setPublications] = useState(null);

  const { data, loading } = useQuery(GET_PUBLICATIONS, {
    variables: {
      username,
    },
  });

  const { data: dataWsPublications } = useSubscription(WS_GET_PUBLICATIONS, {
    variables: { username },
  });

  useEffect(() => {
    setPublications(data?.getPublications.publications);
  }, [data]);

  useEffect(() => {
    if (dataWsPublications) {
      setPublications(dataWsPublications?.newPublication.publications);
      client.writeQuery({
        query: GET_PUBLICATIONS,
        data: {
          getPublications: {
            ...dataWsPublications.newPublication,
          },
        },
        variables: {
          username,
        },
      });
    }
  }, [dataWsPublications])

  if (loading) return null;
  return (
    <>
      <Profile username={username} totalPublications={size(publications)} />
      <Publications publications={publications} />
    </>
  );
}
