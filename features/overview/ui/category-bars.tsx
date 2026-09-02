import { CATEGORY_CONFIG } from "@/shared/constants/catergories.consts";
import type { CategoryCount } from "../types";

type CategoryBarsProps = {
  categories: CategoryCount[];
};

const CategoryBars = ({ categories }: CategoryBarsProps) => {
  const maxCount = Math.max(...categories.map((item) => item.count), 1);

  return (
    <div className="flex flex-col gap-3">
      {categories.map((item) => {
        const meta = CATEGORY_CONFIG[item.category];
        const percent = Math.round((item.count / maxCount) * 100);

        return (
          <div key={item.category} className="flex flex-col gap-1.5">
            <div className="text-muted-foreground flex items-center justify-between text-[10px]">
              <span>{meta.name}</span>
              <span>{item.count}</span>
            </div>
            <div className="bg-muted h-1 w-full overflow-hidden rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${percent}%`,
                  backgroundColor: `${meta.color}99`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryBars;
