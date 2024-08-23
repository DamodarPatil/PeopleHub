import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const PeopleTable = ({ data, onEdit, onDelete, onRowClick, onAdd }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const columns = useMemo(
    () => [
      {
        header: "Profile",
        accessorKey: "profileImage",
        cell: ({ row }) => (
          <img
            src={row.original.profileImage}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        ),
        enableSorting: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        enableSorting: true,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableSorting: true,
        cell: ({ row }) => (
          <div className="flex items-center">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                row.original.status === "Active" ? "bg-green-400" : "bg-red-400"
              }`}
            ></span>
            {row.original.status}
          </div>
        ),
      },
      {
        header: "Role",
        accessorKey: "role",
        enableSorting: false,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableSorting: false,
      },
      {
        header: "Teams",
        accessorKey: "teams",
        enableSorting: false,
        cell: ({ row }) => <div>{row.original.teams.join(", ")}</div>,
      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="flex items-center">
            <svg
              onClick={() => onEdit(row.original)}
              className="w-5 h-5 text-blue-600 cursor-pointer mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536M9 11l3.536-3.536a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-2.828 0L9 11z"
              ></path>
            </svg>
            <svg
              onClick={() => onDelete(row.index)}
              className="w-5 h-5 text-red-600 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        ),
      },
    ],
    [onEdit, onDelete]
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        (!roleFilter || row.role === roleFilter) &&
        (!teamFilter || row.teams.includes(teamFilter))
      );
    });
  }, [data, roleFilter, teamFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    const queryParams = new URLSearchParams();
    if (globalFilter) queryParams.set("query", globalFilter);
    if (roleFilter) queryParams.set("role", roleFilter);
    if (teamFilter) queryParams.set("team", teamFilter);
    window.history.replaceState(null, "", `?${queryParams.toString()}`);
  }, [globalFilter, roleFilter, teamFilter]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <div className="mb-4 flex gap-2 justify-between">
          <div className="flex gap-2">
            <input
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search..."
              className="p-2 border border-gray-300 rounded bg-white"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">All Roles</option>
              <option value="Product Designer">Product Designer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
            </select>
            <select
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
              className="p-2 border border-gray-300 rounded bg-white"
            >
              <option value="">All Teams</option>
              <option value="Design">Design</option>
              <option value="Product">Product</option>
              <option value="Marketing">Marketing</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <button
            className="bg-blue-600 text-white p-2 rounded"
            onClick={onAdd}
          >
            Add Member
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 border-b border-gray-300 cursor-pointer text-gray-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span>
                      {header.column.getIsSorted()
                        ? header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border-b border-gray-300">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 text-gray-600">
          <button
            className="p-2 border border-gray-300 rounded"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            className="p-2 border border-gray-300 rounded"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

PeopleTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default PeopleTable;
