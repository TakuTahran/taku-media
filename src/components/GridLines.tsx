"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "taku-grid-lines";
const EVENT = "taku:grid-toggle";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) !== "off";
}

function getServerSnapshot() {
  return true;
}

type GridLinesProps = {
  className?: string;
};

export function GridLines({ className = "" }: GridLinesProps) {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!visible) return null;

  const cols = Array.from({ length: 13 }, (_, i) => i);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
    >
      <div className="site-grid h-full">
        <div className="relative h-full">
          {cols.map((i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-[var(--rule)]"
              style={{
                left:
                  i === 0
                    ? "0%"
                    : i === 12
                      ? "100%"
                      : `calc((100% - 11 * var(--grid-gutter)) / 12 * ${i} + var(--grid-gutter) * ${i})`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function GridDebugToggle() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <button
      type="button"
      className="fixed bottom-4 right-4 z-50 border border-[var(--rule-strong)] bg-[var(--surface)] px-3 py-2 text-[length:var(--text-xs)] text-[var(--ink-muted)]"
      onClick={() => {
        const next = window.localStorage.getItem(STORAGE_KEY) === "off";
        window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
        window.dispatchEvent(new Event(EVENT));
      }}
    >
      Toggle grid
    </button>
  );
}
