"use client";

import { useEffect, useState } from "react";

function isWebGLAvailable() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");

    const attributes = {
      alpha: true,
      antialias: true,
      depth: true,
      stencil: false,
      failIfMajorPerformanceCaveat: false,
    };

    const gl =
      canvas.getContext("webgl", attributes) ||
      canvas.getContext("experimental-webgl", attributes);

    if (!gl) {
      return false;
    }

    const renderer = gl.getParameter(gl.RENDERER);

    return Boolean(renderer);
  } catch {
    return false;
  }
}

export default function WebGLGuard({ children, fallback = null }) {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    setStatus(isWebGLAvailable() ? "available" : "unavailable");
  }, []);

  if (status !== "available") {
    return fallback;
  }

  return children;
}
