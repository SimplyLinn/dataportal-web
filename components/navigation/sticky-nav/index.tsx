import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState, MouseEvent } from "react";

import { Heading } from "@/components/typography/heading";
import { Anchorlink } from "@/types/global";

interface StickyNavProps {
  menuItems: Anchorlink[];
  menuHeading: string;
}

const isInView = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
};

export const StickyNav: FC<StickyNavProps> = ({ menuItems, menuHeading }) => {
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const isScrolling = useRef(false);
  const router = useRouter();

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash && menuItems.some((item) => item.id === hash)) {
      setActiveItemId(hash);

      // Only scroll on initial load if there's a hash in the URL
      if (window.location.hash) {
        const element = document.getElementById(hash);
        if (element) {
          isScrolling.current = true;
          element.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            isScrolling.current = false;
          }, 1000);
        }
      }
    }

    const handleResize = () => setIsLargeScreen(window.innerWidth >= 984);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [router.asPath, menuItems]);

  useEffect(() => {
    if (!isLargeScreen) return;

    // Store the initial path when the effect runs
    const initialPath = router.asPath.split("#")[0];
    const watchScroll = () => {
      if (isScrolling.current) return;

      // Check if we're still on the same page
      const currentPath = window.location.pathname;
      if (currentPath !== initialPath) {
        return; // We've navigated to a different page
      }

      requestAnimationFrame(() => {
        for (const item of menuItems) {
          const element = document.getElementById(item.id);
          if (element && isInView(element)) {
            setActiveItemId(item.id);
            // Only update URL if we already have a hash and we're on the initial path
            if (window.location.hash && currentPath === initialPath) {
              history.replaceState(
                { ...history.state, as: `${currentPath}#${item.id}` },
                "",
                `${currentPath}#${item.id}`,
              );
            }
            break;
          }
        }
      });
    };

    window.addEventListener("scroll", watchScroll, { passive: true });
    watchScroll();

    return () => window.removeEventListener("scroll", watchScroll);
  }, [isLargeScreen, menuItems]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    // Check if we're still on the same page
    const currentPath = window.location.pathname;
    const initialPath = router.asPath.split("#")[0];

    if (currentPath !== initialPath) {
      return; // We're on a different page
    }

    const element = document.getElementById(id);
    if (element) {
      isScrolling.current = true;
      element.scrollIntoView({ behavior: "smooth" });
      setActiveItemId(id);
      history.replaceState(
        { ...history.state, as: `${currentPath}#${id}` },
        "",
        `${currentPath}#${id}`,
      );
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  return (
    <div className="w-fit">
      <Heading
        level={2}
        size={"xs"}
        className="focus--outline focus--primary focus--in mb-md !text-md text-brown-600"
      >
        {menuHeading}
      </Heading>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`focus--in flex cursor-pointer hyphens-auto p-sm pl-lg text-sm no-underline underline-offset-4 hover:underline ${
                activeItemId === item.id
                  ? "border-l-[0.188rem] border-pink-600 pl-[1.125rem] font-strong"
                  : "focus--underline border-l border-brown-200 font-normal"
              }`}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
