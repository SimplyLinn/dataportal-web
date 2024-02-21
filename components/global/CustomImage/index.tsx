import env from "@beam-australia/react-env";
import { FC } from "react";
import { ImageFragment as ImageInterface } from "@/graphql/__generated__/operations";
import { isExternalLink } from "@/utilities";
import Image from "next/image";
import noImage from "@/assets/logos/noImage.png";

interface CustomImageProps {
  image: ImageInterface | null;
  width?: number;
  sizes?: string;
  className?: string;
}

const isNextStatic = (url: string) =>
  typeof url != "string" || !url.startsWith("/uploads");

export const CustomImage: FC<CustomImageProps> = ({
  image,
  width,
  sizes,
  className,
}) => {
  if (!image) {
    return (
      <Image
        src={noImage}
        width={width || 384}
        height={200}
        alt={"image not found"}
        className={className}
        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 20vw"
        priority
      />
    );
  }

  if (isNextStatic(image.url)) {
    return (
      <Image
        src={image.url}
        width={image.width || 384}
        height={image.height || 200}
        className={className}
        alt={image.alt || ""}
        sizes={
          sizes
            ? sizes
            : `(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 20vw`
        }
        priority
      />
    );
  }

  const src = isExternalLink(image.url)
    ? image.url
    : (env("MEDIA_BASE_URL") || "") + image.url;

  return (
    <Image
      src={src}
      width={width ? width : Number(image.width || "")}
      height={Number(image.height || "")}
      quality={100}
      className={className}
      alt={image.alt || ""}
      sizes={
        sizes
          ? sizes
          : `(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 20vw`
      }
      priority
    />
  );
};
