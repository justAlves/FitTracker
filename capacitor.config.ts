import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "br.com.vlgi.capacitive_svelte_template",
  appName: "capacitive-svelte-template",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
  ios: {
    allowWebViewSandbox: true,
  },
  android: {
    allowIntents: [
      {
        action: 'VIEW',
        dataMimeType: '*/*',
        uriIncludePattern: '.*',
        categoryIncludeList: [
          'android.intent.category.BROWSABLE',
          'android.intent.category.DEFAULT',
        ],
      },
    ],
    urlScheme: 'app', // Esquema personalizado do aplicativo
  },
};

export default config;
