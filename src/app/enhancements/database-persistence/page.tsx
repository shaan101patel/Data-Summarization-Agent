"use client";

import styled from "styled-components";

export default function DatabasePersistencePage() {
  return (
    <Container>
      <Disclaimer>
        ⚠️ <strong>Demo Preview:</strong> This page is for demonstration purposes only and does not contain functional features. It represents a potential future enhancement to the platform.
      </Disclaimer>

      <Header>
        <Title>Database & Persistence</Title>
        <Subtitle>
          PostgreSQL integration, Redis caching, and comprehensive audit logging for enterprise-grade data management
        </Subtitle>
      </Header>

      <Grid>
        <FeatureCard>
          <CardHeader>
            <CardIcon>🐘</CardIcon>
            <CardTitle>PostgreSQL Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <ConnectionPanel>
              <ConnectionStatus>
                <StatusDot $connected />
                <StatusInfo>
                  <StatusLabel>Database Status</StatusLabel>
                  <StatusValue>Connected</StatusValue>
                </StatusInfo>
                <Metric>
                  <MetricLabel>Uptime</MetricLabel>
                  <MetricValue>99.98%</MetricValue>
                </Metric>
              </ConnectionStatus>
              <StatsRow>
                <Stat>
                  <StatIcon>📊</StatIcon>
                  <StatInfo>
                    <StatNumber>1,234</StatNumber>
                    <StatText>Datasets</StatText>
                  </StatInfo>
                </Stat>
                <Stat>
                  <StatIcon>📝</StatIcon>
                  <StatInfo>
                    <StatNumber>45,678</StatNumber>
                    <StatText>Summaries</StatText>
                  </StatInfo>
                </Stat>
                <Stat>
                  <StatIcon>👥</StatIcon>
                  <StatInfo>
                    <StatNumber>89</StatNumber>
                    <StatText>Users</StatText>
                  </StatInfo>
                </Stat>
              </StatsRow>
            </ConnectionPanel>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Persistent Storage</FeatureLabel>
                <FeatureDesc>Datasets, summaries, and user preferences</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Full CRUD Operations</FeatureLabel>
                <FeatureDesc>Complete data management capabilities</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Optimized Queries</FeatureLabel>
                <FeatureDesc>Indexed on IP, risk level, and timestamp</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <SchemaPreview>
              <SchemaTitle>Database Schema</SchemaTitle>
              <SchemaTable>
                <SchemaRow>
                  <TableIcon>📋</TableIcon>
                  <TableName>hosts</TableName>
                  <TableRecords>12,456 records</TableRecords>
                </SchemaRow>
                <SchemaRow>
                  <TableIcon>📝</TableIcon>
                  <TableName>summaries</TableName>
                  <TableRecords>45,678 records</TableRecords>
                </SchemaRow>
                <SchemaRow>
                  <TableIcon>👤</TableIcon>
                  <TableName>users</TableName>
                  <TableRecords>89 records</TableRecords>
                </SchemaRow>
                <SchemaRow>
                  <TableIcon>⚙️</TableIcon>
                  <TableName>preferences</TableName>
                  <TableRecords>89 records</TableRecords>
                </SchemaRow>
              </SchemaTable>
            </SchemaPreview>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>⚡</CardIcon>
            <CardTitle>Redis Caching Layer</CardTitle>
          </CardHeader>
          <CardContent>
            <CacheMetrics>
              <MetricCard>
                <MetricCardValue>92.4%</MetricCardValue>
                <MetricCardLabel>Hit Rate</MetricCardLabel>
              </MetricCard>
              <MetricCard>
                <MetricCardValue>8.2ms</MetricCardValue>
                <MetricCardLabel>Avg Latency</MetricCardLabel>
              </MetricCard>
              <MetricCard>
                <MetricCardValue>1,247</MetricCardValue>
                <MetricCardLabel>Cached Items</MetricCardLabel>
              </MetricCard>
            </CacheMetrics>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Summary Caching</FeatureLabel>
                <FeatureDesc>Avoid re-summarizing unchanged hosts</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Smart Invalidation</FeatureLabel>
                <FeatureDesc>Automatic cache clearing on data updates</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Distributed Cache</FeatureLabel>
                <FeatureDesc>Multi-instance deployment support</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <CacheTimeline>
              <TimelineTitle>Cache Activity (Last Hour)</TimelineTitle>
              <TimelineGraph>
                <TimelineBar height="60%" type="hit" />
                <TimelineBar height="75%" type="hit" />
                <TimelineBar height="45%" type="hit" />
                <TimelineBar height="30%" type="miss" />
                <TimelineBar height="80%" type="hit" />
                <TimelineBar height="65%" type="hit" />
                <TimelineBar height="50%" type="hit" />
                <TimelineBar height="40%" type="miss" />
                <TimelineBar height="90%" type="hit" />
                <TimelineBar height="70%" type="hit" />
              </TimelineGraph>
              <TimelineLegend>
                <LegendItem>
                  <LegendDot color="#10b981" />
                  <LegendText>Cache Hit</LegendText>
                </LegendItem>
                <LegendItem>
                  <LegendDot color="#ef4444" />
                  <LegendText>Cache Miss</LegendText>
                </LegendItem>
              </TimelineLegend>
            </CacheTimeline>
          </CardContent>
        </FeatureCard>

        <FullWidthCard>
          <CardHeader>
            <CardIcon>📋</CardIcon>
            <CardTitle>Audit Logs & Activity Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <AuditControls>
              <FilterGroup>
                <FilterLabel>Event Type:</FilterLabel>
                <FilterSelect>
                  <option>All Events</option>
                  <option>Summarizations</option>
                  <option>API Calls</option>
                  <option>User Actions</option>
                  <option>Errors</option>
                </FilterSelect>
              </FilterGroup>
              <FilterGroup>
                <FilterLabel>Time Range:</FilterLabel>
                <FilterSelect>
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Custom Range</option>
                </FilterSelect>
              </FilterGroup>
              <SearchBox placeholder="Search logs..." />
            </AuditControls>
            <AuditTable>
              <TableHeader>
                <HeaderCell width="15%">Timestamp</HeaderCell>
                <HeaderCell width="15%">Event Type</HeaderCell>
                <HeaderCell width="20%">User</HeaderCell>
                <HeaderCell width="35%">Description</HeaderCell>
                <HeaderCell width="15%">Status</HeaderCell>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <Cell>2024-10-01 14:23:45</Cell>
                  <Cell>
                    <EventBadge type="summary">Summarization</EventBadge>
                  </Cell>
                  <Cell>analyst@censys.com</Cell>
                  <Cell>Generated summary for 192.168.1.45</Cell>
                  <Cell>
                    <StatusBadge status="success">Success</StatusBadge>
                  </Cell>
                </TableRow>
                <TableRow>
                  <Cell>2024-10-01 14:22:31</Cell>
                  <Cell>
                    <EventBadge type="api">API Call</EventBadge>
                  </Cell>
                  <Cell>system</Cell>
                  <Cell>OpenAI API request completed (342ms)</Cell>
                  <Cell>
                    <StatusBadge status="success">Success</StatusBadge>
                  </Cell>
                </TableRow>
                <TableRow>
                  <Cell>2024-10-01 14:21:18</Cell>
                  <Cell>
                    <EventBadge type="user">User Action</EventBadge>
                  </Cell>
                  <Cell>admin@censys.com</Cell>
                  <Cell>Uploaded new dataset (hosts_dataset.json)</Cell>
                  <Cell>
                    <StatusBadge status="success">Success</StatusBadge>
                  </Cell>
                </TableRow>
                <TableRow>
                  <Cell>2024-10-01 14:20:05</Cell>
                  <Cell>
                    <EventBadge type="error">Error</EventBadge>
                  </Cell>
                  <Cell>system</Cell>
                  <Cell>API rate limit exceeded, retrying...</Cell>
                  <Cell>
                    <StatusBadge status="warning">Warning</StatusBadge>
                  </Cell>
                </TableRow>
                <TableRow>
                  <Cell>2024-10-01 14:19:42</Cell>
                  <Cell>
                    <EventBadge type="summary">Summarization</EventBadge>
                  </Cell>
                  <Cell>analyst@censys.com</Cell>
                  <Cell>Batch summary completed (15 hosts)</Cell>
                  <Cell>
                    <StatusBadge status="success">Success</StatusBadge>
                  </Cell>
                </TableRow>
              </TableBody>
            </AuditTable>
            <FeatureHighlights>
              <Highlight>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>Complete activity tracking</HighlightText>
              </Highlight>
              <Highlight>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>User action logging</HighlightText>
              </Highlight>
              <Highlight>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>Compliance reporting</HighlightText>
              </Highlight>
              <Highlight>
                <HighlightIcon>✓</HighlightIcon>
                <HighlightText>Forensic analysis</HighlightText>
              </Highlight>
            </FeatureHighlights>
          </CardContent>
        </FullWidthCard>
      </Grid>

      <BenefitsSection>
        <SectionTitle>Why Database & Persistence?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitIcon>💾</BenefitIcon>
            <BenefitTitle>Data Durability</BenefitTitle>
            <BenefitDesc>Never lose datasets, summaries, or user preferences</BenefitDesc>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>⚡</BenefitIcon>
            <BenefitTitle>Lightning Fast</BenefitTitle>
            <BenefitDesc>Redis caching delivers sub-10ms response times</BenefitDesc>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>📊</BenefitIcon>
            <BenefitTitle>Scalability</BenefitTitle>
            <BenefitDesc>Handle millions of hosts and summaries efficiently</BenefitDesc>
          </BenefitCard>
          <BenefitCard>
            <BenefitIcon>🔒</BenefitIcon>
            <BenefitTitle>Compliance Ready</BenefitTitle>
            <BenefitDesc>Audit logs meet SOC 2, HIPAA, and PCI DSS requirements</BenefitDesc>
          </BenefitCard>
        </BenefitsGrid>
      </BenefitsSection>
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
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const ConnectionPanel = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ConnectionStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StatusDot = styled.div<{ $connected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ $connected }) => ($connected ? "#10b981" : "#ef4444")};
  animation: ${({ $connected }) => ($connected ? "pulse 2s infinite" : "none")};

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StatusLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const StatusValue = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

