export default defineConfig({
  plugins: [react()],
  base: '/FrontendMonitoringApp/',  // ✅ wajib buat GitHub Pages
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
