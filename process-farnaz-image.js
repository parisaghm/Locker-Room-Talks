import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, renameSync, unlinkSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use source path from argv or default to current asset (reprocess in place)
const sourceArg = process.argv[2];
const defaultSource = join(__dirname, "src", "assets", "farnaz-farahdel.png");
const sourceImage =
	sourceArg && existsSync(sourceArg) ? sourceArg : defaultSource;
const outputImage = join(__dirname, "src", "assets", "farnaz-farahdel.png");
const tempOutput = join(__dirname, "src", "assets", "farnaz-farahdel.tmp.png");

// Guest card displays a square (pt-[95%]); match that aspect ratio
const OUT_SIZE = 1200; // square

async function processImage() {
	try {
		if (!existsSync(sourceImage)) {
			console.error("Source image not found:", sourceImage);
			process.exit(1);
		}
		const metadata = await sharp(sourceImage).metadata();
		const width = metadata.width;
		const height = metadata.height;
		console.log("Original dimensions:", width, "x", height);

		// Crop a square: for portrait use top-aligned so full head and shoulders are visible
		const side = Math.min(width, height);
		const left = Math.floor((width - side) / 2);
		const top = height >= width ? 0 : Math.floor((height - side) / 2); // portrait: top square; landscape: center

		const outPath = sourceImage === outputImage ? tempOutput : outputImage;
		await sharp(sourceImage)
			.extract({ left, top, width: side, height: side })
			.resize(OUT_SIZE, OUT_SIZE, { fit: "cover", position: "center" })
			.grayscale()
			.toFile(outPath);

		if (outPath === tempOutput) {
			unlinkSync(outputImage);
			renameSync(tempOutput, outputImage);
		}
		console.log("Processed. Output:", outputImage);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

processImage();
