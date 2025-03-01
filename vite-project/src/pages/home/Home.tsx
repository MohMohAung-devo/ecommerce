import { useState } from "react";
import classes from "./Home.module.css";
import Photo from "../../../public/Photo.jpg";
import Photo1 from "../../../public/Photo1.jpg";
import Photo2 from "../../../public/Photo2.jpg";
import Photo3 from "../../../public/Photo3.jpg";
import Photo4 from "../../../public/Photo4.jpg";
import Photo5 from "../../../public/Photo5.jpg";
import { Button } from "@/components/ui/button";
import { useAllProduct } from "@/pages/api/server/home/query";
import { Input } from "@/components/ui/input";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useAuth } from "@/pages/hook/useAuth";
import ProductDetail from "@/pages/home/detail/ProductDetail";
import { ProductAll } from "@/pages/api/server/home/type";
export const Home = () => {
  const { data, isError } = useAllProduct();
  const navigate = useNavigate();
  const { isAuthenicated } = useAuth();

  // if (!data) {
  //   <div>No data.....</div>;
  // }

  // if (isError) {
  //   <div>Loading.....</div>;
  // }

  console.log(data);
  const [next, setNext] = useState(0);
  const [count, setCount] = useState(0);
  const item = [Photo3, Photo4, Photo5];
  const [filterMenu, setFilterMenu] = useState("Women clothes");
  const [detail, setDetail] = useState();
  const handleBuying = () => {
    if (!isAuthenicated) {
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
    { name: "Jwellery" },
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

  const handleDetail = (index: number) => {
    setDetail(index);
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
            backgroundPosition: "center",
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
            <Link to="/buy-cart-list">
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
              <div
                style={{
                  // width: "150px",
                  // height: "40px",
                  // borderRadius: "10px",
                  // backgroundColor: "#cecfcf",
                  borderColor: "white",
                }}
                onClick={() => handleMenu(item.name)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
        {/* <div className={classes.imageList}>
          {data &&
            data
              .filter((menu: { name: string }) => menu.name === filterMenu)
              .map((item: ProductAll, index: number) => (
                <div className={classes.list} key={index}>
                  <p className={classes.listName}>{item.name}</p>
                  <img
                    src={item.image}
                    alt=""
                    // style={{
                    //   width: "400px",
                    //   height: "200px",
                    //   marginTop: "1rem",
                    //   borderRadius: "10px",
                    // }}
                    className={classes.homeImage}
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
        </div> */}

        <div className={classes.imageList}>
          {dataItem.map((item, index) => (
            <div
              className={classes.list}
              key={index}
              onClick={() => handleDetail(index)}
            >
              <div className={classes.titleList}>
                {" "}
                <p className={classes.listName}>{item.name}</p>
                <Link className={classes.detailTitle} to="/detail">
                  Detail
                </Link>
              </div>

              <img
                src={item.image}
                alt=""
                // style={{
                //   width: "400px",
                //   height: "200px",
                //   marginTop: "1rem",
                //   borderRadius: "10px",
                // }}
                className={classes.homeImage}
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
