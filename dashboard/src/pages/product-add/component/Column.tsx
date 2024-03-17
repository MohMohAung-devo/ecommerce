import { ColumnDef } from "@tanstack/react-table";
import { AddProductData } from "@/api/productApp/type";

export const columns: ColumnDef<AddProductData>[] = [
  {
    accessorKey: "name",
    header: "Name",
    // cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    // cell: ({ row }) => <div>{row.getValue("image")}</div>,
    cell: ({ row }) => (
      <div>
        {row.original.image ? (
          <div style={{ width: "150px" }}>
            <img
              src={row.original.image}
              alt={row.original.name || "Image"}
              width={150}
              height={30}
              style={{ border: "30px" }}
            />
          </div>
        ) : (
          <span>No Image Available</span> // Display placeholder text if no image
        )}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    // cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    // cell: ({ row }) => <div>{row.getValue("date")}</div>,
  },
];
