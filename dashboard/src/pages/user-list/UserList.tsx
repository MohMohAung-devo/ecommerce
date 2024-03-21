import React from "react";
import { DataTable } from "@/pages/user-list/componemt/Data-table";
import { columns } from "@/pages/user-list/componemt/Column";
import { useAllUser } from "@/api/userList/query";
export const UserList = () => {
  const { data } = useAllUser();

  console.log({ data });
  return (
    <div>
      <div>
        <h1>Hello</h1>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserList;
