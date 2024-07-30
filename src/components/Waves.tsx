import * as React from "react";
import { SVGProps } from "react";
export const WaveBottom = ({
  color = "#a883fd",
  opacity = 0.4,
  className,
}: { color?: string; opacity?: number } & SVGProps<SVGSVGElement>) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill={color}
        fillOpacity={opacity}
        d="m0 192 24 21.3c24 21.7 72 63.7 120 48 48-16.3 96-90.3 144-128 48-37.3 96-37.3 144-16 48 21.7 96 63.7 144 96 48 31.7 96 53.7 144 53.4 48 .3 96-21.7 144-26.7s96 5 144-5.3c48-10.7 96-42.7 144-37.4 48 5.7 96 47.7 144 58.7s96-11 120-21.3l24-10.7v96H0Z"
      />
    </svg>
  </div>
);

export const WaveTop = ({
  color = "#a883fd",
  opacity = 0.4,
  className,
}: { color?: string; opacity?: number } & SVGProps<SVGSVGElement>) => (
  <div className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill={color}
        fillOpacity={opacity}
        d="m0 128 24-5.3c24-5.7 72-15.7 120-16 48 .3 96 10.3 144 10.6 48-.3 96-10.3 144-5.3 48 5 96 27 144 32s96-5 144-16 96-21 144-21.3c48 .3 96 10.3 144 26.6 48 15.7 96 37.7 144 58.7s96 43 144 26.7c48-15.7 96-69.7 120-96l24-26.7V0H0Z"
      />
    </svg>
  </div>
);
