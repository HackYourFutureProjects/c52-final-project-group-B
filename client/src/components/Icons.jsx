import PropTypes from "prop-types";

const IconPropTypes = {
  fill: PropTypes.string,
  size: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
};

export const MemixLogoIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 110.67"
      height={size || height || 110.67}
      width={size || width || 360}
      {...props}
    >
      <g>
        <path
          fill={fill}
          d="M173.31,66.81c-.24-3.09-.48-6.24-.72-9.44-.24-3.2-.49-6.27-.76-9.2-.27-2.93-.53-5.49-.8-7.68-.27-2.19-.51-3.76-.72-4.72-.21-1.01-.8-1.77-1.76-2.28-.96-.51-2.21-.76-3.76-.76-.85,0-1.72.09-2.6.28-.88.19-1.61.44-2.2.76-1.44,3.41-3.2,7.61-5.28,12.6-2.08,4.99-4.13,10.15-6.16,15.48h-.4c-1.07-2.56-2.19-5.35-3.36-8.36-1.17-3.01-2.37-6-3.6-8.96-1.23-2.96-2.45-5.67-3.68-8.12-.53-1.28-1.32-2.21-2.36-2.8-1.04-.59-2.36-.88-3.96-.88-1.44,0-2.64.23-3.6.68-.96.45-1.65.89-2.08,1.32-.27,2.93-.53,6.19-.8,9.76-.27,3.57-.52,7.19-.76,10.84-.24,3.65-.45,7.11-.64,10.36-.19,3.25-.35,6.04-.48,8.36-.13,2.32-.2,3.88-.2,4.68,0,1.12.35,1.97,1.04,2.56.69.59,1.79.88,3.28.88.69,0,1.37-.08,2.04-.24.67-.16,1.21-.29,1.64-.4.21-3.63.4-7.03.56-10.2.16-3.17.32-6.28.48-9.32.16-3.04.32-6.17.48-9.4.16-3.23.32-6.73.48-10.52h.4c1.07,2.99,2.51,6.69,4.32,11.12,1.81,4.43,3.97,9.47,6.48,15.12.27.75.81,1.28,1.64,1.6.83.32,1.8.48,2.92.48.91,0,1.73-.12,2.48-.36.75-.24,1.33-.55,1.76-.92,2.72-6.67,4.97-12.13,6.76-16.4,1.79-4.27,3.19-7.76,4.2-10.48h.32c.16,2.56.32,5.76.48,9.6s.36,8.07.6,12.68c.24,4.61.52,9.35.84,14.2.11,1.33.56,2.24,1.36,2.72.8.48,1.76.72,2.88.72.91,0,1.68-.09,2.32-.28.64-.19,1.25-.47,1.84-.84-.05-1.49-.16-3.47-.32-5.92s-.36-5.23-.6-8.32Z"
        />
        <path
          fill={fill}
          d="M210.11,45.17c-2.59-1.41-5.56-2.12-8.92-2.12-2.56,0-4.96.43-7.2,1.28-2.24.85-4.19,2.11-5.84,3.76-1.65,1.65-2.96,3.69-3.92,6.12s-1.44,5.21-1.44,8.36c0,4.37.85,8.07,2.56,11.08,1.71,3.01,4.12,5.28,7.24,6.8,3.12,1.52,6.73,2.28,10.84,2.28,2.51,0,4.76-.27,6.76-.8s3.59-1.28,4.76-2.24c1.17-.96,1.76-2.03,1.76-3.2,0-.75-.2-1.44-.6-2.08-.4-.64-.92-1.15-1.56-1.52-1.12.8-2.61,1.55-4.48,2.24-1.87.69-3.92,1.04-6.16,1.04-3.73,0-6.75-.95-9.04-2.84-1.82-1.5-3.04-3.61-3.69-6.3l23.45-3.34c1.17-.11,2.08-.48,2.72-1.12.64-.64.96-1.63.96-2.96,0-3.2-.72-6.05-2.16-8.56s-3.45-4.47-6.04-5.88ZM190.66,61.05c.16-3.59,1.16-6.4,3.01-8.4,1.97-2.13,4.45-3.2,7.44-3.2s5.2.85,6.8,2.56c1.6,1.71,2.48,3.79,2.64,6.24l-19.89,2.8Z"
        />
        <path
          fill={fill}
          d="M274.67,44.45c-2.21-.93-4.73-1.4-7.56-1.4-2.99,0-5.6.51-7.84,1.52-1.71.77-3.22,1.66-4.52,2.65-1.17-1.22-2.66-2.21-4.52-2.93-2.13-.83-4.53-1.24-7.2-1.24-2.4,0-4.77.35-7.12,1.04-2.35.69-4.29,1.55-5.84,2.56-1.07.69-1.85,1.44-2.36,2.24-.51.8-.76,1.79-.76,2.96v26.48c0,1.33.37,2.29,1.12,2.88.75.59,1.87.88,3.36.88.8,0,1.53-.07,2.2-.2.67-.13,1.19-.28,1.56-.44v-29.44c.91-.59,2.04-1.12,3.4-1.6,1.36-.48,2.79-.72,4.28-.72,2.19,0,3.96.56,5.32,1.68,1.36,1.12,2.04,2.85,2.04,5.2v21.76c0,1.33.36,2.29,1.08,2.88.72.59,1.85.88,3.4.88.8,0,1.55-.07,2.24-.2.69-.13,1.2-.28,1.52-.44v-25.76c0-.99-.13-1.92-.34-2.8,1-.87,2.11-1.6,3.34-2.16,1.52-.69,3.11-1.04,4.76-1.04,2.24,0,4.03.56,5.36,1.68,1.33,1.12,2,2.85,2,5.2v21.76c0,1.33.36,2.29,1.08,2.88.72.59,1.85.88,3.4.88.75,0,1.47-.07,2.16-.2.69-.13,1.2-.28,1.52-.44v-25.2c0-3.04-.63-5.53-1.88-7.48-1.25-1.95-2.99-3.39-5.2-4.32Z"
        />
        <path
          fill={fill}
          d="M297.35,27.93c-1.39,0-2.56.45-3.52,1.36-.96.91-1.44,2.05-1.44,3.44s.48,2.47,1.44,3.4c.96.93,2.13,1.4,3.52,1.4,1.49,0,2.69-.47,3.6-1.4.91-.93,1.36-2.07,1.36-3.4s-.45-2.53-1.36-3.44c-.91-.91-2.11-1.36-3.6-1.36Z"
        />
        <path
          fill={fill}
          d="M297.11,43.85c-.8,0-1.56.07-2.28.2-.72.13-1.24.25-1.56.36v33.92c0,1.33.37,2.29,1.12,2.88.75.59,1.87.88,3.36.88.8,0,1.53-.07,2.2-.2.67-.13,1.19-.28,1.56-.44v-33.76c0-1.44-.36-2.44-1.08-3-.72-.56-1.83-.84-3.32-.84Z"
        />
        <path
          fill={fill}
          d="M337.75,69.69c-1.85-2.34-3.67-4.72-5.48-7.1,1.26-1.49,2.51-2.98,3.8-4.5,1.76-2.08,3.47-4.16,5.12-6.24.85-1.01,1.45-1.85,1.8-2.52.35-.67.52-1.4.52-2.2,0-1.07-.43-1.92-1.28-2.56-.85-.64-2-.96-3.44-.96h-.48c-.16,0-.35.03-.56.08-1.97,2.83-3.89,5.45-5.76,7.88-1.45,1.89-3.01,3.89-4.63,5.96-1.07-1.4-2.12-2.8-3.13-4.24-1.65-2.35-3.25-4.53-4.8-6.56-.69-.96-1.36-1.72-2-2.28-.64-.56-1.52-.84-2.64-.84s-2.05.39-2.8,1.16c-.75.77-1.25,1.8-1.52,3.08,2.13,2.67,4.23,5.29,6.28,7.88,1.74,2.19,3.6,4.43,5.55,6.71-1.23,1.5-2.47,3-3.75,4.49-2.03,2.37-3.97,4.79-5.84,7.24-.91,1.07-1.51,1.89-1.8,2.48-.29.59-.44,1.2-.44,1.84,0,1.01.41,1.87,1.24,2.56.83.69,2.01,1.04,3.56,1.04h1.28c1.92-2.67,3.88-5.37,5.88-8.12,1.54-2.12,3.06-4.19,4.55-6.23.98,1.35,1.98,2.74,3.01,4.19,1.65,2.35,3.23,4.59,4.72,6.72.85,1.12,1.65,1.99,2.4,2.6.75.61,1.68.92,2.8.92,1.23,0,2.23-.36,3-1.08.77-.72,1.21-1.72,1.32-3-2.13-2.83-4.29-5.63-6.48-8.4Z"
        />
      </g>
      <g>
        <rect
          fill="#35393d"
          x="21.66"
          y="21.2"
          width="86.93"
          height="71.46"
          rx="10.38"
          ry="10.38"
          transform="translate(-1.64 111.92) rotate(-80.63)"
        />
        <path
          fill="#bfe8ec"
          d="M33.26,91.16c-2.95-.65-4.87-3.49-4.38-6.48l10.84-65.69c.25-1.5,1.06-2.81,2.3-3.7s2.74-1.24,4.24-.99l50.43,8.32c.1.02.21.04.31.06,2.95.65,4.87,3.49,4.38,6.48l-10.84,65.69c-.25,1.5-1.06,2.81-2.3,3.7-1.23.88-2.74,1.24-4.24.99l-50.43-8.32c-.1-.02-.21-.04-.31-.06Z"
        />
        <rect
          fill="#35393d"
          x="17.51"
          y="7.9"
          width="72.91"
          height="88.68"
          rx="10.38"
          ry="10.38"
          transform="translate(-2.65 2.89) rotate(-2.99)"
        />
        <path
          fill="#e7fe55"
          d="M29.68,93.32c-3.08,0-5.62-2.42-5.78-5.5l-3.54-67.83c-.08-1.55.45-3.03,1.48-4.19,1.04-1.15,2.46-1.83,4.01-1.91l52.07-2.72c.11,0,.21,0,.32,0,3.08,0,5.62,2.42,5.78,5.5l3.54,67.83c.08,1.55-.45,3.03-1.48,4.19-1.04,1.15-2.46,1.83-4.01,1.91l-52.07,2.72c-.11,0-.21,0-.32,0Z"
        />
        <circle fill="#35393d" cx="40.2" cy="30.33" r="3.63" />
        <circle fill="#35393d" cx="65.8" cy="29.01" r="3.63" />
        <rect
          fill="#35393d"
          x="32.65"
          y="58.15"
          width="43.99"
          height="4"
          rx="1.83"
          ry="1.83"
          transform="translate(-3.03 2.9) rotate(-2.96)"
        />
        <rect
          fill="#35393d"
          x="32.64"
          y="68.86"
          width="37.93"
          height="4"
          rx="1.83"
          ry="1.83"
          transform="translate(-3.59 2.76) rotate(-2.96)"
        />
        <rect
          fill="#35393d"
          x="33.19"
          y="79.72"
          width="26.89"
          height="4"
          rx="1.83"
          ry="1.83"
          transform="translate(-4.15 2.52) rotate(-2.96)"
        />
        <path
          fill="#35393d"
          d="M60.64,38.39c-.26.24-.51.5-.78.73-1.76,1.59-4.09,2.52-6.46,2.59-2.69.08-5.26-.99-7.3-2.71-.87-.73-2.04-1.42-3.15-.7-.76.5-1.1,1.55-.77,2.39.15.39.42.72.7,1.03,2.7,2.99,6.77,4.71,10.8,4.55,4.03-.16,7.95-2.18,10.41-5.38.25-.33.49-.67.61-1.07.13-.43.11-.89-.04-1.31-.19-.52-.59-.97-1.1-1.17-.68-.25-1.45-.04-2.06.35-.31.2-.59.43-.85.68Z"
        />
      </g>
    </svg>
  );
};

