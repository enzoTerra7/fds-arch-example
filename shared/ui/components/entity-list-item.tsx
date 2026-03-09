import Link from "next/link";
import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "./card";
import { cn } from "@/shared/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Button } from "./button";
import { MoreVerticalIcon } from "lucide-react";

type EntityItemProps = {
  href: string;
  title: string;
  className?: string;
  Subtitle?: React.ReactNode;
  Image?: React.ReactNode;
  isPending?: boolean;
  settings?: {
    trigger: React.ReactNode;
    onClick: () => void;
    key: string;
    variant?: "destructive";
  }[];
};

export function EntityItem({
  href,
  title,
  className,
  Image,
  isPending,
  Subtitle,
  settings,
}: EntityItemProps) {
  function handleSettingClick(event: React.MouseEvent, fn: () => void) {
    event.stopPropagation();

    if (isPending) {
      return;
    }

    fn();
  }
  return (
    <Link href={href} prefetch>
      <Card
        className={cn(
          "p-4 shadow-none hover:shadow cursor-pointer",
          isPending && "opacity-50 cursor-not-allowed",
          className,
        )}
      >
        <CardContent className="flex flex-row items-center justify-between p-0">
          <div className="flex items-center gap-3">
            {Image}
            <div className="">
              <CardTitle className="text-base font-medium">{title}</CardTitle>
              {!!Subtitle && (
                <CardDescription className="text-xs">
                  {Subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {settings && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="icon-lg"
                  variant={"ghost"}
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <MoreVerticalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                onClick={(event) => event.stopPropagation()}
              >
                {settings.map((setting) => (
                  <DropdownMenuItem
                    onClick={(e) => handleSettingClick(e, setting.onClick)}
                    key={setting.key}
                    variant={setting.variant}
                  >
                    {setting.trigger}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
