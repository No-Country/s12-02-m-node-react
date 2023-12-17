import React from "react";

function LoadingSkeleton({ className, type }) {
  return (
    <div className={`${className} ${type === 'line' && 'h-6 min-w-[19rem] w-full'} ${type === 'block' && 'h-20 min-w-[19rem] w-full'} ${type === 'cicle' && 'h-6 w-6 rounded-full'} ${type === 'title' && 'h-8 min-w-[19rem] w-full'} ${type === 'img' && 'h-96 w-full'} m-1 bg-secondary-2 animate-pulse rounded-xl`}></div>
  );
}

export default LoadingSkeleton;
