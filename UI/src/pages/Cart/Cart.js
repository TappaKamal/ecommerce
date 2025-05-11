
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const [products, setProducts] = useState([]);
//   const [showPaymentFor, setShowPaymentFor] = useState(null);
//   const [paymentMethod, setPaymentMethod] = useState('card');
//   const [orderConfirmed, setOrderConfirmed] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//     setProducts(storedProducts);
//   }, []);

//   const handleRemove = (id) => {
//     const updatedProducts = products.filter((p) => p.id !== id);
//     setProducts(updatedProducts);
//     localStorage.setItem('products', JSON.stringify(updatedProducts));
//   };

//   const handleClearCart = () => {
//     localStorage.removeItem('products');
//     setProducts([]);
//   };

//   const handleMockPayment = (product) => {
//     if (paymentMethod === 'card') {
//       alert(`Card payment submitted for "${product.title}" (Mock)!`);
//     } else if (paymentMethod === 'upi') {
//       alert(`UPI payment submitted for "${product.title}" (Mock)!`);
//     }

//     const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
//     localStorage.setItem('orders', JSON.stringify([...existingOrders, product]));

//     setShowPaymentFor(null);
//     setOrderConfirmed(product); // Show confirmation
//   };

//   const handleCloseConfirmation = () => {
//     setOrderConfirmed(null);
//     navigate('/orders');
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

//       {products.length > 0 ? (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//             {products.map((p) => (
//               <div key={p.id} className="border rounded-2xl shadow-md p-4 bg-white">
//                 <img
//                   src={p.images[0]}
//                   alt={p.title}
//                   className="w-full h-40 object-cover rounded-xl mb-2"
//                 />
//                 <h2 className="text-lg font-semibold">{p.title}</h2>
//                 <p className="text-sm text-gray-600 mb-1">{p.description}</p>
//                 <p><strong>Price:</strong> ${p.price}</p>
//                 <p><strong>Brand:</strong> {p.brand}</p>
//                 <p><strong>Rating:</strong> {p.rating}</p>

//                 <div className="mt-3 flex justify-between gap-2">
//                   <button
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     onClick={() => handleRemove(p.id)}
//                   >
//                     Remove
//                   </button>

//                   <button
//                     className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                     onClick={() =>
//                       setShowPaymentFor(showPaymentFor === p.id ? null : p.id)
//                     }
//                   >
//                     Buy
//                   </button>
//                 </div>

//                 {showPaymentFor === p.id && (
//                   <div className="mt-4 border-t pt-4">
//                     <h3 className="text-lg font-bold mb-2">Choose Payment Method</h3>

//                     <div className="flex gap-4 mb-3">
//                       <button
//                         className={`px-4 py-1 rounded ${
//                           paymentMethod === 'card'
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-gray-200 text-gray-700'
//                         }`}
//                         onClick={() => setPaymentMethod('card')}
//                       >
//                         Card
//                       </button>
//                       <button
//                         className={`px-4 py-1 rounded ${
//                           paymentMethod === 'upi'
//                             ? 'bg-blue-600 text-white'
//                             : 'bg-gray-200 text-gray-700'
//                         }`}
//                         onClick={() => setPaymentMethod('upi')}
//                       >
//                         UPI
//                       </button>
//                     </div>

//                     {paymentMethod === 'card' && (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Card Number"
//                           className="border p-2 w-full mb-2 rounded"
//                         />
//                         <div className="flex gap-2">
//                           <input
//                             type="text"
//                             placeholder="Expiry (MM/YY)"
//                             className="border p-2 w-1/2 rounded"
//                           />
//                           <input
//                             type="text"
//                             placeholder="CVV"
//                             className="border p-2 w-1/2 rounded"
//                           />
//                         </div>
//                       </>
//                     )}

//                     {paymentMethod === 'upi' && (
//                       <>
//                         <input
//                           type="text"
//                           placeholder="Enter UPI ID (e.g. user@upi)"
//                           className="border p-2 w-full mb-2 rounded"
//                         />
//                       </>
//                     )}

