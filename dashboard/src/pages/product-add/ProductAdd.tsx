import { useState } from "react";
import { columns } from "@/pages/product-add/component/Column";
import { DataTable } from "@/pages/product-add/component/Data-table";
import classes from "./ProductAdd.module.css";
import AddProduct from "@/pages/product-add/component/add-product";
import { Button } from "@/components/ui/button";
import { useAllProduct } from "@/api/productApp/query";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

export const ProductAdd = () => {
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 4;
  const { data, isError } = useAllProduct();
  console.log({ data });

  if (isError) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const filterData = data.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
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
    <div className={classes.ProductContainer}>
      <div className={classes.titleContainer}>
        <div className={classes.Container}>
          <h2>Add Product</h2>
          <div className={classes.searchContainer}>
            <div className={classes.inputContainer}>
              <Input
                placeholder="Search...."
                style={{ borderRadius: "10px", width: "250px" }}
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </div>
            <AddProduct />
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={currentItems} />
      <div className={classes.PaginationContainer}>
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
              <PaginationItem key={index}>
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

export default ProductAdd;
