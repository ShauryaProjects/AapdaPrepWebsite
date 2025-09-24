export const DISASTER_TYPES = {
  earthquake: {
    name: "Earthquake",
    icon: "🏗️",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
  },
  flood: {
    name: "Flood",
    icon: "🌊",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
  },
  fire: {
    name: "Fire",
    icon: "🔥",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
  },
  cyclone: {
    name: "Cyclone",
    icon: "🌪️",
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
  },
  pandemic: {
    name: "Pandemic",
    icon: "🦠",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
  },
} as const

export const SEVERITY_LEVELS = {
  low: {
    name: "Low",
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950",
    borderColor: "border-green-200 dark:border-green-800",
  },
  medium: {
    name: "Medium",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  high: {
    name: "High",
    color: "text-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  critical: {
    name: "Critical",
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
  },
} as const

export const EMERGENCY_CONTACTS = [
  { name: "Fire Department", number: "101", icon: "🚒" },
  { name: "Police", number: "100", icon: "👮" },
  { name: "Ambulance", number: "108", icon: "🚑" },
  { name: "NDMA Helpline", number: "1078", icon: "🏛️" },
  { name: "Disaster Management", number: "1070", icon: "⚠️" },
]
