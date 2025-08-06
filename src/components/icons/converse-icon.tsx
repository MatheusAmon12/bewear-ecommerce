import { SVGProps } from "react";

const ConverseIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={32}
      height={28}
      viewBox="0 0 32 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.057 21.643l-.023-5.759 5.514-2.045-5.553-1.819-.116-5.674-3.369 4.578L0 9.226l3.199 4.805-3.123 4.815 5.439-1.802 3.542 4.6z"
        fill="#000"
      />
      <path
        d="M9.746 27.697h9.876L32 14.008 19.562.303h-9.78l11.632 13.685-11.668 13.71z"
        fill="#000"
      />
    </svg>
  );
};

export default ConverseIcon;
