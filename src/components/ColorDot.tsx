/**
 * ColorDot - A circular dot with smooth color-changing animation
 * Respects prefers-reduced-motion for accessibility
 */

interface ColorDotProps {
  /** Size in pixels (default: 70) */
  size?: number;
  /** Optional additional CSS classes */
  className?: string;
}

const ColorDot = ({ size = 70, className = '' }: ColorDotProps) => {
  return (
    <span
      className={`color-dot ${className}`}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden="true"
    />
  );
};

export default ColorDot;
