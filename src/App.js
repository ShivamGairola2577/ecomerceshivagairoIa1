import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";

import Signup from "./Signup";
import mainImage from "./mainpage.png";
import Contact from "./Contact";
import Login from "./Login";
import Profile from "./Profile";
import Cart from "./Cart";
import History from "./History";

//////////////////////////////////////////////////////////////
// Reusable Category Section
//////////////////////////////////////////////////////////////

function CategorySection({ title, category, setSelectedProduct }) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}?limit=20`
      );
      const data = await response.json();
      setItems(data.products || []);
    }
    fetchCategory();
  }, [category]);

  return (
    <>
      <div style={{ backgroundColor: "white", padding: "20px 0", marginTop: "40px" }}>
        <h2 style={{ textAlign: "center", margin: 0 }}>{title}</h2>
      </div>

      <div style={{ backgroundColor: "rgb(161,190,212)", padding: "40px 0", overflowX: "auto" }}>
        <div style={{
          display: "flex",
          width: "max-content",
          animation: "scroll 30s linear infinite"
        }}>
         {(Array.isArray(items) ? items : []).concat(Array.isArray(items) ? items : []).map((item, index) => (
            <div
              key={index}
              style={{ marginRight: "20px", cursor: "pointer" }}
              onClick={() => setSelectedProduct(item)}
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "20px",
                  objectFit: "cover",
                  transition: "transform 0.4s ease"
                }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

//////////////////////////////////////////////////////////////
// Main App
//////////////////////////////////////////////////////////////

function App() {
  // 🔍 Search + Filter States
const [searchLoading, setSearchLoading] = useState(false);

const location = useLocation();   // ✅ ADD THIS HERE

const [filteredProducts, setFilteredProducts] = useState([]);

const [searchText, setSearchText] = useState("");
const [selectedCompany, setSelectedCompany] = useState("All");
const [maxPrice, setMaxPrice] = useState(100000);
const [sortOption, setSortOption] = useState("default");



const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loading, setLoading] = useState(true);


const [cartItems, setCartItems] = useState([]);
const [cartSuccess, setCartSuccess] = useState(false);


const [active, setActive] = useState("");
const [selectedProduct, setSelectedProduct] = useState(null);
const [showPayment, setShowPayment] = useState(false);
const [orderSuccess, setOrderSuccess] = useState(false);


// 👇 ADD THIS HERE
useEffect(() => {
  fetch("https://ecomercebackand1shivam.onrender.com/current-user", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      if (data.loggedIn) {
        setIsLoggedIn(true);
      }
      setLoading(false); // important
    })
    .catch(() => setLoading(false));
}, []);


useEffect(() => {

  const delay = setTimeout(async () => {

    if (!searchText || searchText.trim() === "") {
      setFilteredProducts([]);
      return;
    }

    setSearchLoading(true);

    try {
      const res = await fetch(
        `https://ecomercebackand1shivam.onrender.com/search?query=${searchText}`,
        {
          credentials: "include"
        }
      );

      // ✅ IMPORTANT FIX
      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();

      // ✅ SAFE CHECK
  setFilteredProducts(
  Array.isArray(data?.products) ? data.products : []
);

    } catch (error) {
      console.log("Search error:", error); // 👈 DEBUG
      setFilteredProducts([]);
    }

    setSearchLoading(false);

  }, 400);

  return () => clearTimeout(delay);

}, [searchText]);





