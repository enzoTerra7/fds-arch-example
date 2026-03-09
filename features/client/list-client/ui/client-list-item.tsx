import { ClientList } from "@/entities/client";
import { EntityItem } from "@/shared/ui/components/entity-list-item";
import { formatDistanceToNow } from "date-fns";
import { User2Icon } from "lucide-react";

type ClientListItemProps = ClientList & {
  onEdit: () => void;
  onDelete: () => void;
};

export function ClientListItem(props: ClientListItemProps) {
  return (
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
          <span className="max-w-50 inline-flex">
            <p className="truncate">{props.description}</p>
          </span>{" "}
          &bull; Created{" "}
          {formatDistanceToNow(props.createdAt, { addSuffix: true })}
        </>
      }
      settings={[
        {
          key: "edit",
          trigger: "Edit",
          onClick: props.onEdit,
        },
        {
          key: "delete",
          trigger: "Delete",
          variant: "destructive",
          onClick: props.onDelete,
        },
      ]}
    />
  );
}
