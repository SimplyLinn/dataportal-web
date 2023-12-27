import Link from "next/link";
import Heading from "@/components/global/Typography/Heading";
import { useEffect, useRef, useState } from "react";

interface ContainerDpDwnProps {
  menuItems: Anchorlink[];
  menuHeading: string;
  domain?: DiggDomain;
}

interface WatchedItem {
  isActive: boolean;
  id: string;
}

const isInView = (element: HTMLElement) => {
  if (typeof window !== "undefined") {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  }
  return false;
};

const ContainerNav: React.FC<ContainerDpDwnProps> = ({
  menuItems,
  menuHeading,
}) => {
  const [latestActiveItem, setLatestActiveItem] = useState<WatchedItem | null>(
    null,
  );
  let timer = useRef(0);
  const watch = () => {
    let watchedItems: WatchedItem[] = [];
    menuItems.map((item) => {
      const element = document.getElementById(item.id);

      if (element) {
        watchedItems.push({
          isActive: isInView(element),
          id: item.id,
        });
      }
    });

    const latestActiveItem = watchedItems.find((item) => item.isActive) || null;

    if (latestActiveItem != null) {
      setLatestActiveItem(latestActiveItem);
    }
  };

  useEffect(() => {
    timer.current = window.setInterval(() => watch(), 100);

    return () => {
      window.clearInterval(timer.current);
    };
  });

  return (
    <>
      <Heading level={3} size={"xs"} className="text-brown-600">
        {menuHeading}
      </Heading>
      <ul className={`flex w-full flex-col`}>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={`inline-flex cursor-pointer p-sm pl-lg text-sm no-underline underline-offset-4 hover:underline ${
                latestActiveItem?.id === item.id
                  ? "border-l-[3px] border-pink-600 font-strong"
                  : "border-l  border-brown-200 font-normal"
              }`}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContainerNav;
