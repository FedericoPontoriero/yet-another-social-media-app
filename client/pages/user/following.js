import { useContext, useEffect, useState } from "react";
import { List, Avatar } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";

import { UserContext } from "../context";

const Following = () => {
  const [state] = useContext(UserContext);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (state && state.token) fetchFollowing();
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get("/user-following");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/default.jpg";
    }
  };

  const handleUnfollow = async () => {
    //
  };

  return (
    <div className="row col-md-8 offset-md-3">
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
                    onClick={() => handleUnfollow(user)}
                    className="pointer text-primary"
                  >
                    Unfollow
                  </span>
                </div>
              }
              avatar={<Avatar src={imageSource(user)} />}
            />
          </List.Item>
        )}
      />
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center pt-5">
          <RollbackOutlined />
        </a>
      </Link>
    </div>
  );
};

export default Following;
