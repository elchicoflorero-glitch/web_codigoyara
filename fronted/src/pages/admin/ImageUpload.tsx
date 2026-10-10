import { useRef } from "react";

interface ImageUploadProps {
  value: string;           // current base64 or empty
  onChange: (b64: string) => void;
  label?: string;
  maxKB?: number;          // max size in KB, default 500
}

export default function ImageUpload({
  value,
  onChange,
  label = "Imagen",
  maxKB = 500,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > maxKB * 1024) {
      alert(`La imagen debe pesar menos de ${maxKB}KB. Esta pesa ${Math.round(file.size / 1024)}KB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="img-upload-wrap">
      <label className="img-upload-label">{label}</label>

      {value ? (
        <div className="img-upload-preview">
          <img src={value} alt="preview" />
          <button
            type="button"
            className="img-upload-remove"
            onClick={() => { onChange(""); if (inputRef.current) inputRef.current.value = ""; }}
          >
            × Quitar imagen
          </button>
        </div>
      ) : (
        <div
          className="img-upload-zone"
          onClick={() => inputRef.current?.click()}
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
        >
          <span className="img-upload-icon">📁</span>
          <span>Hacé clic o arrastrá una imagen</span>
          <small>PNG, JPG, WebP · máx {maxKB}KB</small>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        style={{ display: "none" }}
        onChange={onInput}
      />
    </div>
  );
}
