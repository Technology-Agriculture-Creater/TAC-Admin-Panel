import CropExcelDetailClient from "./CropExcelDetailClient";

interface CropExcelDetailPageProps {
  params: { id: string };
}

const CropExcelDetailPage: React.FC<CropExcelDetailPageProps> = async ({
  params,
}) => {
  const { id } = await params;

  return <CropExcelDetailClient id={id} />;
};

export default CropExcelDetailPage;
