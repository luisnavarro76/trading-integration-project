import AppDetailsClient from "./AppDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AppDetailsPage({ params }: Props) {
  const { id } = await params;
  return <AppDetailsClient appId={id} />;
}
