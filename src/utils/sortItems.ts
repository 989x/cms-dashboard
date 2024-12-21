interface SortableItem {
  [key: string]: any; // Generic object to support multiple keys
  is_active?: boolean;
  views?: number;
  title?: string;
  created_at?: string; // ISO timestamp
}

export const sortItems = <T extends SortableItem>(
  items: T[],
  sortBy: string,
  keyMap: Record<string, keyof T> = {}
): T[] => {
  const sortedItems = [...items];

  switch (sortBy) {
    case "Status: Inactive":
      sortedItems.sort((a, b) => Number(a.is_active) - Number(b.is_active));
      break;
    case "Status: Active":
      sortedItems.sort((a, b) => Number(b.is_active) - Number(a.is_active));
      break;
    case "Views: Ascending":
      sortedItems.sort((a, b) => (a.views || 0) - (b.views || 0));
      break;
    case "Views: Descending":
      sortedItems.sort((a, b) => (b.views || 0) - (a.views || 0));
      break;
    case "Date: Newest First":
      sortedItems.sort((a, b) =>
        new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
      );
      break;
    case "Date: Oldest First":
      sortedItems.sort((a, b) =>
        new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime()
      );
      break;
    default:
      // Default to alphabetical sort for a key defined in keyMap or 'title'
      const key = keyMap.default || "title";
      sortedItems.sort((a, b) =>
        (a[key]?.toString() || "").localeCompare(b[key]?.toString() || "")
      );
  }

  return sortedItems;
};
