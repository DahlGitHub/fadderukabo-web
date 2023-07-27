interface GroupCardSvgProps {
  hexValue: string;
}

export const GroupCardSvg: React.FC<GroupCardSvgProps> = ({ hexValue }) => {
  return (
    <>
      <svg id="visual" viewBox="0 0 50 50" width="32" height="32" className="rounded-full">
        <path
          d="M46 50L46 45.8C46 41.7 46 33.3 44.5 25C43 16.7 40 8.3 38.5 4.2L37 0L50 0L50 4.2C50 8.3 50 16.7 50 25C50 33.3 50 41.7 50 45.8L50 50Z"
          fill={hexValue}
          opacity={0.9}
        ></path>
        <path
          d="M41 50L39.3 45.8C37.7 41.7 34.3 33.3 33 25C31.7 16.7 32.3 8.3 32.7 4.2L33 0L38 0L39.5 4.2C41 8.3 44 16.7 45.5 25C47 33.3 47 41.7 47 45.8L47 50Z"
          fill={hexValue}
          opacity={0.97}
        ></path>
        <path
          d="M34 50L31.8 45.8C29.7 41.7 25.3 33.3 24.7 25C24 16.7 27 8.3 28.5 4.2L30 0L34 0L33.7 4.2C33.3 8.3 32.7 16.7 34 25C35.3 33.3 38.7 41.7 40.3 45.8L42 50Z"
          fill={hexValue}
          opacity={0.92}
        ></path>
        <path
          d="M8 50L9.5 45.8C11 41.7 14 33.3 14 25C14 16.7 11 8.3 9.5 4.2L8 0L31 0L29.5 4.2C28 8.3 25 16.7 25.7 25C26.3 33.3 30.7 41.7 32.8 45.8L35 50Z"
          fill={hexValue}
          opacity={0.87}
        ></path>
        <path
          d="M0 50L0 45.8C0 41.7 0 33.3 0 25C0 16.7 0 8.3 0 4.2L0 0L9 0L10.5 4.2C12 8.3 15 16.7 15 25C15 33.3 12 41.7 10.5 45.8L9 50Z"
          fill={hexValue}
          opacity={0.99}
        ></path>
      </svg>
    </>
  );
};
