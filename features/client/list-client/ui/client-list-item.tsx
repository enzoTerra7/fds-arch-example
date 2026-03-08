import { ClientList } from "@/entities/client";
import { EntityItem } from "@/shared/ui/components/entity-list-item";
import { formatDistanceToNow } from "date-fns";
import { User2Icon } from "lucide-react";
import { EditClientDialog } from "../../edit-client";
import { useState } from "react";

export function ClientListItem(props: ClientList) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <>
      <EntityItem
        href={`/clients/${props.id}`}
        title={props.name}
        Image={
          <div className="size-8 flex items-center justify-center">
            <User2Icon className="size-5 text-muted-foreground" />
          </div>
        }
        Subtitle={
          <>
            {props.description} &bull; Created{" "}
            {formatDistanceToNow(props.createdAt, { addSuffix: true })}
          </>
        }
        settings={[
          {
            key: "edit",
            trigger: "Edit",
            onClick: () => setIsEditOpen(true),
          },
        ]}
      />
      <EditClientDialog
        client={props}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
