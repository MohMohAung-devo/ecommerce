import React from "react";
import { DataTable } from "@/pages/user-list/componemt/Data-table";
import { columns } from "@/pages/user-list/componemt/Column";
import { useAllUser } from "@/api/userList/query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import classes from "./UserList.module.css";
export const UserList = () => {
  const { data, isError } = useAllUser();

  if (isError) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  console.log({ data });
  return (
    <div className={classes.UserListContainer}>
      <div className={classes.UserContainer}>
        <div className={classes.headingList}>
          <h1 className="text-lg">User List</h1>
          <div className={classes.Search}>
            <Input placeholder="Search...." style={{ borderRadius: "10px", width: "250px" }} />
            <Button>Search</Button>
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserList;
