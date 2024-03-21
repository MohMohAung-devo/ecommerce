import { ColumnDef } from "@tanstack/react-table";
import { WebsiteUserAll } from "@/api/userList/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export const columns: ColumnDef<WebsiteUserAll>[] = [
  {
    accessorKey: "name",
    header: () => <div>Name</div>,
    // cell: ({ row }) => <div>{row.original.name}</div>,
  },

  {
    accessorKey: "phone",
    header: () => <div>Phone Number</div>,
    // cell: ({ row }) => <div>{row.original.phone}</div>,
  },

  {
    accessorKey: "email",
    header: () => <div>Email</div>,
    // cell: ({ row }) => <div>{row.original.email}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white text-black">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              <Button>Edit</Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="text-black" />
            <DropdownMenuItem>
              <Button>Delete</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
