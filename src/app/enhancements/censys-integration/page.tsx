"use client";

import styled from "styled-components";

export default function CensysIntegrationPage() {
  return (
    <Container>
      <Disclaimer>
        ⚠️ <strong>Demo Preview:</strong> This page is for demonstration purposes only and does not contain functional features. It represents a potential future enhancement to the platform.
      </Disclaimer>

      <Header>
        <Title>Real-Time Censys API Integration</Title>
        <Subtitle>
          Live data fetching, streaming updates, and historical tracking for continuous security monitoring
        </Subtitle>
      </Header>

      <Grid>
        <FullWidthCard>
          <CardHeader>
            <CardIcon>🔴</CardIcon>
            <CardTitle>Live Data Fetching</CardTitle>
            <StatusBadge>Connected</StatusBadge>
          </CardHeader>
          <CardContent>
            <SearchBar>
              <SearchInput placeholder="Search by IP, ASN, or CVE..." />
              <SearchButton>🔍 Live Search</SearchButton>
            </SearchBar>
            <FeatureGrid>
              <Feature>
                <FeatureIcon>🌐</FeatureIcon>
                <FeatureTitle>Direct API Integration</FeatureTitle>
                <FeatureDesc>Real-time queries to Censys Search API</FeatureDesc>
              </Feature>
              <Feature>
                <FeatureIcon>⚡</FeatureIcon>
                <FeatureTitle>Instant Lookups</FeatureTitle>
                <FeatureDesc>Query hosts by IP, ASN, or vulnerability</FeatureDesc>
              </Feature>
              <Feature>
                <FeatureIcon>🔄</FeatureIcon>
                <FeatureTitle>Auto Refresh</FeatureTitle>
                <FeatureDesc>Automatic change detection and updates</FeatureDesc>
              </Feature>
            </FeatureGrid>
            <ApiStatsGrid>
              <StatCard>
                <StatValue>1,247</StatValue>
                <StatLabel>API Calls Today</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>98.5%</StatValue>
                <StatLabel>Uptime</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>342ms</StatValue>
                <StatLabel>Avg Response</StatLabel>
              </StatCard>
              <StatCard>
                <StatValue>15/min</StatValue>
                <StatLabel>Rate Limit</StatLabel>
              </StatCard>
            </ApiStatsGrid>
          </CardContent>
        </FullWidthCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>📡</CardIcon>
            <CardTitle>Streaming Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectionStatus>
              <StatusDot $active />
              <StatusText>WebSocket Connected</StatusText>
              <StatusTime>Last ping: 2s ago</StatusTime>
            </ConnectionStatus>
            <StreamingFeed>
              <StreamItem>
                <StreamTime>14:23:45</StreamTime>
                <StreamEvent type="new">
                  <EventIcon>✨</EventIcon>
                  <EventText>New host detected: 192.168.1.45</EventText>
                </StreamEvent>
              </StreamItem>
              <StreamItem>
                <StreamTime>14:23:32</StreamTime>
                <StreamEvent type="update">
                  <EventIcon>🔄</EventIcon>
                  <EventText>Vulnerability updated: CVE-2024-1234</EventText>
                </StreamEvent>
              </StreamItem>
              <StreamItem>
                <StreamTime>14:23:18</StreamTime>
                <StreamEvent type="summary">
                  <EventIcon>📝</EventIcon>
                  <EventText>Summary generated: 45.33.32.156</EventText>
                </StreamEvent>
              </StreamItem>
              <StreamItem>
                <StreamTime>14:22:55</StreamTime>
                <StreamEvent type="alert">
                  <EventIcon>⚠️</EventIcon>
                  <EventText>Critical CVE detected on port 443</EventText>
                </StreamEvent>
              </StreamItem>
            </StreamingFeed>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Progressive Updates</FeatureLabel>
                <FeatureDesc>Summaries appear as data arrives</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Live Dashboard</FeatureLabel>
                <FeatureDesc>No page refresh required</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Real-Time Alerts</FeatureLabel>
                <FeatureDesc>Instant notifications for critical changes</FeatureDesc>
              </FeatureItem>
            </FeatureList>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>📊</CardIcon>
            <CardTitle>Historical Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <TimelineControls>
              <TimelineButton $active>7 Days</TimelineButton>
              <TimelineButton>30 Days</TimelineButton>
              <TimelineButton>90 Days</TimelineButton>
              <TimelineButton>1 Year</TimelineButton>
            </TimelineControls>
            <ChartPlaceholder>
              <ChartTitle>Vulnerability Trends</ChartTitle>
              <ChartBars>
                <Bar height="40%" label="Week 1" />
                <Bar height="60%" label="Week 2" />
                <Bar height="45%" label="Week 3" />
                <Bar height="80%" label="Week 4" />
                <Bar height="55%" label="Week 5" />
                <Bar height="70%" label="Week 6" />
                <Bar height="85%" label="Week 7" />
              </ChartBars>
            </ChartPlaceholder>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Snapshot Comparison</FeatureLabel>
                <FeatureDesc>Compare scans across time periods</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Change Detection</FeatureLabel>
                <FeatureDesc>Highlight new vulnerabilities and configs</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Risk Progression</FeatureLabel>
                <FeatureDesc>Track how threats evolve over time</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <SnapshotGrid>
              <SnapshotCard>
                <SnapshotDate>Nov 28, 2024</SnapshotDate>
                <SnapshotHosts>1,234 hosts</SnapshotHosts>
                <SnapshotAction>View Snapshot →</SnapshotAction>
              </SnapshotCard>
              <SnapshotCard>
                <SnapshotDate>Nov 21, 2024</SnapshotDate>
                <SnapshotHosts>1,198 hosts</SnapshotHosts>
                <SnapshotAction>View Snapshot →</SnapshotAction>
              </SnapshotCard>
              <SnapshotCard>
                <SnapshotDate>Nov 14, 2024</SnapshotDate>
                <SnapshotHosts>1,156 hosts</SnapshotHosts>
                <SnapshotAction>View Snapshot →</SnapshotAction>
              </SnapshotCard>
            </SnapshotGrid>
          </CardContent>
        </FeatureCard>
      </Grid>

      <FullWidthCard>
        <CardHeader>
          <CardIcon>🎯</CardIcon>
          <CardTitle>Integration Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <BenefitsGrid>
            <BenefitCard>
              <BenefitNumber>1</BenefitNumber>
              <BenefitTitle>Always Current</BenefitTitle>
              <BenefitDesc>Access the latest host data without manual uploads</BenefitDesc>
            </BenefitCard>
            <BenefitCard>
              <BenefitNumber>2</BenefitNumber>
              <BenefitTitle>Continuous Monitoring</BenefitTitle>
              <BenefitDesc>Track changes and new vulnerabilities in real-time</BenefitDesc>
            </BenefitCard>
            <BenefitCard>
              <BenefitNumber>3</BenefitNumber>
              <BenefitTitle>Historical Context</BenefitTitle>
              <BenefitDesc>Understand how your security posture evolves</BenefitDesc>
            </BenefitCard>
            <BenefitCard>
              <BenefitNumber>4</BenefitNumber>
              <BenefitTitle>Automated Workflows</BenefitTitle>
              <BenefitDesc>Trigger actions based on API events</BenefitDesc>
            </BenefitCard>
          </BenefitsGrid>
        </CardContent>
      </FullWidthCard>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1400px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const Disclaimer = styled.div`
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #f59e0b;
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  color: #78350f;
  font-size: 0.95rem;
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.1);
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: ${({ theme }) => theme.spacing(6)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadow.md};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const FullWidthCard = styled(FeatureCard)`
  grid-column: 1 / -1;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const CardIcon = styled.div`
  font-size: 2rem;
`;

const CardTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  flex: 1;
`;

const StatusBadge = styled.div`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  background: #10b98122;
  color: #10b981;
  border: 1px solid #10b981;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.85rem;
  font-weight: 600;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const SearchBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(3)};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 1rem;
  pointer-events: none;
  opacity: 0.7;
  background: ${({ theme }) => theme.colors.page};
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  font-size: 1rem;
  cursor: not-allowed;
  opacity: 0.7;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const FeatureTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 1rem;
`;

const FeatureDesc = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
`;

const ApiStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background: linear-gradient(135deg, #3d6375 0%, #2d4a5a 100%);
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
`;

const StatValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const StatusDot = styled.div<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#10b981" : "#ef4444")};
  animation: ${({ $active }) => ($active ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const StatusText = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const StatusTime = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const StreamingFeed = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  max-height: 300px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const StreamItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const StreamTime = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-family: monospace;
  flex-shrink: 0;
`;

const StreamEvent = styled.div<{ type: string }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  flex: 1;
`;

const EventIcon = styled.span`
  font-size: 1.2rem;
`;

const EventText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const FeatureItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const FeatureLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
`;

const TimelineControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const TimelineButton = styled.button<{ $active?: boolean }>`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.page};
  color: ${({ $active }) => ($active ? "white" : "inherit")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  cursor: not-allowed;
  opacity: 0.7;
  font-size: 0.9rem;
`;

const ChartPlaceholder = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ChartTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ChartBars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Bar = styled.div<{ height: string; label: string }>`
  flex: 1;
  height: ${({ height }) => height};
  background: linear-gradient(to top, #3d6375, #5a8da0);
  border-radius: ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0 0;
  position: relative;
  transition: all 0.3s ease;

  &::after {
    content: "${({ label }) => label}";
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textLight};
    white-space: nowrap;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const SnapshotGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const SnapshotCard = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
  cursor: not-allowed;
  opacity: 0.7;
`;

const SnapshotDate = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SnapshotHosts = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SnapshotAction = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const BenefitNumber = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.3rem;
  margin: 0 auto ${({ theme }) => theme.spacing(3)};
`;

const BenefitTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 1.05rem;
`;

const BenefitDesc = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.5;
`;
