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

export const DarkModeIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      height={size || height || 24}
      width={size || width || 24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title />
      <path
        d="M20.21,15.32A8.56,8.56,0,1,1,11.29,3.5a.5.5,0,0,1,.51.28.49.49,0,0,1-.09.57A6.46,6.46,0,0,0,9.8,9a6.57,6.57,0,0,0,9.71,5.72.52.52,0,0,1,.58.07A.52.52,0,0,1,20.21,15.32Z"
        fill={fill}
      />
    </svg>
  );
};

DarkModeIcon.propTypes = IconPropTypes;

export const LightModeIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={fill}
      viewBox="0 0 24 24"
      height={size || height || 24}
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M21,13H20a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Z" />
      <path d="M4,13H3a1,1,0,0,1,0-2H4a1,1,0,0,1,0,2Z" />
      <path d="M17.66,7.34A1,1,0,0,1,17,7.05a1,1,0,0,1,0-1.41l.71-.71a1,1,0,1,1,1.41,1.41l-.71.71A1,1,0,0,1,17.66,7.34Z" />
      <path d="M5.64,19.36a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.41L5.64,17a1,1,0,0,1,1.41,1.41l-.71.71A1,1,0,0,1,5.64,19.36Z" />
      <path d="M12,5a1,1,0,0,1-1-1V3a1,1,0,0,1,2,0V4A1,1,0,0,1,12,5Z" />
      <path d="M12,22a1,1,0,0,1-1-1V20a1,1,0,0,1,2,0v1A1,1,0,0,1,12,22Z" />
      <path d="M6.34,7.34a1,1,0,0,1-.7-.29l-.71-.71A1,1,0,0,1,6.34,4.93l.71.71a1,1,0,0,1,0,1.41A1,1,0,0,1,6.34,7.34Z" />
      <path d="M18.36,19.36a1,1,0,0,1-.7-.29L17,18.36A1,1,0,0,1,18.36,17l.71.71a1,1,0,0,1,0,1.41A1,1,0,0,1,18.36,19.36Z" />
    </svg>
  );
};

LightModeIcon.propTypes = IconPropTypes;

export const SearchIcon = ({
  fill = "currentColor",
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      fill={fill}
      height={size || height || 32}
      width={size || width || 32}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" />
    </svg>
  );
};

SearchIcon.propTypes = IconPropTypes;
