"use client";

import { useRef } from "react";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  strength?: number;
  children: React.ReactNode;
};

/** An anchor that leans toward the pointer. Inert on touch and for reduced motion. */
export function Magnetic({ strength = 0.28, children, className = "", ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    ref.current.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    if (inner.current) inner.current.style.transform = `translate3d(${x * strength * 0.4}px, ${y * strength * 0.4}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
    if (inner.current) inner.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`inline-flex transition-transform duration-500 ease-out-expo motion-reduce:transform-none ${className}`}
      {...rest}
    >
      <span ref={inner} className="inline-flex items-center gap-3 transition-transform duration-500 ease-out-expo">
        {children}
      </span>
    </a>
  );
}
