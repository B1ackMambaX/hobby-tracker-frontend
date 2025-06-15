import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
    theme_color: "#d5f8ef",
    background_color: "#d5f8ef",
    icons: [
        {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png"
        },
        {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png"
        }
    ],
    orientation: "portrait",
    display: "standalone",
    dir: "ltr",
    lang: "ru-RU",
    name: "TravelTracker",
    short_name: "TravelTracker",
    start_url: "https://traveltracker.ru/",
    scope: "/",
    description: "TravelTracker делает планирование поездки по Уралу быстрым, понятным и вдохновляющим, сохраняя полный контроль над бюджетом и списком дел"
}

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        VitePWA({
            registerType: "autoUpdate",
            manifest,
            workbox: {
                globPatterns: ["**/*.{html,css,js,png,jpg,webp,svg,woff2}"],
                navigateFallback: '/index.html',
                navigateFallbackDenylist: [
                    /\/api\//,
                    /\/login/,
                    /\/auth/,
                    /\/signup/,
                    /\/register/,
                    /\/profile/,
                    /\/account/
                ],
                runtimeCaching: [
                    {
                        urlPattern: /\/api\//,
                        handler: 'NetworkOnly',
                        options: {
                            cacheName: 'no-api-cache',
                        },
                    },
                    {
                        urlPattern: /\/(login|signup|register|auth|account|profile)/,
                        handler: 'NetworkOnly',
                        options: {
                            cacheName: 'no-auth-pages',
                        },
                    },
                ]
            }
        })
    ]
});
