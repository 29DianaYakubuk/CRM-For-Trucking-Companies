export default function Loader(){
  return (
    <div className="flex items-center justify-center py-10">
      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4"/>
        <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeWidth="4"/>
      </svg>
    </div>
  );
}