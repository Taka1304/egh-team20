import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function VisibilitySetting() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">公開設定</h2>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" />
          <Label>非公開</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" />
          <Label>公開</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