MemixLogoIcon.propTypes = IconPropTypes;

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

export const AddIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 512}
      fill={fill}
      viewBox="0 0 512 512"
      width={size || width || 512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M417.4,224H288V94.6c0-16.9-14.3-30.6-32-30.6c-17.7,0-32,13.7-32,30.6V224H94.6C77.7,224,64,238.3,64,256  c0,17.7,13.7,32,30.6,32H224v129.4c0,16.9,14.3,30.6,32,30.6c17.7,0,32-13.7,32-30.6V288h129.4c16.9,0,30.6-14.3,30.6-32  C448,238.3,434.3,224,417.4,224z" />
    </svg>
  );
};

AddIcon.propTypes = IconPropTypes;

export const LockedIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={fill}
      viewBox="0 0 512 512"
      height={size || height || 512}
      width={size || width || 512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path d="M380,450H143a15,15,0,0,1-15-15V213.66a15,15,0,0,1,15-15H380a15,15,0,0,1,15,15V435A15,15,0,0,1,380,450ZM158,420H365V228.66H158Z" />
        <path d="M351.66,228.66H171.41a15,15,0,0,1-15-15V153.12a105.13,105.13,0,0,1,210.25,0v60.54A15,15,0,0,1,351.66,228.66Zm-165.25-30H336.66V153.12a75.13,75.13,0,0,0-150.25,0Z" />
        <path d="M261.54,352.67a46.5,46.5,0,1,1,46.5-46.5A46.55,46.55,0,0,1,261.54,352.67Zm0-63a16.5,16.5,0,1,0,16.5,16.5A16.52,16.52,0,0,0,261.54,289.67Z" />
        <path d="M261.54,389a15,15,0,0,1-15-15V337.67a15,15,0,1,1,30,0V374A15,15,0,0,1,261.54,389Z" />
      </g>
    </svg>
  );
};