const Metric = styled.div`
  text-align: right;
`;

const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const MetricValue = styled.div`
  font-weight: 600;
  color: #10b981;
  font-size: 1.1rem;
`;

const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const StatIcon = styled.div`
  font-size: 1.5rem;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatNumber = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const StatText = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
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

const FeatureDesc = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.5;
`;

const SchemaPreview = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const SchemaTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const SchemaTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SchemaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const TableIcon = styled.div`
  font-size: 1.2rem;
`;

const TableName = styled.div`
  font-family: monospace;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

const TableRecords = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const CacheMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const MetricCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background: linear-gradient(135deg, #3d6375 0%, #2d4a5a 100%);
  border-radius: ${({ theme }) => theme.radius.md};
  color: white;
`;

const MetricCardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const MetricCardLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.9;
`;

const CacheTimeline = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const TimelineTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const TimelineGraph = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 120px;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const TimelineBar = styled.div<{ height: string; type: "hit" | "miss" }>`
  flex: 1;
  height: ${({ height }) => height};
  background: ${({ type }) => (type === "hit" ? "#10b981" : "#ef4444")};
  border-radius: ${({ theme }) => theme.radius.sm} ${({ theme }) => theme.radius.sm} 0 0;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const TimelineLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const LegendDot = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
`;

const LegendText = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text};
`;

const AuditControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const FilterLabel = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.page};
  color: ${({ theme }) => theme.colors.text};
  cursor: not-allowed;
  opacity: 0.7;
`;

const SearchBox = styled.input`
  flex: 1;
  min-width: 250px;
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.page};
  pointer-events: none;
  opacity: 0.7;
`;

const AuditTable = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 20% 35% 15%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
`;

const HeaderCell = styled.div<{ width: string }>`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 20% 35% 15%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  &:hover {
    background: ${({ theme }) => theme.colors.page};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Cell = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
`;

const EventBadge = styled.span<{ type: string }>`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ type }) => {
    switch (type) {
      case "summary":
        return "#3b82f622";
      case "api":
        return "#10b98122";
      case "user":
        return "#f59e0b22";
      case "error":
        return "#ef444422";
      default:
        return "#6b728022";
    }
  }};
  color: ${({ type }) => {
    switch (type) {
      case "summary":
        return "#3b82f6";
      case "api":
        return "#10b981";
      case "user":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ status }) => {
    switch (status) {
      case "success":
        return "#10b98122";
      case "warning":
        return "#f59e0b22";
      case "error":
        return "#ef444422";
      default:
        return "#6b728022";
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
`;

const FeatureHighlights = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Highlight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const HighlightIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: #10b981;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const HighlightText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const BenefitsSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  text-align: center;
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
  padding: ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.lg};
  }
`;

const BenefitIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const BenefitTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  font-size: 1.1rem;
`;

const BenefitDesc = styled.div`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 0.9rem;
  line-height: 1.6;
`;
