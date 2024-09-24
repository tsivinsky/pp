import * as Popover from "@radix-ui/react-popover";
import { MouseEvent, useEffect, useState } from "react";
import ListIcon from "./icons/list.svg?react";

const pickFile = async () => {
  return new Promise<File | null>((resolve, reject) => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = (e) => {
        // @ts-ignore
        const file = e.target.files[0];
        resolve(file);
      };
      input.click();
    } catch (err) {
      reject(err);
    }
  });
};

export default function App() {
  const [image, setImage] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [inputUrl, setInputUrl] = useState("");
  const [opacity, setOpacity] = useState(70);
  const [width, setWidth] = useState(2880);
  const [height, setHeight] = useState(1452);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const width = query.get("w");
    if (width) {
      setWidth(parseInt(width));
    }

    const height = query.get("h");
    if (height) {
      setHeight(parseInt(height));
    }

    const opacity = query.get("o");
    if (opacity) {
      setOpacity(parseInt(opacity));
    }

    const url = query.get("url");
    if (url) {
      setUrl(url);
    }
  }, []);

  const handleAddDesignImage = async () => {
    const file = await pickFile();
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  const handleAddUrl = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setUrl(inputUrl);
    setInputUrl("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button className="fixed top-10 right-10 z-50 grid place-items-center bg-orange-300 p-3 rounded-full shadow-lg">
            <ListIcon width={32} height={32} />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            align="end"
            sideOffset={10}
            className="bg-neutral-100 rounded-xl shadow-lg p-4 flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="width">Width</label>
              <input
                type="number"
                id="width"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value || "1920"))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="height">Height</label>
              <input
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value || "1080"))}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="opacity">Opacity</label>
              <div className="flex items-center gap-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  id="opacity"
                  value={opacity}
                  onChange={(e) => setOpacity(parseInt(e.target.value || "0"))}
                />
                {opacity}%
              </div>
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
      {image && url && (
        <div className="relative" style={{ width, height }}>
          <img src={image} alt="" width={width} height={height} />
          <iframe
            src={url}
            width={width}
            height={height}
            allowTransparency
            className="absolute inset-0"
            style={{ opacity: opacity / 100 }}
          />
        </div>
      )}
      {!image && (
        <button onClick={handleAddDesignImage}>Add design image</button>
      )}
      {!url && (
        <form>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-4"
          />
          <button type="submit" onClick={handleAddUrl}>
            Add url
          </button>
        </form>
      )}
    </div>
  );
}
