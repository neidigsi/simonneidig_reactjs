interface BadgeText {
  text: string;
  additionalClasses: string;
}

export default function Badge(badgeText: Readonly<BadgeText>) {
  return (
    <div className={"badge " + badgeText.additionalClasses}>
      {badgeText.text}
    </div>
  );
}
