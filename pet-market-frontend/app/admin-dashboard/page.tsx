import { KennelsApproveTable } from "@/components/kennels-approve-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboaPage() {
  return <div className="p-2 sm:p-10">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Заявки на подтверждение питомника</CardTitle>
        <CardDescription>Нажмите на питомник, чтобы начать подтверждение</CardDescription>
      </CardHeader>
      <CardContent className="rounded-md px-0 mx-6 overflow-hidden border" >
        <KennelsApproveTable />
      </CardContent>
    </Card>
  </div>
}
