import { BookOpen, Film, Heart, Palette, LucideIcon } from "lucide-react";
import { Category } from "@/components/FeedFilter";

export const categoryIcons: Record<Exclude<Category, "All">, LucideIcon> = {
  Knowledge: BookOpen,
  Media: Film,
  Hobby: Heart,
  Design: Palette,
};

