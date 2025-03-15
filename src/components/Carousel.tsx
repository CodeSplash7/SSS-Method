"use client";

import { animate } from "@/general-utils/app-routes";
import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";

type CarouselItem = {
  type: "item";
  rect: { x: number; prevX: number };
  originalIndex: number;
  element: HTMLElement;
};

type CarouselFillerItem = {
  type: "filler";
  originalIndex: number;
};

type SizeOptions = {
  sm?: {
    width?: number;
    height?: number;
    gap?: number;
    itemsPerView?: number;
  };
  lg?: {
    width?: number;
    height?: number;
    gap?: number;
    itemsPerView?: number;
  };
};

type CarouselChildren = [React.ReactNode, React.ReactNode[], React.ReactNode];

type CarouselProps = {
  children: CarouselChildren;
  itemWidth: number;
  itemHeight: number;
  itemsGap: number;
  itemsPerView: number;
  options?: SizeOptions;
};

function useCarouselRenderErrors(
  children: CarouselChildren,
  itemsPerView: number,
  options?: SizeOptions
) {
  const errors: [boolean, string][] = [
    [
      children.length !== 3,
      "Exactly 3 children required, but got " + children.length
    ],
    [
      !itemsPerView ||
        !!(options?.sm?.itemsPerView?.toString() && !options.sm.itemsPerView),
      "Items per view can not be 0, it can either be a positivie or negative number, negative numbers mean there are as many items as the space allows"
    ]
  ];
  for (const error of errors) {
    if (error[0]) throw new Error(error[1]);
  }
}

export default function Carousel({
  children,
  options,
  itemsGap,
  itemWidth,
  itemHeight,
  itemsPerView
}: CarouselProps) {
  useCarouselRenderErrors(children, itemsPerView, options);
  const itemListRef = useRef<HTMLDivElement>(null);

  // size state
  const viewportWidth = useViewportWidth();
  const getResponsiveValue = useResponsiveValue();

  const responsiveItemWidth = useMemo(
    () => getResponsiveValue(itemWidth, options?.sm?.width, options?.lg?.width),
    [getResponsiveValue]
  );
  const responsiveItemsGap = useMemo(
    () => getResponsiveValue(itemsGap, options?.sm?.gap, options?.lg?.gap),

    [getResponsiveValue]
  );
  const responsiveItemHeight = useMemo(
    () =>
      getResponsiveValue(itemHeight, options?.sm?.height, options?.lg?.height),

    [getResponsiveValue]
  );
  const responsiveItemsPerView = useMemo(() => {
    const value = getResponsiveValue(
      itemsPerView,
      options?.sm?.itemsPerView,
      options?.lg?.itemsPerView
    );
    return Math.max(value, -1);
  }, [getResponsiveValue]);

  const itemsSpaceTaken = useMemo(() => {
    if (!itemListRef.current) return 0;
    return responsiveItemsPerView < 0
      ? (responsiveItemsGap + responsiveItemWidth) *
          itemListRef?.current?.children.length
      : getAvailableSpace(itemListRef) *
          Math.ceil(
            itemListRef.current.children.length / responsiveItemsPerView
          );
  }, [itemListRef.current, responsiveItemsGap, responsiveItemWidth]);

  const requiresArrows = useMemo(
    () => getAvailableSpace(itemListRef) < itemsSpaceTaken,
    [itemListRef.current, itemsSpaceTaken]
  );

  const [offset, setOffset] = useState(0);
  useEffect(() => {
    setOffset(0);
  }, [viewportWidth]);

  // conditional state
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="w-full h-fit flex flex-col items-center  gap-[16px]">
      <div
        style={{ height: `${responsiveItemHeight}px` }}
        className={`w-full flex flex-row items-start justify-start gap-[4px]`}
      >
        <SlideButton
          isAnimating={isAnimating}
          itemsPerView={responsiveItemsPerView}
          direction="left"
          offset={offset}
          setOffset={setOffset}
          requiresArrows={requiresArrows}
        >
          {children[0]}
        </SlideButton>
        <CarouselList
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
          offset={offset}
          itemListRef={itemListRef}
          itemWidth={responsiveItemWidth}
          itemHeight={responsiveItemHeight}
          itemsGap={responsiveItemsGap}
          itemsPerView={responsiveItemsPerView}
        >
          {children[1]}
        </CarouselList>
        <SlideButton
          isAnimating={isAnimating}
          itemsPerView={responsiveItemsPerView}
          direction="right"
          offset={offset}
          setOffset={setOffset}
          requiresArrows={requiresArrows}
        >
          {children[2]}
        </SlideButton>
      </div>
      <Pagination
        setOffset={setOffset}
        offset={offset}
        itemGroupsCount={Math.ceil(children[1].length / responsiveItemsPerView)}
        itemsPerView={responsiveItemsPerView}
      />
    </div>
  );
}
const Pagination = ({
  offset,
  itemGroupsCount,
  itemsPerView
}: {
  setOffset: (newV: number) => void;
  offset: number;
  itemGroupsCount: number;
  itemsPerView: number;
}) => {
  return (
    <div
      className={`w-fit h-fit flex item-center justify-center gap-[6px] py-[10px] px-[12px]`}
    >
      {Array(itemGroupsCount)
        .fill(0)
        .map((_, i) => (
          <div
            style={{
              background:
                i === Math.abs(offset / itemsPerView) % itemGroupsCount
                  ? "#1CBAC8"
                  : "white"
            }}
            className="border border-[#1CBAC8] rounded-full w-[8px] h-[8px] transition duration-150"
            key={i}
          ></div>
        ))}
    </div>
  );
};

