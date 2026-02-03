import sharp from "sharp";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { existsSync, renameSync, unlinkSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceImage = join(__dirname, "src", "assets", "marii-juht.png");
const tempOutput = join(__dirname, "src", "assets", "marii-juht.tmp.png");

// Guest card uses aspect-[4/3]; match that ratio
const OUT_WIDTH = 1600;
const OUT_HEIGHT = 1200; // 4:3

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

		// Crop to 4:3 with face fully visible: top-aligned so we don't cut the head
		const targetRatio = 4 / 3;
		let cropWidth, cropHeight, left, top;

		if (height > width * (1 / targetRatio)) {
			// Portrait: full width, center crop vertically so face (head + chin) is in frame
			cropWidth = width;
			cropHeight = Math.round(width / targetRatio);
			left = 0;
			top = Math.max(0, Math.floor((height - cropHeight) / 2));
		} else {
			// Landscape or square: center horizontally, full height
			cropHeight = height;
			cropWidth = Math.round(height * targetRatio);
			left = Math.max(0, Math.floor((width - cropWidth) / 2));
			top = 0;
		}

		await sharp(sourceImage)
			.extract({ left, top, width: cropWidth, height: cropHeight })
			.resize(OUT_WIDTH, OUT_HEIGHT, { fit: "cover", position: "center" })
			.grayscale()
			.normalize() // match brightness/contrast to other guest images
			.toFile(tempOutput);

		unlinkSync(sourceImage);
		renameSync(tempOutput, sourceImage);
		console.log("Processed. Output:", sourceImage);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

processImage();
