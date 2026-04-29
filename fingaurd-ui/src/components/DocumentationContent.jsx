import { FileText, BookOpen } from "lucide-react";

export default function DocumentationContent() {
  return (
    <div className="w-full">

      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Technical Documentation
        </h1>

        <p className="text-gray-500 dark:text-gray-400">
          Access detailed reports and system design of FinGuard
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

        {/* CARD 1 */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center hover:shadow-[0_0_25px_#3b82f6] hover:-translate-y-2 transition">

          <div className="bg-primary/20 p-4 rounded-full w-fit mx-auto mb-4">
            <BookOpen className="text-primary" size={28} />
          </div>

          <h2 className="text-xl font-semibold mb-3">
            Research Paper
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-5">
            Explore methodology, architecture, and experiments behind fraud detection.
          </p>

          <button className="px-5 py-2 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition">
            Open Document →
          </button>
        </div>

        {/* CARD 2 */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md text-center hover:shadow-[0_0_25px_#3b82f6] hover:-translate-y-2 transition">

          <div className="bg-primary/20 p-4 rounded-full w-fit mx-auto mb-4">
            <FileText className="text-primary" size={28} />
          </div>

          <h2 className="text-xl font-semibold mb-3">
            Project Report
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mb-5">
            Detailed implementation and system design of FinGuard.
          </p>

          <button className="px-5 py-2 bg-primary text-white rounded-lg hover:shadow-[0_0_15px_#3b82f6] transition">
            Open Document →
          </button>
        </div>

      </div>
    </div>
  );
}