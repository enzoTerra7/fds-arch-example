import {
  ClientListHeader,
  ClientListSearch,
  ClientListStatus,
} from "@/features/client/list-client";
import { EntityContainer } from "@/shared/ui/components/entity-container";
import { PropsWithChildren } from "react";

export function WidgetClientContainer({ children }: PropsWithChildren) {
  return (
    <EntityContainer
      Header={<ClientListHeader />}
      filters={{
        Search: <ClientListSearch />,
        Status: <ClientListStatus />,
      }}
    >
      {children}
    </EntityContainer>
  );
}
