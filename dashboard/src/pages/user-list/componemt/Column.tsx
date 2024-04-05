import { ColumnDef } from "@tanstack/react-table";
import { WebsiteUserAll } from "@/api/userList/type";

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
];
