import PropTypes from "prop-types";

const IconPropTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

export const CardsIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 256 256"
      height={size || height || 256}
      width={size || width || 256}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        fill="none"
        height={size || height || 256}
        width={size || width || 256}
      />
      <rect
        fill="none"
        height="128"
        rx="8"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="20"
        width="160"
        x="28"
        y="84"
      />
      <path
        d="M64,44H220a8,8,0,0,1,8,8V176"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="20"
      />
    </svg>
  );
};

CardsIcon.propTypes = IconPropTypes;

export const LightBulbIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 50}
      viewBox="0 0 50 50"
      width={size || width || 50}
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18,39v4c0,1.1,0.9,2,2,2h10  c1.1,0,2-0.9,2-2v-4H18z"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <rect
        fill="none"
        height={size || height || 50}
        width={size || width || 50}
      />
      <path
        d="M32,39c0-1,0-4.021,0-6  c0-5.385,7-5.568,7-15c0-7.733-6.268-14-14-14s-14,6.267-14,14c0,9.633,7,10.692,7,15c0,1.305,0,6,0,6"
        fill="none"
        stroke={fill}
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <path
        d="M28,45c0,1.656-1.344,3-3,3  s-3-1.344-3-3"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
      <line
        fill="none"
        stroke={fill}
        strokeMiterlimit="10"
        strokeWidth="3"
        x1="25"
        x2="25"
        y1="23"
        y2="36"
      />
      <polyline
        fill="none"
        points="21,19 25,23 29,19"
        stroke={fill}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      />
    </svg>
  );
};

LightBulbIcon.propTypes = IconPropTypes;

export const PencilIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 32 32"
      height={size || height || 32}
      width={size || width || 32}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          fill={fill}
          d="M2,31a1,1,0,0,1-1-1.11l.9-8.17a1,1,0,0,1,.29-.6L21.27,2.05a3.56,3.56,0,0,1,5.05,0L30,5.68a3.56,3.56,0,0,1,0,5.05L10.88,29.8a1,1,0,0,1-.6.29L2.11,31Zm8.17-1.91h0ZM3.86,22.28l-.73,6.59,6.59-.73L28.54,9.31a1.58,1.58,0,0,0,0-2.22L24.91,3.46a1.58,1.58,0,0,0-2.22,0Z"
        />
        <path
          fill={fill}
          d="M26.52,13.74a1,1,0,0,1-.7-.29L18.55,6.18A1,1,0,0,1,20,4.77L27.23,12a1,1,0,0,1,0,1.41A1,1,0,0,1,26.52,13.74Z"
        />
        <rect
          fill={fill}
          height="2"
          transform="translate(-7.91 15.47) rotate(-45)"
          width="12.84"
          x="8.29"
          y="16.28"
        />
      </g>
    </svg>
  );
};

PencilIcon.propTypes = IconPropTypes;

export const BookMarkIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 96 96"
      height={size || height || 96}
      width={size || width || 96}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M78-.0011H18a5.9965,5.9965,0,0,0-6,6v84a6.0015,6.0015,0,0,0,9.75,4.6875L48,73.6805,74.25,94.6864A6.0015,6.0015,0,0,0,84,89.9989v-84A5.9965,5.9965,0,0,0,78-.0011ZM72,77.5125,51.75,61.3114a6.0134,6.0134,0,0,0-7.5,0L24,77.5125V11.9989H72Z" />
    </svg>
  );
};

BookMarkIcon.propTypes = IconPropTypes;

export const ShareIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 512}
      viewBox="0 0 512 512"
      width={size || width || 512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="55"
        d="M336,192h40a40,40,0,0,1,40,40V424a40,40,0,0,1-40,40H136a40,40,0,0,1-40-40V232a40,40,0,0,1,40-40h40"
      />
      <polyline
        points="336 128 256 48 176 128"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="55"
      />
      <line
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="55"
        x1="256"
        x2="256"
        y1="321"
        y2="48"
      />
    </svg>
  );
};

ShareIcon.propTypes = IconPropTypes;

export const MoreIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 12C8 13.1046 7.10457 14 6 14C4.89543 14 4 13.1046 4 12C4 10.8954 4.89543 10 6 10C7.10457 10 8 10.8954 8 12Z"
        fill={fill}
      />
      <path
        d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
        fill={fill}
      />
      <path
        d="M18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12C16 13.1046 16.8954 14 18 14Z"
        fill={fill}
      />
    </svg>
  );
};

MoreIcon.propTypes = IconPropTypes;

export const DeleteIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      id="Icons"
      height={size || height || 24}
      width={size || width || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill={fill}
        d="M13,0H11A3,3,0,0,0,8,3V4H2A1,1,0,0,0,2,6H3V20a4,4,0,0,0,4,4H17a4,4,0,0,0,4-4V6h1a1,1,0,0,0,0-2H16V3A3,3,0,0,0,13,0ZM10,3a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V4H10Zm9,17a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6H19Z"
      />
      <path
        fill={fill}
        d="M12,9a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V10A1,1,0,0,0,12,9Z"
      />
      <path fill={fill} d="M15,18a1,1,0,0,0,2,0V10a1,1,0,0,0-2,0Z" />
      <path
        fill={fill}
        d="M8,9a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V10A1,1,0,0,0,8,9Z"
      />
    </svg>
  );
};

DeleteIcon.propTypes = IconPropTypes;
