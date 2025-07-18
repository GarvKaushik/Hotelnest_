import React, { useRef } from "react";
import Hero from "../Components/Hero";
import FeaturedDestination from "../Components/FeaturedDestination";
import ExclusiveOffers from "../Components/ExclusiveOffers";
import Testimonials from "../Components/Testimonials";
import NewsLetter from "../Components/NewsLetter";
import RecommendedHotels from "../Components/RecommendedHotel";
import { useAppContext } from "../context/Appcontext";

const Home = () => {
  const experienceRef = useAppContext();

  return (
    <>
      <Hero />
      <RecommendedHotels />
      <FeaturedDestination />
      <ExclusiveOffers />
      <div id="experience">
        <Testimonials />
      </div>
      <NewsLetter />
    </>
  );
};

export default Home;
