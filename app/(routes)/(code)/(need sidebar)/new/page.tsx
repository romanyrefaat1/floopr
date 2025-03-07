import { redirect } from "next/navigation";

export default function New() {
    redirect("/new/step-one");
  return null;
}
