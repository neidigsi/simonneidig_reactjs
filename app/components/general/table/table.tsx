import {
  ColumnDef,
  columnFilteringFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  flexRender,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  RowData,
  sortFns,
  SortingState,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import { useState } from "react";

/**
 * Feature set for the generic Table component (TanStack Table v9).
 *
 * Defined statically at module level so `tableFeatures()` can infer
 * the exact feature types and validate the row model slots.
 * All row models are always registered; `enableSorting`,
 * `enableFiltering` and `enablePagination` toggle behavior via options.
 */
const features = tableFeatures({
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns,
  sortFns,
});

/**
 * Column definition type bound to this table's feature set.
 * Use it in consumers instead of the raw `ColumnDef` (which requires
 * the feature set as its first generic in v9).
 */
export type TableColumnDef<TData extends RowData, TValue = unknown> = ColumnDef<
  typeof features,
  TData,
  TValue
>;

interface TableProps<TData extends RowData, TValue> {
  // `any` cell value at the options boundary mirrors the v8 `ColumnDef<TData, any>` behavior
  columns: ColumnDef<typeof features, TData, any>[];
  data: TData[];
  isLoading?: boolean;
  enablePagination?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  pageSize?: number;
  previousButtonLabel?: string;
  nextButtonLabel?: string;
  pageInfoTemplate?: (current: number, total: number) => string;
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
 * - Customizable columns via TableColumnDef
 *
 * Usage:
 * ```tsx
 * const columns: TableColumnDef<ContactMessage>[] = [
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
 * @param {TableColumnDef<TData, TValue>[]} columns - Column definitions for the table
 * @param {TData[]} data - Array of data to display in the table
 * @param {boolean} [isLoading=false] - Whether the table is in a loading state
 * @param {boolean} [enablePagination=false] - Enable pagination controls
 * @param {boolean} [enableSorting=true] - Enable column sorting
 * @param {boolean} [enableFiltering=false] - Enable row filtering
 * @param {number} [pageSize=10] - Number of rows per page
 *
 * @returns {JSX.Element} The rendered table component
 */
export default function Table<TData extends RowData, TValue>({
  columns,
  data,
  isLoading = false,
  enablePagination = false,
  enableSorting = true,
  enableFiltering = false,
  pageSize = 10,
  previousButtonLabel = "Previous",
  nextButtonLabel = "Next",
  pageInfoTemplate = (current, total) => `Page ${current} of ${total}`,
}: TableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageIndex: 0,
        // Without pagination show all rows on a single page
        pageSize: enablePagination ? pageSize : Infinity,
      },
    },
    enableSorting,
    enableFilters: enableFiltering,
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
              <thead className="bg-gradient-to-b from-grey/10 to-grey/5 border-b border-grey/20">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-6 py-4 text-left font-semibold text-black tracking-wide text-xs"
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
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={`border-b border-grey/20 transition-all duration-200 ease-in-out ${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-grey/3"
                    } hover:bg-primary/5`}
                  >
                    {row.getAllCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 text-black">
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
              <div className="flex items-center justify-center py-12 text-grey">
                <p>No data available</p>
              </div>
            )}
          </div>

          {enablePagination && (
            <div className="flex items-center justify-between gap-3 mt-6">
              <div className="flex gap-3">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-2 text-sm rounded-md border border-grey/30 text-black font-medium transition-all duration-200 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-primary/10 hover:enabled:border-primary/50 active:enabled:scale-95"
                >
                  {previousButtonLabel}
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-2 text-sm rounded-md border border-grey/30 text-black font-medium transition-all duration-200 ease-in-out disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-primary/10 hover:enabled:border-primary/50 active:enabled:scale-95"
                >
                  {nextButtonLabel}
                </button>
              </div>

              <div className="text-xs text-black">
                {pageInfoTemplate(
                  table.state.pagination.pageIndex + 1,
                  table.getPageCount()
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