const CarouselList = ({
  children,
  offset,
  itemListRef,
  itemWidth,
  itemHeight,
  itemsGap,
  itemsPerView,
  isAnimating,
  setIsAnimating
}: {
  children: React.ReactNode[];
  offset: number;
  itemListRef: RefObject<HTMLDivElement>;
  itemWidth: number;
  itemHeight: number;
  itemsGap: number;
  itemsPerView: number;
  isAnimating: boolean;
  setIsAnimating: (newV: boolean) => void;
}) => {
  const viewportWidth = useViewportWidth();

  const additionalChildrenCount = useMemo(() => {
    const childrenUneven = children.length % itemsPerView;
    return (itemsPerView - childrenUneven) % itemsPerView;
  }, [children, itemsPerView]);
  const itemSpace = useMemo(() => itemWidth + itemsGap, [itemWidth, itemsGap]);
  const availableSpace = useMemo(() => {
    return getAvailableSpace(itemListRef);
  }, [itemListRef.current, viewportWidth]);

  const lateralGap = useMemo(
    () =>
      calculateLateralGap(itemsGap, itemWidth, itemsPerView, availableSpace),
    [itemsGap, itemWidth, itemsPerView, availableSpace]
  );

  const [prevOffset, setPrevOffset] = useState(0);
  const [carouselItems, setCarouselItems] =
    useState<(CarouselItem | CarouselFillerItem)[]>();

  useEffect(() => {
    if (
      !itemListRef.current ||
      !carouselItems ||
      isAnimating ||
      offset === prevOffset
    )
      return;

    setIsAnimating(true);
    const directionIntValue = offset > prevOffset ? 1 : -1;
    setPrevOffset(offset);

    setCarouselItems((prevItems) => {
      return prevItems?.map((item) => {
        const newItem = { ...item };
        const n = prevItems.length;

        const virtualIndex = calculateVirtualIndex(newItem, offset, prevItems);

        const targetX = calculateX(
          lateralGap,
          virtualIndex,
          itemsPerView,
          itemSpace,
          availableSpace
        );

        if (newItem.type === "filler") return newItem;

        newItem.rect.prevX = newItem.rect.x;
        newItem.rect.x = targetX;

        // animation props
        let fromX =
          targetX -
          directionIntValue * (itemsPerView > 0 ? availableSpace : itemSpace);
        let toX = targetX;
        let onComplete = () => setIsAnimating(false);

        // animation conditions
        if (virtualIndex === 0 && directionIntValue > 0) {
          fromX = targetX - (itemsPerView > 0 ? availableSpace : itemSpace);
        }

        if (
          virtualIndex >= n - (itemsPerView > 0 ? itemsPerView : 1) &&
          directionIntValue < 0
        ) {
          fromX = calculateX(
            lateralGap,
            (virtualIndex + (itemsPerView > 0 ? itemsPerView : 1)) %
              prevItems.length,
            itemsPerView,
            itemSpace,
            availableSpace
          );
          toX = fromX - (itemsPerView > 0 ? availableSpace : itemSpace);
          onComplete = () =>
            animateItemX(
              newItem.element.id,
              null,
              targetX,
              () => setIsAnimating(false),
              0.001
            );
        }
        animateItemX(newItem.element.id, fromX, toX, onComplete);
        return newItem;
      });
    });
  }, [offset]);

  useEffect(() => {
    if (!itemListRef.current) return;

    // calculate measurements & sizes
    const rectHeight = itemListRef.current.clientHeight;

    // map carouselItems
    const carouselItems: (CarouselItem | CarouselFillerItem)[] = [
      ...children,
      ...Array(additionalChildrenCount).fill(0)
    ].map((item, iIndex) => {
      if (item === 0) return { type: "filler", originalIndex: iIndex };

      const x = calculateX(
        lateralGap,
        iIndex,
        itemsPerView,
        itemSpace,
        availableSpace
      );

      const element = itemListRef.current?.children[iIndex] as HTMLElement;

      element.style.position = "absolute";
      element.style.transform = `translate3d(${x}px, 0, 0)`;
      element.style.height = `${rectHeight}px`;
      return {
        type: "item",
        rect: {
          x: x,
          prevX: x
        },
        originalIndex: iIndex,
        element: element
      };
    });
    setCarouselItems(carouselItems);
  }, [
    itemListRef.current,
    viewportWidth,
    additionalChildrenCount,
    lateralGap,
    itemsPerView,
    itemSpace,
    availableSpace
  ]);

  return (
    <div
      ref={itemListRef as RefObject<HTMLDivElement>}
      className={`relative w-full h-full`}
      style={{ visibility: itemListRef.current ? "visible" : "hidden" }}
    >
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return null;
        return (
          <div
            key={child.key ?? i}
            id={`${
              offset + itemWidth + itemHeight + itemsGap + itemsPerView
            }-item-${child.key ?? i}`}
            style={{
              position: "absolute",
              width: itemWidth,
              height: itemHeight
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

function calculateX(
  lateralGap: number,
  iIndex: number,
  itemsPerView: number,
  itemSpace: number,
  availableSpace: number
) {
  let groupIndex = Math.floor(iIndex / itemsPerView);
  let positionInGroup = iIndex % itemsPerView;
  if (itemsPerView < 0) {
    groupIndex = 0;
    positionInGroup = iIndex;
  }

  return (
    lateralGap +
    itemSpace * positionInGroup +
    availableSpace * groupIndex * Number(!!lateralGap)
  );
}

function calculateLateralGap(
  itemsGap: number,
  itemWidth: number,
  itemsPerView: number,
  availableSpace: number
) {
  if (itemsPerView > 0 && availableSpace > 0)
    return (
      (availableSpace -
        (itemWidth * itemsPerView + itemsGap * (itemsPerView - 1))) /
      2
    );
  else return 0;
}

function getAvailableSpace(ref: RefObject<HTMLDivElement>) {
  return ref.current?.getBoundingClientRect().width ?? 0;
}

export const SlideButton = ({
  isAnimating,
  children,
  direction,
  offset,
  setOffset,
  requiresArrows,
  itemsPerView
}: {
  isAnimating: boolean;
  children: React.ReactNode;
  direction: "left" | "right";
  offset: number;
  setOffset: (newIndex: number) => void;
  requiresArrows: boolean;
  itemsPerView: number;
}) => {
  return (
    <div
      onClick={() =>
        !isAnimating &&
        requiresArrows &&
        setOffset(
          offset + (direction === "left" ? 1 : -1) * Math.abs(itemsPerView)
        )
      }
      style={{ opacity: requiresArrows ? "1" : "0" }}
      className="w-fit h-full"
    >
      {children}
    </div>
  );
};

export function useViewportWidth() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return width;
}

function animateItemX(
  itemId: string,
  fromX: number | null,
  toX: number,
  onComplete: () => void,
  duration = 0.6
) {
  animate(
    `#${itemId}`,
    {
      duration: duration,
      easeFunc: "ease",
      fromStyles: fromX
        ? {
            x: fromX
          }
        : {},
      toStyles: {
        x: toX
      }
    },
    onComplete
  );
}

function calculateVirtualIndex(
  newItem: CarouselItem | CarouselFillerItem,
  offset: number,
  prevItems: (CarouselItem | CarouselFillerItem)[]
) {
  return (
    (((newItem.originalIndex + offset) % prevItems.length) + prevItems.length) %
    prevItems.length
  );
}

function useResponsiveValue(): <T>(base: T, sm?: T, lg?: T) => T {
  const viewportWidth = useViewportWidth();

  const isOverSmScreen = useMemo(
    () => (viewportWidth || 9999) > 640,
    [viewportWidth]
  );
  const isOverLgScreen = useMemo(
    () => (viewportWidth || 9999) > 1024,
    [viewportWidth]
  );

  return (base, sm, lg) => {
    let res = base;
    if (isOverSmScreen && sm) res = sm;
    if (isOverLgScreen && lg) res = lg;
    return res;
  };
}
