import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CarouselItem } from "./App";
import CarouselItemComponent from "./CarouselItem";

export interface CarouselProps {
  items: CarouselItem[];
  activeIndex: number;
  setActiveIndex: (x: number) => void;
}

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  activeIndex,
  setActiveIndex,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const width = useWindowSize();
  const isMobile = width < 768; // Mobile breakpoint

  useEffect(() => {
    if (carouselRef.current && itemRefs.current[activeIndex]) {
      const container = carouselRef.current;
      const targetElement = itemRefs.current[activeIndex];

      if (targetElement) {
        const containerCenter = container.clientWidth / 2;
        const targetLeft = targetElement.offsetLeft;
        const targetWidth = targetElement.clientWidth;
        const scrollPosition = targetLeft - containerCenter + targetWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex]);

  const handleNavigation = (direction: "next" | "prev") => {
    let newIndex = activeIndex;

    if (direction === "next") {
      newIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
    } else if (direction === "prev") {
      newIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
    }

    setActiveIndex(newIndex);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        ref={carouselRef}
        className="w-100 p-3"
        style={{
          overflowX: "hidden",
          whiteSpace: "nowrap",
          display: "flex",
          scrollBehavior: "smooth",
          maxWidth: isMobile ? "90vw" : "100%",
        }}
      >
        <div
          className="d-flex flex-row align-items-center mx-auto gap-3"
          style={{
            width: isMobile ? `${items.length * 33.3}vw` : "100%",
            transition: "width 0.3s ease-in-out",
          }}
        >
          {items.map((carouselItem: CarouselItem, ix: number) => (
            <CarouselItemComponent
              key={ix}
              item={carouselItem}
              itemIndex={ix}
              active={activeIndex === ix}
              setActive={setActiveIndex}
              ref={(el) => (itemRefs.current[ix] = el)}
            />
          ))}
        </div>
      </div>

      <div className="w-100 mb-3 px-4 d-flex d-md-none justify-content-evenly mynu-stars">
        <ArrowLeft className="point" onClick={() => handleNavigation("prev")} />
        <ArrowRight
          className="point"
          onClick={() => handleNavigation("next")}
        />
      </div>
    </div>
  );
};

export default Carousel;
