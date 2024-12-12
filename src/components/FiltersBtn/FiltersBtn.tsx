import { Button } from "antd";
import FiltersIcon from "../../assets/icons/filters.svg";

const FiltersBtn = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Button
      className="!text-blue-500 border !border-blue-500 hover:opacity-80"
      onClick={handleClick}
    >
      <img src={FiltersIcon} alt="Filters" />
      Filtres
    </Button>
  );
};

export default FiltersBtn;
