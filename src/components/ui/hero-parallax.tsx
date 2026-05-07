import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import TrueFocus from "@/components/ui-extras/TrueFocus";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 80, damping: 30, bounce: 0 };

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-500, 300]), springConfig);
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div
      ref={ref}
      className="h-[280vh] overflow-hidden antialiased relative flex flex-col bg-white [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header arrowOpacity={arrowOpacity} />
      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20 mb-10 md:mb-20">
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-10 md:space-x-20 mb-10 md:mb-20">
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-10 md:space-x-20">
          {thirdRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({ arrowOpacity }: { arrowOpacity?: MotionValue<number> }) => (
  <div className="relative w-full space-y-10 md:space-y-36 bg-white flex flex-col justify-between px-6 md:px-16 pt-28 pb-8 md:pt-44 md:pb-16 min-h-0 md:min-h-[60vh]">
    <div className="relative">
      {/* Ghost logo watermark — mobile only */}
      <img
        src="/hero-logo.png"
        aria-hidden="true"
        className="absolute -top-12 -right-2 h-[8rem] w-auto opacity-[0.07] pointer-events-none select-none"
      />
      <p className="relative font-mono-label text-black/60">
        Est. 2009 — Istanbul · Milan
      </p>
      <img
        src="/hero-logo.png"
        alt="Metropolitan"
        className="relative h-[5.5rem] sm:h-[7.5rem] md:h-[10rem] lg:h-[12rem] w-auto self-start"
      />
    </div>

    <div className="flex flex-col gap-6 md:gap-8">
      <div className="hero2-focus self-center w-full">
        <TrueFocus
          sentence="Spaces that hold time"
          separator=" "
          manualMode={false}
          blurAmount={3}
          borderColor="rgba(0,0,0,0.4)"
          glowColor="rgba(0,0,0,0.1)"
          animationDuration={0.5}
          pauseBetweenAnimations={1.4}
        />
      </div>
    </div>

    <div className="flex items-end justify-between">
      <p className="text-xs md:text-sm text-black/60 font-body tracking-wide text-right w-full">
        Architecture studio · Istanbul &amp; Milan
      </p>
    </div>

    {/* Scroll indicator — mobile only, fades out as user scrolls */}
    {arrowOpacity && (
      <motion.div
        className="md:hidden absolute -bottom-32 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ opacity: arrowOpacity }}
      >
        <style>{`@keyframes heroScrollBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }`}</style>
        <div style={{ animation: "heroScrollBounce 2s infinite ease-in-out" }}>
          <svg width="28" height="42" viewBox="0 0 28 42" fill="none">
            <path d="M14 2v34M4 28l10 12 10-12" stroke="rgba(0,0,0,0.40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    )}
  </div>
);

export const ProductCard = ({
  product,
  translate,
}: {
  product: { title: string; link: string; thumbnail: string };
  translate: MotionValue<number>;
}) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -12 }}
    key={product.title}
    className="group/product h-96 w-[13rem] md:h-96 md:w-[24rem] relative shrink-0"
  >
    <a href={product.link} className="block group-hover/product:shadow-xl">
      <img
        src={product.thumbnail}
        height="600"
        width="600"
        className="object-cover object-center absolute h-full w-full inset-0"
        alt={product.title}
        loading="lazy"
        decoding="async"
      />
    </a>
    <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-70 bg-black pointer-events-none transition-opacity duration-300" />
    <h2 className="absolute bottom-3 left-3 opacity-0 group-hover/product:opacity-100 text-white font-mono-label transition-opacity duration-300">
      {product.title}
    </h2>
  </motion.div>
);
