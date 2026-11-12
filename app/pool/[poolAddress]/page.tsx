import PoolDetailsClient from "./PoolDetailsClient";

type Props = {
  params: Promise<{ poolAddress: string }>;
};

export default async function PoolDetailsPage({ params }: Props) {
  const { poolAddress } = await params;
  return <PoolDetailsClient poolAddress={poolAddress} />;
}
