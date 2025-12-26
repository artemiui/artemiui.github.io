import { BookOpen, FileText, Heart, Palette, LucideIcon } from "lucide-react";
import { Category } from "@/components/FeedFilter";

export const categoryIcons: Record<Exclude<Category, "All">, LucideIcon> = {
  Knowledge: BookOpen,
  Essays: FileText,
  Hobby: Heart,
  Design: Palette,
};

