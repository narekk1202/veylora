import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import DecisionsCategoryTabs from "./decisions-category-tabs";

const DecisionsFilters = () => {
  return (
    <div className="flex items-center gap-3 max-lg:flex-col">
      <Input placeholder="Search decisions" className="w-full lg:max-w-sm" />

      <Tabs
        defaultValue="all"
        className="bg-card rounded-md px-1 py-1.5 max-lg:w-full"
      >
        <TabsList variant="line" className="max-lg:w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="locked">Locked</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
        </TabsList>
      </Tabs>

      <DecisionsCategoryTabs />
    </div>
  );
};

export default DecisionsFilters;
