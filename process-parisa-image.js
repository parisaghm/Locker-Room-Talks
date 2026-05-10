import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Accept source image as command line argument, or use default path
const sourceImageArg = process.argv[2];
const defaultPath = 'C:/Users/Parisa/.cursor/projects/c-Users-Parisa-Desktop-locker-room-talk-unfold-main/assets/c__Users_Parisa_AppData_Roaming_Cursor_User_workspaceStorage_e9dddf2c38766c6c61f475315b3671ae_images_Gemini_Generated_Image_aort6gaort6gaort-74f528ae-3d8c-44a8-a500-761165c41077.png';
const possiblePaths = sourceImageArg 
  ? [sourceImageArg]
  : [
      defaultPath,
      'temp-parisa-source.png', // Fallback if user places it in workspace root
      join(__dirname, 'temp-parisa-source.png'),
    ];

const outputImage = join(__dirname, 'src', 'assets', 'parisa-ghasemi.png');

async function processImage() {
  try {
    // Find the source image file
    let sourceImage = null;
    for (const path of possiblePaths) {
      if (existsSync(path)) {
        sourceImage = path;
        console.log('Found source image at:', path);
        break;
      }
    }
    
    if (!sourceImage) {
      console.log('Source image not found. Please:');
      console.log('1. Place your source image in the workspace root as "temp-parisa-source.png"');
      console.log('2. Or provide the path as an argument: node process-parisa-image.js <path-to-image>');
      console.log('\nTried paths:', possiblePaths);
      process.exit(1);
    }
    
    // Get image metadata
    const metadata = await sharp(sourceImage).metadata();
    console.log('Original image dimensions:', metadata.width, 'x', metadata.height);
    
    // Calculate crop to center the face
    // Based on the description, the subject is positioned on the left side
    // We want to crop to focus on head and shoulders (portrait style) and center the face
    const width = metadata.width;
    const height = metadata.height;
    
    // Calculate crop to center the face
    // For a portrait crop focusing on head and shoulders:
    // Check if image is landscape (width > height) or portrait (height > width)
    const isLandscape = width > height;
    
    let cropWidth, cropHeight, left, top;
    
    if (isLandscape) {
      // Landscape image: face is centered horizontally, crop to focus on center
      cropWidth = Math.floor(width * 0.6); // Focus on center portion
      cropHeight = Math.floor(height * 0.9); // Use most of height for head/shoulders
      left = Math.floor((width - cropWidth) / 2); // Center horizontally
      top = Math.floor(height * 0.05); // Start from top 5% to include head
    } else {
      // Portrait image: face might be off-center, adjust accordingly
      cropWidth = Math.floor(width * 0.7); // Focus on portion where subject is
      cropHeight = Math.floor(height * 0.8); // Focus on upper portion for head/shoulders
      left = Math.floor(width * 0.1); // Start from 10% from left
      top = Math.floor(height * 0.1); // Start from top 10% to include head
    }
    
    // Process the image: crop, resize to match typical team image dimensions, convert to grayscale
    // Team images use aspect ratio approximately 3:4 (based on CSS: w-48 h-64 = 192x256)
    // Target dimensions: 1200x1600px (3:4 aspect ratio for portrait) - high res for quality
    await sharp(sourceImage)
      .extract({ 
        left: left, 
        top: top, 
        width: cropWidth, 
        height: cropHeight 
      })
      .resize(1200, 1600, {
        fit: 'cover',
        position: 'center' // Center the face in the crop
      })
      .grayscale() // Convert to black and white
      .toFile(outputImage);
    
    console.log('Image processed successfully!');
    console.log('Output saved to:', outputImage);
  } catch (error) {
    console.error('Error processing image:', error);
    process.exit(1);
  }
}

processImage();
