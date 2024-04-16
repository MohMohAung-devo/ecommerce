import React, { useState } from "react";
import { DataTable } from "@/pages/buy-product/component/Data-table";
import { columns } from "@/pages/buy-product/component/Column";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAllProduct } from "@/api/productApp/query";
import classes from "./BuyProduct.module.css";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const BuyProduct = () => {
  const { data, isError } = useAllProduct();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 4;

  if (isError) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const filterData = data?.filter((item) =>
    item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    console.log("search", filterText);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className={classes.SellContainer}>
      <div className={classes.SellList}>
        <div className={classes.heading}>
          <h1 className="text-lg">Sell Product List</h1>
          <div className={classes.Search}>
            <Input
              placeholder="Search...."
              style={{ borderRadius: "10px", width: "250px" }}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Button>Search</Button>
          </div>
        </div>
        <DataTable columns={columns} data={currentItems} />
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => paginate(currentPage - 1)}
                href="#"
              />
            </PaginationItem>
            {Array.from({
              length: Math.ceil(filterData.length / itemPerPage),
            }).map((_, index) => (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => paginate(currentPage + 1)}
                href="#"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BuyProduct;
