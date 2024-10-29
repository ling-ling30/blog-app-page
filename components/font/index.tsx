import { Noto_Sans, Roboto } from "next/font/google";
import { Inter, Roboto_Mono } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export const noto_sans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700"],
  style: ["normal", "italic"],
});
