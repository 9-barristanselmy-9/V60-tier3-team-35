import { useState, useRef, useEffect } from "react";
import { useFetcher } from "react-router";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";


interface LocationCardProps {
  location: string;
}

export function LocationCard({ location }: LocationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(location);
  const fetcher = useFetcher();
  const inputRef = useRef<HTMLInputElement>(null);

  const displayLocation =
    fetcher.state !== "idle"
      ? (fetcher.formData?.get("location") as string)
      : location;

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  function handleSave() {
    if (!draft.trim() || draft === location) {
      setIsEditing(false);
      return;
    }
    fetcher.submit(
      { location: draft },
      { method: "PATCH", action: "/api/user/location" }
    );
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setDraft(location);
      setIsEditing(false);
    }
  }

  return (
    <>
      <div className="flex-1 flex flex-col items-start p-6 gap-4">
        <h2>{displayLocation || "London, UK"} </h2>
        <p>
          Spring in {displayLocation || "London"} is a wonderful time for
          gardening!
        </p>
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. London, UK"
            className="w-48"
            />
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setDraft(location);
              setIsEditing(false);
            }}
            >
              Cancel
            </Button>
            </div>
        ) : (
          <Button
          className="rounded-fulll bg-accent2"
          variant="secondary"
          onClick={() => setIsEditing(true)}
          >
            {fetcher.state !== "idle" ? "Saving..." : "Change location"}
          </Button>
        )}
      </div>
    </>
  );
}

