import { useContext } from "react";
import { List, Avatar } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

import { UserContext } from "../context";
import { imageSource } from "../functions";

const People = ({ people, handleUnfollow, handleFollow }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  {state &&
                  state.user &&
                  user.followers &&
                  user.followers.includes(state.user_id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="pointer text-primary"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="pointer text-primary"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
              avatar={<Avatar src={imageSource(user)} />}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
