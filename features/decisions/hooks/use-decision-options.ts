import { useFormContext } from "react-hook-form";
import { NewDecisionSchema } from "../schemas";

type Option = NewDecisionSchema["options"][number];

const VALUE_OPTS = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const;

export const useDecisionOptions = () => {
  const form = useFormContext<NewDecisionSchema>();
  const options = form.watch("options") ?? [];
  const selectedId = form.watch("selectedOptionId");

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    option: Option,
  ) => {
    const nextLabel = event.target.value;
    const current = form.getValues("options") ?? [];
    form.setValue(
      "options",
      current.map((item) =>
        item.id === option.id ? { ...item, label: nextLabel } : item,
      ),
      VALUE_OPTS,
    );
  };

  const handleOnDelete = (option: Option) => {
    const current = form.getValues("options") ?? [];
    const next = current.filter((item) => item.id !== option.id);
    form.setValue("options", next, VALUE_OPTS);
    if (form.getValues("selectedOptionId") === option.id) {
      form.setValue("selectedOptionId", next[0]?.id ?? "", VALUE_OPTS);
    }
  };

  const handleOnAdd = () => {
    const current = form.getValues("options") ?? [];
    form.setValue(
      "options",
      [...current, { id: crypto.randomUUID(), label: "" }],
      VALUE_OPTS,
    );
  };

  const setSelectedId = (id: string) => {
    form.setValue("selectedOptionId", id, VALUE_OPTS);
  };

  return {
    form,
    options,
    selectedId,
    handleOnAdd,
    setSelectedId,
    handleOnChange,
    handleOnDelete,
    errors: form.formState.errors,
  };
};
