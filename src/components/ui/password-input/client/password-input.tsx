"use client";

import { EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { useState } from "react";
import { Button } from "../../button";

export function PasswordInput<T extends FieldValues, K extends Path<T>>({
  field,
}: {
  field: ControllerRenderProps<T, K>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputGroup>
      <InputGroupInput
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="Password"
        {...field}
      />
      <InputGroupAddon>
        <LockIcon />
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="hover:bg-transparent cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
