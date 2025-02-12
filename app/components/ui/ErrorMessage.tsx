import React from "react";

export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="my-4 bg-red-400 p-3 text-center text-sm font-bold uppercase text-white">
      {children}
    </p>
  );
}
