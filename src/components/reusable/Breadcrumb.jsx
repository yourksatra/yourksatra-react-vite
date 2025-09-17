export default function Breadcrumb({ title, setActivePage }) {
  return (
    <nav data-aos="fade-in" className="fixed z-1 w-full bg-gray-100 dark:bg-gray-800 py-2 px-4 shadow-sm text-gray-900 dark:text-white">
      <span
        onClick={() => {
          setActivePage("home");
          setTimeout(() => {
            document
              .querySelector("#")
              ?.scrollIntoView({ behavior: "smooth" });
          }, 50);
        }}
        className="cursor-pointer text-sky-500 hover:underline"
      >
        Home
      </span>{" "}
      /{" "}
      <span className="font-medium">{title}</span>
    </nav>
  );
}
