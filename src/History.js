import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function History() {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  //////////////////////////////////////////////////////////////
  // Fetch Order History
  //////////////////////////////////////////////////////////////

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("https://ecomercebackand1shivam.onrender.com/order-history", {
          credentials: "include"
        });

        if (!res.ok) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);

      } catch (error) {
        setOrders([]);
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  //////////////////////////////////////////////////////////////
  // REMOVE ITEM FROM DATABASE + UI
  //////////////////////////////////////////////////////////////

  const removeItem = async (orderId, productId) => {
    try {
   const res = await fetch(
  "https://ecomercebackand1shivam.onrender.com/remove-history-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({
            orderId,
            productId
          })
        }
      );

      if (!res.ok) {
        alert("Failed to remove item ❌");
        return;
      }

      // Update UI after backend delete
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId
            ? {
                ...order,
                items: order.items.filter(
                  item => item.productId !== productId
                )
              }
            : order
        )
      );

    } catch (error) {
      alert("Server error ❌");
    }
  };

  //////////////////////////////////////////////////////////////
  // Loading
  //////////////////////////////////////////////////////////////

  if (loading) {
    return (
      <div style={outerStyle}>
        <h2 style={{ textAlign: "center" }}>Loading...</h2>
      </div>
    );
  }

  //////////////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////////////

  return (
    <div style={outerStyle}>

      <h1 style={headingStyle}>Purchased Items</h1>

      {orders.length === 0 ? (
        <h2 style={{ textAlign: "center" }}>
          No Purchased Items Yet
        </h2>
      ) : (

        orders.map((order) => (

          <div key={order._id}>

            {Array.isArray(order.items) &&
              order.items.map((item) => (

          <div key={item.productId} className="history-card" style={cartBoxStyle}>


                  {/* Image */}
                  <div style={imageBoxStyle}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={imageStyle}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <h2>{item.title}</h2>
                    <h3 style={{ color: "green" }}>${item.price}</h3>
                    <p style={{ fontSize: "18px" }}>
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() =>
                      removeItem(order._id, item.productId)
                    }
                    style={removeBtnStyle}
                  >
                    Remove
                  </button>

                </div>

              ))}

          </div>

        ))

      )}

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link to="/" style={backBtnStyle}>
          Continue Shopping
        </Link>
      </div>
<style>
{`
  @media (max-width: 768px) {

    /* Make white box column only in mobile */
    .history-card {
      flex-direction: column !important;
      align-items: stretch !important;
    }

    /* Image full width */
    .history-card > div:first-child {
      width: 100% !important;
      height: 220px !important;
      margin-right: 0 !important;
      margin-bottom: 15px;
    }

    /* Title full width */
    .history-card h2 {
      width: 100%;
      margin-bottom: 15px;
    }

    /* Price, Qty, Remove in one row */
    .history-card {
      padding: 15px !important;
    }

    .history-card h3,
    .history-card p,
    .history-card button {
      flex: 1;
      text-align: center;
    }

    .history-card div[style*="flex: 1"] {
      display: flex;
      flex-direction: column;
    }

    .history-card div[style*="flex: 1"] h3,
    .history-card div[style*="flex: 1"] p {
      margin: 5px 0;
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
  padding: "40px",
  backgroundColor: "#b7cdd6"
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "40px"
};

const cartBoxStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "15px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
};

const imageBoxStyle = {
  width: "250px",
  height: "200px",
  marginRight: "30px",
  borderRadius: "10px",
  overflow: "hidden"
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const removeBtnStyle = {
  padding: "10px 15px",
  backgroundColor: "red",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  height: "40px"
};

const backBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "blue",
  color: "white",
  textDecoration: "none",
  borderRadius: "8px"
};

export default History;
