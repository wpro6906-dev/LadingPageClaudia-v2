import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const DEFAULT_VISUAL_CONFIG = JSON.stringify({
  firstName: "Claudia",
  lastName: "Alzate",
  firstNameColor: "#6B4F8A",
  lastNameColor: "#C9A15C",
  subtitleText: "COACH ESPIRITUAL",
  subtitleColor: "#8C7AA6",
  decoratorEnabled: true,
  decoratorIcon: "sun",
  decoratorColor: "#C9A15C",
  tagline1: "Coach de manifestación y abundancia, facilitadora de ceremonias holísticas",
  tagline2: "y guía en procesos de transformación.",
  tagline1Color: "#6B5B7B",
  tagline2Color: "#C9A15C",
  bgOverlay: 0.25,
  bgBlur: 0,
  bgZoom: 1.0,
  bgPosition: "center",
  gradientTop: true,
  gradientBottom: true,
  showDecorLines: true,
  showGlow: true,
  nameLetterSpacing: "0.05em",
  showArrowOnButtons: true,
  showAccentBarOnButtons: true,
  badgeText: "",
  badgeIcon: "sparkles",
  badgeColor: "#C9A15C",
  bgPhrase: "Guío a mujeres a despertar su luz, conectar con su esencia y manifestar una vida plena y en expansión.",
  bgPhraseEnabled: true,
  bgPhraseOpacity: 0.9,
  bgPhraseColor: "#8C6FB0",
  bgPhraseTop: 16,
  bgPhraseRight: 32,
  statsEnabled: true,
  stats: [
    { icon: "handheart", value: "", label: "Vivir bajo la luz", enabled: true },
    { icon: "sparkles", value: "500+", label: "Mujeres Acompañadas", enabled: true },
    { icon: "flower2", value: "10+", label: "Años de Experiencia", enabled: true },
    { icon: "feather", value: "100+", label: "Ceremonias Facilitadas", enabled: true },
  ],
});

export const profileTable = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().default("Claudia Alzate"),
  subtitle: text("subtitle").notNull().default("Coach de manifestación y abundancia"),
  tagline: text("tagline").notNull().default("Guío a mujeres a despertar su luz, conectar con su esencia y manifestar una vida plena y en expansión."),
  logoUrl: text("logo_url"),
  backgroundUrl: text("background_url"),
  primaryColor: text("primary_color").notNull().default("#9B7FC4"),
  goldColor: text("gold_color").notNull().default("#C9A15C"),
  fontTitle: text("font_title").notNull().default("Cormorant Garamond"),
  fontBody: text("font_body").notNull().default("Poppins"),
  visualConfig: text("visual_config"),
});

export const insertProfileSchema = createInsertSchema(profileTable).omit({ id: true });
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profileTable.$inferSelect;
