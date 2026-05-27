import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const aboutQuery = queryOptions({
  queryKey: ["about"],
  queryFn: async () => {
    const { data, error } = await supabase.from("about").select("*").limit(1).maybeSingle();
    if (error) throw error;
    return data;
  },
});

export const achievementsQuery = queryOptions({
  queryKey: ["achievements"],
  queryFn: async () => {
    const { data, error } = await supabase.from("achievements").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const technologiesQuery = queryOptions({
  queryKey: ["technologies"],
  queryFn: async () => {
    const { data, error } = await supabase.from("technologies").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const educationQuery = queryOptions({
  queryKey: ["education"],
  queryFn: async () => {
    const { data, error } = await supabase.from("education").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const experienceQuery = queryOptions({
  queryKey: ["experience"],
  queryFn: async () => {
    const { data, error } = await supabase.from("experience").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: async () => {
    const { data, error } = await supabase.from("projects").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const servicesQuery = queryOptions({
  queryKey: ["services"],
  queryFn: async () => {
    const { data, error } = await supabase.from("services").select("*").order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});

export const contactQuery = queryOptions({
  queryKey: ["contact"],
  queryFn: async () => {
    const { data, error } = await supabase.from("contact_details").select("*").limit(1).maybeSingle();
    if (error) throw error;
    return data;
  },
});

export const certificatesQuery = queryOptions({
  queryKey: ["certificates"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .order("featured", { ascending: false })
      .order("display_order");
    if (error) throw error;
    return data ?? [];
  },
});