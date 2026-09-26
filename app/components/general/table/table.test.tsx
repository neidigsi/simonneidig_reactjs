// Import external dependencies
import { render, screen, fireEvent } from "@testing-library/react";

// Import internal dependencies
import Table, { TableColumnDef } from "@/components/general/table/table";

interface Item {
  name: string;
  email: string;
}

const columns: TableColumnDef<Item>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

const data: Item[] = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
  { name: "Carol", email: "carol@example.com" },
];

describe("Table Component", () => {
  /**
   * Test to check if headers and all rows render when pagination is disabled.
   */
  it("renders headers and all rows without pagination", () => {
    render(<Table columns={columns} data={data} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
  });

  /**
   * Test to check if the loading state renders a spinner instead of the table.
   */
  it("renders loading state instead of rows", () => {
    const { container } = render(
      <Table columns={columns} data={data} isLoading={true} />
    );

    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(
      container.querySelector(".animate-spin")
    ).toBeInTheDocument();
  });

  /**
   * Test to check if the empty state is shown when no data is provided.
   */
  it("renders empty state when data is empty", () => {
    render(<Table columns={columns} data={[]} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  /**
   * Test to check if pagination slices rows and navigation works.
   */
  it("paginates rows and navigates between pages", () => {
    render(
      <Table
        columns={columns}
        data={data}
        enablePagination={true}
        pageSize={2}
        previousButtonLabel="Previous"
        nextButtonLabel="Next"
      />
    );

    // First page shows two rows with correct page info
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.queryByText("Carol")).not.toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

    const previousButton = screen.getByRole("button", { name: "Previous" });
    const nextButton = screen.getByRole("button", { name: "Next" });
    expect(previousButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    // Navigate to the second page
    fireEvent.click(nextButton);
    expect(screen.queryByText("Alice")).not.toBeInTheDocument();
    expect(screen.getByText("Carol")).toBeInTheDocument();
    expect(screen.getByText("Page 2 of 2")).toBeInTheDocument();
    expect(nextButton).toBeDisabled();

    // Navigate back to the first page
    fireEvent.click(previousButton);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});
