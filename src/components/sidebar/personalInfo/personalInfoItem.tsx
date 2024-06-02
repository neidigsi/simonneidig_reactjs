interface PersonalInfoItemObject {
  label: string;
  value: string;
  icon: string;
}

export default function PersonalInfoItem({
  label,
  value,
  icon,
}: PersonalInfoItemObject) {
  return <div className="flex justify-center gap-2"></div>;
}
