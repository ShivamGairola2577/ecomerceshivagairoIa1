import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems, setCartItems }) {

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  //////////////////////////////////////////////////////////////
  // Load cart from backend
  //////////////////////////////////////////////////////////////

  useEffect(() => {
   fetch("https://ecomercebackand1shivam.onrender.com/get-cart", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) return [];
        return res.json();
      })
      .then(data => {
        const formatted = data.map(item => ({
          id: item.productId,
          title: item.title,
          price: item.price,
          image: item.image,
          quantity: item.quantity
        }));
        setCartItems(formatted);
      })
      .catch(() => setCartItems([]));
  }, [setCartItems]);

  //////////////////////////////////////////////////////////////
  // Quantity Controls
  //////////////////////////////////////////////////////////////

  const increaseQty = async (id) => {
    const item = cartItems.find(i => i.id === id);

  await fetch("https://ecomercebackand1shivam.onrender.com/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        productId: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity: 1
      })
    });

    setCartItems(cartItems.map(i =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i
    ));
  };

  const decreaseQty = (id) => {
    setCartItems(cartItems.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  const removeItem = async (id) => {
await fetch("https://ecomercebackand1shivam.onrender.com/remove-from-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId: id })
    });

    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = async () => {
await fetch("https://ecomercebackand1shivam.onrender.com/clear-cart", {
      method: "POST",
      credentials: "include"
    });
    setCartItems([]);
  };

  //////////////////////////////////////////////////////////////
  // Price Calculation (FIXED DECIMAL)
  //////////////////////////////////////////////////////////////

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  //////////////////////////////////////////////////////////////
  // Fake Payment
  //////////////////////////////////////////////////////////////

  const handlePayment = async () => {
    setPaymentSuccess(true);
    await clearCart();
  };

  //////////////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////////////

  return (
    <div style={outerStyle}>
      <div style={cartWrapper}>

        <h2 style={{ marginBottom: "30px" }}>My Cart Items</h2>

        {cartItems.length === 0 && !paymentSuccess && (
          <h3>Your cart is empty 🛒</h3>
        )}

        {paymentSuccess && (
          <h2 style={{ color: "green", textAlign: "center" }}>
            Payment Successful ✅
          </h2>
        )}

        {cartItems.map(item => (
         <div key={item.id} className="cart-item-row" style={itemRow}>


            <img src={item.image} alt={item.title} style={imageStyle} />

            <div style={{ flex: 1 }}>
              <h4>{item.title}</h4>
              <p>₹{item.price.toFixed(2)}</p>
            </div>

            <div style={qtyContainer}>
              <button onClick={() => decreaseQty(item.id)} style={qtyBtn}>−</button>
              <span style={{ margin: "0 10px" }}>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)} style={qtyBtn}>+</button>
            </div>

            <div style={{ width: "120px", textAlign: "center" }}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </div>

            <button onClick={() => removeItem(item.id)} style={removeBtn}>
              Remove
            </button>

          </div>
        ))}

        {cartItems.length > 0 && (
          <>
            <div style={bottomSection}>
              <Link to="/" style={continueBtn}>
                Continue Shopping
              </Link>

              <button onClick={clearCart} style={clearBtn}>
                Clear Cart
              </button>
            </div>

            <div style={summaryBox}>
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>Shipping Fee: ₹{shipping.toFixed(2)}</p>
              <hr />
              <h3>Total: ₹{total.toFixed(2)}</h3>

              <button onClick={handlePayment} style={payBtn}>
                Pay Now
              </button>
            </div>
          </>
        )}

      </div>
     <style>
{`
  @media (max-width: 768px) {

    /* Make cart item vertical */
    .cart-item-row {
      flex-direction: column !important;
      align-items: stretch !important;
      gap: 12px;
      padding: 15px 0 !important;
    }

    /* Image full width */
    .cart-item-row img {
      width: 100% !important;
      height: 200px !important;
      object-fit: cover;
      margin-right: 0 !important;
      border-radius: 8px;
    }

    /* Title section */
    .cart-item-row h4 {
      text-align: center;
      margin: 5px 0;
    }

    /* Price */
    .cart-item-row > div:nth-child(2) p {
      text-align: center;
      margin: 5px 0;
    }

    /* Quantity center */
    .cart-item-row > div:nth-child(3) {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    /* Total price center */
    .cart-item-row > div:nth-child(4) {
      text-align: center !important;
      width: 100% !important;
    }

    /* Remove button full width */
    .cart-item-row > button {
      width: 100% !important;
      margin-top: 5px;
    }

  }
`}
</style>



    </div>
  );
}

//////////////////////////////////////////////////////////////
// Styles
//////////////////////////////////////////////////////////////

const outerStyle = {
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  display: "flex",
  justifyContent: "center",
  paddingTop: "50px"
};

const cartWrapper = {
  width: "85%",
  maxWidth: "1200px",
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
};

const itemRow = {
  display: "flex",
  alignItems: "center",
  padding: "25px 0",
  borderBottom: "1px solid #ddd"
};

const imageStyle = {
  width: "130px",
  height: "90px",
  objectFit: "cover",
  marginRight: "25px",
  borderRadius: "6px"
};

const qtyContainer = {
  display: "flex",
  alignItems: "center",
  marginRight: "30px"
};

const qtyBtn = {
  padding: "6px 12px",
  fontSize: "16px",
  cursor: "pointer"
};

const removeBtn = {
  backgroundColor: "red",
  color: "white",
  border: "none",
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "5px"
};

const bottomSection = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "30px"
};

const continueBtn = {
  backgroundColor: "#6c63ff",
  color: "white",
  padding: "10px 20px",
  textDecoration: "none",
  borderRadius: "6px"
};

const clearBtn = {
  backgroundColor: "red",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const summaryBox = {
  marginTop: "30px",
  padding: "20px",
  backgroundColor: "#f0f0f0",
  borderRadius: "8px",
  width: "300px"
};

const payBtn = {
  width: "100%",
  marginTop: "15px",
  padding: "12px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px"
};

export default Cart;