LockedIcon.propTypes = IconPropTypes;

export const UnlockedIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={fill}
      viewBox="0 0 512 512"
      height={size || height || 512}
      width={size || width || 512}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path d="M380,450H143a15,15,0,0,1-15-15V213.66a15,15,0,0,1,15-15H380a15,15,0,0,1,15,15V435A15,15,0,0,1,380,450ZM158,420H365V228.66H158Z" />
        <path d="M351.66,228.66H171.41a15,15,0,0,1,0-30H336.66V153.12a75.13,75.13,0,0,0-150.25,0,15,15,0,0,1-30,0,105.13,105.13,0,0,1,210.25,0v60.54A15,15,0,0,1,351.66,228.66Z" />
        <path d="M261.54,352.67a46.5,46.5,0,1,1,46.5-46.5A46.55,46.55,0,0,1,261.54,352.67Zm0-63a16.5,16.5,0,1,0,16.5,16.5A16.52,16.52,0,0,0,261.54,289.67Z" />
        <path d="M261.54,389a15,15,0,0,1-15-15V337.67a15,15,0,1,1,30,0V374A15,15,0,0,1,261.54,389Z" />
      </g>
    </svg>
  );
};

UnlockedIcon.propTypes = IconPropTypes;

export const WrongIcon = ({
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
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  );
};

WrongIcon.propTypes = IconPropTypes;

export const CorrectIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title />
      <g id="Complete">
        <g id="tick">
          <polyline
            fill="none"
            points="3.7 14.3 9.6 19 20.3 5"
            stroke={fill}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        </g>
      </g>
    </svg>
  );
};

CorrectIcon.propTypes = IconPropTypes;

export const UserIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 448 512"
      fill={fill}
      height={size || height || 24}
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
    </svg>
  );
};

UserIcon.propTypes = IconPropTypes;

export const MailIcon = ({
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
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
};

MailIcon.propTypes = IconPropTypes;
