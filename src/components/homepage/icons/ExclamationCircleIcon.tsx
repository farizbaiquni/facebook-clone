import { FC } from "react";

interface ExclamationCircleIconProps {
  className?: string;
}

const ExclamationCircleIcon: FC<ExclamationCircleIconProps> = ({
  className,
}) => (
  <svg
    className={className}
    fill="#BC5250"
    stroke="white"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
    />
  </svg>
);

export default ExclamationCircleIcon;
