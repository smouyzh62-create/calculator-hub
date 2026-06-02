import AdSenseApp from '../tools/adsense/App';
import ToolPageHeader from '../components/ToolPageHeader';

export default function AdSensePage() {
  return (
    <div>
      <ToolPageHeader title="Ad ROI Calculator" emoji="\uD83D\uDCC8" />
      <AdSenseApp />
    </div>
  );
}
