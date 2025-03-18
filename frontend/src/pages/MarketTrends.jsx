//MarketTrends.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/MarketTrends.css";
// import JobTrendsChart from "../components/JobTrendsChart";
// import { Card, Text, Title, Loader, Alert, Badge, Group } from "@mantine/core";

// const MarketTrends = () => {
//   const [rawTrends, setRawTrends] = useState(null);
//   const [normalizedTrends, setNormalizedTrends] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const career = localStorage.getItem("selectedCareer");

//   useEffect(() => {
//     const fetchTrends = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/job-market-trends?career=${encodeURIComponent(
//             career
//           )}`
//         );

//         setRawTrends(response.data);
//         setNormalizedTrends({
//           averageSalary: {
//             entry:
//               response.data?.averageSalary?.entry ||
//               response.data?.averageSalary?.entryLevel ||
//               "N/A",
//             mid:
//               response.data?.averageSalary?.mid ||
//               response.data?.averageSalary?.midLevel ||
//               "N/A",
//             senior:
//               response.data?.averageSalary?.senior ||
//               response.data?.averageSalary?.seniorLevel ||
//               "N/A",
//           },
//           jobDemand: {
//             current:
//               response.data?.jobDemand?.current ||
//               response.data?.jobDemand?.currentDemand ||
//               "N/A",
//             future:
//               response.data?.jobDemand?.future ||
//               response.data?.jobDemand?.futureProjections ||
//               "N/A",
//           },
//           relatedJobs: response.data?.relatedJobs || [],
//           topCompanies: response.data?.topCompanies || [],
//           emergingRoles: response.data?.emergingRoles || [],
//         });
//       } catch (err) {
//         setError("Failed to fetch job market trends.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrends();
//   }, [career]);

//   if (loading) return <Loader size="lg" className="loader" />;
//   if (error) return <Alert color="red">{error}</Alert>;

//   return (
//     <div className="market-trends-container">
//       <Title order={1} className="page-title">Job Market Trends for {career}</Title>
//       {normalizedTrends ? (
//         <>
//           <Card shadow="sm" padding="lg" radius="md" withBorder className="trends-card">
//             <Title order={2}>Salary Information</Title>
//             <Group>
//               <Badge color="green">Entry-Level: {normalizedTrends?.averageSalary?.entry}</Badge>
//               <Badge color="blue">Mid-Level: {normalizedTrends?.averageSalary?.mid}</Badge>
//               <Badge color="violet">Senior-Level: {normalizedTrends?.averageSalary?.senior}</Badge>
//             </Group>
//           </Card>

//           <Card shadow="sm" padding="lg" radius="md" withBorder className="trends-card">
//             <Title order={2}>Job Demand</Title>
//             <Text>Current Demand: {normalizedTrends?.jobDemand?.current}</Text>
//             <Text>Future Projections: {normalizedTrends?.jobDemand?.future}</Text>
//           </Card>

//           <Card shadow="sm" padding="lg" radius="md" withBorder className="trends-card">
//             <Title order={2}>Related Jobs & Hiring Companies</Title>
//             <Text>Related Jobs: {normalizedTrends?.relatedJobs?.join(", ") || "N/A"}</Text>
//             <Text>Top Hiring Companies: {normalizedTrends?.topCompanies?.join(", ") || "N/A"}</Text>
//           </Card>

//           <Card shadow="sm" padding="lg" radius="md" withBorder className="trends-card">
//             <Title order={2}>Emerging Roles</Title>
//             <Text>{normalizedTrends?.emergingRoles?.join(", ") || "N/A"}</Text>
//           </Card>

//           <div className="job-trends-chart-container">
//             <Title order={2}>Job Market Trends Over Time</Title>
//             <JobTrendsChart />
//           </div>
//         </>
//       ) : (
//         <Text>No trends data available.</Text>
//       )}
//     </div>
//   );
// };

// export default MarketTrends;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/MarketTrends.css";
// import JobTrendsChart from "../components/JobTrendsChart";
// import { Card, Text, Title, Loader, Alert, Badge, Group, Container, Paper, Divider, Grid, ThemeIcon } from "@mantine/core";
// import { IconBriefcase, IconChartLine, IconBuilding, IconStars, IconCoin } from '@tabler/icons-react';

// const MarketTrends = () => {
//   const [rawTrends, setRawTrends] = useState(null);
//   const [normalizedTrends, setNormalizedTrends] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const career = localStorage.getItem("selectedCareer");

//   useEffect(() => {
//     const fetchTrends = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/job-market-trends?career=${encodeURIComponent(
//             career
//           )}`
//         );

