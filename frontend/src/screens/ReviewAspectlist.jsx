import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getAllAspectreviews } from "../redux/action/review.action";

export default function Reviewlist() {
  const getordersstate = useSelector((state) => state.getAllOrdersReducer);

  const { loading, error, orders } = getordersstate;
  const review = orders.review;
  const analysis = orders.analysis;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAspectreviews());
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && <Error error="something went wrong" />}
      <h2>Aspect Based Sentiment Analysis</h2>
      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Review Id</th>
            <th>Product Id</th>
            <th>User Id</th>
            <th>Comment</th>
            <th>Analysis</th>
            <th>Name</th>
          </tr>
        </thead>

        <tbody>
          {review &&
            review.map((order, i) => {
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
                  <td>{analysis[i].sentence}</td>
                  <td>{analysis[i].aspect.map((aspect, index) => (analysis[i].sentiment[index] == "Positive" ? <button className="btn btn-success btn-sm">{aspect}</button> : analysis[i].sentiment[index] == "Negative" ? <button className="btn btn-danger btn-sm">{aspect}</button> : <button className="btn btn-warning btn-sm">{aspect}</button>))}</td>
                  {/* <td>{analysis[i].sentiment.map(sentiment => )}</td> */}
                  <td>{order.name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
