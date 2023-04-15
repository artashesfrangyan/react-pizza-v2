import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 345 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="270" rx="10" ry="10" width="280" height="20" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="425" rx="10" ry="10" width="67" height="27" />
    <rect x="127" y="415" rx="10" ry="10" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
