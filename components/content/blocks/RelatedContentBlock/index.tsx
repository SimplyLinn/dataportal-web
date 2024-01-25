import { FC } from "react";
import BookIcon from "@/assets/linkIcons/book.svg";
import CarIcon from "@/assets/linkIcons/car.svg";
import HeartIcon from "@/assets/linkIcons/heart.svg";
import PieChartIcon from "@/assets/linkIcons/pieChart.svg";
import PlanetIcon from "@/assets/linkIcons/planet.svg";
import AIIcon from "@/assets/linkIcons/ai.svg";
import { PromoProps, Promo } from "@/components/content/Promo";

interface RelatedContentProps {
  links: PromoProps[] | any;
  inline?: boolean;
  icons?: boolean;
}

export const RelatedContentBlock: FC<RelatedContentProps> = ({
  links,
  icons,
  inline,
}) => {
  const linkIcons = [
    { icon: BookIcon, slug: "kompetens-och-livslangt-larande" },
    { icon: HeartIcon, slug: "bilddata" },
    { icon: CarIcon, slug: "elektrifieringen-av-transportsektorn" },
    { icon: PlanetIcon, slug: "rymddata" },
    { icon: PieChartIcon, slug: "smart-statistik" },
    { icon: AIIcon, slug: "offentligai" },
  ];

  return (
    <ul
      className={`my-xl grid grid-flow-row auto-rows-fr md:grid-cols-2 ${
        icons ? "gap-xl" : "gap-lg"
      } ${inline && !icons ? "max-w-md" : "lg:grid-cols-3"}`}
    >
      {links.map((link: PromoProps, idx: number) => {
        return (
          <li key={idx}>
            <Promo
              icon={
                icons &&
                linkIcons[
                  linkIcons.findIndex((icon) => icon.slug === link.slug)
                ]?.icon
              }
              link={link}
              inline={inline}
            />
          </li>
        );
      })}
    </ul>
  );
};
