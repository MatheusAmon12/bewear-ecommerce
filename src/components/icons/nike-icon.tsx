import { SVGProps } from "react";

const NikeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_356_5308)">
        <path
          d="M32 10.4L8.59 20.368c-1.942.822-3.572 1.233-4.891 1.233-1.493 0-2.576-.523-3.25-1.569-.422-.672-.546-1.524-.373-2.557.175-1.033.635-2.135 1.382-3.304.622-.947 1.643-2.191 3.062-3.734a8.132 8.132 0 00-1.045 2.464c-.373 1.593-.037 2.763 1.008 3.51.498.348 1.182.522 2.053.522.696 0 1.48-.112 2.352-.336L32 10.4z"
          fill="#000"
        />
      </g>
      <defs>
        <clipPath id="clip0_356_5308">
          <path fill="#fff" d="M0 0H32V32H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NikeIcon;
