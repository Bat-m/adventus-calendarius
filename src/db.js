import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_PUBLIC_SUPABASE_URL,
  import.meta.env.VITE_PUBLIC_SUPABASE_KEY
);

export default {
  cases: {
    async all() {
      let { data: allCases, error } = await supabase
        .from("calendar")
        .select("*,case(*,day)")
        .order("day", { foreignTable: "case", ascending: true });
      return allCases[0].case;
    }
  },
  calendar: {
    async get() {
      let { data: calendar, error } = await supabase
        .from("calendar")
        .select("*");
      return calendar;
    }
  }
};
