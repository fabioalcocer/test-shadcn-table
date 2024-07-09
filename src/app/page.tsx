import * as React from "react"
import type { SearchParams } from "@/types"

import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { DateRangePicker } from "@/components/date-range-picker"
import { Shell } from "@/components/shell"

import { TasksTable } from "./_components/tasks-table"
import { getTasks, getViews } from "./_lib/queries"
import { searchParamsSchema } from "./_lib/validations"

export interface IndexPageProps {
  searchParams: SearchParams
}

export default async function IndexPage({ searchParams }: IndexPageProps) {
  const search = searchParamsSchema.parse(searchParams)

  const tasksPromise = getTasks(search)
  const viewsPromise = getViews()

  return (
    <Shell className="gap-2">
      <React.Suspense
        fallback={
          <DataTableSkeleton
            columnCount={5}
            cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        }
      >
        {/**
         * The `DateRangePicker` component is used to render the date range picker UI.
         * It is used to filter the tasks based on the selected date range it was created at.
         * The business logic for filtering the tasks based on the selected date range is handled inside the component.
         */}
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="ml-auto w-56 sm:w-60 mr-1"
          className="dark:bg-background/95 dark:backdrop-blur-md dark:supports-[backdrop-filter]:bg-background/50"
          align="end"
        />
        {/**
         * Passing promises and consuming them using React.use for triggering the suspense fallback.
         * @see https://react.dev/reference/react/use
         */}
        <TasksTable tasksPromise={tasksPromise} viewsPromise={viewsPromise} />
      </React.Suspense>
    </Shell>
  )
}
