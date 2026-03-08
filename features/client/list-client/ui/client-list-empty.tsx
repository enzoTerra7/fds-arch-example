import { Button } from "@/shared/ui/components/button";
import { EntityEmptyView } from "@/shared/ui/components/entity-states";
import { CreateClientDialog } from "../../create-client/ui/create-client-dialog";
import { PlusIcon } from "lucide-react";

export function ClientListEmpty() {
  return (
    <EntityEmptyView message="No clients with this filtering options. Add a new one pressing the button bellow">
      <CreateClientDialog>
        <Button>
          <PlusIcon />
          Create new
        </Button>
      </CreateClientDialog>
    </EntityEmptyView>
  );
}
