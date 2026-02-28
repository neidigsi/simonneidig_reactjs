import { ColumnDef } from "@tanstack/react-table";
import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMessages } from "@/store/slices/contactSlice";
import Table from "@/components/general/table/table";
import { useTranslation } from "react-i18next";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  creationDate: string;
  language: string;
}

/**
 * ContactMessagesTable Component
 *
 * Displays all contact form submissions in a table format. This component is designed
 * for admin users to review and manage contact requests from website visitors.
 *
 * Features:
 * - Loads all messages from Redux state
 * - Displays messages in a sortable, paginated table
 * - Shows creation date, name, email, and message content
 * - Responsive design with Tailwind CSS
 * - Loading state while fetching data
 *
 * Usage:
 * <ContactMessagesTable />
 *
 * @author Simon Neidig <mail@simon-neidig.eu>
 *
 * @returns {JSX.Element} The rendered contacts table component
 */
export default function ContactMessagesTable(): JSX.Element {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const messages = useAppSelector((state) => state.contact.messages);
  const messagesLoading = useAppSelector(
    (state) => state.contact.messagesLoading
  );
  const messagesLoaded = useAppSelector(
    (state) => state.contact.messagesLoaded
  );
  const language = useAppSelector((state) => state.settings.language);
  const jwt = useAppSelector((state) => state.user.jwt);

  useEffect(() => {
    if (!messagesLoaded && !messagesLoading) {
      dispatch(fetchMessages({ language, jwt }));
    }
  }, [dispatch, messagesLoaded, messagesLoading, language]);

  const columns: ColumnDef<ContactMessage>[] = [
    {
      accessorKey: "creationDate",
      header: t("main.contact.table.date") || "Date",
      cell: (info) => {
        const date = new Date(info.getValue() as string);
        return date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },
    {
      accessorKey: "name",
      header: t("main.contact.table.name") || "Name",
    },
    {
      accessorKey: "email",
      header: t("main.contact.table.email") || "Email",
      cell: (info) => (
        <a
          href={`mailto:${info.getValue() as string}`}
          className="text-blue-600 hover:underline"
        >
          {info.getValue() as string}
        </a>
      ),
    },
    {
      accessorKey: "message",
      header: t("main.contact.table.message") || "Message",
      cell: (info) => {
        const message = info.getValue() as string;
        // Truncate message to 100 characters with ellipsis
        return message.length > 100 ? `${message.substring(0, 100)}...` : message;
      },
    },
    {
      accessorKey: "lang",
      header: t("main.contact.table.language") || "Language",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-sm mt-1">
          {t("main.contact.table.description") || "Total messages"}:{" "}
          <span className="font-semibold">{messages.length}</span>
        </p>
      </div>

      <Table<ContactMessage, any>
        columns={columns}
        data={messages}
        isLoading={messagesLoading}
        enablePagination={true}
        enableSorting={true}
        pageSize={10}
      />
    </div>
  );
}
