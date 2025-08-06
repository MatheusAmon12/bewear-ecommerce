import { SVGProps } from "react";

const AdidasIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M32 26.047L20.404 5.953l-6.212 3.583 9.527 16.51H32zm-11.05 0l-7.658-13.26-6.212 3.582 5.59 9.678h8.28zM6.21 19.63l3.702 6.416H1.631L0 23.213l6.21-3.582z"
        fill="#000"
      />
    </svg>
  );
};

export default AdidasIcon;
