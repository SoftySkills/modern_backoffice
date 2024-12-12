import { useState } from "react";
import TableTitle from "../TableTitle/TableTitle";
import TableHeader from "../TableHeader/TableHeader";
import { Pagination, PaginationProps, Spin, Table, Tooltip } from "antd";
import AddDrawer from "../Drawer/AddDrawer";
import ActionDropDown from "../ActionDropDown/ActionDropDown";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../api/getStudents";

import { IFilters, TColumns } from "../../types";
import AvatarIcon from "../../assets/icons/avatar.svg";

const itemRender: PaginationProps["itemRender"] = (_, type, orginalElement) => {
  return type === "prev" ? (
    <a>Previous</a>
  ) : type === "next" ? (
    <a>Next</a>
  ) : (
    orginalElement
  );
};

const columns: TColumns = [
  {
    title: "ID",
    dataIndex: "id",
    width: 180,
    key: "id",
    hidden: false,
    render: (text, record) => (
      <div className="flex gap-6 items-center min-w-fit">
        <img
          src={record?.avatar || AvatarIcon}
          alt="avatar"
          className="min-w-16 h-16 rounded-[50%] object-cover"
        />
        <div className="flex flex-col ">
          <p className="font-semibold">{record?.name}</p>
          <p> #{text}</p>
        </div>
      </div>
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    align: "center",
    hidden: true,
    width: 180,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    hidden: false,
    align: "center",
    width: 180,
  },
  {
    title: "Phone Number",
    key: "phone_number",
    hidden: false,
    align: "center",
    dataIndex: "phone_number",
    width: 180,
  },
  {
    title: "Region",
    key: "region",
    hidden: false,
    align: "center",
    dataIndex: "region",
    width: 180,
  },
  {
    title: "Course enrolled",
    key: "course_enrolled",
    hidden: false,
    align: "center",
    dataIndex: "course_enrolled",
    width: 180,
    render: (text) => {
      return text?.length > 1 ? (
        <div className="flex gap-3">
          <p>{text?.[0]}</p>
          <Tooltip title={text?.slice(1).join(", ")} color="#448FED">
            <p className="px-4 py-1 bg-blue-200 text-blue-600 rounded-[1.4rem]">
              +{text?.slice(1)?.length}
            </p>
          </Tooltip>
        </div>
      ) : (
        <p>{text?.[0] || "__"}</p>
      );
    },
  },

  {
    title: "Invite Code",
    key: "invite_code",
    hidden: false,
    align: "center",
    dataIndex: "invite_code",
    width: 180,
  },

  {
    title: "Created At",
    key: "created_at",
    hidden: false,
    align: "center",
    width: 180,
    dataIndex: "created_at",
    sorter: (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    defaultSortOrder: "ascend",
    render: (_, record) => (
      <p>{new Date(record.created_at).toLocaleString()}</p>
    ),
  },

  {
    title: "Action",
    key: "action",
    hidden: false,
    align: "center",
    width: 180,

    render: (_, record) => <ActionDropDown data={record} />,
  },
];

const StudentsTable = () => {
  const [columnsInfo, setColumnsInfo] = useState<TColumns>(columns);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filters, setFilters] = useState<IFilters>({
    phoneMin: null,
    phoneMax: null,
    region: null,
    course: null,
    createdAt: null,
  });

  const { data, isLoading } = useQuery({
    queryFn: () => getStudents(currentPage, pageSize, filters, searchValue),
    queryKey: ["students", currentPage, pageSize, filters, searchValue],
  });

  const handleFilterSubmit = (filters: IFilters) => {
    setFilters(filters);
  };

  const handleSearch = (search: string) => {
    setSearchValue(search);
  };

  const handleChangeColumns = (cols: TColumns) => {
    setColumnsInfo(cols);
  };

  const handlePageCHnage = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setPageSize(pageSize);
    }
  };

  const students = data?.data || [];
  const totalStudents = data?.count || 0;

  return (
    <>
      <TableTitle totalStudents={totalStudents} />
      <div className="list_view ">
        <TableHeader
          columnsInfo={columnsInfo}
          handleChangeColumns={handleChangeColumns}
          handleFilterSubmit={handleFilterSubmit}
          handleSearch={handleSearch}
        />
        {isLoading ? (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <Spin />
          </div>
        ) : (
          <>
            <div className="custom-scrollbar ">
              <Table
                rowSelection={{ type: "checkbox" }}
                dataSource={students}
                columns={columnsInfo}
                pagination={false}
                rowKey="id"
              />
            </div>
            <div className="list_view_pagination ">
              <Pagination
                total={totalStudents}
                current={currentPage}
                onChange={handlePageCHnage}
                pageSize={pageSize}
                showSizeChanger
                pageSizeOptions={["5", "10", "20"]}
                itemRender={itemRender}
              />
            </div>
          </>
        )}
      </div>
      <AddDrawer />
    </>
  );
};

export default StudentsTable;
