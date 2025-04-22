
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ChartData {
  name: string;
  pending: number;
  investigation: number;
  resolved: number;
}

interface CaseChartProps {
  data: ChartData[];
  className?: string;
}

export function CaseChart({ data, className }: CaseChartProps) {
  return (
    <div className={`bg-white p-5 rounded-xl shadow ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-nepal-charcoal">Case Status Overview</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F0FB" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pending" name="Pending" fill="#FFC107" radius={[4, 4, 0, 0]} />
            <Bar dataKey="investigation" name="Under Investigation" fill="#3498DB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="resolved" name="Resolved" fill="#2ECC71" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 gap-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-status-pending mr-2"></div>
          <span className="text-xs text-nepal-mediumgray">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-status-investigation mr-2"></div>
          <span className="text-xs text-nepal-mediumgray">Under Investigation</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-status-resolved mr-2"></div>
          <span className="text-xs text-nepal-mediumgray">Resolved</span>
        </div>
      </div>
    </div>
  );
}
