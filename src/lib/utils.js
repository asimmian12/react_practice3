// src/lib/utils.js

/**
 * Utility function to conditionally join class names.
 * This is similar to the popular `classnames` library.
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  