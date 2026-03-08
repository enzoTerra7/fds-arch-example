import { EntityHeader } from "@/shared/ui/components/entity-header";
import { CreateClientDialog } from "../../create-client/ui/create-client-dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "@/shared/ui/components/button";

export function ClientListHeader() {
  return (
    <EntityHeader title="Clients" description="Manage your companies clients">
      <CreateClientDialog>
        <Button>
          <PlusIcon />
          Create new
        </Button>
      </CreateClientDialog>
    </EntityHeader>
  );
}
