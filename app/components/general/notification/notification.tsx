import { JSX, useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface NotificationProps {
  id?: string;
  header: string;
  description: string;
  type?: "success" | "error" | "info";
  autoClose?: boolean;
  autoCloseDelay?: number;
  isVisible: boolean;
}

/**
 * Notification Component
 *
 * A clean notification component that displays messages at the bottom-right of the screen.
 * Supports different types (success, error, info) with auto-close functionality.
 *
 * Features:
 * - Positioned at bottom-right
 * - Clean, minimal design with light grey background
 * - Optional auto-close functionality
 * - Smooth fade-in/fade-out animations
 * - Color-coded by type (subtle styling)
 *
 * Usage:
 * <Notification
 *   header="Success!"
 *   description="Your changes have been saved."
 *   type="success"
 *   autoClose={true}
 *   autoCloseDelay={3000}
 *   isVisible={showNotification}
 * />
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.id="notification"] - The unique ID for the notification.
 * @param {string} props.header - The header/title of the notification.
 * @param {string} props.description - The description/content of the notification.
 * @param {"success" | "error" | "info"} [props.type="info"] - The type of notification for styling.
 * @param {boolean} [props.autoClose=true] - Whether to auto-close the notification.
 * @param {number} [props.autoCloseDelay=3000] - Delay in ms before auto-closing.
 * @param {boolean} props.isVisible - Whether the notification should be visible.
 *
 * @returns {JSX.Element} The rendered notification component.
 */
export default function Notification({
  id = "notification",
  header,
  description,
  type = "info",
  autoClose = true,
  autoCloseDelay = 3000,
  isVisible,
}: Readonly<NotificationProps>): JSX.Element {
  const [show, setShow] = useState(isVisible);

  // Update visibility when isVisible prop changes
  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  // Auto-close functionality
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => setShow(false), autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, autoCloseDelay]);

  if (!show) return <></>;

  // Get border color based on type
  const getBorderColor = () => {
    switch (type) {
      case "success":
        return "border-l-4 border-l-green-500";
      case "error":
        return "border-l-4 border-l-red-500";
      case "info":
      default:
        return "border-l-4 border-l-blue-500";
    }
  };

  const notificationContent = (
    <div
      id={id}
      className={`fixed bottom-6 right-6 w-96 p-4 rounded-lg bg-light-grey dark:bg-slate-700 text-black dark:text-white shadow-lg animate-fade-in ${getBorderColor()}`}
    >
      <div>
        <h3 className="font-semibold text-sm mb-1">{header}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">{description}</p>
      </div>
    </div>
  );

  return createPortal(notificationContent, document.body);
}
