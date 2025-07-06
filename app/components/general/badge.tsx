interface BadgeText {
  text: string;
  additionalClasses: string;
}

/**
 * Badge Component
 *
 * Displays a styled badge with customizable text and additional CSS classes.
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @param {Object} badgeText - The badge properties.
 * @param {string} badgeText.text - The text to display inside the badge.
 * @param {string} badgeText.additionalClasses - Additional CSS classes for styling.
 *
 * @returns {JSX.Element} The rendered badge component.
 */
export default function Badge(badgeText: Readonly<BadgeText>) {
  return (
    <div className={"badge " + badgeText.additionalClasses}>
      {badgeText.text}
    </div>
  );
}
