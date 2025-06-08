import { workSans } from "@/lib/constants";
import { TableHead } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CalendarIcon, ListFilter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import useUserStore from "@/app/(dashboard)/users/store/userStore";
import { useDebounce } from "use-debounce";

const TableHeaderCell = ({
  header,
  isLoading,
}: {
  header: string;
  isLoading?: boolean;
}) => {
  const { setQuery, filterUsers, users } = useUserStore();
  const [debouncedQuery] = useDebounce(setQuery, 1000);

  const filterFields = [
    {
      label: "Organization",
      type: "select",
      options: [
        ...new Set(users.map((user) => user.organization).filter(Boolean)),
      ],
      placeholder: "Select organization",
    },
    { label: "Username", type: "text", placeholder: "Enter username" },
    { label: "Email", type: "email", placeholder: "Enter email" },
    { label: "Date Joined", type: "date" },
    { label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
    {
      label: "Status",
      type: "select",
      options: ["Active", "Inactive", "Pending"],
    },
  ];

  const handleFilter = () => {
    filterUsers();
  };

  return (
    <TableHead
      className={`uppercase text-sm text-custome ${workSans.className}`}
    >
      <div className="flex flex-row items-center gap-x-2">
        {header}
        {isLoading ? (
          <ListFilter size={15} className="text-gray-600" />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 py-1 !focus-visible:ring-0 focus-visible:shadow-none rounded-full !shadow-none w-8 h-8 flex items-center justify-center"
              >
                <ListFilter size={15} className="text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[270px] bg-white shadow-lg p-4 rounded-lg border no-scroller"
              align="center"
            >
              <div className="space-y-3">
                {filterFields.map(({ label, type, placeholder, options }) => (
                  <div key={label} className="space-y-2">
                    <label
                      className={`text-sm font-medium text-custome ${workSans.className}`}
                    >
                      {label}
                    </label>
                    {type === "select" ? (
                      <Select onValueChange={debouncedQuery}>
                        <SelectTrigger className="w-full !bg-transparent shadow-none border-gray-200 hover:border-gray-300 !focus-visible:ring-0">
                          <SelectValue
                            placeholder={`Select`}
                            className={`!text-custome ${workSans.className}`}
                          />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {options?.map((option) => (
                            <SelectItem
                              key={option}
                              value={option.toLowerCase()}
                              className={`hover:bg-gray-50 text-sm ${workSans.className} !text-custome`}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : type === "date" ? (
                      <div className="relative flex gap-2">
                        <Input
                          type="text"
                          placeholder="Select date"
                          onChange={(e) => debouncedQuery(e.target.value)}
                          className={`w-full !bg-transparent shadow-none !focus-visible:ring-0 border-gray-200 hover:border-gray-300 ${workSans.className} text-sm text-gray-500`}
                        />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                            >
                              <CalendarIcon className="size-3.5" />
                              <span className="sr-only">Select date</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="end"
                            alignOffset={-8}
                            sideOffset={10}
                          >
                            <Calendar
                              mode="single"
                              className="rounded-md border"
                              onSelect={(date) =>
                                debouncedQuery(date ? date.toISOString() : "")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    ) : (
                      <Input
                        type={type}
                        placeholder={placeholder}
                        onChange={(e) => debouncedQuery(e.target.value)}
                        className={`w-full !bg-transparent shadow-none !focus-visible:ring-0 border-gray-200 hover:border-gray-300 ${workSans.className} text-sm text-gray-500`}
                      />
                    )}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-x-2 !mt-8">
                  <Button
                    variant="outline"
                    onClick={() => debouncedQuery("")}
                    className={`px-6 ${workSans.className} rounded-md cursor-pointer !text-custome !border-custome !bg-transparent w-full`}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleFilter}
                    className={`px-6 !bg-main text-white rounded-md cursor-pointer w-full ${workSans.className}`}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </TableHead>
  );
};

export default TableHeaderCell;
