import * as React from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";

type SwipeableCardStackProps = {
  images?: string[];
  borderRadius?: number;
  showInnerShadows?: boolean;
  greenShadowColor?: string;
  redShadowColor?: string;
  innerStrokeColor?: string;
  shadowSize?: string;
  shadowBlur?: string;
  rightIcon?: string | null;
  leftIcon?: string | null;
  renderCard?: (image: string, index: number) => React.ReactNode;
  renderControls?: (actions: {
    canSwipe: boolean;
    swipeLeft: () => void;
    swipeRight: () => void;
  }) => React.ReactNode;
};

export function SwipeableCardStack({
  images = [],
  borderRadius = 16,
  showInnerShadows = true,
  greenShadowColor = "rgba(253, 36, 121, 0.34)",
  redShadowColor = "rgba(224, 83, 83, 0.75)",
  innerStrokeColor = "rgba(255, 255, 255, 0.12)",
  shadowSize = "0 24px 70px",
  shadowBlur = "rgba(0, 0, 0, 0.45)",
  rightIcon = null,
  leftIcon = null,
  renderCard,
  renderControls
}: SwipeableCardStackProps) {
  const [cards, setCards] = React.useState([...images]);
  const [dragDirections, setDragDirections] = React.useState<Record<string, "left" | "right" | null>>({});
  const swipeThreshold = 100;

  React.useEffect(() => {
    setCards([...images]);
    setDragDirections({});
  }, [images]);

  React.useEffect(() => {
    if (images.length > 0 && cards.length === 0) {
      const timer = window.setTimeout(() => {
        setCards([...images]);
        setDragDirections({});
      }, 1400);

      return () => window.clearTimeout(timer);
    }
  }, [cards.length, images]);

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, image: string) => {
    setDragDirections((prev) => ({
      ...prev,
      [image]: info.offset.x > 0 ? "right" : "left"
    }));
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, index: number, image: string) => {
    if (Math.abs(info.offset.x) > swipeThreshold) {
      handleSwipe(index, image, dragDirections[image] ?? (info.offset.x > 0 ? "right" : "left"));
      return;
    }

    setDragDirections((prev) => ({ ...prev, [image]: null }));
  };

  const handleSwipe = (index: number, image: string, direction: "left" | "right") => {
    setDragDirections((prev) => ({ ...prev, [image]: direction }));

    window.setTimeout(() => {
      setCards((prevCards) => {
        const swipedCard = prevCards[index];
        if (!swipedCard || prevCards.length <= 1) return prevCards;

        const remainingCards = prevCards.filter((_, cardIndex) => cardIndex !== index);
        return [swipedCard, ...remainingCards];
      });
      setDragDirections({});
    }, 280);
  };

  const showNextCard = (direction: "left" | "right") => {
    if (cards.length === 0) return;

    handleSwipe(cards.length - 1, cards[cards.length - 1], direction);
  };

  const showPreviousCard = () => {
    if (cards.length <= 1) return;

    setCards((prevCards) => {
      const [firstCard, ...remainingCards] = prevCards;
      return [...remainingCards, firstCard];
    });
    setDragDirections({});
  };

  return (
    <div className="relative h-full w-full">
      <AnimatePresence>
        {cards.map((image, index) => {
          const isTopCard = index === cards.length - 1;
          const direction = dragDirections[image];
          const stackOffset = cards.length - 1 - index;

          return (
            <motion.div
              key={image}
              drag={isTopCard ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.48}
              onDrag={(event, info) => handleDrag(event, info, image)}
              onDragEnd={(event, info) => handleDragEnd(event, info, index, image)}
              initial={{ scale: 0.94, y: 28, opacity: 0 }}
              animate={{
                scale: isTopCard ? 1 : 1 - stackOffset * 0.045,
                y: isTopCard ? 0 : stackOffset * 18,
                rotate: isTopCard ? 0 : stackOffset % 2 === 0 ? -2 : 2,
                opacity: 1,
                transition: { duration: 0.28, ease: "easeOut" }
              }}
              exit={{
                x: (direction ?? "left") === "right" ? 320 : -320,
                rotate: (direction ?? "left") === "right" ? 18 : -18,
                opacity: 0,
                transition: { duration: 0.28, ease: "easeIn" }
              }}
              className="absolute inset-0 overflow-hidden bg-cover bg-center"
              style={{
                zIndex: index,
                backgroundImage: renderCard ? undefined : `url(${image})`,
                borderRadius,
                boxShadow: `inset 0 0 0 1px ${innerStrokeColor}, ${shadowSize} ${shadowBlur}`,
                cursor: isTopCard ? "grab" : "default"
              }}
            >
              {renderCard?.(image, index)}
              {isTopCard && showInnerShadows && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0 transition-shadow duration-200"
                    style={{
                      borderRadius,
                      boxShadow:
                        direction === "right"
                          ? `inset 0 -90px 70px ${greenShadowColor}`
                          : direction === "left"
                            ? `inset 0 -90px 70px ${redShadowColor}`
                            : "none"
                    }}
                  />
                  {direction && (rightIcon || leftIcon) && (
                    <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/40 backdrop-blur">
                      <img
                        alt=""
                        className="size-14 object-contain"
                        src={direction === "right" ? rightIcon ?? undefined : leftIcon ?? undefined}
                      />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      {renderControls?.({
        canSwipe: cards.length > 0,
        swipeLeft: showPreviousCard,
        swipeRight: () => showNextCard("right")
      })}
    </div>
  );
}
