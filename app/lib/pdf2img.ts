import type {
    PDFDocumentProxy,
    PDFPageProxy,
} from "pdfjs-dist/types/src/display/api";

export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: typeof import("pdfjs-dist") | null = null;
let loadPromise: Promise<typeof import("pdfjs-dist")> | null = null;

async function loadPdfJs(): Promise<typeof import("pdfjs-dist")> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    // @ts-expect-error - pdfjs-dist/build/pdf.mjs may not have proper types
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then(
        (lib: typeof import("pdfjs-dist")) => {
            // Set the worker source to use local file
            lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
            pdfjsLib = lib;
            return lib;
        }
    );

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();
        const arrayBuffer = await file.arrayBuffer();

        const pdf: PDFDocumentProxy = await lib.getDocument({
            data: arrayBuffer,
        }).promise;
        const page: PDFPageProxy = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 4 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
        }

        await page.render({
            canvasContext: context as CanvasRenderingContext2D,
            viewport,
        }).promise;

        return new Promise<PdfConversionResult>((resolve) => {
            canvas.toBlob(
                (blob: Blob | null) => {
                    if (blob) {
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File(
                            [blob],
                            `${originalName}.png`,
                            {
                                type: "image/png",
                            }
                        );

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            );
        });
    } catch (err: unknown) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${
                err instanceof Error ? err.message : String(err)
            }`,
        };
    }
}
