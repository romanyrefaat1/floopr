import LoaderSpinner from "@/components/loader-spinner";
import { Button } from "@/components/ui/button";

const SubmitButton = ({ loading }) => (
  <div className="flex justify-end pt-4">
    <Button
      type="submit"
      disabled={loading}
      className="w-32 h-12 text-lg font-semibold rounded-lg shadow-md bg-primary hover:bg-primary/90 transition-all"
    >
      {loading ? <LoaderSpinner /> : `Create Product`}
    </Button>
  </div>
);

export default SubmitButton;
