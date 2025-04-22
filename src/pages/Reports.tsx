import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  BarChart3, 
  PieChart, 
  LineChart, 
  Download, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Printer,
  AlertCircle,
  Clock,
  CheckCircle,
  CalendarDays,
  Filter,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ReportStatistic {
  label: string;
  value: number;
  change: number;
  changeLabel: "increase" | "decrease" | "no-change";
  icon: React.ReactNode;
}

export default function Reports() {
  const [periodFilter, setPeriodFilter] = useState("year");
  const [reportType, setReportType] = useState("overview");

  // Sample data for demonstration
  const statisticsData: ReportStatistic[] = [
    {
      label: "Total Cases",
      value: 358,
      change: 12,
      changeLabel: "increase",
      icon: <FileText className="h-5 w-5" />
    },
    {
      label: "Pending Cases",
      value: 83,
      change: 3,
      changeLabel: "decrease",
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      label: "Cases Under Investigation",
      value: 133,
      change: 8,
      changeLabel: "increase",
      icon: <Clock className="h-5 w-5" />
    },
    {
      label: "Resolved Cases",
      value: 142,
      change: 5,
      changeLabel: "increase",
      icon: <CheckCircle className="h-5 w-5" />
    },
  ];

  // Chart data for case trends
  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'New Cases',
        data: [65, 59, 80, 81, 56, 55, 72, 68, 74, 79, 85, 90],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 0.8)',
        borderWidth: 2,
      },
      {
        label: 'Resolved Cases',
        data: [28, 48, 40, 52, 41, 35, 45, 48, 52, 53, 59, 62],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        borderWidth: 2,
      },
    ],
  };

  // Data for case types distribution
  const caseTypeData = {
    labels: ['Property Dispute', 'Theft', 'Assault', 'Fraud', 'Domestic Violence', 'Others'],
    datasets: [
      {
        label: 'Case Distribution',
        data: [125, 89, 72, 43, 25, 4],
        backgroundColor: [
          'rgba(53, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
        borderColor: [
          'rgba(53, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Data for resolution time
  const resolutionTimeData = {
    labels: ['< 1 month', '1-3 months', '3-6 months', '6-12 months', '> 12 months'],
    datasets: [
      {
        label: 'Case Resolution Time',
        data: [15, 35, 60, 25, 7],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barPercentage: 0.6,
      },
    ],
  };

  // Data for monthly case status
  const monthlyStatusData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Pending',
        data: [12, 19, 15, 11, 18, 14, 17, 13, 16, 15, 20, 21],
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
      {
        label: 'Under Investigation',
        data: [18, 14, 20, 15, 19, 22, 25, 18, 21, 23, 19, 17],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Resolved',
        data: [5, 10, 8, 12, 15, 17, 14, 18, 20, 22, 25, 27],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <AppLayout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nepal-charcoal">
            Reports & Analytics
          </h1>
          <p className="text-sm text-nepal-mediumgray mt-1">
            Statistical overview and analytical reports
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by period" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Annual (2081)</SelectItem>
              <SelectItem value="quarter">Quarterly (Q2 2081)</SelectItem>
              <SelectItem value="month">Monthly (Baishakh 2081)</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print Report
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Export Data
          </Button>
        </div>
      </div>

      <Tabs value={reportType} onValueChange={setReportType} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="cases" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Case Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Trends & Forecasts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statisticsData.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    stat.changeLabel === "increase" 
                      ? "bg-green-100 text-green-600" 
                      : stat.changeLabel === "decrease" 
                        ? "bg-red-100 text-red-600" 
                        : "bg-gray-100 text-gray-600"
                  }`}>
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-nepal-mediumgray flex items-center mt-1">
                    {stat.changeLabel === "increase" ? (
                      <TrendingUp className="h-3.5 w-3.5 mr-1 text-green-600" />
                    ) : stat.changeLabel === "decrease" ? (
                      <TrendingDown className="h-3.5 w-3.5 mr-1 text-red-600" />
                    ) : null}
                    <span className={
                      stat.changeLabel === "increase" 
                        ? "text-green-600" 
                        : stat.changeLabel === "decrease" 
                          ? "text-red-600" 
                          : ""
                    }>
                      {stat.change}% {stat.changeLabel === "increase" ? "increase" : "decrease"} from last {periodFilter}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Case Types Distribution</CardTitle>
                <CardDescription>
                  Breakdown of different case categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Pie data={caseTypeData} options={{ maintainAspectRatio: false }} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Trend</CardTitle>
                <CardDescription>
                  New and resolved cases over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line 
                    data={trendData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                        }
                      }
                    }} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Case Resolution Time</CardTitle>
                  <CardDescription>
                    Time taken to resolve cases
                  </CardDescription>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Filter by type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Case Types</SelectItem>
                    <SelectItem value="property">Property Dispute</SelectItem>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar 
                    data={resolutionTimeData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of Cases'
                          }
                        }
                      }
                    }} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="cases" className="mt-6">
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Monthly Case Status</CardTitle>
                  <CardDescription>
                    Monthly breakdown of case statuses
                  </CardDescription>
                </div>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar 
                    data={monthlyStatusData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        x: {
                          stacked: true,
                        },
                        y: {
                          stacked: true,
                          beginAtZero: true,
                        }
                      }
                    }} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Officer Performance</CardTitle>
                <CardDescription>
                  Cases handled and resolution rate by officer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Inspector Rajesh Khatri</p>
                      <p className="text-xs text-nepal-mediumgray">54 cases handled, 78% resolution rate</p>
                    </div>
                    <div className="text-sm font-medium text-green-600">78%</div>
                  </div>
                  <div className="w-full bg-nepal-lightgray rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>

                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Officer Sunita Rai</p>
                      <p className="text-xs text-nepal-mediumgray">42 cases handled, 65% resolution rate</p>
                    </div>
                    <div className="text-sm font-medium text-green-600">65%</div>
                  </div>
                  <div className="w-full bg-nepal-lightgray rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                  </div>

                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Inspector Mohan Thapa</p>
                      <p className="text-xs text-nepal-mediumgray">35 cases handled, 72% resolution rate</p>
                    </div>
                    <div className="text-sm font-medium text-green-600">72%</div>
                  </div>
                  <div className="w-full bg-nepal-lightgray rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>

                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Officer Kiran Paudel</p>
                      <p className="text-xs text-nepal-mediumgray">28 cases handled, 82% resolution rate</p>
                    </div>
                    <div className="text-sm font-medium text-green-600">82%</div>
                  </div>
                  <div className="w-full bg-nepal-lightgray rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "82%" }}></div>
                  </div>

                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Inspector Sarita Gurung</p>
                      <p className="text-xs text-nepal-mediumgray">22 cases handled, 68% resolution rate</p>
                    </div>
                    <div className="text-sm font-medium text-green-600">68%</div>
                  </div>
                  <div className="w-full bg-nepal-lightgray rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>
                  Case distribution by district
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie 
                    data={{
                      labels: ['Kathmandu', 'Lalitpur', 'Bhaktapur', 'Kavre', 'Makwanpur', 'Others'],
                      datasets: [{
                        data: [185, 85, 45, 20, 15, 8],
                        backgroundColor: [
                          'rgba(53, 162, 235, 0.7)',
                          'rgba(75, 192, 192, 0.7)',
                          'rgba(255, 159, 64, 0.7)',
                          'rgba(255, 99, 132, 0.7)',
                          'rgba(54, 162, 235, 0.7)',
                          'rgba(153, 102, 255, 0.7)',
                        ],
                      }]
                    }}
                    options={{ 
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        }
                      }
                    }}
                  />
                </div>
                <div className="text-center mt-4 text-sm text-nepal-mediumgray">
                  Total: 358 Cases
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Case Growth Trend</CardTitle>
                <CardDescription>
                  Year over year comparison of case numbers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [
                        {
                          label: '2080',
                          data: [45, 52, 49, 60, 55, 58, 62, 65, 59, 63, 58, 62],
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          tension: 0.3,
                        },
                        {
                          label: '2081',
                          data: [65, 59, 80, 81, 56, 55, 72, 68, 74, 79, 85, 90],
                          borderColor: 'rgba(53, 162, 235, 1)',
                          backgroundColor: 'rgba(53, 162, 235, 0.2)',
                          tension: 0.3,
                        }
                      ]
                    }}
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: { beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Rate Trend</CardTitle>
                <CardDescription>
                  Percentage of cases resolved over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [
                        {
                          label: 'Resolution Rate (%)',
                          data: [42, 45, 48, 51, 53, 55, 58, 60, 62, 65, 68, 70],
                          borderColor: 'rgba(255, 159, 64, 1)',
                          backgroundColor: 'rgba(255, 159, 64, 0.2)',
                          tension: 0.3,
                        }
                      ]
                    }}
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: { 
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Resolution Rate (%)'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Resolution Time Trend</CardTitle>
                <CardDescription>
                  Average days to resolve cases by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar 
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                      datasets: [
                        {
                          label: 'Avg. Days to Resolve',
                          data: [85, 83, 80, 78, 75, 72, 70, 68, 65, 63, 60, 58],
                          backgroundColor: 'rgba(75, 192, 192, 0.6)',
                          borderColor: 'rgba(75, 192, 192, 1)',
                          borderWidth: 1,
                        }
                      ]
                    }}
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: { 
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Average Days'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Type Trends</CardTitle>
                <CardDescription>
                  Growth trends by case type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line 
                    data={{
                      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'],
                      datasets: [
                        {
                          label: 'Property Dispute',
                          data: [32, 35, 38, 40, 42, 45, 48, 52],
                          borderColor: 'rgba(53, 162, 235, 1)',
                          backgroundColor: 'rgba(53, 162, 235, 0.2)',
                          tension: 0.3,
                        },
                        {
                          label: 'Theft',
                          data: [20, 22, 25, 28, 30, 32, 35, 38],
                          borderColor: 'rgba(75, 192, 192, 1)',
                          backgroundColor: 'rgba(75, 192, 192, 0.2)',
                          tension: 0.3,
                        },
                        {
                          label: 'Assault',
                          data: [15, 17, 19, 20, 21, 23, 25, 27],
                          borderColor: 'rgba(255, 159, 64, 1)',
                          backgroundColor: 'rgba(255, 159, 64, 0.2)',
                          tension: 0.3,
                        },
                        {
                          label: 'Fraud',
                          data: [8, 9, 10, 11, 12, 13, 14, 15],
                          borderColor: 'rgba(255, 99, 132, 1)',
                          backgroundColor: 'rgba(255, 99, 132, 0.2)',
                          tension: 0.3,
                        }
                      ]
                    }}
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: { beginAtZero: true }
                      }
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}