import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store/store";

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<AppStore | null>(null);
  
  // Create the store instance the first time this renders
  storeRef.current ??= makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
}
