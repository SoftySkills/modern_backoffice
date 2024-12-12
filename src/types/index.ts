import { TableProps } from "antd";
import { Dayjs } from "dayjs";
import { ComponentType, ReactNode } from "react";

interface GuardProps {
  children: ReactNode;
}

export interface IRoute {
  path: string;
  element: ComponentType;
  guard?: ComponentType<GuardProps>;
  layout?: ComponentType<GuardProps>;
}

export interface StudentDataType {
  avatar: string | null;
  id: string;
  created_at: string;
  name: string;
  phone_number: number;
  email: string;
  region: string;
  course_enrolled: string[] | null;
  invite_code: string;
}

export type TColumns = TableProps<StudentDataType>["columns"];

export interface IFilters {
  phoneMin: number | null;
  phoneMax: number | null;
  region: string | null;
  course: string[] | null;
  createdAt:
    | [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
    | null;
}

export interface ITableHeaderProps {
  columnsInfo: TColumns;
  handleChangeColumns: (cols: TColumns) => void;
  handleFilterSubmit: (filters: IFilters) => void;
  handleSearch: (search: string) => void;
}

export interface IColumnsBtn {
  columnsInfo: TColumns;
  handleChangeColumns: (cols: TColumns) => void;
}
