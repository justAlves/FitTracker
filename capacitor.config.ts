import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.vlgi.capacitive_svelte_template",
  appName: "FitTracker",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "icon",
      iconColor: "#4ec231",
      sound: "beep.wav",
    },
  },

};

export default config;