//                     <button
//                       className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                       onClick={() => handleMockPayment(p)}
//                     >
//                       Submit Payment
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mt-6">
//             <button
//               className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
//               onClick={handleClearCart}
//             >
//               Clear Cart
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-500">No products in cart.</p>
//       )}

//       {/* Order Confirmation Modal */}
//       {orderConfirmed && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={handleCloseConfirmation}
//         >
//           <div
//             className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-sm"
//             onClick={(e) => e.stopPropagation()} // prevent modal from closing when clicking inside
//           >
//             <h2 className="text-xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
//             <img
//               src={orderConfirmed.images[0]}
//               alt={orderConfirmed.title}
//               className="w-full h-40 object-cover rounded-xl mb-3"
//             />
//             <p className="text-lg font-semibold mb-2">{orderConfirmed.title}</p>
//             <p className="text-gray-700 mb-2">Price: ${orderConfirmed.price}</p>
//             <button
//               className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               onClick={handleCloseConfirmation}
//             >
//               Go to Orders
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [showPaymentFor, setShowPaymentFor] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const handleRemove = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleClearCart = () => {
    localStorage.removeItem('products');
    setProducts([]);
  };

  const handleMockPayment = (product) => {
    if (paymentMethod === 'card') {
      alert(`Card payment submitted for "${product.title}" (Mock)!`);
    } else if (paymentMethod === 'upi') {
      alert(`UPI payment submitted for "${product.title}" (Mock)!`);
    }

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, product]));

    setShowPaymentFor(null);
    setOrderConfirmed(product); // show confirmation popup
  };

  const handleCloseConfirmation = () => {
    setOrderConfirmed(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="border rounded-2xl shadow-md p-4 bg-white">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-xl mb-2"
                />
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-600 mb-1">{p.description}</p>
                <p><strong>Price:</strong> ${p.price}</p>
                <p><strong>Brand:</strong> {p.brand}</p>
                <p><strong>Rating:</strong> {p.rating}</p>

                <div className="mt-3 flex justify-between gap-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleRemove(p.id)}
                  >
                    Remove
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() =>
                      setShowPaymentFor(showPaymentFor === p.id ? null : p.id)
                    }
                  >
                    Buy
                  </button>
                </div>

                {showPaymentFor === p.id && (
                  <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-bold mb-2">Choose Payment Method</h3>

                    <div className="flex gap-4 mb-3">
                      <button
                        className={`px-4 py-1 rounded ${
                          paymentMethod === 'card'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        Card
                      </button>
                      <button
                        className={`px-4 py-1 rounded ${
                          paymentMethod === 'upi'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                        onClick={() => setPaymentMethod('upi')}
                      >
                        UPI
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <>
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="border p-2 w-full mb-2 rounded"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Expiry (MM/YY)"
                            className="border p-2 w-1/2 rounded"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            className="border p-2 w-1/2 rounded"
                          />
                        </div>
                      </>
                    )}

                    {paymentMethod === 'upi' && (
                      <input
                        type="text"
                        placeholder="Enter UPI ID (e.g. user@upi)"
                        className="border p-2 w-full mb-2 rounded"
                      />
                    )}

                    <button
                      className="mt-3 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={() => handleMockPayment(p)}
                    >
                      Submit Payment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No products in cart.</p>
      )}

      {/* Confirmation popup (click anywhere to close) */}
      {orderConfirmed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseConfirmation}
        >
          <div
            className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-sm"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the box
          >
            <h2 className="text-xl font-bold mb-4 text-green-600">Order Confirmed!</h2>
            <img
              src={orderConfirmed.images[0]}
              alt={orderConfirmed.title}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
            <p className="text-lg font-semibold mb-2">{orderConfirmed.title}</p>
            <p className="text-gray-700 mb-2">Price: ${orderConfirmed.price}</p>
            <p className="text-sm text-gray-500">(Click anywhere outside to close)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