//         setRawTrends(response.data);
//         setNormalizedTrends({
//           averageSalary: {
//             entry:
//               response.data?.averageSalary?.entry ||
//               response.data?.averageSalary?.entryLevel ||
//               "N/A",
//             mid:
//               response.data?.averageSalary?.mid ||
//               response.data?.averageSalary?.midLevel ||
//               "N/A",
//             senior:
//               response.data?.averageSalary?.senior ||
//               response.data?.averageSalary?.seniorLevel ||
//               "N/A",
//           },
//           jobDemand: {
//             current:
//               response.data?.jobDemand?.current ||
//               response.data?.jobDemand?.currentDemand ||
//               "N/A",
//             future:
//               response.data?.jobDemand?.future ||
//               response.data?.jobDemand?.futureProjections ||
//               "N/A",
//           },
//           relatedJobs: response.data?.relatedJobs || [],
//           topCompanies: response.data?.topCompanies || [],
//           emergingRoles: response.data?.emergingRoles || [],
//         });
//       } catch (err) {
//         setError("Failed to fetch job market trends.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrends();
//   }, [career]);

//   if (loading) return (
//     <div className="loader-container">
//       <Loader size="xl" color="indigo" variant="bars" />
//       <Text mt="md" color="dimmed">Loading market trends data...</Text>
//     </div>
//   );
  
//   if (error) return (
//     <Alert color="red" title="Error" radius="md">
//       {error}
//     </Alert>
//   );

//   return (
//     <Container size="xl" className="market-trends-container">
//       <Paper 
//         radius="md" 
//         p="xl" 
//         mb="xl"
//         sx={(theme) => ({
//           background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
//           color: 'white'
//         })}
//       >
//         <Title order={1} className="page-title" align="center" mb="md">
//           Job Market Trends for {career}
//         </Title>
//         <Text align="center" size="lg">
//           Explore current salary ranges, job demand, and future opportunities
//         </Text>
//       </Paper>

//       {normalizedTrends ? (
//         <Grid>
//           <Grid.Col md={6}>
//             <Card shadow="sm" radius="lg" p="lg" withBorder className="trends-card" h="100%">
//               <Group position="apart" mb="md">
//                 <Group>
//                   <ThemeIcon size="lg" radius="md" color="green">
//                     <IconCoin size={20} />
//                   </ThemeIcon>
//                   <Title order={2}>Salary Information</Title>
//                 </Group>
//               </Group>
//               <Group spacing="md" direction="column" grow>
//                 <Badge fullWidth size="lg" color="green" variant="filled" radius="md">
//                   Entry-Level: {normalizedTrends?.averageSalary?.entry}
//                 </Badge>
//                 <Badge fullWidth size="lg" color="blue" variant="filled" radius="md">
//                   Mid-Level: {normalizedTrends?.averageSalary?.mid}
//                 </Badge>
//                 <Badge fullWidth size="lg" color="violet" variant="filled" radius="md">
//                   Senior-Level: {normalizedTrends?.averageSalary?.senior}
//                 </Badge>
//               </Group>
//             </Card>
//           </Grid.Col>

//           <Grid.Col md={6}>
//             <Card shadow="sm" radius="lg" p="lg" withBorder className="trends-card" h="100%">
//               <Group position="apart" mb="md">
//                 <Group>
//                   <ThemeIcon size="lg" radius="md" color="blue">
//                     <IconChartLine size={20} />
//                   </ThemeIcon>
//                   <Title order={2}>Job Demand</Title>
//                 </Group>
//               </Group>
//               <Paper p="md" radius="md" withBorder mb="md">
//                 <Text weight={600}>Current Demand:</Text>
//                 <Text>{normalizedTrends?.jobDemand?.current}</Text>
//               </Paper>
//               <Paper p="md" radius="md" withBorder>
//                 <Text weight={600}>Future Projections:</Text>
//                 <Text>{normalizedTrends?.jobDemand?.future}</Text>
//               </Paper>
//             </Card>
//           </Grid.Col>

//           <Grid.Col md={12}>
//             <Card shadow="sm" radius="lg" p="lg" withBorder className="trends-card">
//               <Group position="apart" mb="md">
//                 <Group>
//                   <ThemeIcon size="lg" radius="md" color="indigo">
//                     <IconBriefcase size={20} />
//                   </ThemeIcon>
//                   <Title order={2}>Related Jobs & Hiring Companies</Title>
//                 </Group>
//               </Group>
//               <Grid>
//                 <Grid.Col md={6}>
//                   <Paper p="md" radius="md" withBorder>
//                     <Text weight={600} mb="xs">Related Jobs:</Text>
//                     <Text>{normalizedTrends?.relatedJobs?.join(", ") || "N/A"}</Text>
//                   </Paper>
//                 </Grid.Col>
//                 <Grid.Col md={6}>
//                   <Paper p="md" radius="md" withBorder>
//                     <Text weight={600} mb="xs">Top Hiring Companies:</Text>
//                     <Text>{normalizedTrends?.topCompanies?.join(", ") || "N/A"}</Text>
//                   </Paper>
//                 </Grid.Col>
//               </Grid>
//             </Card>
//           </Grid.Col>

