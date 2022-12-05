import { FC, useEffect, useState, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { getProductData } from "./Api";
import { HiArrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loading from "./loading/Loading";
import NotFound from "./NotFound";
import { withCart } from "./withProvider";

type DetailsProps = { addToCart: Function };

type useParamsprops = { id: any };

type productProps = {
  thumbnail: string;
  price: number;
  id: number;
  description: string;
  category: string;
  title: string;
  brand: string;
  stock: number;
};

const Details: FC<DetailsProps> = ({ addToCart }) => {
  //const params = useParams();
  // const id = params.id;
  // this can be written as
  const id = +useParams<useParamsprops>().id;
  const [product, setProduct] = useState<productProps>();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);

  useEffect(
    function () {
      const p = getProductData(id);
      p.then(function (response: any) {
        setProduct(response);

        setLoading(false);
      }).catch(() => {});
    },
    [id]
  );

  function handleCountChange(event: ChangeEvent<HTMLInputElement>) {
    setCount(+event.target.value);
  }

  function handleButtonClick() {
    addToCart(id, count);
    setCount(1);
  }

  if (loading) {
    return <Loading />;
  }

  if (!product) {
    return <NotFound />;
  }

  return (
    <>
      <div className="pt-2 shadow-2xl shadow-black">
        <Link className="ml-2 text-3xl font-bold text-indigo-500" to="/">
          <HiArrowLeft />
        </Link>
        <div className="px-1 mx-1 bg-white md:flex md:px-32 md:pt-12 md:pb-8 sm:pb-4 md:mx-8">
          <img className="shadow-2xl md:w-1/2" src={product.thumbnail} />
          <div>
            <div className="pl-8">
              <h2 className="pb-4 text-sm">{product.category}</h2>
              <h1 className="pb-4 text-3xl ">{product.title}</h1>
              <img
                className="w-20"
                src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej-1520x800.jpg"
              />
              <p className="pb-4">{product.description}</p>
              <input
                type="number"
                value={count}
                onChange={handleCountChange}
                className="w-10 h-10 border border-gray"
              />
              <button
                onClick={handleButtonClick}
                className="px-4 py-2 ml-1 font-bold text-white rounded-md bg-primary-default hover:bg-primary-dark"
              >
                ADD TO CART
              </button>
              <p className="text-md">{product.brand}</p>
              <p>
                <span className="text-xl text-gray-600">{product.stock}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="px-1 mx-1 bg-white md:px-32 md:mx-8 md:pb-8 sm:pb-4">
          <a className="pr-2 font-bold">Description</a>
          <a className="font-bold">Reviews(0)</a>

          <p>{product.description}</p>
        </div>
      </div>

      <div className="flex justify-between px-2">
        <div>
          {id > 1 && (
            <Link
              className="text-3xl font-bold text-gray-600"
              to={"/Products/" + (id - 1)}
            >
              <HiArrowLeft />
            </Link>
          )}
        </div>

        <div>
          {id < 100 && (
            <Link
              className="text-3xl font-bold text-green-600"
              to={"/Products/" + (id + 1)}
            >
              <HiArrowNarrowRight />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default withCart(Details);
