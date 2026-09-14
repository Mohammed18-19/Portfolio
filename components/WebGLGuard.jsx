"use client";

import { useEffect, useState } from "react";

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");

    const gl =
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");

    return !!gl;
  } catch {
    return false;
  }
}

export default function WebGLGuard({ children, fallback = null }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    setStatus(isWebGLAvailable() ? "available" : "unavailable");
  }, []);

  if (status === "checking") {
    return null;
  }

  if (status === "unavailable") {
    return fallback;
  }

  return children;
}