//           <Grid.Col md={12}>
//             <Card shadow="sm" radius="lg" p="lg" withBorder className="trends-card">
//               <Group position="apart" mb="md">
//                 <Group>
//                   <ThemeIcon size="lg" radius="md" color="purple">
//                     <IconStars size={20} />
//                   </ThemeIcon>
//                   <Title order={2}>Emerging Roles</Title>
//                 </Group>
//               </Group>
//               <Paper p="md" radius="md" withBorder>
//                 <Text>{normalizedTrends?.emergingRoles?.join(", ") || "N/A"}</Text>
//               </Paper>
//             </Card>
//           </Grid.Col>

//           <Grid.Col md={12}>
//             <Card shadow="sm" radius="lg" p="lg" withBorder className="job-trends-chart-container">
//               <Group position="apart" mb="md">
//                 <Group>
//                   <ThemeIcon size="lg" radius="md" color="cyan">
//                     <IconChartLine size={20} />
//                   </ThemeIcon>
//                   <Title order={2}>Job Market Trends Over Time</Title>
//                 </Group>
//               </Group>
//               <JobTrendsChart />
//             </Card>
//           </Grid.Col>
//         </Grid>
//       ) : (
//         <Paper p="xl" radius="md" withBorder>
//           <Text align="center">No trends data available.</Text>
//         </Paper>
//       )}
//     </Container>
//   );
// };

// export default MarketTrends;











// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/MarketTrends.css";
// import JobTrendsChart from "../components/JobTrendsChart";
// import { Card, Text, Title, Loader, Alert, Badge, Group, Container, Paper, Divider, Grid, ThemeIcon, Avatar, Progress, RingProgress, ScrollArea } from "@mantine/core";
// import { IconBriefcase, IconChartLine, IconBuilding, IconStars, IconCoin, IconTrendingUp, IconArrowUpRight, IconUsers, IconBuildingSkyscraper } from '@tabler/icons-react';

// const MarketTrends = () => {
//   const [rawTrends, setRawTrends] = useState(null);
//   const [normalizedTrends, setNormalizedTrends] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeSection, setActiveSection] = useState("salary");
//   const career = localStorage.getItem("selectedCareer");

//   useEffect(() => {
//     const fetchTrends = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/job-market-trends?career=${encodeURIComponent(
//             career
//           )}`
//         );

//         setRawTrends(response.data);
//         setNormalizedTrends({
//           averageSalary: {
//             entry:
//               response.data?.averageSalary?.entry ||
//               response.data?.averageSalary?.entryLevel ||
//               "N/A",
//             mid:
//               response.data?.averageSalary?.mid ||
//               response.data?.averageSalary?.midLevel ||
//               "N/A",
//             senior:
//               response.data?.averageSalary?.senior ||
//               response.data?.averageSalary?.seniorLevel ||
//               "N/A",
//           },
//           jobDemand: {
//             current:
//               response.data?.jobDemand?.current ||
//               response.data?.jobDemand?.currentDemand ||
//               "N/A",
//             future:
//               response.data?.jobDemand?.future ||
//               response.data?.jobDemand?.futureProjections ||
//               "N/A",
//           },
//           relatedJobs: response.data?.relatedJobs || [],
//           topCompanies: response.data?.topCompanies || [],
//           emergingRoles: response.data?.emergingRoles || [],
//         });
//       } catch (err) {
//         setError("Failed to fetch job market trends.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrends();
//   }, [career]);

//   // Calculate salary percentages for visualization
//   const calculateSalaryPercentages = () => {
//     if (!normalizedTrends) return { entry: 35, mid: 65, senior: 100 };
    
//     const entrySalary = parseInt(normalizedTrends.averageSalary.entry.replace(/[^0-9]/g, '')) || 70000;
//     const midSalary = parseInt(normalizedTrends.averageSalary.mid.replace(/[^0-9]/g, '')) || 110000;
//     const seniorSalary = parseInt(normalizedTrends.averageSalary.senior.replace(/[^0-9]/g, '')) || 170000;
    
//     const maxSalary = Math.max(entrySalary, midSalary, seniorSalary);
//     return {
//       entry: Math.round((entrySalary / maxSalary) * 100),
//       mid: Math.round((midSalary / maxSalary) * 100),
//       senior: Math.round((seniorSalary / maxSalary) * 100)
//     };
//   };

//   // Get demand level for visualization
//   const getDemandLevel = () => {
//     if (!normalizedTrends) return 80;
//     const demandText = normalizedTrends.jobDemand.current.toLowerCase();
    
//     if (demandText.includes('high')) return 85;
//     if (demandText.includes('medium')) return 60;
//     if (demandText.includes('low')) return 35;
//     return 70;
//   };

//   const salaryPercentages = calculateSalaryPercentages();
//   const demandLevel = getDemandLevel();

//   if (loading) return (
//     <div className="mt-loader-container">
//       <div className="mt-loader-content">
//         <Loader size="xl" color="indigo" variant="dots" />
//         <Title order={3} mt="md" className="pulse-text">Analyzing market trends</Title>
//         <Text className="typewriter">Gathering latest data for {career}...</Text>
//       </div>
//     </div>
//   );
  
