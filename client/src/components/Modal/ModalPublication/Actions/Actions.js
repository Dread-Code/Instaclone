import React, { useEffect } from "react";
import { Icon } from "semantic-ui-react";
import {
  useMutation,
  useQuery,
  useApolloClient,
  useSubscription,
} from "@apollo/client";
import "./Actions.scss";
import {
  ADD_LIKE,
  IS_LIKE,
  DELETE_LIKE,
  COUNT_LIKES,
  WS_NEW_LIKE,
} from "../../../../gql/like";

const Actions = ({ publication }) => {
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteLike] = useMutation(DELETE_LIKE);
  const client = useApolloClient();

  const { data: wsData } = useSubscription(WS_NEW_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  useEffect(() => {
    if (wsData?.newLike) {
      if (dataCount.countLikes > 1) {
        likeCache(true);
        countCache(dataCount.countLikes + wsData.newLike);
      }
      if (dataCount.countLikes === 0) {
        likeCache(false);
        countCache(dataCount.countLikes + wsData.newLike);
      }
      countCache(dataCount.countLikes + wsData.newLike);
    }
  }, [wsData]);

  const { data, loading } = useQuery(IS_LIKE, {
    variables: {
      idPublication: publication.id,
    },
  });

  const { data: dataCount, loading: countLoading } = useQuery(COUNT_LIKES, {
    variables: {
      idPublication: publication.id,
    },
  });

  const handleAddLike = async () => {
    let { data } = await addLike({
      variables: {
        idPublication: publication.id,
      },
    });
    likeCache(data.addLike);
    countCache(dataCount.countLikes + 1);
  };

  const handleDeletelike = async () => {
    let { data } = await deleteLike({
      variables: {
        idPublication: publication.id,
      },
    });
    likeCache(!data.deleteLike);
    countCache(dataCount.countLikes - 1);
  };

  const likeCache = (like) => {
    client.writeQuery({
      query: IS_LIKE,
      data: {
        isLike: like,
      },
      variables: {
        idPublication: publication.id,
      },
    });
  };

  const countCache = async (count) => {
    client.writeQuery({
      query: COUNT_LIKES,
      data: {
        countLikes: count,
      },
      variables: {
        idPublication: publication.id,
      },
    });
  };
  if (loading || countLoading) return null;
  return (
    <div className="actions">
      <Icon
        className={`like ${data.isLike ? "active" : ""}`}
        name="heart"
        onClick={data.isLike ? handleDeletelike : handleAddLike}
      />
      <span>{dataCount.countLikes} Likes</span>
    </div>
  );
};

export default Actions;
