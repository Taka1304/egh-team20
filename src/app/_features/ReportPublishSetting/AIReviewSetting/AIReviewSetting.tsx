import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AIReviewSetting() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">AIレビュー</h2>
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" />
          <Label>非許可</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" />
          <Label>許可</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
