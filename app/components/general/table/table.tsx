import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import "./table.css";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  pageSize?: number;
}

/**
 * Generic Table Component powered by TanStack Table
 *
 * This reusable table component provides a flexible, type-safe table implementation
 * with support for sorting, filtering, and pagination. It integrates with Tailwind CSS
 * for responsive styling and can be customized for various use cases.
 *
 * Features:
 * - Generic typing for type-safe data handling
 * - Built-in sorting, filtering, and pagination
 * - Responsive design with Tailwind CSS
 * - Loading state support
 * - Customizable columns via ColumnDef
 *
 * Usage:
 * ```tsx
 * const columns: ColumnDef<ContactMessage>[] = [
 *   { accessorKey: "name", header: "Name" },
 *   { accessorKey: "email", header: "Email" },
 * ];
 * <Table columns={columns} data={messages} enablePagination />
 * ```
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @template TData - The type of data in each row
 * @template TValue - The type of the cell values
 *
 * @param {ColumnDef<TData, TValue>[]} columns - Column definitions for the table
 * @param {TData[]} data - Array of data to display in the table
 * @param {boolean} [isLoading=false] - Whether the table is in a loading state
 * @param {boolean} [enablePagination=false] - Enable pagination controls
 * @param {boolean} [enableSorting=true] - Enable column sorting
 * @param {boolean} [enableFiltering=false] - Enable row filtering
 * @param {number} [pageSize=10] - Number of rows per page
 *
 * @returns {JSX.Element} The rendered table component
 */
export default function Table<TData, TValue>({
  columns,
  data,
  isLoading = false,
  enablePagination = false,
  enableSorting = true,
  enableFiltering = false,
  pageSize = 10,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  return (
    <div className="w-full">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current"></div>
        </div>
      )}

      {!isLoading && (
        <>
          <div className="overflow-x-auto rounded-lg border border-grey/20">
            <table className="w-full text-sm">
              <thead className="bg-grey/5 border-b border-grey/20">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-3 text-left font-semibold text-grey-dark"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-grey/20 hover:bg-grey/5 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-grey-dark">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {table.getRowModel().rows.length === 0 && !isLoading && (
              <div className="flex items-center justify-center py-8 text-grey">
                <p>No data available</p>
              </div>
            )}
          </div>

          {enablePagination && (
            <div className="flex items-center justify-between gap-2 mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-4 py-2 rounded border border-grey/20 text-grey-dark disabled:opacity-50 hover:bg-grey/5 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-4 py-2 rounded border border-grey/20 text-grey-dark disabled:opacity-50 hover:bg-grey/5 transition-colors"
                >
                  Next
                </button>
              </div>

              <div className="text-sm text-grey">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
