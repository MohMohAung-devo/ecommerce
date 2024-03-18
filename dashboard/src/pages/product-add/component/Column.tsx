import { ColumnDef } from "@tanstack/react-table";
import { ProductAll } from "@/api/productApp/type";

export const columns: ColumnDef<ProductAll>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Image",

    cell: ({ row }) => (
      <div>
        {row.original.image ? (
          <div style={{ width: "150px" }}>
            <img
              src={row.original.image}
              alt={row.original.name || "Image"}
              style={{ borderRadius: "30px", width: "200px", height: "120px" }}
            />
          </div>
        ) : (
          <span>No Image Available</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => <div>{row.original.amount}Ks</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];
