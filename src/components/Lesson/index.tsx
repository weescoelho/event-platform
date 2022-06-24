import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonsProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson({ title, availableAt, type, slug }: LessonsProps) {
  const { slug: slugParam } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR },
  );

  const isActiveLesson = slug === slugParam;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div
        className={classNames(
          `rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500`,
          {
            "bg-green-500": isActiveLesson,
          },
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classNames(
                `flex items-center gap-2 text-sm text-blue-500 font-medium`,
                {
                  "text-white": isActiveLesson,
                },
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={classNames(
              `text-xs rounded px-2 py-[2px] text-white border border-green-300 font-bold`,
              {
                "border-white": isActiveLesson,
              },
            )}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classNames(`mt-5 block`, {
            "text-gray-200": !isActiveLesson,
            "text-white": isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
