import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getAllreviews } from "../redux/action/review.action";
import { Link } from "react-router-dom";

export default function Reviewlist() {
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);

  const { loading, error, orders } = getordersstate;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllreviews());
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />}
      <h2>Reviews list</h2>
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Review Id</th>
            <th>Product Id</th>
            <th>User Id</th>
            <th>Comment</th>
            <th>Rating</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {orders &&
            orders.map((order) => {
              return (
                <tr
                  key={order.id}
                  // onClick={() => {
                  //   window.location.href = `/orderinfo/${order.id}`;
                  // }}
                >
                  <td>{order.id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.user_id}</td>
                  <td>{order.comment}</td>
                  <td>{order.rating}</td>
                  <td>{order.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Link to={`/admin/reviewsaspectlist`}>
        <button className="btn">
          Aspect Based Sentiment Analysis
        </button>
      </Link>
    </div>
  );
}
