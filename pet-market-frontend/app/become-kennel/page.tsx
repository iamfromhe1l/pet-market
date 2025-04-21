import { BecomeKennelForm } from '@/components/become-kennel-form';
import { LogoLink } from '@/components/logo-link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export default function BecomeKennelPage() {
  return (
    <div>
      <div className="flex justify-center p-6 md:justify-start md:p-10">
        <LogoLink />
      </div>
      <div className="flex flex-col items-center gap-4 px-6">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <div className="bg-muted relative h-40 overflow-hidden rounded-md lg:h-52">
              <Image
                src="/become-kennel-cat.jpg"
                alt="become-kennel-cat"
                className="object-cover"
                quality={100}
                fill
              />
            </div>
            <p className="absolute top-2 left-4 text-5xl font-bold sm:text-6xl md:text-7xl">
              Станьте
            </p>
          </div>
          <div className="relative flex-1">
            <div className="bg-muted relative h-40 overflow-hidden rounded-md lg:h-52">
              <Image
                src="/become-kennel-cat1.jpg"
                alt="become-kennel-cat"
                className="object-cover"
                quality={100}
                fill
              />
            </div>
            <p className="absolute right-4 bottom-2 text-5xl font-bold sm:text-6xl md:text-7xl">
              Питомником
            </p>
          </div>
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Заявка на получение статуса питомника</CardTitle>
            <CardDescription>
              Заполните данные для отправки заявки на получение статуса
              питомника
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BecomeKennelForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