//   if (error) return (
//     <div className="mt-error-container">
//       <Alert color="red" title="Error loading data" radius="lg" icon={<IconArrowUpRight size={24} />}>
//         {error}
//         <Button mt="md" variant="light" color="red" onClick={() => window.location.reload()}>
//           Try Again
//         </Button>
//       </Alert>
//     </div>
//   );

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'salary':
//         return (
//           <div className="mt-section-content">
//             <div className="mt-salary-bars">
//               <div className="mt-salary-bar-wrapper">
//                 <Text weight={700} size="lg">Entry Level</Text>
//                 <div className="mt-salary-bar-container">
//                   <div className="mt-salary-bar" style={{ width: `${salaryPercentages.entry}%`, background: 'linear-gradient(90deg, #4ade80, #22c55e)' }}>
//                     <span>{normalizedTrends?.averageSalary?.entry}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-salary-bar-wrapper">
//                 <Text weight={700} size="lg">Mid Level</Text>
//                 <div className="mt-salary-bar-container">
//                   <div className="mt-salary-bar" style={{ width: `${salaryPercentages.mid}%`, background: 'linear-gradient(90deg, #60a5fa, #3b82f6)' }}>
//                     <span>{normalizedTrends?.averageSalary?.mid}</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="mt-salary-bar-wrapper">
//                 <Text weight={700} size="lg">Senior Level</Text>
//                 <div className="mt-salary-bar-container">
//                   <div className="mt-salary-bar" style={{ width: `${salaryPercentages.senior}%`, background: 'linear-gradient(90deg, #c084fc, #8b5cf6)' }}>
//                     <span>{normalizedTrends?.averageSalary?.senior}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <Paper p="xl" radius="lg" className="mt-salary-insight">
//               <Group position="apart">
//                 <Title order={3}>Salary Insights</Title>
//                 <ThemeIcon size="xl" radius="xl" variant="light" color="blue">
//                   <IconCoin size={24} />
//                 </ThemeIcon>
//               </Group>
//               <Text mt="md">
//                 As you progress in your {career} career, you can expect significant salary growth from entry-level to senior positions.
//                 The data shows a potential increase of {Math.round((salaryPercentages.senior - salaryPercentages.entry) / salaryPercentages.entry * 100)}% 
//                 as you advance to senior roles.
//               </Text>
//             </Paper>
//           </div>
//         );
      
//       case 'demand':
//         return (
//           <div className="mt-section-content">
//             <div className="mt-demand-container">
//               <div className="mt-demand-gauge">
//                 <RingProgress
//                   size={220}
//                   thickness={20}
//                   roundCaps
//                   sections={[{ value: demandLevel, color: demandLevel > 70 ? 'green' : demandLevel > 40 ? 'blue' : 'orange' }]}
//                   label={
//                     <div className="mt-gauge-label">
//                       <Text align="center" size="xl" weight={700}>{demandLevel}%</Text>
//                       <Text align="center" size="sm">Demand</Text>
//                     </div>
//                   }
//                 />
//               </div>
              
//               <div className="mt-demand-details">
//                 <Paper p="xl" radius="lg" className="mt-demand-card" withBorder>
//                   <Group position="apart" mb="md">
//                     <Title order={3}>Current Demand</Title>
//                     <ThemeIcon size="lg" radius="md" color="green">
//                       <IconTrendingUp size={20} />
//                     </ThemeIcon>
//                   </Group>
//                   <Text size="lg" weight={500}>{normalizedTrends?.jobDemand?.current}</Text>
//                 </Paper>
                
//                 <Paper p="xl" radius="lg" className="mt-demand-card" withBorder>
//                   <Group position="apart" mb="md">
//                     <Title order={3}>Future Outlook</Title>
//                     <ThemeIcon size="lg" radius="md" color="violet">
//                       <IconChartLine size={20} />
//                     </ThemeIcon>
//                   </Group>
//                   <Text size="lg" weight={500}>{normalizedTrends?.jobDemand?.future}</Text>
//                 </Paper>
//               </div>
//             </div>
//           </div>
//         );
        
//       case 'roles':
//         return (
//           <div className="mt-section-content">
//             <div className="mt-roles-container">
//               <div className="mt-roles-column">
//                 <Paper p="xl" radius="lg" className="mt-roles-card" withBorder>
//                   <Group position="apart" mb="lg">
//                     <Title order={3}>Related Roles</Title>
//                     <ThemeIcon size="lg" radius="md" color="blue">
//                       <IconBriefcase size={20} />
//                     </ThemeIcon>
//                   </Group>
//                   <ScrollArea h={180} offsetScrollbars>
//                     <div className="mt-jobs-list">
//                       {normalizedTrends?.relatedJobs?.map((job, index) => (
//                         <div key={index} className="mt-job-item">
//                           <Avatar 
//                             color={['blue', 'green', 'violet', 'pink', 'cyan'][index % 5]} 
//                             radius="xl"
//                           >
//                             {job.split(' ').map(word => word[0]).join('').substring(0, 2)}
//                           </Avatar>
//                           <Text>{job}</Text>
//                         </div>
//                       )) || <Text>No related jobs data available</Text>}
//                     </div>
//                   </ScrollArea>
//                 </Paper>
//               </div>
              
