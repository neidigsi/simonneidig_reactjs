import { JSX, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMessages } from "@/store/slices/contactSlice";
import Table, { TableColumnDef } from "@/components/general/table/table";
import { useTranslation } from "react-i18next";
import { getLanguageFlag } from "@/utils/languageFlagConverter";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  creation_date: string;
  lang: string;
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

  const columns: TableColumnDef<ContactMessage>[] = [
    {
      accessorKey: "creation_date",
      header: t("main.contact.table.date") || "Date",
      cell: (info) => {
        const rawValue = info.getValue() as string | null | undefined;
        // Creation date can be missing for legacy records
        if (!rawValue) {
          return "—";
        }
        const date = new Date(rawValue);
        if (Number.isNaN(date.getTime())) {
          return "—";
        }
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
        // Message can be null for legacy records, fall back to empty string
        const message = (info.getValue() as string | null) ?? "";
        // Truncate message to 1000 characters with ellipsis
        return message.length > 1000 ? `${message.substring(0, 1000)}...` : message;
      },
    },
    {
      accessorKey: "lang",
      header: t("main.contact.table.language") || "Language",
      cell: (info) => {
        // Language can be null when a record has no language association
        const langCode = info.getValue() as string | null | undefined;
        return <span className="text-lg">{getLanguageFlag(langCode)}</span>;
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-4">
        <p className="text-sm text-black mt-1">
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
        previousButtonLabel={t("main.contact.table.previousButton") || "Previous"}
        nextButtonLabel={t("main.contact.table.nextButton") || "Next"}
        pageInfoTemplate={(current, total) =>
          t("main.contact.table.pageInfo", {
            current,
            total,
            defaultValue: `Page ${current} of ${total}`,
          })
        }
      />
    </div>
  );
}
