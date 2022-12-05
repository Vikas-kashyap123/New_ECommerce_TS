import { useState, FC } from "react";
import { BsMinecartLoaded } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu";
import { withCart, withUser } from "./withProvider";

type NavbarProps = {
  cartCount: number;
  setUser: Function;
  isLoggedIn: boolean;
};

const Navbar: FC<NavbarProps> = ({ cartCount, setUser, isLoggedIn }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  function handleMenuOpeneClick() {
    setMenuOpen(!isMenuOpen);
  }

  const links = [
    {
      id: 1,
      link: "Home",
      Route: "home",
    },
    {
      id: 2,
      link: "Products",
      Route: "/",
    },
    {
      id: 3,
      link: "About",
      Route: "/",
    },
    {
      id: 4,
      link: "Contact",
      Route: "contact",
    },
    {
      id: 5,
      link: "Account",
      Route: "login",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  return (
    <div className="py-4 bg-white">
      <div className="flex justify-between max-w-6xl mx-auto item-center">
        <img
          className="hidden h-9 w-28 md:block "
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
        />

        <div>
          <GiHamburgerMenu
            onClick={handleMenuOpeneClick}
            className="pt-3 text-5xl hover:text-primary-dark md:hidden"
          />
          {isMenuOpen && <MobileMenu className="md:hidden" />}
        </div>

        <div className="flex gap-4">
          {links.map(({ link, id, Route }) => (
            <div key={id} className="hidden space-x-4 text-xl md:block ">
              <Link className={"hover:text-primary-dark "} to={Route}>
                {link}
              </Link>
            </div>
          ))}
          {isLoggedIn ? (
            <a
              href="login"
              onClick={handleLogout}
              className="hidden text-xl font-bold md:block hover:text-primary-light text-primary-dark"
            >
              Logout
            </a>
          ) : (
            <a
              href="login"
              className="hidden text-xl font-bold md:block hover:text-primary-light text-primary-dark"
            >
              Login
            </a>
          )}
          {/* <div className="hidden space-x-4 text-xl md:block ">
            <Link className="hover:text-primary-dark" to="/">
              Home
            </Link>
            <Link to="/" className="hover:text-primary-dark">
              Products
            </Link>
            <Link to="/" className="hover:text-primary-dark">
              About
            </Link>
            <Link to="/" className="hover:text-primary-dark">
              Contact
            </Link>
            <Link className="hover:text-primary-dark" to="/login">
              Account
            </Link>
          </div> */}

          <div className="flex gap-4">
            <div>
              <Link to="/cart">
                <div className="flex flex-col items-center justify-center">
                  <BsMinecartLoaded className="pb-1 text-4xl text-primary-default hover:text-primary-dark" />
                  <span className="-m-8 text-primary-default hover:text-primary-dark">
                    {cartCount}
                  </span>
                </div>
              </Link>
            </div>
            <div>
              <img
                className="h-9 w-28 md:hidden "
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withUser(withCart(Navbar));
