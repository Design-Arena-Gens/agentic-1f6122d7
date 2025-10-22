import { Domain } from "@/types";

export const domainConfig: Record<Domain, { label: string; gradient: string; text: string; border: string }> = {
  fitness: {
    label: "Performance",
    gradient: "bg-gradient-to-tr from-fitness-500/20 via-fitness-500/10 to-fitness-500/60",
    text: "text-fitness-500",
    border: "border-fitness-500/40"
  },
  therapy: {
    label: "Therapy",
    gradient: "bg-gradient-to-tr from-therapy-500/20 via-therapy-500/10 to-therapy-500/60",
    text: "text-therapy-500",
    border: "border-therapy-500/40"
  },
  education: {
    label: "Learning",
    gradient: "bg-gradient-to-tr from-education-500/20 via-education-500/10 to-education-500/60",
    text: "text-education-500",
    border: "border-education-500/40"
  }
};
