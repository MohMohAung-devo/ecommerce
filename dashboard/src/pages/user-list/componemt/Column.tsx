import { ColumnDef } from "@tanstack/react-table";
import { WebsiteUserAll } from "@/api/userList/type";

export const columns: ColumnDef<WebsiteUserAll>[] = [
  {
    accessorKey: "name",
    header: () => <div>Name</div>,
  },

  {
    accessorKey: "phone",
    header: () => <div>Phone Number</div>,
  },

  {
    accessorKey: "email",
    header: () => <div>Email</div>,
  },
];
