Place high-quality PNG icons here to be used by the web manifest and Apple touch icon.

Recommended sizes and filenames:
- apple-touch-icon.png (180x180) - required by iOS Safari
- icon-192.png (192x192) - Android / PWA small icon
- icon-512.png (512x512) - Android / PWA large icon

You can use a service like https://realfavicongenerator.net/ or a local tool like `sips`/`convert` to generate these sizes from a single high-res source image.

Example (macOS with sips):

  sips -z 180 180 source.png --out apple-touch-icon.png
  sips -z 192 192 source.png --out icon-192.png
  sips -z 512 512 source.png --out icon-512.png

After you add the PNGs, re-run the build and the icons will be copied to the `dist/` output and used by iOS and Android when users add to home screen.