useEffect(() => {
  if (location.pathname === "/") {
    setSearchText("");
    setFilteredProducts([]);
  }
}, [location]);





  const linkStyle = (name) => ({
    color: active === name ? "red" : "purple",
    textDecoration: "none",
    cursor: "pointer"
  });

  return (
    <div style={{ backgroundColor: "rgb(161,190,212)", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav
  className="mobile-nav"
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 60px"
  }}
>

        <div
  className="mobile-links"
  style={{ display: "flex", gap: "20px" }}
>


          <Link to="/" style={linkStyle("Home")} onClick={() => setActive("Home")}>Home</Link>
          <Link to="/profile" style={linkStyle("Profile")} onClick={() => setActive("Profile")}>Profile</Link>
          <Link to="/contact" style={linkStyle("Contact")} onClick={() => setActive("Contact")}>Contact</Link>
          <Link to="/signup" style={linkStyle("Signup")} onClick={() => setActive("Signup")}>Signup</Link>
          <Link to="/login" style={linkStyle("Login")} onClick={() => setActive("Login")}>Login</Link>
          <Link to="/history" style={linkStyle("History")} onClick={() => setActive("History")}>History</Link>
          <Link to="/cart" style={linkStyle("Cart")} onClick={() => setActive("Cart")}>Cart</Link>

        </div>

        {/* Search */}
       <div
  className="mobile-search"
  style={{ display: "flex", alignItems: "center" }}
>

         <input
  type="text"
  placeholder="Search products..."
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  style={{ padding: "6px 10px", border: "1px solid #ccc" }}
/>

     <button
  style={{
    padding: "6px 10px",
    border: "1px solid #ccc",
    backgroundColor: "white"
  }}
>
  🔍
</button>



        </div>
      </nav>

      {/* Routes */}
      <Routes>

        {/* Home Page */}
    <Route
  path="/"
  element={
    <>
                                            {searchText.trim() === "" && (

        <>
          {/* Main Section */}
          <div
  className="mobile-main"
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "35px 40px"
  }}
>

            <div
  className="mobile-text"
  style={{ width: "55%" }}>
              <h1>Welcome Shivam Store Where Quality Meets Convenience</h1>

              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.6",
                  textAlign: "justify"
                }}
              >
                Welcome to our online store, where shopping becomes simple, secure, and enjoyable. We bring
                you a wide range of high-quality products at competitive prices, all in one convenient place. Our
                mission is to provide a smooth and satisfying shopping experience, from browsing to checkout
                and fast delivery. Whether you're looking for the latest trends, everyday essentials, or special
                deals, we are here to meet your needs. Thank you for choosing us — your satisfaction is our top
                priority. We are constantly updating our collection to bring you the newest and most popular
                products. Our dedicated support team is always ready to assist you with any questions or
                concerns. We value trust and transparency, ensuring safe payments and reliable service. We strive
                to build lasting relationships with our customers through quality products and exceptional
                service. Enjoy exclusive offers, exciting discounts, and a seamless shopping journey tailored just
                for you. Experience convenience, reliability, and excellence every time you shop with us. Discover
                products you love and make every purchase a delightful experience. Start exploring today and
                enjoy shopping made easy.
              </p>
            </div>

          <img
  src={mainImage}
  alt="Main"
  className="mobile-image"
  style={{
    width: "35%",
    height: "70vh",
    objectFit: "cover"
  }}
/>

          </div>

          {/* Categories */}
          <CategorySection title="Mens" category="mens-shirts" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Womens" category="womens-dresses" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Electronics" category="smartphones" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Tops" category="tops" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Furniture" category="furniture" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Sunglasses" category="sunglasses" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Jewellery" category="womens-jewellery" setSelectedProduct={setSelectedProduct} />
          <CategorySection title="Skincare" category="beauty" setSelectedProduct={setSelectedProduct} />
        </>
      )}

    {searchText.trim() !== "" && (

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      gap: "20px",
      padding: "40px"
    }}
  >
    {searchLoading ? (
      <h3 style={{ gridColumn: "1/-1" }}>Searching...</h3>
    ) : filteredProducts.length === 0 ? (
      <h3 style={{ gridColumn: "1/-1" }}>No products found ❌</h3>
  ) : (
(Array.isArray(filteredProducts) ? filteredProducts : []).map((product) => (
        <div
          key={product.id}
          onClick={() => setSelectedProduct(product)}   // ✅ CLICK ADDED
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            cursor: "pointer"   // ✅ POINTER ADDED
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover"
            }}
          />
          <h4>{product.title}</h4>
          <p style={{ color: "green" }}>₹{product.price}</p>
        </div>
      ))
    )}
  </div>
)}

    </>
  }
/>



          
  
        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />
     {/* Signup Page */}
     <Route path="/contact" element={<Contact />} />
    <Route 
  path="/login" 
  element={<Login setIsLoggedIn={setIsLoggedIn} />} 
/>


<Route 
  path="/profile" 
  element={<Profile isLoggedIn={isLoggedIn} loading={loading} />} 
/>


<Route 
  path="/cart" 
  element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
/>
<Route 
  path="/history" 
  element={<History />} 
