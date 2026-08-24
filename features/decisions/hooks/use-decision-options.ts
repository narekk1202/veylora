import { useState } from "react";

type Option = {
  id: string;
  label: string;
};

export const useDecisionOptions = () => {
  const [options, setOptions] = useState<Option[]>([
    { id: crypto.randomUUID(), label: "" },
    { id: crypto.randomUUID(), label: "" },
  ]);
  const [selectedId, setSelectedId] = useState("");

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: Option,
  ) => {
    const nextLabel = event.target.value;
    setOptions((current) =>
      current.map((item) =>
        item.id === option.id ? { ...item, label: nextLabel } : item,
      ),
    );
  };

  const handleOnDelete = (option: Option) => {
    const next = options.filter((item) => item.id !== option.id);
    setOptions(next);
    if (selectedId === option.id) {
      setSelectedId(next[0]?.id ?? "");
    }
  };

  const handleOnAdd = () => {
    const id = crypto.randomUUID();
    setOptions((current) => [...current, { id, label: "" }]);
  };

  return {
    options,
    selectedId,
    handleOnAdd,
    setSelectedId,
    handleOnChange,
    handleOnDelete,
  };
};
