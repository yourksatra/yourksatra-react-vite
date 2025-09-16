import Experience from "../layout/experience";
import Breadcrumb from "../reusable/Breadcrumb";

export default function ExperienceSection({ setActivePage }) {
  return (
    <section className="min-h-[100svh] flex flex-col items-center bg-white dark:bg-gray-900">
      <div className="w-full mt-16">
        <Breadcrumb title="Experience" setActivePage={setActivePage} />
      </div>
      <div className="my-16">
        <Experience />
      </div>
    </section>
  );
}
