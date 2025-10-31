import { MailIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

export function EmailInput<T extends FieldValues, K extends Path<T>>({
  field,
  autoFocus,
}: {
  field: ControllerRenderProps<T, K>;
  autoFocus?: boolean;
}) {
  return (
    <InputGroup>
      <InputGroupInput
        type="email"
        autoComplete="email"
        placeholder="Email"
        autoFocus={autoFocus}
        {...field}
      />
      <InputGroupAddon>
        <MailIcon />
      </InputGroupAddon>
    </InputGroup>
  );
}
