import { useState } from 'react'
import './App.css'
import Blog from './pages/Blog/Blog';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from './pages/About/About';


const router = createBrowserRouter([
  {path: "", element: <Layout/>,
    children:[
      {index: true, element: <Home/> },
      {path:"home" , element:<Home/>},
      {path:"blog" , element:<Blog/>},
      {path:"blog/:slug" , element:<BlogDetails/>},
      {path:"about" , element:<About/>},
      {path:"*" , element:<NotFound/>}
    ]
  }
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}


