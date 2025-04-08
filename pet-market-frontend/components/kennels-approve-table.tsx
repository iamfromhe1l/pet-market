import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import React from "react";

export const KennelsApproveTable: React.FC = () => {
  const kennels = [
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
    { name: "Питомник", description: "Очень супер-пупер длинное описание питомникаааааааааааааааа да", updatedAt: new Date() },
  ]

  return (
    <div className="overflow-auto max-h-[400px]">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-secondary h-16">
          <TableRow>
            <TableHead className="hidden sm:table-cell w-[40px] border-r" />
            <TableHead className="w-[100px] border-r">Название</TableHead>
            <TableHead className="border-r">Описание</TableHead>
            <TableHead>Дата</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {kennels.map((kennel, index) => (
            <TableRow key={index} className="cursor-pointer">
              <TableCell className="hidden sm:table-cell border-r">{index + 1}</TableCell>
              <TableCell className="border-r">{kennel.name}</TableCell>
              <TableCell className="whitespace-normal border-r">{kennel.description}</TableCell>
              <TableCell>{kennel.updatedAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
