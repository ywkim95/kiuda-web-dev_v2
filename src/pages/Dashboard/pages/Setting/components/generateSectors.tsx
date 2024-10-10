import FarmModel from "../../../../../models/Farm/FarmModel.ts";
import NameSector from "./All/NameSector.tsx";

const generateSectors = (farm: FarmModel) => {
  const sectors = [];
  for (let row = 0; row < farm.sectorRow; row++) {
    for (let col = 0; col < farm.sectorCol; col++) {
      const item = farm.sectors.find(
        (item) => item.row === row && item.col === col,
      );
      sectors.push(
        item ? (
          <NameSector key={item.id} farmSector={item} disabled={true} />
        ) : (
          <div key={`${row}-${col}`}></div>
        ),
      );
    }
  }
  return sectors;
};

export default generateSectors;
