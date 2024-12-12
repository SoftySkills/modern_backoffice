import { Button, DatePicker, InputNumber, Select } from "antd";
import { TUNISIA_REGIONS } from "../../constants/regions";
import { COURSES } from "../../constants/Courses";
import { useState } from "react";
import { IFilters } from "../../types";
import { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

const FiltersComponent = ({
  handleFilterSubmit,
}: {
  handleFilterSubmit: (filters: IFilters) => void;
}) => {
  const [filters, setFilters] = useState<IFilters>({
    phoneMin: null,
    phoneMax: null,
    region: null,
    course: null,
    createdAt: null,
  });

  const handleFilerChange = (
    key: string,
    value:
      | string
      | string[]
      | number
      | [start: Dayjs | null | undefined, end: Dayjs | null | undefined]
      | null
  ) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    handleFilterSubmit(filters);
  };

  const handleReset = () => {
    setFilters({
      phoneMin: null,
      phoneMax: null,
      region: null,
      course: null,
      createdAt: null,
    });
    handleFilterSubmit({
      phoneMin: null,
      phoneMax: null,
      region: null,
      course: null,
      createdAt: null,
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap  gap-x-16 gap-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-[1.3rem]">Phone Number</p>
          <div className="flex gap-2">
            <InputNumber
              placeholder="min"
              className="w-[16rem]"
              onChange={(value) => handleFilerChange("phoneMin", value)}
              value={filters.phoneMin}
            />
            <InputNumber
              placeholder="max"
              className="w-[16rem]"
              onChange={(value) => handleFilerChange("phoneMax", value)}
              value={filters.phoneMax}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-[1.3rem]">Region</p>

          <Select
            placeholder="Choose region"
            className="w-[16rem]"
            value={filters.region}
            onChange={(value) => handleFilerChange("region", value)}
          >
            {TUNISIA_REGIONS.map((region, index) => (
              <Select.Option key={index} value={region}>
                {region}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-[1.3rem]">Course Enrolled</p>
          <Select
            placeholder="Choose course"
            className="w-[20rem]"
            mode="multiple"
            onChange={(value) => handleFilerChange("course", value)}
            value={filters.course}
          >
            {COURSES.map((course, index) => (
              <Select.Option key={index} value={course}>
                {course}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-500 text-[1.3rem]">Created At</p>
          <RangePicker
            onChange={(value) => handleFilerChange("createdAt", value)}
            value={filters.createdAt}
          />
        </div>
      </div>

      <div className="flex gap-6 self-end">
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleSubmit} type="primary">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default FiltersComponent;
