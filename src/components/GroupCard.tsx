import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"; // import arrow icon
import { GroupCardSvg } from "./GroupCardSvg";
import Link from "next/link";

interface GroupCardProps {
  title: string;
  color: string;
  url: string;
}

export const GroupCard: React.FC<GroupCardProps> = ({ title, color, url }) => {
  return (
    <Link href={url} target="_blank">
    <Card className="w-[350px] h-[80px] flex flex-row items-center font-poppins hover:bg-slate-50">
      <div className="bg-gray-100 p-1 rounded-full w-10 h-10 mx-2">
        <div className="bg-slate-800 w-8 h-8 rounded-full">
        <GroupCardSvg hexValue={color} />
        </div>
      </div>
      <div className="flex-grow">
        <CardTitle className="font-semibold text-sm">{title}</CardTitle>
      </div>
      <CardContent className="flex justify-end mt-2">
        <div className="mx-2">
          <ExternalLink />
        </div>
      </CardContent>
      
    </Card>
    </Link>
  )
}
