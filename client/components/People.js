import { useContext } from "react";
import { List, Avatar } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

import { UserContext } from "../context";

const People = ({ people, handleFollow }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/default.jpg";
    }
  };

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
                  <span
                    onClick={() => handleFollow(user)}
                    className="pointer text-primary"
                  >
                    Follow
                  </span>
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
