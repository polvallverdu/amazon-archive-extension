#!/bin/bash

# Script to generate all icon versions from public/logo.png
# Requires ImageMagick to be installed

set -e  # Exit on any error

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ Error: ImageMagick is not installed!"
    echo "Please install it with:"
    echo "  Ubuntu/Debian: sudo apt install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Check if source logo exists
if [ ! -f "public/logo.png" ]; then
    echo "❌ Error: public/logo.png not found!"
    echo "Please place your logo file at public/logo.png"
    exit 1
fi

echo "🎨 Generating icons from public/logo.png..."

# Create production icons (colored)
echo "📦 Creating production icons..."
convert public/logo.png -resize 32x32 public/icon-32.png
convert public/logo.png -resize 128x128 public/icon-128.png

# Create development icons (colored, same as production for now)
echo "🔧 Creating development icons..."
convert public/logo.png -resize 32x32 public/dev-icon-32.png
convert public/logo.png -resize 128x128 public/dev-icon-128.png

# Create grayed out versions for disabled state
echo "🔘 Creating grayed out icons..."

# Production gray icons
convert public/logo.png -resize 32x32 -colorspace Gray -brightness-contrast -30,-20 public/icon-32-gray.png
convert public/logo.png -resize 128x128 -colorspace Gray -brightness-contrast -30,-20 public/icon-128-gray.png

# Development gray icons  
convert public/logo.png -resize 32x32 -colorspace Gray -brightness-contrast -30,-20 public/dev-icon-32-gray.png
convert public/logo.png -resize 128x128 -colorspace Gray -brightness-contrast -30,-20 public/dev-icon-128-gray.png

echo "✅ All icons generated successfully!"
echo ""
echo "Generated files:"
echo "  📁 Production icons:"
echo "    - public/icon-32.png"
echo "    - public/icon-128.png"
echo "    - public/icon-32-gray.png"
echo "    - public/icon-128-gray.png"
echo ""
echo "  📁 Development icons:"
echo "    - public/dev-icon-32.png"
echo "    - public/dev-icon-128.png"
echo "    - public/dev-icon-32-gray.png"
echo "    - public/dev-icon-128-gray.png"
echo ""
echo "🚀 Ready to build your extension!" 