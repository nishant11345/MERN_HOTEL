import Featured from "../../Component/featured/Featured"
import FeaturedProperties from "../../Component/featuredproperty/Featuredproperty"
import Footer from "../../Component/footer/Footer"
import Header from "../../Component/header/Header"
import Maillist from "../../Component/maillist/Maillist"
import Navbar from "../../Component/navbar/Navbar"
import Propertylist from "../../Component/propertylist/Propertylist"
import "./Home.css"

import React from 'react'

const Home = () => {
  return (
    <div><Navbar />
    <Header />
    <div className="homeconntainer">
      <Featured />
      <h1 className="hometittle">Browse by property type</h1>
      <Propertylist />
      <h1 className="hometittle">Home guests Love</h1>
      <FeaturedProperties />
      <Maillist />
      <Footer />

      
    </div>

    </div>
  )
}

export default Home