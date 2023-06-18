import React, { Component } from "react";

const imageNameMap = {
  "Chamoy Peach Rings": "chamoy_peach_rings.png",
  "Chubby Gummy Bears": "chubby_gummy_bears.png",
  "Chamoy Sour Twin Cherries": "chamoy_sour_twin_cherries.png",
  "Strawberry Belts": "strawberry_belts.png",
  "Chamoy Rainbow Belts": "chamoy_rainbow_belts.png",
  "Watermelon Slices": "watermelon_slices.png",
  "Peach Rings": "peach_rings.jpg",
  "Butter Toffee Nut": "butter-toffe.png",
  "Chamoy Skittles": "chamoy_skittles.jpg",
  "Chamoy Watermelon Slices": "chamoy_watermelon.png",
  Twisteroos: "10.png",
  "Chamoy Gushers": "11.png",
  "Pistachio Fiesta Mix ": "pistachio_fiesta_mix.jpg",
  "Neon Worms ": "neon_worms.jpg",
  "Sour Mango Belts": "sour_mango_belts.png",
  "Mango Belts ": "mango_belts.jpg",
  "Gummy Filled Mangos": "gummy_filled_mangos.png",
  "Rainbow Belts": "rainbow_belts.png",
  "Neon Gummy Bears": "neon_gummy_bears.png",
  "Strawberry, Apple Sour Power Belts": "strawberry_apple_sour_belts.png",
};

const ProductImage = ({ productName }) => {
  const imageName = imageNameMap[productName] || '11.png';
  return (
    <img src={require(`../assets/images/Products/${imageName}`)} alt="" />
  );
};

export default ProductImage;
