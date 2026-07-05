"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formUrlQuery } from "@/lib/utils/url-helpers";

export type TabItem = {
  value: string;
  label: string;
};

interface UrlTabsProps {
  items: TabItem[];
  paramKey?: string;
  defaultValue?: string;
  className?: string;
  replace?: boolean;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

export default function UrlTabs({
  items,
  paramKey = "tab",
  defaultValue,
  className,
  replace = true,
  onValueChange,
  children,
}: UrlTabsProps) {
    const router = useRouter();
  const searchParams = useSearchParams();
  

  const activeTab = searchParams?.get(paramKey) ?? defaultValue ?? items[0]?.value ?? "";

  const handleChange = (value: string) => {
    const url = formUrlQuery({
      params: searchParams?.toString() ?? "",
      key: paramKey,
      value: value === (defaultValue ?? items[0]?.value) ? null : value,
    });

        if (replace) router.replace(url, { scroll: false });
    else router.push(url, { scroll: false });
    

    onValueChange?.(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleChange} className={className}>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
}
