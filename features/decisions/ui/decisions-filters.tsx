import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

const DecisionsFilters = () => {
  return (
    <div className="flex items-center gap-3 max-sm:flex-col lg:w-1/2">
      <Input placeholder="Search decisions" />

      <Tabs
        defaultValue="all"
        className="bg-card rounded-md px-1 py-1.5 max-sm:w-full"
      >
        <TabsList variant="line" className="max-sm:w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="locked">Locked</TabsTrigger>
          <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default DecisionsFilters;
