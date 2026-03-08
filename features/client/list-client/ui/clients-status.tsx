"use client";

import { EntityStatusSelect } from "@/shared/ui/components/entity-status-select";
import { useListClientsParams } from "../model/use-list-clients-params";
import { ClientList } from "@/entities/client";
import { SelectItem } from "@/shared/ui/components/select";

export function ClientListStatus() {
  const [params, setParams] = useListClientsParams();

  const STATUS_OPTIONS: ClientList["status"][] = [
    "ACTIVE",
    "INACTIVE",
    "PENDING",
  ];

  return (
    <EntityStatusSelect
      status={params.status}
      onStatusChange={(status) =>
        setParams((prev) => ({
          ...prev,
          status,
        }))
      }
    >
      {STATUS_OPTIONS.map((status) => (
        <SelectItem className="capitalize" key={status} value={status}>
          {status}
        </SelectItem>
      ))}
    </EntityStatusSelect>
  );
}