/>
<Route path="*" element={<Navigate to="/" />} />

      
      </Routes>

      {/* Modal */}
      {selectedProduct && (
        <div style={overlayStyle}>
          <div style={modalStyle}>

            <button
              onClick={() => {
                setSelectedProduct(null);
                setShowPayment(false);
                setOrderSuccess(false);
              }}
              style={closeBtnStyle}
            >
              X
            </button>

           <img
  src={selectedProduct.thumbnail}
  alt={selectedProduct.title}
  style={{
    width: "100%",
    height: "250px",      // 🔥 reduced from 400px
    objectFit: "contain", // 🔥 important
    borderRadius: "15px"
  }}
/>


           <h2 style={{ textAlign: "center", marginTop: "15px" }}>
  {selectedProduct.title}
</h2>

           <h3 style={{ color: "green", textAlign: "center" }}>
  ${selectedProduct.price}
</h3>

            <p>{selectedProduct.description}</p>

            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
           <button
  onClick={async () => {

    try {

     const response = await fetch("https://ecomercebackand1shivam.onrender.com/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          productId: selectedProduct.id,
          title: selectedProduct.title,
          price: selectedProduct.price,
          image: selectedProduct.thumbnail,
          quantity: 1
        })
      });

      if (!response.ok) {
        alert("Please login first ❌");
        return;
      }

      // Update frontend UI also
      const exist = cartItems.find(
        item => item.id === selectedProduct.id
      );

      if (exist) {
        setCartItems(
          cartItems.map(item =>
            item.id === selectedProduct.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            id: selectedProduct.id,
            title: selectedProduct.title,
            price: selectedProduct.price,
            image: selectedProduct.thumbnail,
            quantity: 1
          }
        ]);
      }

      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 2000);

    } catch (error) {
      alert("Server error ❌");
    }

  }}
  style={cartBtnStyle}
>
  Add to Cart
</button>


             <button
  onClick={() => {

    // 1️⃣ If product not in cart, add it
    const exist = cartItems.find(
      item => item.id === selectedProduct.id
    );

    if (!exist) {
      setCartItems([
        ...cartItems,
        {
          id: selectedProduct.id,
          title: selectedProduct.title,
          price: selectedProduct.price,
          image: selectedProduct.thumbnail,
          quantity: 1
        }
      ]);
    }

    // 2️⃣ Then open payment section
    setShowPayment(true);

  }}
  style={buyBtnStyle}
>
  Buy Now
</button>

            </div>

        {showPayment && !orderSuccess && (
  <div style={{ marginTop: "20px" }}>
    <h3>Payment Method</h3>
    <p>Cash on Delivery (COD)</p>

  <button
  onClick={async () => {

    try {

const response = await fetch("https://ecomercebackand1shivam.onrender.com/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          items: [
            {
              productId: selectedProduct.id,
              title: selectedProduct.title,
              price: selectedProduct.price,
              image: selectedProduct.thumbnail,
              quantity: 1
            }
          ]
        })
      });

      if (!response.ok) {
        alert("Please login first ❌");
        return;
      }

      setOrderSuccess(true);
      setShowPayment(false);

    } catch (error) {
      console.log(error);
      alert("Server error ❌");
    }

  }}
  style={confirmBtnStyle}
>
  Confirm Order
</button>


  </div>
)}


            {orderSuccess && (
              <div style={{ marginTop: "20px", color: "green", fontWeight: "bold" }}>
                Order Placed Successfully ✅
              </div>
            )}

            {cartSuccess && (
              <div style={{ marginTop: "15px", color: "green", fontWeight: "bold" }}>
                Added to Cart Successfully ✅
              </div>
            )}

          </div>
        </div>
      )}

  <style>
{`
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  /* MOBILE ONLY */
  @media (max-width: 768px) {

    /* MAIN SECTION */
    .mobile-main {
      flex-direction: column !important;
      padding: 20px !important;
    }

    .mobile-text {
      width: 100% !important;
    }

    .mobile-text h1,
    .mobile-text p {
      width: 100% !important;
    }

    .mobile-image {
      width: 100% !important;
      height: auto !important;
      margin-top: 20px;
    }

    /* NAVBAR SCROLL */
    .mobile-nav {
      overflow-x: auto;
      white-space: nowrap;
      padding-left: 10px !important;
      padding-right: 10px !important;
      justify-content: flex-start !important; /* 🔥 remove big gap */
      gap: 12px; /* small spacing */
      scrollbar-width: none;
    }

    .mobile-nav::-webkit-scrollbar {
      display: none;
    }

    .mobile-links {
      flex-wrap: nowrap !important;
    }

    .mobile-links a {
      flex-shrink: 0;
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

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000
};

const modalStyle = {
  backgroundColor: "white",
  width: "80%",
  maxWidth: "800px",
  borderRadius: "20px",
  padding: "30px",
  position: "relative"
};

const closeBtnStyle = {
  position: "absolute",
  top: "15px",
  right: "20px",
  border: "none",
  background: "red",
  color: "white",
  padding: "5px 10px",
  cursor: "pointer"
};

const cartBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "green",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const buyBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "blue",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

const confirmBtnStyle = {
  padding: "10px 20px",
  backgroundColor: "orange",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};

export default App;
