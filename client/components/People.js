import { useContext } from "react";
import { List, Avatar } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

import { UserContext } from "../context";

const People = ({ people }) => {
  const [state] = useContext(UserContext);

  const router = useRouter();

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(person) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div>
                  {person.username} <span>Follow</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
