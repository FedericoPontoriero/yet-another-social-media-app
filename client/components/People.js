import { useContext } from "react";
import { List, Avatar } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

import { UserContext } from "../context";

const People = ({ people }) => {
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
        renderItem={(person) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="d-flex justify-content-between">
                  {person.username} <span className="text-primary">Follow</span>
                </div>
              }
              avatar={<Avatar src={imageSource()} />}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
