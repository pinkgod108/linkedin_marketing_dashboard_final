"use client";

import { useRef, useState } from "react";

interface UploadCsvProps {
  onUpload: (csvText: string, fileName: string) => void;
  isUsingUploadedData: boolean;
  onResetToDefault: () => void;
}

export default function UploadCsv({
  onUpload,
  isUsingUploadedData,
  onResetToDefault,
}: UploadCsvProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a .csv file.");
      return;
    }

    const confirmed = window.confirm(
      "This will delete and replace the current CSV data. Do you want to continue?"
    );
    if (!confirmed) return;

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      onUpload(text, file.name);
    };
    reader.onerror = () => setError("Could not read that file. Please try again.");
    reader.readAsText(file);
  }

  return (
    <div className="rounded-xl2 border border-neutral-200 bg-cream-light p-5 shadow-soft sm:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-semibold text-maroon">Upload New CSV</h3>
          <p className="mt-1 text-sm text-neutral-700">
            Try a different set of posts for this browser session. Your
            default data source in GitHub stays untouched.
          </p>
          {isUsingUploadedData && (
            <p className="mt-2 text-sm font-medium text-sienna-dark">
              Showing uploaded data for this session.{" "}
              <button
                onClick={onResetToDefault}
                className="underline decoration-sienna underline-offset-2 hover:text-maroon"
              >
                Reset to default CSV
              </button>
            </p>
          )}
          {error && <p className="mt-2 text-sm text-maroon-dark">{error}</p>}
        </div>
        <button
          onClick={handleButtonClick}
          className="whitespace-nowrap rounded-full bg-maroon px-5 py-2.5 font-semibold text-cream-light shadow-soft transition hover:bg-maroon-dark"
        >
          Upload New CSV
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
