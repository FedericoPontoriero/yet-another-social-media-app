import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";

const Nav = () => {
  const [current, setCurrent] = useState("");
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const router = useRouter();

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <nav
      className="nav d-flex justify-content-between"
      style={{ backgroundColor: "blue" }}
    >
      <Link href="/">
        <a
          className={`nav-link text-light logo ${current === "/" && "active"}`}
        >
          HOME
        </a>
      </Link>
      {state !== null ? (
        <>
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              role="button"
              id="dropdownMenuLink"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {state && state.user && state.user.name}
            </a>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link href="/user/dashboard">
                  <a
                    className={`nav-link dropdown-item ${
                      current === "/user/dashboard" && "active"
                    }`}
                  >
                    Dashboard
                  </a>
                </Link>
              </li>
              <li>
                <a onClick={logout} className="nav-link text-light">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <Link href="/login">
            <a
              className={`nav-link text-light ${
                current === "/login" && "active"
              }`}
            >
              Login
            </a>
          </Link>
          <Link href="/register">
            <a
              className={`nav-link text-light ${
                current === "/register" && "active"
              }`}
            >
              Register
            </a>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
