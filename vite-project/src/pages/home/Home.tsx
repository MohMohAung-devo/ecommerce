import { useState } from "react";
import classes from "./Home.module.css";
import Photo from "../../../public/Photo.jpg";
import Photo1 from "../../../public/Photo1.jpg";
import Photo2 from "../../../public/Photo2.jpg";
import { Button } from "@/components/ui/button";
import { useAllProduct } from "@/pages/api/server/home/query";
import { Input } from "@/components/ui/input";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useAuth } from "@/pages/hook/useAuth";
export const Home = () => {
  const { data } = useAllProduct();
  const navigate = useNavigate();
  const { auth } = useAuth();

  console.log(data);
  const [next, setNext] = useState(0);
  const [count, setCount] = useState(0);
  const item = [Photo, Photo1, Photo2];
  const [filterMenu, setFilterMenu] = useState("Women clothes");

  const handleBuying = () => {
    // const isAuthenicated = true;

    if (!auth) {
      navigate("/login");
    } else {
      setCount(count + 1);
    }
  };

  const dataItem = [
    { name: "Women clothes", image: Photo, price: 100 },
    { name: "Women clothes", image: Photo1, price: 100 },
    { name: "Jwllery", image: Photo2, price: 100 },
    { name: "Women clothes", image: Photo, price: 100 },
    { name: "Women clothes", image: Photo1, price: 100 },
    { name: "Women clothes", image: Photo2, price: 100 },
    { name: "Man clothes", image: Photo, price: 100 },
    { name: "Women clothes", image: Photo1, price: 100 },
    { name: "Cosmetic", image: Photo2, price: 100 },
    { name: "Women clothes", image: Photo, price: 100 },
  ];

  const menuList = [
    { name: "Women clothes" },
    { name: "Man clothes" },
    { name: "Cosmetic" },
    { name: "Jwllery" },
  ];

  const handleMenu = (name: string) => {
    setFilterMenu(name);
  };
  const handleNext = () => {
    setNext((prev) => (prev + 1) % item.length);
  };

  const handlePrevious = () => {
    setNext((prev) => (prev === 0 ? item.length - 1 : prev - 1));
  };

  return (
    <div className={classes.Container}>
      <div className={classes.Home}>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${item[next]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className={classes.leftButton}>
          <FaAngleLeft
            onClick={handlePrevious}
            color="white"
            className={classes.buttonIcons}
          />
        </div>
        <div className={classes.rightButton}>
          <FaAngleRight
            onClick={handleNext}
            color="white"
            className={classes.buttonIcons}
          />
        </div>
      </div>

      <div className={classes.ImageContainer}>
        <div className={classes.collectionList}>
          <h1 className="text-4xl">Collection</h1>

          <div className={classes.CartContainer}>
            <Input
              placeholder="Search..."
              style={{
                width: "300px",
                borderRadius: "10px",
                backgroundColor: "#A3A7A4",
                border: "1px solid #A3A7A4",
              }}
            />
            <Link to="/detail-page">
              <div style={{ cursor: "pointer" }}>
                <FaShoppingCart size={32} color="#A3A7A4" />
                <p
                  style={{
                    position: "absolute",
                    marginTop: "-2.7rem",
                    marginLeft: "1rem",
                    color: "black",
                  }}
                >
                  {count}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className={classes.menuItemList}>
          <div className={classes.menu}>
            {menuList.map((item) => (
              <div>
                <Button
                  variant={"outline"}
                  style={{
                    width: "150px",
                    height: "40px",
                    borderRadius: "10px",
                    backgroundColor: "#cecfcf",
                    borderColor: "white",
                  }}
                  onClick={() => handleMenu(item.name)}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className={classes.imageList}>
          {dataItem
            .filter((menu) => menu.name === filterMenu)
            .map((item, index) => (
              <div className={classes.list} key={index}>
                <p className={classes.listName}>{item.name}</p>
                <img
                  src={item.image}
                  alt=""
                  style={{
                    width: "350px",
                    height: "200px",
                    marginTop: "1rem",
                    borderRadius: "10px",
                  }}
                />
                <div className={classes.priceButton}>
                  {" "}
                  <p>
                    Price:
                    {item.price}
                    {""}ks
                  </p>
                  <Button
                    variant="outline"
                    style={{
                      borderRadius: "10px",
                      width: "100px",
                      backgroundColor: "#A3A7A4",
                      color: "black",
                      border: "1px solid #A3A7A4",
                    }}
                    onClick={handleBuying}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div className={classes.LoadmoreButton}>
          <Button
            variant="outline"
            style={{
              borderRadius: "10px",
              width: "120px",
              height: "45px",
              backgroundColor: "#A3A7A4",
              border: "1px solid #cecfcf",
            }}
          >
            Load more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
