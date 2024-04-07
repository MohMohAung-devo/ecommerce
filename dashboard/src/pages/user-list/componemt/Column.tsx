import { ColumnDef } from "@tanstack/react-table";
import { WebsiteUserAll } from "@/api/userList/type";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<WebsiteUserAll>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-lg">Name</div>,
  },

  {
    accessorKey: "phone",
    header: () => <div className="text-lg">Phone Number</div>,
  },

  {
    accessorKey: "email",
    header: () => <div className="text-lg">Email</div>,
  },

  {
    accessorKey: "isActive",
    header: () => <div className="text-lg">Active</div>,
    cell: ({ row}) => <Button></Button>
  },
];
