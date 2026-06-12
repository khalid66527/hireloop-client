"use client";

import { Button, Checkbox, Chip, Table, cn } from "@heroui/react";
// সরাসরি @gravity-ui/icons থেকে আইকনগুলো ইম্পোর্ট করা হলো
import { ChevronUp, Copy, Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { useMemo, useState } from "react";

const statusColorMap = {
  active: "success",
  inactive: "warning",
  closed: "danger",
};

function SortableColumnHeader({ children, sortDirection }) {
  return (
    <span className="flex items-center justify-between">
      {children}
      {!!sortDirection && (
        <ChevronUp
          className={cn(
            "size-3 transform transition-transform duration-100 ease-out",
            sortDirection === "descending" ? "rotate-180" : "",
          )}
        />
      )}
    </span>
  );
}

export default function JobTable({ jobs = [] }) {
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "title",
    direction: "ascending",
  });

  const sortedJobs = useMemo(() => {
    return [...jobs].sort((a, b) => {
      const col = sortDescriptor.column;
      const first = String(a[col] || "");
      const second = String(b[col] || "");
      let cmp = first.localeCompare(second);

      if (sortDescriptor.direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [jobs, sortDescriptor]);

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Jobs Management Table"
          className="min-w-[800px]"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Column className="pr-0">
              <Checkbox aria-label="Select all" slot="selection">
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
              </Checkbox>
            </Table.Column>
            <Table.Column allowsSorting isRowHeader className="after:hidden" id="_id">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>Job ID</SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="title">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>Job Title</SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="type">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>Type & Salary</SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column allowsSorting id="status">
              {({ sortDirection }) => (
                <SortableColumnHeader sortDirection={sortDirection}>Status</SortableColumnHeader>
              )}
            </Table.Column>
            <Table.Column className="text-end">Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {sortedJobs.map((job) => (
              <Table.Row key={job._id} id={job._id}>
                <Table.Cell className="pr-0">
                  <Checkbox aria-label={`Select ${job.title}`} slot="selection" variant="secondary">
                    <Checkbox.Control>
                      <Checkbox.Indicator />
                    </Checkbox.Control>
                  </Checkbox>
                </Table.Cell>
                
                <Table.Cell className="font-medium">
                  <div className="flex items-center gap-2">
                    #{String(job._id).substring(0, 8)}...
                    <Button isIconOnly size="sm" variant="ghost">
                      <Copy className="size-4 text-muted" />
                    </Button>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold capitalize">{job.title}</span>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="capitalize">{job.category}</span>
                      <span>•</span>
                      <span>{job.location} {job.isRemote && "(Remote)"}</span>
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell className="min-w-52">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium capitalize">{String(job.type).replace("-", " ")}</span>
                    <span className="text-xs text-muted">
                      {job.minSalary} - {job.maxSalary} {job.currency}
                    </span>
                  </div>
                </Table.Cell>

                <Table.Cell className="min-w-25">
                  <Chip color={statusColorMap[job.status] || "default"} size="sm" variant="soft" className="capitalize">
                    {job.status}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex items-center justify-end gap-1">
                    <Button isIconOnly size="sm" variant="tertiary" aria-label="View Job">
                      <Eye className="size-4" />
                    </Button>
                    <Button isIconOnly size="sm" variant="tertiary" aria-label="Edit Job">
                      <Pencil className="size-4" />
                    </Button>
                    <Button isIconOnly size="sm" variant="danger-soft" aria-label="Delete Job">
                      <TrashBin className="size-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}