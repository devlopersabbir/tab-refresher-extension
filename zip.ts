import { zip } from "zip-a-folder";
import { readJsonFile } from "vite-plugin-web-extension";
import { rm } from "fs";

const compress = async <T extends { version: string }>(pkg: T) => {
  const args = process.argv[2];
  const target = args.split("TARGET=")[1].toLowerCase() as "chrome" | "firefox";

  if (!target) throw new Error("Make sure to select a target before zip");
  await zip("dist", `./release/v${pkg.version}_${target}.zip`);
};

const deleteDist = () => {
  rm(
    "dist",
    {
      recursive: true,
    },
    () => console.log("Dist folder delete successfully"),
  );
};

(async () => {
  const pkg = readJsonFile("package.json");
  await compress(pkg);
  deleteDist();
})();
