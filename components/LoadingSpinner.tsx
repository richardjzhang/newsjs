export default function LoadingSpinner() {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}
