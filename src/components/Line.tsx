import { SVGProps } from "react";

export const Line = ({
  color = "#ff9b66",
  opacity = 1,
  className,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <div className={className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="32.772 76.808 1015.278 131.204"
      {...props}
    >
      <path
        stroke={color}
        opacity={opacity}
        strokeLinecap="round"
        d="M57.275 155.898c42.169-6.068 96.359-18.735 186.024-26.771 89.665-8.036 67.518 23.525 164.29 22.947 96.772-.578 152.878-25.063 262.639-25.497 109.761-.433 142.928 27.775 221.597 23.585 78.671-4.19 111.692-12.052 122.546-29.781"
        style={{
          fillRule: "nonzero",
          fill: "none",
          paintOrder: "stroke",
          strokeWidth: 34,
          strokeDashoffset: "-6px",
          strokeDasharray: "89,86,55,77",
        }}
      />
    </svg>
  </div>
);
