import React from "react";
import Hero from "../Components/Hero";
import FeaturedDestination from "../Components/FeaturedDestination";
import ExclusiveOffers from "../Components/ExclusiveOffers";
import Testimonials from "../Components/Testimonials";
import NewsLetter from "../Components/NewsLetter";
import RecommendedHotels from "../Components/RecommendedHotel";

const Home = () => {
  return (
    <>
      <Hero />
      <RecommendedHotels />
      <FeaturedDestination />
      <ExclusiveOffers />
      <Testimonials />
      <NewsLetter />
    </>
  );
};

export default Home;
