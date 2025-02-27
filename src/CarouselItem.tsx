import React from "react";
import { motion } from "framer-motion";
import { CarouselItem } from "./App";

interface CarouselItemProps {
  item: CarouselItem;
  itemIndex: number;
  active: boolean;
  setActive: (x: number) => void;
}

const CarouselItemComponent = React.forwardRef<
  HTMLDivElement,
  CarouselItemProps
>(({ item, itemIndex, active, setActive }, ref) => {
  const animateRules = {
    background: active ? "blue" : "red",
    width: active ? "200px" : "70px",
    borderRadius: active ? "25px" : "50px",
  };

  const transitionRules = {
    type: "spring",
    stiffness: 150,
    damping: 15,
  };

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={animateRules}
      transition={transitionRules}
      style={{
        height: "175px",
        color: "white",
        minWidth: "70px",
        cursor: "pointer",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onClick={() => setActive(itemIndex)}
    >
      <div className="align-self-center">
        {active ? item.title : item.subtitle}
      </div>
    </motion.div>
  );
});

export default CarouselItemComponent;
