"use client";

import { useRole } from "@/context/role-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Briefcase, Users } from "lucide-react";

export function RoleToggle() {
  const { role, setRole } = useRole();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {role === "freelancer" ? (
            <>
              <Briefcase className="h-4 w-4 mr-2" />
              Фрилансер
            </>
          ) : (
            <>
              <Users className="h-4 w-4 mr-2" />
              Заказчик
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setRole("freelancer")}>
          <Briefcase className="h-4 w-4 mr-2" />
          Я фрилансер
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole("client")}>
          <Users className="h-4 w-4 mr-2" />
          Я заказчик
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 