//               <div className="mt-roles-column">
//                 <Paper p="xl" radius="lg" className="mt-roles-card" withBorder>
//                   <Group position="apart" mb="lg">
//                     <Title order={3}>Top Companies</Title>
//                     <ThemeIcon size="lg" radius="md" color="indigo">
//                       <IconBuildingSkyscraper size={20} />
//                     </ThemeIcon>
//                   </Group>
//                   <ScrollArea h={180} offsetScrollbars>
//                     <div className="mt-company-list">
//                       {normalizedTrends?.topCompanies?.map((company, index) => (
//                         <Badge 
//                           key={index} 
//                           size="xl" 
//                           variant="filled" 
//                           color={['blue', 'indigo', 'cyan', 'grape', 'teal'][index % 5]}
//                           radius="md"
//                           className="mt-company-badge"
//                         >
//                           {company}
//                         </Badge>
//                       )) || <Text>No company data available</Text>}
//                     </div>
//                   </ScrollArea>
//                 </Paper>
//               </div>
//             </div>
            
//             <Paper p="xl" radius="lg" className="mt-emerging-roles" withBorder mt="xl">
//               <Group position="apart" mb="md">
//                 <Title order={3}>Emerging Roles</Title>
//                 <ThemeIcon size="lg" radius="md" color="grape">
//                   <IconStars size={20} />
//                 </ThemeIcon>
//               </Group>
//               <div className="mt-emerging-roles-grid">
//                 {normalizedTrends?.emergingRoles?.map((role, index) => (
//                   <Paper
//                     key={index}
//                     p="md"
//                     radius="md"
//                     className="mt-emerging-role-card"
//                     withBorder
//                   >
//                     <Group position="apart">
//                       <Text weight={600}>{role}</Text>
//                       <Badge 
//                         color="pink" 
//                         variant="filled" 
//                         radius="sm"
//                       >
//                         Emerging
//                       </Badge>
//                     </Group>
//                   </Paper>
//                 )) || <Text>No emerging roles data available</Text>}
//               </div>
//             </Paper>
//           </div>
//         );
        
//       case 'chart':
//         return (
//           <div className="mt-section-content">
//             <div className="mt-chart-container">
//               <Paper p="xl" radius="lg" className="mt-chart-card" withBorder>
//                 <Title order={3} mb="xl">Job Market Growth Visualization</Title>
//                 <JobTrendsChart />
//               </Paper>
              
//               <Paper p="xl" radius="lg" className="mt-chart-insights" withBorder>
//                 <Group position="apart" mb="md">
//                   <Title order={3}>Trend Analysis</Title>
//                   <ThemeIcon size="lg" radius="md" color="cyan">
//                     <IconChartLine size={20} />
//                   </ThemeIcon>
//                 </Group>
//                 <Text>
//                   The market for {career} roles has shown consistent growth over recent years,
//                   with particularly strong increases projected for the coming years. These trends
//                   indicate a favorable job market for professionals in this field.
//                 </Text>
//               </Paper>
//             </div>
//           </div>
//         );
        
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="mt-trends-wrapper">
//       <div className="mt-header">
//         <div className="mt-header-content">
//           <Title className="mt-main-title">Job Market Trends</Title>
//           <Text className="mt-subtitle">{career}</Text>
//           <div className="mt-animated-badge">
//             <ThemeIcon size="lg" radius="xl" className="mt-pulse-icon">
//               <IconTrendingUp size={20} />
//             </ThemeIcon>
//             <Text size="sm">Live Market Data</Text>
//           </div>
//         </div>
//       </div>
      
//       <Container size="xl" className="mt-content-container">
//         <div className="mt-nav-section">
//           <div 
//             className={`mt-nav-item ${activeSection === 'salary' ? 'active' : ''}`}
//             onClick={() => setActiveSection('salary')}
//           >
//             <ThemeIcon size="lg" radius="xl" color={activeSection === 'salary' ? 'green' : 'gray'}>
//               <IconCoin size={24} />
//             </ThemeIcon>
//             <Text>Salary</Text>
//           </div>
          
//           <div 
//             className={`mt-nav-item ${activeSection === 'demand' ? 'active' : ''}`}
//             onClick={() => setActiveSection('demand')}
//           >
//             <ThemeIcon size="lg" radius="xl" color={activeSection === 'demand' ? 'blue' : 'gray'}>
//               <IconTrendingUp size={24} />
//             </ThemeIcon>
//             <Text>Demand</Text>
//           </div>
          
//           <div 
//             className={`mt-nav-item ${activeSection === 'roles' ? 'active' : ''}`}
//             onClick={() => setActiveSection('roles')}
//           >
//             <ThemeIcon size="lg" radius="xl" color={activeSection === 'roles' ? 'violet' : 'gray'}>
//               <IconUsers size={24} />
//             </ThemeIcon>
//             <Text>Roles</Text>
//           </div>
          
