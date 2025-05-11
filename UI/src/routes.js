import { createBrowserRouter } from "react-router-dom";
import Shop from "./Shop";
import ShopApplicationWrapper from "./pages/ShopApplicationWrapper";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductDetails from "./pages/ProductDetailPage/ProductDetails";
import { loadProductBySlug } from "./routes/products";
import AuthenticationWrapper from "./pages/AuthenticationWrapper";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import OAuth2LoginCallback from "./pages/OAuth2LoginCallback";
import Cart from "./pages/Cart/Cart";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Checkout from "./pages/Checkout/Checkout";
import ConfirmPayment from "./pages/ConfirmPayment/ConfirmPayment";
import OrderConfirmed from "./pages/OrderConfirmed/Order";
import Profile from "./pages/Account/Profile";
import Orders from "./pages/Account/Orders";
import Settings from "./pages/Account/Settings";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import NotFound from "./components/ErrorBoundary/NotFound";
import Error from "./components/ErrorBoundary/Error";
import MockLoginDashboard from "./pages/MockLogin/MockLoginDashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <ShopApplicationWrapper />,
      errorElement: <ErrorBoundary />,
      children:[
        {
            path:"/",
            element:<Shop />
        },
        {
            path:"/women",
            element:<ProductListPage categoryType={'WOMEN'}/>,
        },
        {
          path:"/men",
          element:<ProductListPage categoryType={'MEN'}/>,
        },
        {
          path:"/product/:slug",
          loader: loadProductBySlug,
          element: <ProductDetails />,
          errorElement: <ErrorBoundary />
        },
        {
         path:'/cart-items',
         element: <Cart />
        },
        {
          path:'/dashboard',
          element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
          errorElement: <ErrorBoundary />
        },
        {
          path:'/mock-login',
          element: <MockLoginDashboard />,
          errorElement: <ErrorBoundary />
        },
        {
          path:'/account-details/',
          element: <ProtectedRoute><Account /></ProtectedRoute>,
          errorElement: <ErrorBoundary />,
          children:[
            {
              path:'profile',
              element:<ProtectedRoute><Profile/></ProtectedRoute>
            },
            {
              path:'orders',
              element:<ProtectedRoute><Orders/></ProtectedRoute>
            },
            {
              path:'settings',
              element:<ProtectedRoute><Settings /></ProtectedRoute>
            }
          ]
         },
         {
          path:'/checkout',
          element:<ProtectedRoute><Checkout /></ProtectedRoute>,
          errorElement: <ErrorBoundary />
         },
         {
          path:'/orderConfirmed',
          element: <OrderConfirmed />
         },
         {
          path: 'error',
          element: <Error />
         }
      ]
    },
    {
      path:"/v1/",
      element:<AuthenticationWrapper />,
      errorElement: <ErrorBoundary />,
      children:[
        {
          path:"login",
          element:<Login />
        },
        {
          path:"register",
          element:<Register />
        }
      ]
    },
    {
      path:'/oauth2/callback',
      element:<OAuth2LoginCallback />,
      errorElement: <ErrorBoundary />
    },
    {
      path:'/confirmPayment',
      element:<ConfirmPayment />,
      errorElement: <ErrorBoundary />
    },
    {
      path:'/admin/*',
      element:<ProtectedRoute><AdminPanel /></ProtectedRoute>,
      errorElement: <ErrorBoundary />
    },
    {
      // Catch-all route for 404 pages
      path: '*',
      element: <NotFound />
    }
  ]);
