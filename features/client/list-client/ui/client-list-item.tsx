import { ClientList } from "@/entities/client";
import { EntityItem } from "@/shared/ui/components/entity-list-item";
import { formatDistanceToNow } from "date-fns";
import { User2Icon } from "lucide-react";

export function ClientListItem(props: ClientList) {
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
          {props.description} &bull; Created{" "}
          {formatDistanceToNow(props.createdAt, { addSuffix: true })}
        </>
      }
    />
  );
}
