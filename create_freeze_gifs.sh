#!/bin/bash

# Script to convert MP4 files to high-quality GIFs with freeze frame at the end
# Usage: ./create_freeze_gifs.sh [input_folder]

# Set default input folder
INPUT_FOLDER="${1:-./mp4}"  # Default to ./mp4 directory

# Set output folder to img at same level as mp4
OUTPUT_FOLDER="$(dirname "$INPUT_FOLDER")/img"

# Create output folder if it doesn't exist
mkdir -p "$OUTPUT_FOLDER"

# Settings (adjust these as needed)
FPS=15
SCALE=640
MAX_COLORS=100

echo "Processing MP4 files from: $INPUT_FOLDER"
echo "Output folder: $OUTPUT_FOLDER"
echo "Settings: ${FPS}fps, ${SCALE}px width, ${MAX_COLORS} colors"
echo "----------------------------------------"

# Counter for processed files
count=0
total_files=$(find "$INPUT_FOLDER" -name "*.mp4" | wc -l)

# Process each MP4 file
for mp4_file in "$INPUT_FOLDER"/*.mp4; do
    # Skip if no MP4 files found
    [ ! -f "$mp4_file" ] && continue
    
    # Get filename without path and extension
    filename=$(basename "$mp4_file" .mp4)
    temp_gif="/tmp/${filename}_temp.gif"
    output_gif="$OUTPUT_FOLDER/${filename}_noloop.gif"
    
    count=$((count + 1))
    echo "[$count/$total_files] Processing: $filename"
    
    # Step 1: Create high-quality GIF
    echo "  Creating base GIF..."
    ffmpeg -y -i "$mp4_file" -vf "fps=${FPS},scale=${SCALE}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=${MAX_COLORS}:stats_mode=diff[p];[s1][p]paletteuse=dither=sierra2_4a:diff_mode=rectangle" "$temp_gif" 2>/dev/null
    
    if [ $? -ne 0 ]; then
        echo "  ERROR: Failed to create GIF for $filename"
        continue
    fi
    
    # Check temp file size
    temp_size=$(stat -f%z "$temp_gif" 2>/dev/null || stat -c%s "$temp_gif")
    temp_size_mb=$(echo "scale=1; $temp_size/1024/1024" | bc)
    echo "  Base GIF size: ${temp_size_mb}MB"
    
    # Step 2: Add freeze frame with long delay (6000 = 60 seconds)
    echo "  Adding freeze frame..."
    magick "$temp_gif" -coalesce \( -clone -1 -set delay 6000 \) "$output_gif"
    
    if [ $? -ne 0 ]; then
        echo "  ERROR: Failed to add freeze frame for $filename"
        rm -f "$temp_gif"
        continue
    fi
    
    # Check final file size
    final_size=$(stat -f%z "$output_gif" 2>/dev/null || stat -c%s "$output_gif")
    final_size_mb=$(echo "scale=1; $final_size/1024/1024" | bc)
    
    # Warn if file is too large for GitHub
    if [ $final_size -gt 100000000 ]; then
        echo "  WARNING: Final GIF is ${final_size_mb}MB (exceeds GitHub 100MB limit)"
    else
        echo "  SUCCESS: Created ${filename}_noloop.gif (${final_size_mb}MB)"
    fi
    
    # Clean up temp file
    rm -f "$temp_gif"
    echo ""
done

echo "Processing complete! Processed $count files."
echo "Output files are in: $OUTPUT_FOLDER"
