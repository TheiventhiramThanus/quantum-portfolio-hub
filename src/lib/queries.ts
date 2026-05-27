import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

async function withSupabaseFallback<T>(label: string, query: () => Promise<T>, fallback: T) {
  try {
    return await query();
  } catch (error) {
    console.error(`[Supabase] ${label} query failed`, error);
    return fallback;
  }
}

export const aboutQuery = queryOptions({
  queryKey: ["about"],
  queryFn: () => withSupabaseFallback("about", async () => {
    const { data, error } = await supabase.from("about").select("*").limit(1).maybeSingle();
    if (error) throw error;
    return data;
  }, null),
});

export const achievementsQuery = queryOptions({
  queryKey: ["achievements"],
  queryFn: () => withSupabaseFallback("achievements", async () => {
    const { data, error } = await supabase.from("achievements").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const technologiesQuery = queryOptions({
  queryKey: ["technologies"],
  queryFn: () => withSupabaseFallback("technologies", async () => {
    const { data, error } = await supabase.from("technologies").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const educationQuery = queryOptions({
  queryKey: ["education"],
  queryFn: () => withSupabaseFallback("education", async () => {
    const { data, error } = await supabase.from("education").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const experienceQuery = queryOptions({
  queryKey: ["experience"],
  queryFn: () => withSupabaseFallback("experience", async () => {
    const { data, error } = await supabase.from("experience").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: () => withSupabaseFallback("projects", async () => {
    const { data, error } = await supabase.from("projects").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: () => withSupabaseFallback("services", async () => {
    const { data, error } = await supabase.from("services").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});

export const contactQuery = queryOptions({
  queryKey: ["contact"],
  queryFn: () => withSupabaseFallback("contact", async () => {
    const { data, error } = await supabase.from("contact_details").select("*").limit(1).maybeSingle();
    if (error) throw error;
    return data;
  }, null),
});

export const certificatesQuery = queryOptions({
  queryKey: ["certificates"],
  queryFn: () => withSupabaseFallback("certificates", async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("featured", { ascending: false })
      .order("display_order");
    if (error) throw error;
    return data ?? [];
  }, []),
});
