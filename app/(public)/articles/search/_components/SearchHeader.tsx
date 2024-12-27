type SearchHeaderProps = {
  query: string;
  resultCount: number;
};

export function SearchHeader({ query, resultCount }: SearchHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="font-semibold text-sm py-2">
        {resultCount} hasil untuk pencarian: {query}
      </h1>
    </header>
  );
}
