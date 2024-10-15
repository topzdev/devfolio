"use client";

import { Card, CardContent } from "~/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod";
import {useForm} from "react-hook-form";

type Props = {};

const portfolioFormSchema = z.object({
    email: z.string().email(),
    url: z.string().url(),
    name: z.string().min(1).max(64),
    description: z.string().min(1).max(200),
    profession: z.string().min(1).max(64),
    tags: z.array(z.string()).min(1).max(10),
    typographies: z.array(z.string()).min(1).max(5),
    technologies: z.array(z.string()).min(1).max(24),
    services: z.array(z.string()).min(1).max(24),
    mobile_image_url: z.string().url(),
    desktop_image_url: z.string().url(),
    mobile_image_id: z.string(),
    desktop_image_id: z.string(),
})

type PortfolioFormType = z.infer<typeof portfolioFormSchema>;

const PortfolioSubmitForm = (props: Props) => {

    const form = useForm<PortfolioFormType>({
        resolver: zodResolver(portfolioFormSchema)
    })

  return (
    <Card>
      <CardContent>Hello World</CardContent>
    </Card>
  );
};
export default PortfolioSubmitForm;
