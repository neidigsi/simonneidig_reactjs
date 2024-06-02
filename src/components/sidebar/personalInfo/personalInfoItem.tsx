import Badge from "@/components/general/badge";

interface PersonalInfoItemObject {
  label: string;
  value: string;
  icon: React.ReactNode;
}

export default function PersonalInfoItem({
  label,
  value,
  icon,
}: PersonalInfoItemObject) {
  return (
    <div className="grid grid-cols-4 w-full my-1 gap-2">
      <div className="grid col-span-1 items-center justify-items-center ">
        <div className=" bg-white text-primary rounded-lg drop-shadow-xl">
          <div className="m-3">
            <div className="size-7">{icon}</div>
          </div>
        </div>
      </div>
      <div className="col-span-3 my-2">
        <div className="text-dark-grey col-span-4 text-sm">{label}</div>
        <div className="">{value}</div>
      </div>
    </div>
  );
}
