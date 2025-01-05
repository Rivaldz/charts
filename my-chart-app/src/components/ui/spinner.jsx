import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-200 border-t-gray-600"></div>
    </div>
  );
}
