# Public Assets

## Wymagane pliki

Przed deploymentem dodaj następujące pliki do tego folderu:

### Favicon
- **favicon.ico** (16x16, 32x32, 48x48 multi-resolution ICO)
- **icon.png** (180x180px) - Apple Touch Icon

### Open Graph Image
- **og-image.jpg** (1200x630px) - dla social media sharing

## Jak wygenerować favicon?

### Opcja 1: Online Generator
1. Przejdź do https://realfavicongenerator.net/
2. Upload logo Pauliny od Matematyki
3. Download package
4. Wyciągnij `favicon.ico` i `apple-touch-icon.png` (przemianuj na `icon.png`)

### Opcja 2: ImageMagick (Command Line)
```bash
# Z logo PNG
convert logo.png -resize 180x180 icon.png
convert logo.png -resize 1200x630 og-image.jpg
convert logo.png -define icon:auto-resize=16,32,48 favicon.ico
```

### Opcja 3: Photoshop/Figma
- **icon.png**: 180x180px, PNG, transparent background
- **og-image.jpg**: 1200x630px, JPG, with text/branding
- **favicon.ico**: Export as ICO with multiple sizes

## Brand Colors dla OG Image

Użyj kolorów z brand guide:
- **Primary:** #571A47 (fiolet)
- **Accent:** #EC9A4F (pomarańcz)
- **Background:** #F7EEF4 (jasny fiolet)

## Przykład OG Image Content

```
┌─────────────────────────────────────┐
│                                     │
│   DARMOWY WEBINAR BLACK FRIDAY      │
│   13 listopada 2025                 │
│                                     │
│   Egzamin 8-klasisty 18:00          │
│   Matura z Matematyki 19:30         │
│                                     │
│   [Logo Paulina od Matematyki]      │
│                                     │
└─────────────────────────────────────┘
```

## Kiedy te pliki są używane?

- **favicon.ico** - ikonka w karcie przeglądarki
- **icon.png** - gdy ktoś doda stronę do home screen (mobile)
- **og-image.jpg** - gdy ktoś udostępni link na FB/Twitter/LinkedIn
