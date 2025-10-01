import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import styled from "styled-components";

const helpSections = [
  {
    title: "Try Example Queries",
    description: "Select from curated examples to populate the search bar with real syntax.",
  },
  {
    title: "Check Out Data Definitions",
    description: "Review how Censys structures metadata before building advanced reports.",
  },
  {
    title: "Learn with Tutorials",
    description: "Step-by-step CenQL recipes and walkthroughs to accelerate onboarding.",
  },
  {
    title: "Build a Report",
    description: "Generate shareable dashboards for your organisation in minutes.",
  },
];

/**
 * Collapsible help and documentation panel on the right-hand side of the dashboard.
 */
export function HelpPanel() {
  return (
    <Panel aria-label="Helpful resources">
      <Heading>Get started with the platform</Heading>
      <List>
        {helpSections.map((section) => (
          <Disclosure as={Item} key={section.title}>
            {({ open }) => (
              <>
                <DisclosureButton>
                  <ChevronRightIcon width={18} data-open={open} />
                  <span>{section.title}</span>
                </DisclosureButton>
                <Disclosure.Panel as={PanelBody}>{section.description}</Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </List>
    </Panel>
  );
}

const Panel = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
  width: 320px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ theme }) => theme.spacing(5)};
  box-shadow: ${({ theme }) => theme.shadow.sm};

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

const Heading = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Item = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const DisclosureButton = styled(Disclosure.Button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(4)};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};

  svg {
    transition: transform 0.2s ease;
  }

  svg[data-open="true"] {
    transform: rotate(90deg);
  }
`;

const PanelBody = styled.p`
  padding: 0 ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
`;
