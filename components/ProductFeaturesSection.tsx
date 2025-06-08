import { useState } from "react";
import ProductStage from "./ProductStage";
import ProductFeatures from "./product-features";

const features = [
  { title: "Hidden Compartments", text: "Multiple discreet pockets throughout the hoodie allow you to store essentials like phones, wallets, and travel documents." },
  { title: "RFID Protection", text: "Integrated RFID-blocking fabric keeps your cards and passport safe from digital theft." },
  { title: "Water Resistant", text: "A special coating keeps you dry and your belongings protected in unexpected weather." },
];

export default function ProductFeaturesSection() {
  return (
    <section id="product" className="relative h-screen overflow-hidden">
      <ProductFeatures />
    </section>
  );
}