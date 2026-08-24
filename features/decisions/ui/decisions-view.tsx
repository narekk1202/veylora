import DecisionsFilters from './decisions-filters'
import DecisionsHeader from "./decisions-header";

const DecisionsView = () => {
  return (
    <main className="page_view">
      <DecisionsHeader />
      <DecisionsFilters />
    </main>
  );
};

export default DecisionsView;
