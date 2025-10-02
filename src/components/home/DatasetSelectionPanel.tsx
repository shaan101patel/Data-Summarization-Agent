"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styled from "styled-components";

import { selectDatasetAction } from "@/server/actions/selectDataset";
import { initialDatasetSelectionState } from "@/server/actions/types";

interface SubmitButtonProps {
  idleLabel: string;
  pendingLabel: string;
}

function SubmitButton({ idleLabel, pendingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <PrimaryButton type="submit" disabled={pending} data-pending={pending}>
      <span aria-hidden="true">{pending ? pendingLabel : idleLabel}</span>
      <VisuallyHidden aria-live="polite">
        {pending ? pendingLabel : idleLabel}
      </VisuallyHidden>
    </PrimaryButton>
  );
}

export function DatasetSelectionPanel() {
  const [state, formAction] = useActionState(
    selectDatasetAction,
    initialDatasetSelectionState,
  );

  return (
    <Wrapper>
      <Intro>
        <Eyebrow>Dataset intake</Eyebrow>
        <Title>Select a Censys hosts dataset</Title>
        <Copy>
          Provide a dataset matching the published schema to explore normalized
          telemetry and generate summaries. Uploads are validated server-side to
          protect keys and ensure accuracy.
        </Copy>
      </Intro>

      <Forms>
        <FormCard action={formAction}>
          <input type="hidden" name="mode" value="sample" />
          <CardHeader>
            <CardTitle>Use bundled sample</CardTitle>
            <CardLead>
              Load the three-host snapshot shipped with this project. Useful
              for quick demos and regression checks.
            </CardLead>
          </CardHeader>
          <CardFooter>
            <SubmitButton idleLabel="Open sample dataset" pendingLabel="Loading sample" />
            <HelperText>Routes to /hosts with normalized sample data.</HelperText>
          </CardFooter>
        </FormCard>

        <FormCard action={formAction}>
          <input type="hidden" name="mode" value="upload" />
          <CardHeader>
            <CardTitle>Upload JSON dataset</CardTitle>
            <CardLead>
              Accepts JSON shaped like the Censys hosts schema. Parsing,
              validation, and normalization happen entirely on the server.
            </CardLead>
          </CardHeader>
          <Fieldset>
            <Label htmlFor="dataset-upload">Dataset file</Label>
            <FileInput
              id="dataset-upload"
              name="dataset"
              type="file"
              accept="application/json"
              required
            />
            <HelperText>
              Maximum size 2MB. Keys beyond the schema will be ignored safely.
            </HelperText>
          </Fieldset>
          <CardFooter>
            <SubmitButton idleLabel="Upload and analyze" pendingLabel="Processing dataset" />
            <HelperText>
              Files never leave the server boundary. Errors are reported below
              with plain text and screen reader friendly messaging.
            </HelperText>
          </CardFooter>
        </FormCard>
      </Forms>

      <Status role="status" aria-live="polite" data-status={state.status}>
        {state.status === "error" ? (
          <Alert>
            <AlertIcon aria-hidden="true">⚠️</AlertIcon>
            <AlertBody>
              <AlertTitle>We couldn&apos;t process that dataset.</AlertTitle>
              <AlertMessage>{state.message}</AlertMessage>
              {state.details && state.details.length > 0 ? (
                <AlertList>
                  {state.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </AlertList>
              ) : null}
            </AlertBody>
          </Alert>
        ) : (
          <HelperText as="p">
            Select an option above to continue to the hosts overview. Status
            updates appear here and are announced for assistive tech.
          </HelperText>
        )}
      </Status>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(8)};
  width: min(100%, 70rem);
`;

const Intro = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(6)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;

const Eyebrow = styled.p`
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Copy = styled.p`
  margin: 0;
  max-width: 60ch;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Forms = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(6)};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const FormCard = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(5)};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`; 

const CardHeader = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CardLead = styled.p`
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const FileInput = styled.input`
  display: inline-flex;
  padding: ${({ theme }) => theme.spacing(2.5)};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textSecondary};

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

const CardFooter = styled.footer`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(5)};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.accentContrast};
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease, background 0.2s ease;

  &[data-pending="true"] {
    opacity: 0.85;
    cursor: progress;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
  }
`;

const HelperText = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Status = styled.section`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceMuted};
`;

const Alert = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing(3)};
  align-items: start;
`;

const AlertIcon = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`;

const AlertBody = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

const AlertTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const AlertMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AlertList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const VisuallyHidden = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;
