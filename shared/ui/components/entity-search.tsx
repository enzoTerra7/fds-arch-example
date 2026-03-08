import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";

type EntitySearchProps = {
  search: string;
  onSearch: (search: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function EntitySearch({
  search,
  onSearch,
  placeholder = "Search...",
  disabled,
}: EntitySearchProps) {
  return (
    <InputGroup className="w-full max-w-50 ml-auto">
      <InputGroup className="max-w-xs">
        <InputGroupInput
          type="search"
          placeholder={placeholder}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          disabled={disabled}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
      </InputGroup>
    </InputGroup>
  );
}
