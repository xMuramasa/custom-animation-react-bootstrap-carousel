import React from "react";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Row } from "react-bootstrap";
import Carousel from "./Carousel";

export interface CarouselItem {
  imgSrc: string;
  title: string;
  subtitle?: string;
}

const App = () => {
  const items: CarouselItem[] = [
    {
      imgSrc: "https://picsum.photos/id/1/200/300",
      title: "title1",
      subtitle: "subtitle1",
    },
    {
      imgSrc: "https://picsum.photos/id/1/200/300",
      title: "title2",
      subtitle: "subtitle2",
    },
    {
      imgSrc: "https://picsum.photos/id/1/200/300",
      title: "title2",
      subtitle: "subtitle2",
    },
    {
      imgSrc: "https://picsum.photos/id/1/200/300",
      title: "title3",
      subtitle: "subtitle3",
    },
  ];

  const [ix, setIx] = useState(0);
  return (
    <Container>
      <div className="d-flex">
        <Carousel items={items} activeIndex={ix} setActiveIndex={setIx} />
      </div>
    </Container>
  );
};

export default App;
