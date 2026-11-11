import { caseStudyPath, projectLocations, type CaseStudy } from "@/lib/content/case-studies";
import { ProjectCard } from "./blocks";

export function CaseStudyGrid({ projects }: { projects: readonly CaseStudy[] }) {
  return (
    <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const cover = project.photos[0];
        return (
          <li key={caseStudyPath(project)}>
            <ProjectCard
              p={{
                title: project.title,
                location: projectLocations[project.location].name,
                type: "Case study",
                spec: project.scope,
                image: cover.image,
              }}
              href={caseStudyPath(project)}
              imageAlt={cover.caption}
              aspect="aspect-[4/3]"
              sizes="(min-width: 1024px) 31vw, (min-width: 640px) 47vw, 94vw"
            />
          </li>
        );
      })}
    </ul>
  );
}
