type SearchEmptyProps = {
  query: string;
};

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="text-center py-12">
      <h2 className="text-xl font-semibold mb-2">
        Tidak ada artikel yang ditemukan
      </h2>
      <p className="text-gray-600">Coba cari dengan kata kunci yang berbeda</p>
    </div>
  );
}
