"use client";

import styled from "styled-components";

export default function AiCapabilitiesPage() {
  return (
    <Container>
      <Disclaimer>
        ⚠️ <strong>Demo Preview:</strong> This page is for demonstration purposes only and does not contain functional features. It represents a potential future enhancement to the platform.
      </Disclaimer>

      <Header>
        <Title>Advanced AI Capabilities</Title>
        <Subtitle>
          Next-generation AI features for enhanced security analysis and intelligent threat detection
        </Subtitle>
      </Header>

      <Grid>
        <FeatureCard>
          <CardHeader>
            <CardIcon>🤖</CardIcon>
            <CardTitle>Multi-Model Support</CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Provider Abstraction</FeatureLabel>
                <FeatureDesc>Support for Claude, Gemini, and local models (Ollama)</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>A/B Testing</FeatureLabel>
                <FeatureDesc>Compare models for quality and cost optimization</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Smart Routing</FeatureLabel>
                <FeatureDesc>Select models based on task complexity</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <MockSelector>
              <SelectorLabel>Active Model:</SelectorLabel>
              <MockDropdown>
                <option>GPT-4o-mini (Current)</option>
                <option>Claude 3.5 Sonnet</option>
                <option>Gemini 1.5 Pro</option>
                <option>Llama 3.1 (Local)</option>
              </MockDropdown>
            </MockSelector>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>📊</CardIcon>
            <CardTitle>Native JSON Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricRow>
              <Metric>
                <MetricValue>10-20%</MetricValue>
                <MetricLabel>Token Reduction</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>99.9%</MetricValue>
                <MetricLabel>Parse Success</MetricLabel>
              </Metric>
              <Metric>
                <MetricValue>0</MetricValue>
                <MetricLabel>Format Errors</MetricLabel>
              </Metric>
            </MetricRow>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Guaranteed Structure</FeatureLabel>
                <FeatureDesc>Eliminate parsing errors and markdown wrappers</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Cost Savings</FeatureLabel>
                <FeatureDesc>Reduce token usage by removing format overhead</FeatureDesc>
              </FeatureItem>
            </FeatureList>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>🔍</CardIcon>
            <CardTitle>Embeddings & Semantic Search</CardTitle>
          </CardHeader>
          <CardContent>
            <SearchDemo>
              <SearchInput placeholder="Find hosts similar to 45.33.32.156..." />
              <SearchButton>Search Similar</SearchButton>
            </SearchDemo>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Vector Search</FeatureLabel>
                <FeatureDesc>Find related hosts by security posture</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Clustering</FeatureLabel>
                <FeatureDesc>Group hosts by threat patterns</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Similarity Analysis</FeatureLabel>
                <FeatureDesc>Discover correlated vulnerabilities</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <ClusterPreview>
              <ClusterBadge color="#ef4444">High Risk Cluster (12)</ClusterBadge>
              <ClusterBadge color="#f59e0b">Web Servers (45)</ClusterBadge>
              <ClusterBadge color="#10b981">Low Risk (89)</ClusterBadge>
            </ClusterPreview>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>🧠</CardIcon>
            <CardTitle>RAG with Vector Database</CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>External Knowledge</FeatureLabel>
                <FeatureDesc>Integrate CVE descriptions and threat reports</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Historical Context</FeatureLabel>
                <FeatureDesc>Reference previous scan data</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Context-Aware</FeatureLabel>
                <FeatureDesc>Summaries enriched with external intelligence</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <DataSourceGrid>
              <DataSource>
                <SourceIcon>📚</SourceIcon>
                <SourceName>NVD Database</SourceName>
                <SourceStatus>Connected</SourceStatus>
              </DataSource>
              <DataSource>
                <SourceIcon>🔐</SourceIcon>
                <SourceName>Threat Intel</SourceName>
                <SourceStatus>Connected</SourceStatus>
              </DataSource>
              <DataSource>
                <SourceIcon>📈</SourceIcon>
                <SourceName>Historical Scans</SourceName>
                <SourceStatus>Connected</SourceStatus>
              </DataSource>
            </DataSourceGrid>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>🧩</CardIcon>
            <CardTitle>Chain of Thought Reasoning</CardTitle>
          </CardHeader>
          <CardContent>
            <ReasoningExample>
              <ReasoningStep>
                <StepNumber>1</StepNumber>
                <StepText>Identified 3 critical CVEs on port 443</StepText>
              </ReasoningStep>
              <ReasoningStep>
                <StepNumber>2</StepNumber>
                <StepText>Correlated with outdated TLS certificate</StepText>
              </ReasoningStep>
              <ReasoningStep>
                <StepNumber>3</StepNumber>
                <StepText>Cross-referenced with known exploit patterns</StepText>
              </ReasoningStep>
              <ReasoningStep>
                <StepNumber>4</StepNumber>
                <StepText>Concluded: High-priority remediation required</StepText>
              </ReasoningStep>
            </ReasoningExample>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Transparent Analysis</FeatureLabel>
                <FeatureDesc>See how conclusions are reached</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Audit Trails</FeatureLabel>
                <FeatureDesc>Complete reasoning traces for compliance</FeatureDesc>
              </FeatureItem>
            </FeatureList>
          </CardContent>
        </FeatureCard>

        <FeatureCard>
          <CardHeader>
            <CardIcon>📝</CardIcon>
            <CardTitle>Few-Shot Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureList>
              <FeatureItem>
                <FeatureLabel>Example Library</FeatureLabel>
                <FeatureDesc>Curated summaries for different host types</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Consistent Output</FeatureLabel>
                <FeatureDesc>Include exemplars for quality control</FeatureDesc>
              </FeatureItem>
              <FeatureItem>
                <FeatureLabel>Dynamic Selection</FeatureLabel>
                <FeatureDesc>Choose examples based on host characteristics</FeatureDesc>
              </FeatureItem>
            </FeatureList>
            <ExampleGrid>
              <ExampleCard>
                <ExampleType>Web Server</ExampleType>
                <ExampleCount>12 examples</ExampleCount>
              </ExampleCard>
              <ExampleCard>
                <ExampleType>Database</ExampleType>
                <ExampleCount>8 examples</ExampleCount>
              </ExampleCard>
              <ExampleCard>
                <ExampleType>IoT Device</ExampleType>
                <ExampleCount>15 examples</ExampleCount>
              </ExampleCard>
            </ExampleGrid>
          </CardContent>
        </FeatureCard>
      </Grid>
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

const MockSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const SelectorLabel = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

const MockDropdown = styled.select`
  padding: ${({ theme }) => theme.spacing(2.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  cursor: pointer;
  pointer-events: none;
  opacity: 0.7;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const MetricRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const Metric = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const MetricLabel = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight};
`;

const SearchDemo = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing(2.5)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.95rem;
  pointer-events: none;
  opacity: 0.7;
  background: ${({ theme }) => theme.colors.page};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const SearchButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(4)};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: 600;
  cursor: not-allowed;
  opacity: 0.7;
`;

const ClusterPreview = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const ClusterBadge = styled.div<{ color: string }>`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(3)};
  background: ${({ color }) => color}22;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color};
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 0.85rem;
  font-weight: 600;
`;

const DataSourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const DataSource = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
`;

const SourceIcon = styled.div`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SourceName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const SourceStatus = styled.div`
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 500;
`;

const ReasoningExample = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const ReasoningStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  flex-shrink: 0;
`;

const StepText = styled.div`
  flex: 1;
  padding-top: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ExampleCard = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radius.md};
  text-align: center;
`;

const ExampleType = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  font-size: 0.9rem;
`;

const ExampleCount = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textLight};
`;
