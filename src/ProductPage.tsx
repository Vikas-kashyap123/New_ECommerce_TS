import { useState, useEffect, FC, ChangeEvent } from "react";
import ProductList from "./ProductList";
import { getProductList } from "./Api";
import NoMatching from "./NoMatching";
import { withAlert, withUser } from "./withProvider";
import Loading from "./loading/Loading";
import { range } from "lodash";
import { Link, useSearchParams } from "react-router-dom";
import { HiArrowLeft, HiArrowNarrowRight } from "react-icons/hi";

type ProductPageProps = {
  setUser: Function;
  setAlert: any;
  user: string;
  myName: string;
};

type productDataProps = { meta: any; data: any };

const ProductPage: FC<ProductPageProps> = ({
  setUser,
  setAlert,
  user,
  myName,
}) => {
  const [productData, setProductData] = useState<productDataProps>();
  // console.log("productData", productData);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  let { query, sort } = params;
  let page: string | number = params.page;

  query = query || "";
  sort = sort || "default";
  page = +page || 1;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
  };

  useEffect(
    function () {
      setAlert({
        type: "success",
        message: "Welcome to Dream buy " + myName,
      });
    },
    [user]
  );

  useEffect(
    function () {
      let sortType;
      let sortBy: any;

      if (sort == "title") {
        sortBy = "title";
      } else if (sort == "LTH") {
        sortBy = "price";
      } else if (sort == "HTL") {
        sortBy = "price";
        sortType = "desc";
      }

      getProductList(sortBy, query, page, sortType).then(function (xyz) {
        setProductData(xyz);
        setLoading(false);
      });
    },
    [sort, query, page]
  );

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setSearchParams({ ...(params as any), query: event.target.value, page: 1 });
  }
  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSearchParams({ ...params, sort: event.target.value });
  }

  const refreshPage = () => {
    window.location.reload();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl px-3 mx-auto bg-white shadow-2xl md:my-16 md:py-9 shadow-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="mb-3 text-center sm:text-left">Home/Shop</h2>
        <h1 className="text-3xl text-center text-primary-default mb-7 sm:text-left">
          Hello {myName}
        </h1>
        <button
          className="px-2 py-1 font-bold text-white bg-indigo-400 rounded-md hover:bg-indigo-700"
          onClick={refreshPage}
        >
          Refresh
        </button>
        <div className="pl-1 md:flex md:justify-between ">
          <input
            value={query}
            placeholder="search"
            className="px-2 mb-2 border border-gray-600"
            onChange={handleQueryChange}
          />
          <select
            onChange={handleSortChange}
            className="mb-2 border border-gray-600 "
          >
            <option value="default">Default sort </option>
            <option value="title">Sort by title</option>
            <option value="LTH">Sort by price: low to high</option>
            <option value="HTL">Sort by price: high to low</option>
          </select>
        </div>
        {(productData as any).data.length > 0 && (
          <ProductList products={(productData as any).data} />
        )}
        {(productData as any).data.length == 0 && <NoMatching />}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex gap-1 my-12">
            {page > 1 && (
              <Link
                to={"?page=" + (page - 1)}
                className="w-10 h-10 text-center border border-primary-dark hover:bg-primary-dark hover:text-white"
              >
                <HiArrowLeft />
              </Link>
            )}
            {range(1, (productData as any).meta.last_page + 1).map(
              (pageNumber) => (
                <Link
                  className={
                    " w-10 h-10 text-center border border-primary-dark hover:bg-primary-dark hover:text-white " +
                    (pageNumber == page
                      ? "bg-primary-default text-white"
                      : "bg-white text-primary-default ")
                  }
                  key={pageNumber}
                  to={
                    "?" +
                    new URLSearchParams({
                      ...(params as any),
                      page: pageNumber,
                    })
                  }
                >
                  {pageNumber}
                </Link>
              )
            )}
            {page < (productData as any).meta.last_page && (
              <Link
                to={"?page=" + (page + 1)}
                className="w-10 h-10 text-center border border-primary-dark hover:bg-primary-dark hover:text-white"
              >
                <HiArrowNarrowRight />
              </Link>
            )}
          </div>
          {user && (
            <div className="sm:my-12">
              <a
                className="px-3 py-2 font-bold rounded-md bg-primary-default hover:bg-primary-dark "
                href="login"
                onClick={handleLogout}
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default withUser(withAlert(ProductPage));

// if (sort == "lth") {
//   data.sort(function (x, y) {
//     return x.price - y.price;
//   });
// } else if (sort == "htl") {
//   data.sort(function (x, y) {
//     return y.price - x.price;
//   });
// } else if (sort == "title") {
//   data.sort(function (x, y) {
//     return x.title < y.title ? -1 : 1;
//   });
// }

//  let data = productList.filter(function (item) {
//    const LowerCaseTitle = item.title.toLowerCase();
//    const LowerCaseQuery = query.toLowerCase();
//    return LowerCaseTitle.indexOf(LowerCaseQuery) != -1;
//  });

//{page > 1 && (
//   <Link
//     className="w-10 h-10 text-center border border-primary-dark hover:bg-primary-dark hover:text-white"
//     to={"?" + new URLSearchParams({ ...params, page: pageNumber })}
//   >
//     <HiArrowLeft />
//   </Link>
// )}
