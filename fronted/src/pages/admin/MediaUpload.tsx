import { useRef } from "react";

interface MediaUploadProps {
  images: string[];          // base64 data URLs
  videos: string[];          // video URLs
  onImagesChange: (imgs: string[]) => void;
  onVideosChange: (vids: string[]) => void;
  maxKB?: number;
  maxImages?: number;
}

export default function MediaUpload({
  images,
  videos,
  onImagesChange,
  onVideosChange,
  maxKB = 800,
  maxImages = 10,
}: MediaUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ── Images ───────────────────────────────────────────────
  const handleFiles = (files: FileList) => {
    const remaining = maxImages - images.length;
    const toProcess = Array.from(files)
      .filter(f => f.type.startsWith("image/"))
      .slice(0, remaining);

    if (toProcess.length === 0) return;

    // Read all files in parallel, then append them all at once
    const promises = toProcess.map(file => {
      if (file.size > maxKB * 1024) {
        alert(`"${file.name}" supera ${maxKB}KB (${Math.round(file.size / 1024)}KB). Omitida.`);
        return Promise.resolve(null);
      }
      return new Promise<string>(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(results => {
      const valid = results.filter((r): r is string => r !== null);
      if (valid.length > 0) onImagesChange([...images, ...valid]);
    });
  };

  const removeImage = (idx: number) =>
    onImagesChange(images.filter((_, i) => i !== idx));

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  // ── Videos ───────────────────────────────────────────────
  const addVideo = () => {
    const url = prompt("Ingresá la URL del video (YouTube, Vimeo, etc.):")?.trim();
    if (!url) return;
    try { new URL(url); } catch { alert("URL inválida"); return; }
    onVideosChange([...videos, url]);
  };

  const removeVideo = (idx: number) =>
    onVideosChange(videos.filter((_, i) => i !== idx));

  // helper: turn any YT/Vimeo URL into an embed URL
  const embedUrl = (url: string) => {
    try {
      const u = new URL(url);
      // YouTube
      const ytId =
        u.hostname.includes("youtu.be")
          ? u.pathname.slice(1)
          : u.searchParams.get("v");
      if (ytId) return `https://www.youtube.com/embed/${ytId}`;
      // Vimeo
      if (u.hostname.includes("vimeo.com"))
        return `https://player.vimeo.com/video${u.pathname}`;
    } catch { /* noop */ }
    return url;
  };

  return (
    <div className="media-upload-wrap">
      {/* ── Images section ── */}
      <div className="media-section">
        <div className="media-section-header">
          <span className="media-section-title">📸 Imágenes ({images.length}/{maxImages})</span>
          {images.length < maxImages && (
            <button
              type="button"
              className="admin-btn-sm"
              onClick={() => inputRef.current?.click()}
            >
              + Agregar imagen
            </button>
          )}
        </div>

        {images.length > 0 ? (
          <div className="media-image-grid">
            {images.map((src, i) => (
              <div key={i} className="media-image-item">
                <img src={src} alt={`imagen ${i + 1}`} />
                <button
                  type="button"
                  className="media-remove-btn"
                  onClick={() => removeImage(i)}
                  title="Eliminar imagen"
                >
                  ×
                </button>
                {i === 0 && <span className="media-badge">portada</span>}
              </div>
            ))}
            {images.length < maxImages && (
              <div
                className="media-add-tile"
                onClick={() => inputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={e => e.preventDefault()}
              >
                <span>+</span>
              </div>
            )}
          </div>
        ) : (
          <div
            className="img-upload-zone"
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={e => e.preventDefault()}
          >
            <span className="img-upload-icon">📁</span>
            <span>Hacé clic o arrastrá imágenes aquí</span>
            <small>PNG, JPG, WebP · máx {maxKB}KB por imagen · hasta {maxImages} imágenes</small>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          multiple
          style={{ display: "none" }}
          onChange={e => { if (e.target.files) handleFiles(e.target.files); }}
        />
      </div>

      {/* ── Videos section ── */}
      <div className="media-section">
        <div className="media-section-header">
          <span className="media-section-title">🎬 Videos ({videos.length})</span>
          <button type="button" className="admin-btn-sm" onClick={addVideo}>
            + Agregar video
          </button>
        </div>

        {videos.length > 0 && (
          <div className="media-video-list">
            {videos.map((url, i) => (
              <div key={i} className="media-video-item">
                <div className="media-video-preview">
                  <iframe
                    src={embedUrl(url)}
                    title={`video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="media-video-meta">
                  <span className="media-video-url" title={url}>{url}</span>
                  <button
                    type="button"
                    className="admin-btn-sm danger"
                    onClick={() => removeVideo(i)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
