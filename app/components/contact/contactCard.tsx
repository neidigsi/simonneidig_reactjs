// Import internal dependencies
import Card from "@/components/general/card";

export default function ContactCard() {
  return (
    <Card headline="Contact">
      <div className="grid grid-cols-1 gap-2 w-full rounded-xl p-5 bg-dark-grey/20 text-base">
        Would you like to get in touch with me? I look forward to your message!
      </div>
    </Card>
  );
}
