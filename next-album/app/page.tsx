"use client";

// Next
import Image from "next/image";

// React
import { useEffect, useState } from "react";

// Constants
const STATIC_HOST_URL = 'https://d2wam6qj2bskgp.cloudfront.net';
const excludedPhotoIds: { [key: string]: boolean } = {
  "D&S-46": true,
  "D&S-47": true,
  "D&S-48": true,
  "D&S-49": true,
  "D&S-51": true,
  "D&S-86": true,
  "image-f69f7490-ed40-4a01-879b-19f3f39bb9ab": true,
  "image-9448f0d1-4474-4ed5-856a-c204c9bb8044": true,
  "image-cb1871f8-b333-41d6-93c8-bc18094c3318": true,
  "image-447366d4-e2b8-4f47-a032-d2f1f3d80baf": true,
  "image-f5020b83-c3a8-450e-b8c6-3f240156de3b": true,
  "image-eed7ed44-1cc4-4b43-ac5b-4bd70db6d526": true,
  "image-278ee1a9-12a9-4982-a574-d4d28cd8e028": true,
  "image-89f61e1f-494c-435b-bf80-0999dd200607": true,
  "image-d1a1b6db-c549-44a8-a430-81f94386f792": true,
};

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const fetchGalleryImages = async () => {
    const response = await fetch(`${STATIC_HOST_URL}/manifest.json`);
    const responseJson: string[] = await response.json();

    const imageUrls = responseJson
      .filter(fileName => !fileName.includes('html'))
      .filter(fileName => !excludedPhotoIds[fileName.split('.')[0]])
      .map(fileName => `${STATIC_HOST_URL}/${fileName}`);

    setGalleryImages(imageUrls);
  };

  useEffect(() => { fetchGalleryImages() }, []);

  return (
    <main className="container">
      <section className="hero is-info">
        <div className="hero-body" style={{ textAlign: 'center' }}>Wedding Album</div>
      </section>
      <div id="gallery-div">
        {galleryImages.map((imageUrl: string, index: number) => (
          <Image
            key={index}
            src={imageUrl}
            alt={`Gallery Image ${index + 1}`}
            width={300}
            height={200}
          />
        ))}
      </div>
    </main>
  );
}
