import { ColumnDef } from "@tanstack/react-table";
import { WebsiteUserAll } from "@/api/userList/type";
//import { Button } from "@/components/ui/button";

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
    accessorKey: "image",
    header: "Image",

    cell: ({ row }) => (
      <div className="justify-items-center">
        {row.original.image ? (
          <div style={{ width: "150px" }}>
            <img
              src={row.original.image}
              alt={row.original.name || "Image"}
              style={{ borderRadius: "30px", width: "200px", height: "130px" }}
            />
          </div>
        ) : (
          <span>No Image Available</span>
        )}
      </div>
    ),
  },

  {
    accessorKey: "date",
    header: () => <div className="text-lg">Date</div>,
  },
];
