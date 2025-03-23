import { SiGithub } from "@icons-pack/react-simple-icons";

export default function Toolbar() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold">Compliance Review</h1>

      <div className="flex items-center space-x-4">
        <a
          tabIndex={4}
          className="size-8 flex focus:outline-0 focus:ring-1 focus:ring-slate-400 justify-center items-center text-sm font-semibold text-slate-400 shadow-lg border-slate-300 border-[1px] rounded-md"
          href="https://github.com/avoinicu/lex-luthor"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiGithub size={16} />
        </a>
      </div>
    </div>
  );
}
