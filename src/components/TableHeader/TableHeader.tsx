import React, { useState } from "react";
import { Button, Input } from "antd";
import FiltersComponent from "../FiltersComponent/FiltersComponent";
import ColumnsBtn from "../ColumnsBtn/ColumnsBtn";
import PlusIcon from "../../assets/icons/plus.svg";
import FiltersBtn from "../FiltersBtn/FiltersBtn";
import { useToggleDrawer } from "../../hooks/usetoggleDrawer";
import { ITableHeaderProps } from "../../types";

const TableHeader = ({
  columnsInfo,
  handleChangeColumns,
  handleFilterSubmit,
  handleSearch,
}: ITableHeaderProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };

  const toggleDrawer = useToggleDrawer();

  const handleOpenFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleOpenDrawer = () => {
    toggleDrawer(true, "showDrawerAdd");
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-between">
        <Input
          placeholder="Search"
          className="w-1/2 p-3"
          value={searchValue}
          onChange={handleChangeSearch}
        />

        <div className="flex gap-6">
          <ColumnsBtn
            columnsInfo={columnsInfo}
            handleChangeColumns={handleChangeColumns}
          />
          <FiltersBtn handleClick={handleOpenFilters} />

          <Button type="primary" className="px-10 " onClick={handleOpenDrawer}>
            <img src={PlusIcon} alt="Plus" />
            Add New Student
          </Button>
        </div>
      </div>
      <div className="mt-10">
        {isFiltersOpen && (
          <FiltersComponent handleFilterSubmit={handleFilterSubmit} />
        )}
      </div>
    </>
  );
};

export default TableHeader;
