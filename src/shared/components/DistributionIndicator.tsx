import { getStatusStyle } from "../../utils/getStatusStyle";

interface DistributionIndicatorProps {
  title: string
  ratio: number
  className?: string
}

const DistributionIndicator = ({ title, ratio, className = getStatusStyle('PENDING') }: DistributionIndicatorProps) => {
  return (
    <div>
      <span className="text-xs">{title}s</span>
      <div className="flex gap-2 items-center">
        <div className="grow bg-slate-200 rounded-md">
            <div className={`h-3 border rounded-md shadow-sm ${className}`} style={{ width: `${ratio}%`}}></div>
        </div>
        <span>{ratio}%</span>
      </div>
    </div>
  );
};

export default DistributionIndicator;