//           <div 
//             className={`mt-nav-item ${activeSection === 'chart' ? 'active' : ''}`}
//             onClick={() => setActiveSection('chart')}
//           >
//             <ThemeIcon size="lg" radius="xl" color={activeSection === 'chart' ? 'cyan' : 'gray'}>
//               <IconChartLine size={24} />
//             </ThemeIcon>
//             <Text>Growth</Text>
//           </div>
//         </div>
        
//         <div className="mt-main-content">
//           {renderSection()}
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default MarketTrends;












import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MarketTrends.css";
import JobTrendsChart from "../components/JobTrendsChart";
import { Card, Text, Title, Loader, Alert, Badge, Group, Container, Paper, Divider, Grid, ThemeIcon, Avatar, Progress, RingProgress, ScrollArea, Button } from "@mantine/core";
import { IconBriefcase, IconChartLine, IconBuilding, IconStars, IconCoin, IconTrendingUp, IconArrowUpRight, IconUsers, IconBuildingSkyscraper } from '@tabler/icons-react';

const MarketTrends = ({ sidebarState = "collapsed" }) => {
  const [rawTrends, setRawTrends] = useState(null);
  const [normalizedTrends, setNormalizedTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSection, setActiveSection] = useState("salary");
  const career = localStorage.getItem("selectedCareer") || "Machine Learning Engineer";

  // Get sidebar state from props or from localStorage/context if you're managing it globally
  // This would be passed from your layout component
  const [sidebarStatus, setSidebarStatus] = useState(sidebarState);
  
  // Listen for sidebar state changes if you're using a global state management
  useEffect(() => {
    // If you have an event emitter or context for sidebar state, subscribe here
    const handleSidebarChange = (newState) => {
      setSidebarStatus(newState);
    };
    
    // Example if you're using an event listener:
    // window.addEventListener('sidebarChange', (e) => handleSidebarChange(e.detail.state));
    // return () => window.removeEventListener('sidebarChange', handleSidebarChange);
    
    // For now, we'll simulate with the prop
    setSidebarStatus(sidebarState);
  }, [sidebarState]);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/job-market-trends?career=${encodeURIComponent(
            career
          )}`
        );

        setRawTrends(response.data);
        setNormalizedTrends({
          averageSalary: {
            entry:
              response.data?.averageSalary?.entry ||
              response.data?.averageSalary?.entryLevel ||
              "N/A",
            mid:
              response.data?.averageSalary?.mid ||
              response.data?.averageSalary?.midLevel ||
              "N/A",
            senior:
              response.data?.averageSalary?.senior ||
              response.data?.averageSalary?.seniorLevel ||
              "N/A",
          },
          jobDemand: {
            current:
              response.data?.jobDemand?.current ||
              response.data?.jobDemand?.currentDemand ||
              "N/A",
            future:
              response.data?.jobDemand?.future ||
              response.data?.jobDemand?.futureProjections ||
              "N/A",
          },
          relatedJobs: response.data?.relatedJobs || [],
          topCompanies: response.data?.topCompanies || [],
          emergingRoles: response.data?.emergingRoles || [],
        });
      } catch (err) {
        console.error("Error fetching job market trends:", err);
        setError("Failed to fetch job market trends.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [career]);

  // Calculate salary percentages for visualization
  const calculateSalaryPercentages = () => {
    if (!normalizedTrends) return { entry: 35, mid: 65, senior: 100 };
    
    const entrySalary = parseInt(normalizedTrends.averageSalary.entry.replace(/[^0-9]/g, '')) || 70000;
    const midSalary = parseInt(normalizedTrends.averageSalary.mid.replace(/[^0-9]/g, '')) || 110000;
    const seniorSalary = parseInt(normalizedTrends.averageSalary.senior.replace(/[^0-9]/g, '')) || 170000;
    
    const maxSalary = Math.max(entrySalary, midSalary, seniorSalary);
    return {
      entry: Math.round((entrySalary / maxSalary) * 100),
      mid: Math.round((midSalary / maxSalary) * 100),
      senior: Math.round((seniorSalary / maxSalary) * 100)
    };
  };

  // Get demand level for visualization
  const getDemandLevel = () => {
    if (!normalizedTrends) return 80;
    const demandText = normalizedTrends.jobDemand.current.toLowerCase();
    
    if (demandText.includes('high')) return 85;
    if (demandText.includes('medium')) return 60;
    if (demandText.includes('low')) return 35;
    return 70;
  };

  const salaryPercentages = calculateSalaryPercentages();
  const demandLevel = getDemandLevel();

  // Determine the class to apply based on sidebar state
  const getTrendsWrapperClass = () => {
    let baseClass = "mt-trends-wrapper";
    
    if (sidebarStatus === "open" || sidebarStatus === "expanded") {
      baseClass += " sidebar-open sidebar-expanded";
    } else if (sidebarStatus === "collapsed") {
      baseClass += " sidebar-open";
    }
    
    return baseClass;
  };

  if (loading) return (
    <div className={getTrendsWrapperClass()}>
      <div className="mt-loader-container">
        <div className="mt-loader-content">
          <Loader size="xl" color="indigo" variant="dots" />
          <Title order={3} mt="md" className="pulse-text">Analyzing market trends</Title>
          <Text className="typewriter">Gathering latest data for {career}...</Text>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className={getTrendsWrapperClass()}>
      <div className="mt-error-container">
        <Alert color="red" title="Error loading data" radius="lg" icon={<IconArrowUpRight size={24} />}>
          {error}
          <Button mt="md" variant="light" color="red" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'salary':
        return (
          <div className="mt-section-content">
            <div className="mt-salary-bars">
              <div className="mt-salary-bar-wrapper">
                <Text weight={700} size="lg">Entry Level</Text>
                <div className="mt-salary-bar-container">
                  <div className="mt-salary-bar" style={{ width:`35%`, background: 'linear-gradient(90deg, #4ade80, #22c55e)', '--target-width': `${salaryPercentages.entry}%` }}>
                    <span>{normalizedTrends?.averageSalary?.entry}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-salary-bar-wrapper">
                <Text weight={700} size="lg">Mid Level</Text>
                <div className="mt-salary-bar-container">
                  <div className="mt-salary-bar" style={{ width: `${salaryPercentages.mid}%`, background: 'linear-gradient(90deg, #60a5fa, #3b82f6)', '--target-width': `${salaryPercentages.mid}%` }}>
                    <span>{normalizedTrends?.averageSalary?.mid}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-salary-bar-wrapper">
                <Text weight={700} size="lg">Senior Level</Text>
                <div className="mt-salary-bar-container">
                  <div className="mt-salary-bar" style={{ width: `${salaryPercentages.senior}%`, background: 'linear-gradient(90deg, #c084fc, #8b5cf6)', '--target-width': `${salaryPercentages.senior}%` }}>
                    <span>{normalizedTrends?.averageSalary?.senior}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Paper p="xl" radius="lg" className="mt-salary-insight">
              <Group position="apart">
                <Title order={3}>Salary Insights</Title>
                <ThemeIcon size="xl" radius="xl" variant="light" color="blue">
                  <IconCoin size={24} />
                </ThemeIcon>
              </Group>
              <Text mt="md">
                As you progress in your {career} career, you can expect significant salary growth from entry-level to senior positions.
                The data shows a potential increase of {Math.round((salaryPercentages.senior - salaryPercentages.entry) / salaryPercentages.entry * 100)}% 
                as you advance to senior roles.
              </Text>
            </Paper>
          </div>
        );
      
      case 'demand':
        return (
          <div className="mt-section-content">
            <div className="mt-demand-container">
              <div className="mt-demand-gauge">
                <RingProgress
                  size={220}
                  thickness={20}
                  roundCaps
                  sections={[{ value: demandLevel, color: demandLevel > 70 ? 'green' : demandLevel > 40 ? 'blue' : 'orange' }]}
                  label={
                    <div className="mt-gauge-label">
                      <Text align="center" size="xl" weight={700}>{demandLevel}%</Text>
                      <Text align="center" size="sm">Demand</Text>
                    </div>
                  }
                />
              </div>
              
              <div className="mt-demand-details">
                <Paper p="xl" radius="lg" className="mt-demand-card" withBorder>
                  <Group position="apart" mb="md">
                    <Title order={3}>Current Demand</Title>
                    <ThemeIcon size="lg" radius="md" color="green">
                      <IconTrendingUp size={20} />
                    </ThemeIcon>
                  </Group>
                  <Text size="lg" weight={500}>{normalizedTrends?.jobDemand?.current}</Text>
                </Paper>
                
                <Paper p="xl" radius="lg" className="mt-demand-card" withBorder>
                  <Group position="apart" mb="md">
                    <Title order={3}>Future Outlook</Title>
                    <ThemeIcon size="lg" radius="md" color="violet">
                      <IconChartLine size={20} />
                    </ThemeIcon>
                  </Group>
                  <Text size="lg" weight={500}>{normalizedTrends?.jobDemand?.future}</Text>
                </Paper>
              </div>
            </div>
          </div>
        );
        
      case 'roles':
        return (
          <div className="mt-section-content">
            <div className="mt-roles-container">
              <div className="mt-roles-column">
                <Paper p="xl" radius="lg" className="mt-roles-card" withBorder>
                  <Group position="apart" mb="lg">
                    <Title order={3}>Related Roles</Title>
                    <ThemeIcon size="lg" radius="md" color="blue">
                      <IconBriefcase size={20} />
                    </ThemeIcon>
                  </Group>
                  <ScrollArea h={180} offsetScrollbars>
                    <div className="mt-jobs-list">
                      {normalizedTrends?.relatedJobs?.map((job, index) => (
                        <div key={index} className="mt-job-item">
                          <Avatar 
                            color={['blue', 'green', 'violet', 'pink', 'cyan'][index % 5]} 
                            radius="xl"
                          >
                            {job.split(' ').map(word => word[0]).join('').substring(0, 2)}
                          </Avatar>
                          <Text>{job}</Text>
                        </div>
                      )) || <Text>No related jobs data available</Text>}
                    </div>
                  </ScrollArea>
                </Paper>
              </div>
              
              <div className="mt-roles-column">
                <Paper p="xl" radius="lg" className="mt-roles-card" withBorder>
                  <Group position="apart" mb="lg">
                    <Title order={3}>Top Companies</Title>
                    <ThemeIcon size="lg" radius="md" color="indigo">
                      <IconBuildingSkyscraper size={20} />
                    </ThemeIcon>
                  </Group>
                  <ScrollArea h={180} offsetScrollbars>
                    <div className="mt-company-list">
                      {normalizedTrends?.topCompanies?.map((company, index) => (
                        <Badge 
                          key={index} 
                          size="xl" 
                          variant="filled" 
                          color={['blue', 'indigo', 'cyan', 'grape', 'teal'][index % 5]}
                          radius="md"
                          className="mt-company-badge"
                        >
                          {company}
                        </Badge>
                      )) || <Text>No company data available</Text>}
                    </div>
                  </ScrollArea>
                </Paper>
              </div>
            </div>
            
            <Paper p="xl" radius="lg" className="mt-emerging-roles" withBorder mt="xl">
              <Group position="apart" mb="md">
                <Title order={3}>Emerging Roles</Title>
                <ThemeIcon size="lg" radius="md" color="grape">
                  <IconStars size={20} />
                </ThemeIcon>
              </Group>
              <div className="mt-emerging-roles-grid">
                {normalizedTrends?.emergingRoles?.map((role, index) => (
                  <Paper
                    key={index}
                    p="md"
                    radius="md"
                    className="mt-emerging-role-card"
                    withBorder
                  >
                    <Group position="apart">
                      <Text weight={600}>{role}</Text>
                      <Badge 
                        color="pink" 
                        variant="filled" 
                        radius="sm"
                      >
                        Emerging
                      </Badge>
                    </Group>
                  </Paper>
                )) || <Text>No emerging roles data available</Text>}
              </div>
            </Paper>
          </div>
        );
        
      case 'chart':
        return (
          <div className="mt-section-content">
            <div className="mt-chart-container">
              <Paper p="xl" radius="lg" className="mt-chart-card" withBorder>
                <Title order={3} mb="xl">Job Market Growth Visualization</Title>
                <JobTrendsChart />
              </Paper>
              
              <Paper p="xl" radius="lg" className="mt-chart-insights" withBorder>
                <Group position="apart" mb="md">
                  <Title order={3}>Trend Analysis</Title>
                  <ThemeIcon size="lg" radius="md" color="cyan">
                    <IconChartLine size={20} />
                  </ThemeIcon>
                </Group>
                <Text>
                  The market for {career} roles has shown consistent growth over recent years,
                  with particularly strong increases projected for the coming years. These trends
                  indicate a favorable job market for professionals in this field.
                </Text>
              </Paper>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={getTrendsWrapperClass()}>
      <div className="mt-header">
        <div className="mt-header-content">
          <Title className="mt-main-title">Job Market Trends</Title>
          <Text className="mt-subtitle">{career}</Text>
          <div className="mt-animated-badge">
            <ThemeIcon size="lg" radius="xl" className="mt-pulse-icon">
              <IconTrendingUp size={20} />
            </ThemeIcon>
            <Text size="sm">Live Market Data</Text>
          </div>
        </div>
      </div>
      
      <Container size="xl" className="mt-content-container">
        <div className="mt-nav-section">
          <div 
            className={`mt-nav-item ${activeSection === 'salary' ? 'active' : ''}`}
            onClick={() => setActiveSection('salary')}
          >
            <ThemeIcon size="lg" radius="xl" color={activeSection === 'salary' ? 'green' : 'gray'}>
              <IconCoin size={24} />
            </ThemeIcon>
            <Text>Salary</Text>
          </div>
          
          <div 
            className={`mt-nav-item ${activeSection === 'demand' ? 'active' : ''}`}
            onClick={() => setActiveSection('demand')}
          >
            <ThemeIcon size="lg" radius="xl" color={activeSection === 'demand' ? 'blue' : 'gray'}>
              <IconTrendingUp size={24} />
            </ThemeIcon>
            <Text>Demand</Text>
          </div>
          
          <div 
            className={`mt-nav-item ${activeSection === 'roles' ? 'active' : ''}`}
            onClick={() => setActiveSection('roles')}
          >
            <ThemeIcon size="lg" radius="xl" color={activeSection === 'roles' ? 'violet' : 'gray'}>
              <IconUsers size={24} />
            </ThemeIcon>
            <Text>Roles</Text>
          </div>
          
          <div 
            className={`mt-nav-item ${activeSection === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveSection('chart')}
          >
            <ThemeIcon size="lg" radius="xl" color={activeSection === 'chart' ? 'cyan' : 'gray'}>
              <IconChartLine size={24} />
            </ThemeIcon>
            <Text>Growth</Text>
          </div>
        </div>
        
        <div className="mt-main-content">
          {renderSection()}
        </div>
      </Container>
    </div>
  );
};

export default MarketTrends;