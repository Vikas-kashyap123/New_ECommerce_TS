import React, { ChangeEvent, Component } from "react";
import { useParams } from "react-router-dom";
import { getProductData } from "./Api";
import { HiArrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import Loading from "./loading/Loading";
import NotFound from "./NotFound";
import { withCart } from "./withProvider";

function withParams(Component: any) {
  //  id={useParams().id}
  // id = useParams().id;
  return (props: any) => <Component {...props} params={useParams()} />;
}

type DetailsProps = { addToCart: Function; params: any };

type StateProps = {
  product?: {
    thumbnail: string;
    price: number;
    description: string;
    category: string;
    title: string;
    brand: string;
    stock: number;
  };
  loading: boolean;
  count: number | string;
};

class DetailsWithClass extends Component<DetailsProps, StateProps> {
  constructor(props: DetailsProps) {
    super(props);

    this.state = {
      product: undefined,
      loading: false,
      count: 1,
    };

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  id = 0;
  componentDidUpdate(
    prevProps: Readonly<DetailsProps>,
    prevState: Readonly<StateProps>,
    snapshot?: any
  ): void {
    if (prevProps.params !== this.props.params) {
      let data = this.props.params;
      let id = +data.id;
      console.log("id in Details", this.id);
      let p = getProductData(this.id);
      p.then((response) => {
        this.setState({ product: response, loading: false });
      }).catch(() => {
        this.setState({ loading: true });
      });
    }
  }

  // {
  //   let data = this.props.params;
  //   let id = +data.id;
  //   this.id = id;
  //   console.log("id in Details", this.id);
  //   if (id !== this.id) {
  //     let p = getProductData(this.id);
  //     p.then((response) => {
  //       this.setState({ product: response, loading: false });
  //     }).catch(() => {
  //       this.setState({ loading: true });
  //     });
  //   }
  // }

  handleCountChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ count: +event.target.value });
  }

  handleButtonClick() {
    this.props.addToCart(this.id, this.state.count);
    this.setState({ count: 1 });
  }

  render(): React.ReactNode {
    if (this.state.loading) {
      return <Loading />;
    }
    if (!this.state.product) {
      return <NotFound />;
    }
    console.log("id", this.props.params);
    return (
      <>
        <div className="pt-2 shadow-2xl shadow-black">
          <Link className="ml-2 text-3xl font-bold text-indigo-500" to="/">
            <HiArrowLeft />
          </Link>
          <div className="px-1 mx-1 bg-white md:flex md:px-32 md:pt-12 md:pb-8 sm:pb-4 md:mx-8">
            <img
              className="shadow-2xl md:w-1/2"
              src={this.state.product.thumbnail}
            />
            <div>
              <div className="pl-8">
                <h2 className="pb-4 text-sm">{this.state.product.category}</h2>
                <h1 className="pb-4 text-3xl ">{this.state.product.title}</h1>
                <img
                  className="w-20"
                  src="https://cdn.searchenginejournal.com/wp-content/uploads/2021/08/a-guide-to-star-ratings-on-google-and-how-they-work-6123be39b9f2d-sej-1520x800.jpg"
                />
                <p className="pb-4">{this.state.product.description}</p>
                <input
                  type="number"
                  value={this.state.count}
                  onChange={this.handleCountChange}
                  className="w-10 h-10 border border-gray"
                />
                <button
                  onClick={this.handleButtonClick}
                  className="px-4 py-2 ml-1 font-bold text-white rounded-md bg-primary-default hover:bg-primary-dark"
                >
                  ADD TO CART
                </button>
                <p className="text-md">{this.state.product.brand}</p>
                <p>
                  <span className="text-xl text-gray-600">
                    {this.state.product.stock}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="px-1 mx-1 bg-white md:px-32 md:mx-8 md:pb-8 sm:pb-4">
            <a className="pr-2 font-bold">Description</a>
            <a className="font-bold">Reviews(0)</a>

            <p>{this.state.product.description}</p>
          </div>
        </div>

        <div className="flex justify-between px-2">
          <div>
            {this.id > 1 && (
              <Link
                className="text-3xl font-bold text-gray-600"
                to={"/Products/" + (this.id - 1)}
              >
                <HiArrowLeft />
              </Link>
            )}
          </div>

          <div>
            {this.id < 100 && (
              <Link
                className="text-3xl font-bold text-green-600"
                to={"/Products/" + (this.id + 1)}
              >
                <HiArrowNarrowRight />
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }
}
export default withCart(DetailsWithClass);
