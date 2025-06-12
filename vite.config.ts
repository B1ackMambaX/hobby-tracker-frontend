import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import {ManifestOptions, VitePWA} from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> = {
    "theme_color": "#d5f8ef",
    "background_color": "#d5f8ef",
    "icons": [{
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "icon512_maskable.png",
        "type": "image/png"
    }, {"purpose": "any", "sizes": "512x512", "src": "icon512_rounded.png", "type": "image/png"}],
    "orientation": "portrait",
    "display": "standalone",
    "dir": "ltr",
    "lang": "ru-RU",
    "name": "TravelTracker",
    "short_name": "TravelTracker",
    "start_url": "https://traveltracker.ru/",
    "description": "TravelTracker делает планирование поездки по Уралу быстрым, понятным и вдохновляющим, сохраняя полный контроль над бюджетом и списком дел"
}

export default defineConfig({
    plugins: [react(), tsconfigPaths(), VitePWA({
        registerType: "autoUpdate",
        workbox: {
            globPatterns: ["**/*{html,css,js,png,jpg,gif,webp,svg,woff,woff2,ico}"]
        },
        manifest
    })],
})
