import Link from "next/link";
import { ArrowIcon } from "@/components/ui/Button";
import { Img } from "@/components/ui/Img";
import {
  caseStudyPath,
  caseStudyTimeline,
  projectPhotoId,
  projectLocations,
  type CaseStudy,
} from "@/lib/content/case-studies";
import { getService } from "@/lib/site";

export function CaseStudyFeature({ project, detail = false }: { project: CaseStudy; detail?: boolean }) {
  const alternateIndex = project.overview.image
    ? project.photos.findIndex((photo) => photo.image === project.overview.image)
    : -1;
  const cover = project.photos[Math.max(0, alternateIndex)];
  const { summary, highlights, surface, stage } = project.overview;
  const location = projectLocations[project.location].name;
  const Heading = detail ? "h2" : "h3";
  const service = detail && project.service ? getService(project.service) : undefined;

  return (
    <div className="grid gap-7 lg:grid-cols-2 lg:items-center lg:gap-12">
      <figure id={detail && alternateIndex >= 0 ? projectPhotoId(alternateIndex) : undefined} className="scroll-mt-28">
        <div className="overflow-hidden rounded-[22px] bg-bone-2">
          <Img
            name={cover.image}
            alt={cover.caption}
            sizes="(min-width: 1440px) 640px, (min-width: 1024px) 46vw, 94vw"
            className="aspect-[4/3] w-full object-cover"
          />
        </div>
        <figcaption className="mt-2.5 text-[0.8125rem] leading-relaxed text-ink/65">{cover.caption}</figcaption>
      </figure>

      <div>
        <p className="text-eyebrow mb-3 text-ink/65">{project.scope}</p>
        <Heading id={detail ? "project-overview" : project.slug} className={`text-display ${detail ? "type-h2" : "type-h3"}`}>
          {detail ? "Project overview" : project.title}
        </Heading>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink/75">{summary}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed text-ink/75">
          {highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>

        {detail ? (
          service && (
            <Link href={`/services/${service.slug}/`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
              {service.name} <ArrowIcon size={12} className="shrink-0" />
            </Link>
          )
        ) : (
          <Link
            href={caseStudyPath(project)}
            aria-label={`Read the full case study for ${project.title}`}
            className="mt-5 inline-flex items-center gap-2 py-2 text-sm font-semibold underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
          >
            Read the full case study <ArrowIcon size={12} />
          </Link>
        )}

        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-ink/15 pt-5 sm:grid-cols-3">
          <div>
            <dt className="text-eyebrow text-ink/65">Location</dt>
            <dd className="mt-1 text-sm font-medium">{location}</dd>
          </div>
          <div>
            <dt className="text-eyebrow text-ink/65">Surface</dt>
            <dd className="mt-1 text-sm font-medium">{surface}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-eyebrow text-ink/65">Stage shown</dt>
            <dd className="mt-1 text-sm font-medium">{stage}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function CaseStudyFeatures({ projects, previewPhotos = false }: {
  projects: readonly CaseStudy[];
  previewPhotos?: boolean;
}) {
  return (
    <ul className="mt-8 divide-y divide-ink/12 md:mt-10">
      {projects.map((project) => {
        const timeline = previewPhotos ? caseStudyTimeline(project) : [];
        const previews = timeline.length
          ? timeline
          : project.photos.slice(1, 4).map((photo, index) => ({ photo, id: projectPhotoId(index + 1), label: undefined }));

        return (
          <li key={caseStudyPath(project)} className="py-10 first:pt-0 last:pb-0 md:py-14">
            <article aria-labelledby={project.slug}>
              <CaseStudyFeature project={project} />
              {previewPhotos && previews.length > 0 && (
                <ul aria-label={`Site photos from ${project.title}`} className="no-scrollbar mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto sm:mt-9 sm:grid sm:grid-cols-3">
                  {previews.map(({ photo, id, label }) => (
                    <li key={photo.image} className="w-[76%] shrink-0 snap-start sm:w-auto">
                      <Link
                        href={`${caseStudyPath(project)}#${id}`}
                        className="group block rounded-[22px]"
                        aria-label={`View project photo — ${photo.caption}`}
                        prefetch={false}
                      >
                        <figure>
                          <div className="overflow-hidden rounded-[22px] bg-bone-2">
                            <Img
                              name={photo.image}
                              alt={photo.caption}
                              sizes="(min-width: 1440px) 435px, (min-width: 640px) 31vw, 76vw"
                              className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                            />
                          </div>
                          <figcaption className="mt-2 text-[0.8125rem] leading-relaxed text-ink/70">
                            {label && <strong className="mb-1 block text-ink">{label}</strong>}
                            {photo.caption}
                          </figcaption>
                        </figure>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </li>
        );
      })}
    </ul>
  );
}
