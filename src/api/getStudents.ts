import { supabase } from "../../supabaseClient";
import { IFilters } from "../types";

export const getStudents = async (
  currentPage: number,
  pageSize: number,
  filters: IFilters,
  searchValue: string
) => {
  let query = supabase
    .from("students")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  if (searchValue) {
    query = query.ilike("name", `%${searchValue}%`);
  }

  if (filters.phoneMin && filters.phoneMax) {
    query = query
      .gte("phone_number", filters.phoneMin)
      .lte("phone_number", filters.phoneMax);
  } else if (filters.phoneMin) {
    query = query.gte("phone_number", filters.phoneMin);
  } else if (filters.phoneMax) {
    query = query.lte("phone_number", filters.phoneMax);
  }

  if (filters.region) {
    query = query.eq("region", filters.region);
  }

  if (filters.course && filters.course?.length > 0) {
    query = query.contains("course_enrolled", filters.course);
  }

  if (filters.createdAt && filters.createdAt?.length === 2) {
    const [startDate, endDate] = filters.createdAt;
    query = query.gte("created_at", startDate).lte("created_at", endDate);
  }

  const offset = (currentPage - 1) * pageSize;

  query = query.range(offset, offset + pageSize - 1);

  const { data, error, count } = await query;
  if (error) return;
  return { data, count };
};
