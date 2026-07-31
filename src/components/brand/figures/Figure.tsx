import type { FigureName } from "@/content";
import { CoffeeCatFigure } from "./CoffeeCatFigure";
import { DiffFigure } from "./DiffFigure";
import { ThreadFigure } from "./ThreadFigure";
import { PipelineFigure } from "./PipelineFigure";

/* Name-to-component lookup for the `figure` field in the content module. This
   lived in WorkAct until the extension was promoted and took its figure along,
   leaving two acts needing the same map.

   `satisfies` rather than an annotation: it checks every FigureName has an entry
   without widening the lookup, so adding a name to the union fails here rather
   than at runtime. */
const figures = {
  coffeecat: CoffeeCatFigure,
  diff: DiffFigure,
  thread: ThreadFigure,
  pipeline: PipelineFigure,
} satisfies Record<FigureName, () => React.JSX.Element>;

export function Figure({ name }: { name: FigureName }) {
  const Component = figures[name];
  return <Component />;
}
