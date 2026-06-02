import BMIApp from '../tools/bmi/App';
import ToolPageHeader from '../components/ToolPageHeader';

export default function BMIPage() {
  return (
    <div>
      <ToolPageHeader title="BMI & TDEE Calculator" emoji="\uD83D\uDCAA" />
      <BMIApp />
    </div>
  );
}
