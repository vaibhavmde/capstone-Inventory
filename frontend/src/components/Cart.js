import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
import { removeProduct } from "../redux/cartRedux";

const Cart = () => {
  const token = useSelector((state) => state.token.value);
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const onToken = (token) => {
     setStripeToken(token);
  };

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await axios.post("https://inventory-demo-1.herokuapp.com/orders", {
          userId: currentUser._id,
          name:currentUser.username,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            product:item.title,
          }),{ headers: { authorization: token }}),
          amount: cart.total,
          address: stripeToken.card.address_line1.concat(" ",stripeToken.card.address_city," ",stripeToken.card.address_zip)
        });
        setOrderId(res.data._id);
      } catch {}
    };
    stripeToken && createOrder();
  }, [cart,stripeToken,currentUser,token]);

  const handleClick = () => {
    dispatch(removeProduct());
    navigate('/');
  };

  return (
    <>
      <div className="con flex-wrap">
        <div className="d-flex flex-column flex-wrap ">
          {cart.products.map((product) => (
            <div
              className="d-flex justify-content-evenly m-3 col-12 flex-wrap"
              key={product}
            >
              <div>
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={product.img}
                  alt="img"
                />
              </div>
              <div className="d-flex justify-content-center align-items-start flex-column">
                <span>
                  <b>Product:{product.title}</b>
                </span>
                <b>ID:{product._id}</b>
                <b>Color:{product.color}</b>
                <b>Size:{product.size}</b>
                <b>Quantity:{product.quantity}</b>
                <b>Price: ₹ {product.price}</b>
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex flex-column m-5 p-5 ">
          <span>ORDER SUMMARY</span>
          <div>
            <span>Subtotal</span>
            <span> ₹ {cart.total}</span>
          </div>
          <div type="total">
            <span>Total</span>
            <span> ₹ {cart.total}</span>
          </div>
          <StripeCheckout
            name="Inventory Shop"

            shippingAddress
            currency="INR"
            description={`Your total is ₹${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey="pk_test_51KzjtJSFvm3jVZg9XICbv6igsYE28O4mcY4ox5eQQJ3MVZciQUETnZqyZOIdpydo5udFcT1MOKcy57fRsIDNEIlz00RwajctCc"
          >
            <button className="btn btn-primary m-1 p-1">CHECKOUT NOW</button>
          </StripeCheckout>
        </div>
      </div>
      <div className='d-flex justify-content-center '>
        <button className='btn btn-primary' onClick={handleClick}>EMPTY CART</button>
      </div>
    </>
  );
};

export default Cart;
