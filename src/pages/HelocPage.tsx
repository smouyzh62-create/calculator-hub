import HelocApp from '../tools/heloc/App';
import ToolPageHeader from '../components/ToolPageHeader';

export default function HelocPage() {
  return (
    <div>
      <ToolPageHeader title="HELOC Calculator" emoji="\uD83C\uDFE0" />
      <HelocApp />
    </div>
  );
}
