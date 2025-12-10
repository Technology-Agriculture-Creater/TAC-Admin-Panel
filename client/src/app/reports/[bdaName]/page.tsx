import BdaReportClient from "./BdaReportClient";
import reportsData from "../../../data/Reports.json";

export async function generateStaticParams() {
  return reportsData.map((report) => ({
    bdaName: report.bdaName.replace(/ /g, "-"),
  }));
}

interface BdaReportPageProps {
  params: Promise<{ bdaName: string }>;
}

const BdaReportPage = async ({ params }: BdaReportPageProps) => {
  const { bdaName } = await params;
  return <BdaReportClient bdaName={bdaName} />;
};

export default BdaReportPage;
