interface BadgeText {
  text: string;
  additionalClasses: string;
}

export default function Badge(badgeText: BadgeText) {
  return (
    <div className={"badge " + badgeText.additionalClasses}>
      {badgeText.text}
    </div>
  );
}
