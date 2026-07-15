import { useMemo, useState } from "react";

type PackageGalleryProps = {
  title: string;
  images: string[];
  alt: string[];
};

export default function PackageGallery({ title, images, alt }: PackageGalleryProps) {
  const galleryItems = useMemo(
    () => images.map((image, index) => ({ image, alt: alt[index] ?? `${title} ${index + 1}` })),
    [alt, images, title],
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const feature = galleryItems[0];
  const side = galleryItems.slice(1, 3);

  return (
    <>
      <div className="detail-gallery-grid">
        <div className="detail-gallery-grid__main">
          <img src={feature.image} alt={feature.alt} width="1600" height="1000" loading="eager" />
          <button className="button button--secondary gallery-button" type="button" onClick={() => setOpenIndex(0)}>
            Pogledaj svih {galleryItems.length} fotografija
          </button>
        </div>
        <div className="detail-gallery-grid__side">
          {side.map((item, index) => (
            <button
              key={item.image}
              type="button"
              className="gallery-button"
              onClick={() => setOpenIndex(index + 1)}
            >
              <img src={item.image} alt={item.alt} width="800" height="600" loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Galerija ${title}`}>
          <div className="lightbox__dialog">
            <img src={galleryItems[openIndex].image} alt={galleryItems[openIndex].alt} width="1800" height="1200" />
            <div className="lightbox__controls">
              <button
                className="button button--secondary"
                type="button"
                aria-label="Prethodna slika"
                onClick={() => setOpenIndex((value) => (value === null ? 0 : (value + galleryItems.length - 1) % galleryItems.length))}
              >
                Prethodna
              </button>
              <p className="mono-date">
                {openIndex + 1} / {galleryItems.length}
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  className="button button--secondary"
                  type="button"
                  aria-label="Sledeća slika"
                  onClick={() => setOpenIndex((value) => (value === null ? 0 : (value + 1) % galleryItems.length))}
                >
                  Sledeća
                </button>
                <button className="button button--accent" type="button" onClick={() => setOpenIndex(null)}>
                  Zatvori
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
