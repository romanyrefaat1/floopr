import { FilterData } from "@/app/(routes)/(code)/products/[id]/page";

export default function getFiltersFromParams(searchParams: FilterData) {
  const filter = searchParams.filter || null;
  const quick = searchParams.quick || null;
  const date = searchParams.date || null;
  const sentiment = searchParams.sentiment || null;
  const topic = searchParams.topic || null;
  return { filter, quick, specifiedDate: date, sentiment, topic };
}