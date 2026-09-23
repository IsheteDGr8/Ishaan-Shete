import type { ArchitectureStep } from "@/content/types";

export function ArchitectureDiagram({ title, steps }: { title: string; steps: ArchitectureStep[] }) {
  return (
    <figure className="rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
      <ol className="grid gap-3 lg:auto-cols-fr lg:grid-flow-col lg:gap-0" aria-label={`${title} architecture, in order`}>
        {steps.map((step, i) => (
          <li key={step.label} className="relative flex lg:flex-col">
            <div className="flex w-full items-start gap-4 rounded-2xl border border-line bg-canvas p-4 lg:mx-2 lg:h-full lg:w-auto lg:flex-col lg:gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-sm font-semibold tabular-nums text-accent-ink">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold leading-tight">{step.label}</span>
                <span className="mt-1 block text-sm text-ink-2">{step.detail}</span>
              </span>
            </div>
            {i < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-8 h-3 w-px bg-accent/50 lg:-right-1 lg:bottom-auto lg:left-auto lg:top-8 lg:h-px lg:w-2"
              />
            ) : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-sm text-ink-3">Simplified model of how {title} fits together, in order of the request path.</figcaption>
    </figure>
  );
}
