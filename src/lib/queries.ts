import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { cvExperience, cvEducation, cvAchievements } from "./cvData";

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
    const supabaseData = data ?? [];
    // Smart dedup: check if the Supabase title keywords overlap with CV title
    const filtered = supabaseData.filter(d => {
      const dWords = d.title.toLowerCase().split(/[\s|,()–-]+/).filter(Boolean);
      return !cvAchievements.some(c => {
        const cWords = c.title.toLowerCase().split(/[\s|,()–-]+/).filter(Boolean);
        // If 2+ meaningful keywords match, consider it a duplicate
        const overlap = cWords.filter(w => w.length > 3 && dWords.includes(w));
        return overlap.length >= 1;
      });
    });
    const merged = [...cvAchievements, ...filtered];
    return merged.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
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
    
    // Map over Supabase data and inject the detailed month/year from CV if it matches
    const mappedData = (data ?? []).map(edu => {
      const degLower = edu.degree.toLowerCase();
      const match = cvEducation.find(c => {
        const cvLower = c.degree.toLowerCase();
        // Match on distinctive keywords
        if (degLower.includes("software engineering") && cvLower.includes("software engineering") && (degLower.includes("bachelor") || degLower.includes("beng")) && (cvLower.includes("bachelor") || cvLower.includes("beng"))) return true;
        if (degLower.includes("hnd") && cvLower.includes("hnd")) return true;
        if (degLower.includes("advanced certificate") && cvLower.includes("advanced certificate")) return true;
        if (degLower.includes("advanced level") && cvLower.includes("advanced level")) return true;
        if (degLower.includes("ordinary level") && cvLower.includes("ordinary level")) return true;
        return false;
      });
      if (match) {
        let updatedDescription = edu.description;
        let updatedGrade = edu.grade;
        // Fix the Bachelor degree specifically
        if (degLower.includes("bachelor") || degLower.includes("beng") || degLower.includes("software engineering")) {
          if (updatedDescription && updatedDescription.includes("Currently studying")) {
            updatedDescription = updatedDescription.replace("Currently studying", "Completed");
          }
          if (updatedGrade === "Completed" || !updatedGrade) {
            updatedGrade = "First Class Honours";
          }
        }
        return { ...edu, period: match.period, description: updatedDescription, grade: updatedGrade };
      }
      return edu;
    });

    return mappedData;
  },
});

export const experienceQuery = queryOptions({
  queryKey: ["experience"],
  queryFn: async () => {
    const { data, error } = await supabase.from("experience").select("*").order("display_order");
    if (error) throw error;
    const supabaseData = data ?? [];
    const filteredSupabaseData = supabaseData.filter(d => d.title !== "Digital Advertising Specialist");
    const merged = [...cvExperience, ...filteredSupabaseData.filter(d => !cvExperience.some(c => c.title === d.title))];
    return merged.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
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