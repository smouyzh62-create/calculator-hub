import CompoundApp from '../tools/compound/App';
import ToolPageHeader from '../components/ToolPageHeader';

export default function CompoundPage() {
  return (
    <div>
      <ToolPageHeader title="Compound Interest Calculator" emoji="\uD83D\uDCC8" />
      <CompoundApp />
    </div>
  );
}
