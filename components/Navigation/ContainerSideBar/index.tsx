import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RelatedContainerFragment } from "@/graphql/__generated__/operations";
import { Button } from "@/components/global/Button";
import CloseCrossIcon from "@/assets/icons/closeCross.svg";
import HamburgerIcon from "@/assets/icons/hamburger.svg";

interface ContainerDpDwnProps {
  related: RelatedContainerFragment[];
  domain?: DiggDomain;
}

const ContainerSideBar: React.FC<ContainerDpDwnProps> = ({
  related,
  domain,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    return () => {
      window.addEventListener("resize", () => setExpanded(false));
      window.addEventListener("scroll", () => setExpanded(false));
    };
  });

  const { asPath } = useRouter() || {};

  const isActive = (url: string) => {
    return asPath === url;
  };

  return (
    <div
      className={`row-start-1 xl:static xl:col-span-1 xl:col-start-1 xl:row-span-2 xl:flex ${
        expanded
          ? `fixed left-none top-none h-screen w-screen overflow-hidden bg-brown-800 px-md py-lg
           md:relative md:w-fit md:bg-transparent md:p-none md:py-none xl:static`
          : "flex"
      }`}
    >
      <Button
        iconPosition="left"
        icon={expanded ? CloseCrossIcon : HamburgerIcon}
        label={related[0].name}
        onClick={() => setExpanded(!expanded)}
        className={`w-full md:w-[320px] xl:hidden`}
      />
      <ul
        className={`flex w-full flex-col bg-white  md:absolute md:w-[320px] xl:relative xl:flex xl:bg-transparent ${
          expanded
            ? "mt-md h-fit max-h-[calc(100vh-92px)] overflow-y-scroll md:mt-none md:max-h-[calc(100vh-228px)]"
            : "hidden"
        }`}
      >
        {related.map(({ name, slug }) => {
          const url = `${domain ? "/" + domain : ""}${slug}`;
          return (
            <li
              className={`${
                isActive(url) ? " bg-brown-900 text-white" : "text-brown-600"
              }`}
              key={slug}
            >
              <Link
                href={url}
                className={`inline-flex w-full px-md py-sm no-underline ${
                  isActive(url) ? "cursor-default" : "hover:underline"
                }`}
                aria-disabled={isActive(url)}
                onClick={() =>
                  setTimeout(() => {
                    setExpanded(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 300)
                }
                scroll={false}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContainerSideBar;
