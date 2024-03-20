import { ColumnDef } from "@tanstack/react-table";
import { ProductAll } from "@/api/productApp/type";
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

import dayjs from "dayjs";

const formatDate = (dateString) => {
  return dayjs(dateString).format("YYYY-MM-DD");
};
export const columns: ColumnDef<ProductAll>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "price",
    header: () => <div>Price</div>,
    cell: ({ row }) => (
      <div className="text-justify">
        {row.original.price} {""}Ks
      </div>
    ),
  },

  {
    accessorKey: "count",
    header: () => <div>Count</div>,
    cell: ({ row }) => <div className="text-justify">{row.original.count}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div>Amount</div>,
    cell: ({ row }) => (
      <div className="text-justify">{row.original.amount}Ks</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="text-justif">
        <Button
          variant="outline"
          className="bg-white text-black rounded-lg"
          style={{ borderRadius: "10px" }}
        >
          {formatDate(row.date)}
        </Button>
      </div>
    ),
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
