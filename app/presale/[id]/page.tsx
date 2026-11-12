import PresaleDetailsClient from "./PresaleDetailsClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PresaleDetailsPage({ params }: Props) {
  const { id } = await params;
  return <PresaleDetailsClient presaleId={id} />;
}